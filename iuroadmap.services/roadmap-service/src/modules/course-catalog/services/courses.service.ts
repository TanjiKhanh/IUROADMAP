import { Injectable, Logger } from '@nestjs/common';
import { ErrorCodes, PaginationResponse, getPaginationAsync } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors, handlePrismaError } from '../../../common/api-errors';
import { GradingModeEnum, RoadmapVersionStatusEnum } from '../../../common/enums';
import { toCourseBrief } from './course-brief.mapper';
import {
  CourseCreateRequest,
  CourseDetailResponse,
  CourseBriefResponse,
  CourseFilterRequest,
  CourseResponse,
  CourseUpdateRequest,
  CourseUsageResponse,
} from '../dto/course';

const ENTITY = 'Course';
const INCLUDE = {
  category: true,
  _count: { select: { roadmapNodes: true, studentNodeDeltas: true, offerings: true, comments: true } },
} as const;

@Injectable()
export class CoursesService {
  private readonly logger = new Logger(CoursesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CourseCreateRequest): Promise<CourseResponse> {
    this.assertCredits(dto.theoryCredits, dto.labCredits);
    await this.ensureCategory(dto.categoryId);
    try {
      const record = await this.prisma.cOURSES.create({
        data: {
          code: dto.code,
          name: dto.name,
          theory_credits: dto.theoryCredits,
          lab_credits: dto.labCredits,
          category_id: dto.categoryId,
          grading_mode: dto.gradingMode ?? GradingModeEnum.SCORE,
          counts_toward_gpa: dto.countsTowardGpa ?? true,
          counts_toward_credits: dto.countsTowardCredits ?? true,
          description: dto.description,
        },
        include: INCLUDE,
      });
      return this.toResponse(record);
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'create');
    }
  }

  async update(id: number, dto: Omit<CourseUpdateRequest, 'id'>): Promise<CourseResponse> {
    const current = await this.prisma.cOURSES.findUnique({ where: { id } });
    if (!current) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
    this.assertCredits(dto.theoryCredits ?? current.theory_credits, dto.labCredits ?? current.lab_credits);
    if (dto.categoryId) await this.ensureCategory(dto.categoryId);
    if (dto.gradingMode && dto.gradingMode !== current.grading_mode && (await this.hasResults(id))) {
      throw ApiErrors.conflict(ErrorCodes.COURSE_HAS_RESULTS, 'Grading mode cannot change once learners have results');
    }
    try {
      const record = await this.prisma.cOURSES.update({
        where: { id },
        data: {
          code: dto.code,
          name: dto.name,
          theory_credits: dto.theoryCredits,
          lab_credits: dto.labCredits,
          category_id: dto.categoryId,
          grading_mode: dto.gradingMode,
          counts_toward_gpa: dto.countsTowardGpa,
          counts_toward_credits: dto.countsTowardCredits,
          description: dto.description,
        },
        include: INCLUDE,
      });
      return this.toResponse(record);
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'update', id);
    }
  }

  async findById(id: number): Promise<CourseDetailResponse> {
    const record = await this.prisma.cOURSES.findUnique({ where: { id }, include: INCLUDE });
    if (!record) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
    const [usedIn, offerings] = await Promise.all([
      this.usage(id),
      this.prisma.cOURSE_OFFERINGS.findMany({
        where: { course_id: id },
        select: { academic_year: true },
        orderBy: { academic_year: 'asc' },
      }),
    ]);
    return { ...this.toResponse(record), usedIn, offeringYears: offerings.map((o) => o.academic_year) };
  }

  async findAll(filter: CourseFilterRequest): Promise<PaginationResponse<CourseResponse>> {
    const response = await getPaginationAsync<CourseFilterRequest, any>(
      this.prisma.cOURSES,
      filter,
      (f) => this.buildWhere(f),
      { include: INCLUDE, orderBy: { code: 'asc' } },
    );
    response.datas = (response.datas ?? []).map((r) => this.toResponse(r));
    return response as PaginationResponse<CourseResponse>;
  }

  async getDropdownList(keyword?: string, limit = 50, categoryId?: number): Promise<CourseBriefResponse[]> {
    const records = await this.prisma.cOURSES.findMany({
      where: this.buildWhere({ keyword, categoryId }),
      include: { category: true },
      take: limit,
      orderBy: { code: 'asc' },
    });
    return records.map((r) => toCourseBrief(r));
  }

  async delete(id: number): Promise<void> {
    const record = await this.prisma.cOURSES.findUnique({ where: { id }, include: INCLUDE });
    if (!record) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
    if (this.referenceCount(record) > 0) {
      throw ApiErrors.conflict(ErrorCodes.COURSE_IN_USE, 'Course is used by curricula, learner plans, offerings or comments', {
        usedIn: await this.usage(id),
        learnerPlanCount: record._count.studentNodeDeltas,
        offeringCount: record._count.offerings,
        commentCount: record._count.comments,
      });
    }
    try {
      await this.prisma.cOURSES.delete({ where: { id } });
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'delete', id);
    }
  }

  /** Courses of a major = courses placed in any curriculum of that major (FR-RDM.00.6). */
  private buildWhere(f: { keyword?: string; categoryId?: number; majorId?: number; gradingMode?: string }) {
    const where: any = {};
    if (f.keyword) {
      where.OR = [
        { code: { contains: f.keyword, mode: 'insensitive' } },
        { name: { contains: f.keyword, mode: 'insensitive' } },
      ];
    }
    if (f.categoryId) where.category_id = f.categoryId;
    if (f.gradingMode) where.grading_mode = f.gradingMode;
    if (f.majorId) where.roadmapNodes = { some: { version: { roadmap_id: f.majorId } } };
    return where;
  }

  private async usage(courseId: number): Promise<CourseUsageResponse[]> {
    const nodes = await this.prisma.rOADMAP_NODES.findMany({
      where: { course_id: courseId },
      select: { version: { select: { id: true, cohort_year: true, status: true, roadmap: { select: { id: true, name: true, slug: true } } } } },
    });
    return nodes.map((n) => ({
      versionId: n.version.id,
      majorId: n.version.roadmap.id,
      majorName: n.version.roadmap.name,
      majorSlug: n.version.roadmap.slug,
      cohortYear: n.version.cohort_year,
      status: n.version.status as RoadmapVersionStatusEnum,
    }));
  }

  /** True when a learner has a result on a node that shows this course (base node or custom/slot delta). */
  private async hasResults(courseId: number): Promise<boolean> {
    const [baseNodes, deltas] = await Promise.all([
      this.prisma.rOADMAP_NODES.findMany({ where: { course_id: courseId }, select: { node_key: true, version_id: true } }),
      this.prisma.sTUDENT_NODE_DELTAS.findMany({ where: { course_id: courseId }, select: { node_key: true, student_roadmap_id: true } }),
    ]);
    if (deltas.length) {
      const hit = await this.prisma.sTUDENT_COURSE_RESULTS.findFirst({
        where: { OR: deltas.map((d) => ({ student_roadmap_id: d.student_roadmap_id, node_key: d.node_key })) },
        select: { id: true },
      });
      if (hit) return true;
    }
    if (baseNodes.length) {
      const hit = await this.prisma.sTUDENT_COURSE_RESULTS.findFirst({
        where: {
          OR: baseNodes.map((n) => ({ node_key: n.node_key, studentRoadmap: { version_id: n.version_id } })),
        },
        select: { id: true },
      });
      if (hit) return true;
    }
    return false;
  }

  private assertCredits(theory: number, lab: number): void {
    if (theory + lab <= 0) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_INPUT, 'Credits must be greater than 0 (theory + lab > 0)');
    }
  }

  private async ensureCategory(categoryId: number): Promise<void> {
    const found = await this.prisma.cOURSE_CATEGORIES.findUnique({ where: { id: categoryId }, select: { id: true } });
    if (!found) throw ApiErrors.notFound(`Course category with id ${categoryId} not found`);
  }

  private referenceCount(r: any): number {
    const c = r._count ?? {};
    return (c.roadmapNodes ?? 0) + (c.studentNodeDeltas ?? 0) + (c.offerings ?? 0) + (c.comments ?? 0);
  }

  private toResponse(r: any): CourseResponse {
    return {
      id: r.id,
      code: r.code,
      name: r.name,
      theoryCredits: r.theory_credits,
      labCredits: r.lab_credits,
      credits: r.theory_credits + r.lab_credits,
      categoryId: r.category_id,
      categoryCode: r.category?.code ?? '',
      categoryName: r.category?.name ?? '',
      fillColor: r.category?.fill_color ?? '',
      borderColor: r.category?.border_color ?? '',
      gradingMode: r.grading_mode,
      countsTowardGpa: r.counts_toward_gpa,
      countsTowardCredits: r.counts_toward_credits,
      description: r.description ?? undefined,
      canDelete: this.referenceCount(r) === 0,
      canUpdate: true,
    };
  }
}
