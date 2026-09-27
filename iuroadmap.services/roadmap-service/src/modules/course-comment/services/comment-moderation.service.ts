import { Injectable } from '@nestjs/common';
import { ErrorCodes, PaginationResponse, getPaginationAsync } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors } from '../../../common/api-errors';
import { CommentReportStatusEnum, CommentStatusEnum } from '../../../common/enums';
import { AdminCommentFilterRequest, AdminCommentResponse, FlaggedCountResponse } from '../dto/comment-moderation';

const INCLUDE = {
  course: { select: { code: true, name: true } },
  parent: { select: { content: true } },
  reports: { orderBy: { created_at: 'desc' as const } },
} as const;

/** Admin moderation queue (FL-RDM-10). Nothing is hard-deleted (BR-RM-17). */
@Injectable()
export class CommentModerationService {
  constructor(private readonly prisma: PrismaService) {}

  async list(filter: AdminCommentFilterRequest): Promise<PaginationResponse<AdminCommentResponse>> {
    const response = await getPaginationAsync<AdminCommentFilterRequest, any>(
      this.prisma.cOURSE_COMMENTS,
      filter,
      (f) => {
        const where: any = {};
        if (f.status) where.status = f.status;
        if (f.courseId) where.course_id = f.courseId;
        if (f.userId) where.user_id = f.userId;
        if (f.hasPendingReports) where.pending_report_count = { gt: 0 };
        if (f.keyword) {
          where.OR = [
            { content: { contains: f.keyword, mode: 'insensitive' } },
            { course: { code: { contains: f.keyword, mode: 'insensitive' } } },
          ];
        }
        return where;
      },
      { include: INCLUDE, orderBy: [{ pending_report_count: 'desc' }, { created_at: 'desc' }] },
    );
    response.datas = (response.datas ?? []).map((r) => this.toResponse(r));
    return response as PaginationResponse<AdminCommentResponse>;
  }

  async getById(id: number): Promise<AdminCommentResponse> {
    const record = await this.prisma.cOURSE_COMMENTS.findUnique({ where: { id }, include: INCLUDE });
    if (!record) throw ApiErrors.notFound(`Comment ${id} not found`);
    return this.toResponse(record);
  }

  async flaggedCount(): Promise<FlaggedCountResponse> {
    return { flagged: await this.prisma.cOURSE_COMMENTS.count({ where: { status: CommentStatusEnum.FLAGGED } }) };
  }

  /** Hide with a mandatory reason; pending reports become REVIEWED (FR-RDM.10.2). */
  async hide(id: number, reason: string, adminId: string): Promise<AdminCommentResponse> {
    const text = reason?.trim();
    if (!text) throw ApiErrors.badRequest(ErrorCodes.MODERATION_REASON_REQUIRED, 'A reason is required to hide a comment');
    const record = await this.load(id);
    if (record.status === CommentStatusEnum.DELETED) throw ApiErrors.badRequest(ErrorCodes.INVALID_TRANSITION, 'The author already deleted this comment');
    await this.prisma.$transaction([
      this.prisma.cOURSE_COMMENTS.update({
        where: { id },
        data: {
          status: CommentStatusEnum.HIDDEN,
          moderation_reason: text,
          moderated_by: this.uuidOrNull(adminId),
          moderated_at: new Date(),
          pending_report_count: 0,
        },
      }),
      this.prisma.cOURSE_COMMENT_REPORTS.updateMany({
        where: { comment_id: id, status: CommentReportStatusEnum.PENDING },
        data: { status: CommentReportStatusEnum.REVIEWED },
      }),
    ]);
    return this.getById(id);
  }

  /** Keep the comment: back to VISIBLE, pending reports DISMISSED, counter reset (FR-RDM.10.3). */
  async dismissReports(id: number, adminId: string): Promise<AdminCommentResponse> {
    const record = await this.load(id);
    if (record.status !== CommentStatusEnum.FLAGGED && record.status !== CommentStatusEnum.VISIBLE) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_TRANSITION, 'Only a visible or flagged comment can be kept', { status: record.status });
    }
    await this.prisma.$transaction([
      this.prisma.cOURSE_COMMENTS.update({
        where: { id },
        data: {
          status: CommentStatusEnum.VISIBLE,
          pending_report_count: 0,
          moderated_by: this.uuidOrNull(adminId),
          moderated_at: new Date(),
        },
      }),
      this.prisma.cOURSE_COMMENT_REPORTS.updateMany({
        where: { comment_id: id, status: CommentReportStatusEnum.PENDING },
        data: { status: CommentReportStatusEnum.DISMISSED },
      }),
    ]);
    return this.getById(id);
  }

  /** Undo a hide (FR-RDM.10.4). */
  async restore(id: number, adminId: string): Promise<AdminCommentResponse> {
    const record = await this.load(id);
    if (record.status !== CommentStatusEnum.HIDDEN) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_TRANSITION, 'Only a hidden comment can be restored', { status: record.status });
    }
    await this.prisma.cOURSE_COMMENTS.update({
      where: { id },
      data: { status: CommentStatusEnum.VISIBLE, moderated_by: this.uuidOrNull(adminId), moderated_at: new Date() },
    });
    return this.getById(id);
  }

  private async load(id: number) {
    const record = await this.prisma.cOURSE_COMMENTS.findUnique({ where: { id } });
    if (!record) throw ApiErrors.notFound(`Comment ${id} not found`);
    return record;
  }

  private uuidOrNull(value?: string): string | null {
    return value && /^[0-9a-f-]{36}$/i.test(value) ? value : null;
  }

  private toResponse(r: any): AdminCommentResponse {
    return {
      id: r.id,
      courseId: r.course_id,
      courseCode: r.course?.code ?? '',
      courseName: r.course?.name ?? '',
      parentId: r.parent_id ?? undefined,
      parentContent: r.parent?.content ?? undefined,
      userId: r.user_id,
      authorDisplayName: r.author_display_name ?? undefined,
      content: r.content,
      status: r.status,
      pendingReportCount: r.pending_report_count,
      reports: (r.reports ?? []).map((x: any) => ({
        id: x.id,
        reporterId: x.reporter_id,
        reason: x.reason,
        note: x.note ?? undefined,
        status: x.status,
        createdAt: x.created_at.toISOString(),
      })),
      moderationReason: r.moderation_reason ?? undefined,
      moderatedAt: r.moderated_at ? r.moderated_at.toISOString() : undefined,
      createdAt: r.created_at.toISOString(),
    };
  }
}
