import { Injectable, Logger } from '@nestjs/common';
import { AppConstant, ErrorCodes, PaginationResponse } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors, handlePrismaError } from '../../../common/api-errors';
import { CommentReportReasonEnum, CommentStatusEnum, RoadmapVersionStatusEnum } from '../../../common/enums';
import { canEdit, canReport, canSee, rateLimitWait, statusAfterReport } from '../lib/moderation';
import {
  CommentReportRequest,
  CourseCommentCreateRequest,
  CourseCommentFilterRequest,
  CourseCommentResponse,
  CourseCommentUpdateRequest,
} from '../dto/course-comment';

export interface CommentAuthor {
  userId: string;
  /** From the JWT `name` claim (D18); falls back to the part of the email before "@" */
  displayName: string;
}

/** Student comments on a course, post-moderated (FL-LRN-10). */
@Injectable()
export class CourseCommentsService {
  private readonly logger = new Logger(CourseCommentsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** Root comments newest first, each with its replies; the caller also sees their own hidden ones. */
  async thread(courseId: number, filter: CourseCommentFilterRequest, viewerId?: string): Promise<PaginationResponse<CourseCommentResponse>> {
    await this.ensureCourse(courseId);
    const visibleToViewer = viewerId
      ? { OR: [{ status: CommentStatusEnum.VISIBLE }, { user_id: viewerId, status: { in: [CommentStatusEnum.FLAGGED, CommentStatusEnum.HIDDEN] } }] }
      : { status: CommentStatusEnum.VISIBLE };
    const rootWhere: any = {
      course_id: courseId,
      parent_id: null,
      ...(filter.academicYear ? { academic_year: filter.academicYear } : {}),
      OR: [
        visibleToViewer,
        // A deleted root stays as a placeholder while it has visible replies.
        { status: CommentStatusEnum.DELETED, replies: { some: { status: CommentStatusEnum.VISIBLE } } },
      ],
    };

    const currentPage = filter.currentPage ?? 1;
    const rowsPerPage = filter.rowsPerPage ?? AppConstant.Pagination.DefaultRowsPerPage;
    const [roots, totalRows] = await Promise.all([
      this.prisma.cOURSE_COMMENTS.findMany({
        where: rootWhere,
        include: { replies: { orderBy: { created_at: 'asc' } } },
        orderBy: { created_at: 'desc' },
        skip: (currentPage - 1) * rowsPerPage,
        take: rowsPerPage,
      }),
      this.prisma.cOURSE_COMMENTS.count({ where: rootWhere }),
    ]);

    const cohorts = await this.authorCohorts(
      courseId,
      roots.flatMap((r) => [r.user_id, ...r.replies.map((x) => x.user_id)]),
    );
    const response = new PaginationResponse<CourseCommentResponse>();
    response.currentPage = currentPage;
    response.rowsPerPage = rowsPerPage;
    response.totalRows = totalRows;
    response.datas = roots.map((root) => {
      const rootVisibleToOthers = root.status === CommentStatusEnum.VISIBLE || root.status === CommentStatusEnum.DELETED;
      const replies = root.replies.filter(
        (r) => canSee(r.status as any, r.user_id === viewerId) && (rootVisibleToOthers || root.user_id === viewerId || r.user_id === viewerId),
      );
      return { ...this.toResponse(root, viewerId, cohorts), replies: replies.map((r) => this.toResponse(r, viewerId, cohorts)) };
    });
    return response;
  }

  async create(author: CommentAuthor, dto: CourseCommentCreateRequest): Promise<CourseCommentResponse> {
    await this.ensureCourse(dto.courseId);
    const content = dto.content.trim();
    if (!content) throw ApiErrors.badRequest(ErrorCodes.INVALID_INPUT, 'The comment is empty');

    const windowStart = new Date(Date.now() - AppConstant.CourseComment.WindowMinutes * 60_000);
    const recent = await this.prisma.cOURSE_COMMENTS.findMany({
      where: { user_id: author.userId, created_at: { gte: windowStart } },
      select: { created_at: true },
    });
    const wait = rateLimitWait(
      recent.map((r) => r.created_at),
      new Date(),
      AppConstant.CourseComment.MaxPerWindow,
      AppConstant.CourseComment.WindowMinutes,
    );
    if (wait > 0) {
      throw ApiErrors.tooManyRequests(ErrorCodes.COMMENT_RATE_LIMITED, 'You are commenting too fast', { retryAfterSeconds: wait });
    }

    let parentId: number | null = null;
    if (dto.parentId) {
      const parent = await this.prisma.cOURSE_COMMENTS.findUnique({ where: { id: dto.parentId } });
      if (!parent || parent.course_id !== dto.courseId) throw ApiErrors.notFound(`Comment ${dto.parentId} not found on this course`);
      const rootId = parent.parent_id ?? parent.id;
      const root = rootId === parent.id ? parent : await this.prisma.cOURSE_COMMENTS.findUnique({ where: { id: rootId } });
      if (!root || root.status === CommentStatusEnum.HIDDEN || root.status === CommentStatusEnum.DELETED) {
        throw ApiErrors.badRequest(ErrorCodes.INVALID_OPERATION, 'This comment can no longer be answered');
      }
      parentId = rootId;
    }

    try {
      const record = await this.prisma.cOURSE_COMMENTS.create({
        data: {
          course_id: dto.courseId,
          parent_id: parentId,
          user_id: author.userId,
          author_display_name: author.displayName,
          academic_year: parentId ? null : dto.academicYear ?? null,
          content,
        },
      });
      return { ...this.toResponse(record, author.userId, new Map()), replies: [] };
    } catch (error) {
      handlePrismaError(this.logger, error, 'Comment', 'create');
    }
  }

  async update(userId: string, dto: CourseCommentUpdateRequest): Promise<CourseCommentResponse> {
    const record = await this.loadOwn(dto.id, userId);
    if (!canEdit(record.status as any)) {
      throw ApiErrors.conflict(ErrorCodes.COMMENT_NOT_EDITABLE, 'This comment can no longer be edited', { status: record.status });
    }
    const content = dto.content.trim();
    if (!content) throw ApiErrors.badRequest(ErrorCodes.INVALID_INPUT, 'The comment is empty');
    const updated = await this.prisma.cOURSE_COMMENTS.update({ where: { id: dto.id }, data: { content, edited_at: new Date() } });
    return { ...this.toResponse(updated, userId, new Map()), replies: [] };
  }

  /** Soft delete by the author (FR-LRN.10.6). */
  async delete(userId: string, id: number): Promise<void> {
    await this.loadOwn(id, userId);
    await this.prisma.cOURSE_COMMENTS.update({ where: { id }, data: { status: CommentStatusEnum.DELETED } });
  }

  /** One report per user; enough pending reports flag the comment (FR-LRN.10.7/10.8). */
  async report(userId: string, id: number, dto: CommentReportRequest): Promise<void> {
    const comment = await this.prisma.cOURSE_COMMENTS.findUnique({ where: { id } });
    if (!comment) throw ApiErrors.notFound(`Comment ${id} not found`);
    if (comment.user_id === userId) throw ApiErrors.badRequest(ErrorCodes.INVALID_OPERATION, 'You cannot report your own comment');
    if (!canReport(comment.status as any)) throw ApiErrors.badRequest(ErrorCodes.INVALID_OPERATION, 'This comment cannot be reported');
    if (dto.reason === CommentReportReasonEnum.OTHER && !dto.note?.trim()) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_INPUT, 'Please describe the problem');
    }
    const existing = await this.prisma.cOURSE_COMMENT_REPORTS.findUnique({
      where: { comment_id_reporter_id: { comment_id: id, reporter_id: userId } },
      select: { id: true },
    });
    if (existing) throw ApiErrors.conflict(ErrorCodes.ALREADY_REPORTED, 'You already reported this comment');

    await this.prisma.$transaction(async (tx) => {
      await tx.cOURSE_COMMENT_REPORTS.create({
        data: { comment_id: id, reporter_id: userId, reason: dto.reason, note: dto.note?.trim() || null },
      });
      const updated = await tx.cOURSE_COMMENTS.update({ where: { id }, data: { pending_report_count: { increment: 1 } } });
      const next = statusAfterReport(updated.status as any, updated.pending_report_count, AppConstant.Moderation.ReportThreshold);
      if (next !== updated.status) await tx.cOURSE_COMMENTS.update({ where: { id }, data: { status: next } });
    });
  }

  private async loadOwn(id: number, userId: string) {
    const record = await this.prisma.cOURSE_COMMENTS.findUnique({ where: { id } });
    if (!record || record.status === CommentStatusEnum.DELETED) throw ApiErrors.notFound(`Comment ${id} not found`);
    if (record.user_id !== userId) throw ApiErrors.forbidden('You can only change your own comments');
    return record;
  }

  private async ensureCourse(courseId: number): Promise<void> {
    const found = await this.prisma.cOURSES.findUnique({ where: { id: courseId }, select: { id: true } });
    if (!found) throw ApiErrors.notFound(`Course ${courseId} not found`);
  }

  /** Cohort of each author in a major whose published curriculum contains the course (FR-LRN.10.10). */
  private async authorCohorts(courseId: number, userIds: string[]): Promise<Map<string, number>> {
    const ids = [...new Set(userIds)];
    if (!ids.length) return new Map();
    const roadmaps = await this.prisma.sTUDENT_ROADMAPS.findMany({
      where: {
        user_id: { in: ids },
        roadmap: { versions: { some: { status: RoadmapVersionStatusEnum.PUBLISHED, nodes: { some: { course_id: courseId } } } } },
      },
      select: { user_id: true, version: { select: { cohort_year: true } } },
    });
    return new Map(roadmaps.map((r) => [r.user_id, r.version.cohort_year]));
  }

  private toResponse(r: any, viewerId: string | undefined, cohorts: Map<string, number>): CourseCommentResponse {
    const isMine = !!viewerId && r.user_id === viewerId;
    const deleted = r.status === CommentStatusEnum.DELETED;
    return {
      id: r.id,
      courseId: r.course_id,
      parentId: r.parent_id ?? undefined,
      authorDisplayName: deleted ? undefined : r.author_display_name ?? undefined,
      authorCohortYear: cohorts.get(r.user_id),
      isMine,
      academicYear: r.academic_year ?? undefined,
      content: deleted ? undefined : r.content,
      status: r.status,
      moderationReason: isMine && r.status === CommentStatusEnum.HIDDEN ? r.moderation_reason ?? undefined : undefined,
      isEdited: !!r.edited_at,
      createdAt: r.created_at.toISOString(),
      replies: [],
    };
  }
}
