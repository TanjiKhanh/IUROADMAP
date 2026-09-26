import { Injectable, Logger } from '@nestjs/common';
import { ErrorCodes, PaginationResponse, getPaginationAsync, isValidWeights, resolveOffering } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors, handlePrismaError } from '../../../common/api-errors';
import { GradingModeEnum, LecturerRoleEnum, OfferingStatusEnum } from '../../../common/enums';
import { COURSE_BRIEF_INCLUDE, toCourseBrief } from '../../course-catalog/services/course-brief.mapper';
import {
  CourseOfferingCopyYearResponse,
  CourseOfferingCreateRequest,
  CourseOfferingFilterRequest,
  CourseOfferingLecturerRequest,
  CourseOfferingResponse,
  CourseOfferingUpdateRequest,
} from '../dto/course-offering';

const ENTITY = 'Course offering';
const INCLUDE = {
  course: { include: COURSE_BRIEF_INCLUDE },
  lecturers: { include: { lecturer: { select: { full_name: true, title: true } } } },
  _count: { select: { topics: true } },
} as const;

/** A course opened in one academic year (FL-RDM-08). Editable after publishing. */
@Injectable()
export class CourseOfferingsService {
  private readonly logger = new Logger(CourseOfferingsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CourseOfferingCreateRequest): Promise<CourseOfferingResponse> {
    const course = await this.prisma.cOURSES.findUnique({ where: { id: dto.courseId }, select: { id: true } });
    if (!course) throw ApiErrors.notFound(`Course with id ${dto.courseId} not found`);
    await this.assertYearFree(dto.courseId, dto.academicYear);

    const created = dto.fromOfferingId
      ? await this.copyOffering(dto.fromOfferingId, dto.courseId, dto.academicYear)
      : await this.prisma.cOURSE_OFFERINGS.create({
          data: { course_id: dto.courseId, academic_year: dto.academicYear, status: OfferingStatusEnum.DRAFT },
        });
    return this.findById(created.id);
  }

  async update(id: number, dto: Omit<CourseOfferingUpdateRequest, 'id'>): Promise<CourseOfferingResponse> {
    const current = await this.prisma.cOURSE_OFFERINGS.findUnique({ where: { id }, include: { course: true } });
    if (!current) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);

    const isPassFail = current.course.grading_mode === GradingModeEnum.PASS_FAIL;
    const weights: [number | null, number | null, number | null] = [
      dto.weightProcess === undefined ? current.weight_process : dto.weightProcess,
      dto.weightMidterm === undefined ? current.weight_midterm : dto.weightMidterm,
      dto.weightFinal === undefined ? current.weight_final : dto.weightFinal,
    ];
    if (!isPassFail && !isValidWeights(weights)) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_WEIGHTS, 'Weights must be all empty or sum to 100');
    }
    if (dto.lecturers) await this.assertLecturers(dto.lecturers);

    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.cOURSE_OFFERINGS.update({
          where: { id },
          data: {
            student_guide: dto.studentGuide,
            syllabus_url: dto.syllabusUrl,
            weight_process: isPassFail ? null : weights[0],
            weight_midterm: isPassFail ? null : weights[1],
            weight_final: isPassFail ? null : weights[2],
            has_project: dto.hasProject,
            project_description: dto.projectDescription,
          },
        });
        if (dto.lecturers) {
          await tx.cOURSE_OFFERING_LECTURERS.deleteMany({ where: { offering_id: id } });
          if (dto.lecturers.length) {
            await tx.cOURSE_OFFERING_LECTURERS.createMany({
              data: dto.lecturers.map((l) => ({
                offering_id: id,
                lecturer_id: l.lecturerId,
                role: l.role ?? LecturerRoleEnum.LECTURER,
                term_in_year: l.termInYear ?? null,
              })),
            });
          }
        }
      });
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'update', id);
    }
    return this.findById(id);
  }

  async setStatus(id: number, status: OfferingStatusEnum): Promise<CourseOfferingResponse> {
    await this.ensureExists(id);
    await this.prisma.cOURSE_OFFERINGS.update({ where: { id }, data: { status } });
    return this.findById(id);
  }

  async findById(id: number): Promise<CourseOfferingResponse> {
    const record = await this.prisma.cOURSE_OFFERINGS.findUnique({ where: { id }, include: INCLUDE });
    if (!record) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
    return this.toResponse(record);
  }

  async findAll(filter: CourseOfferingFilterRequest): Promise<PaginationResponse<CourseOfferingResponse>> {
    const response = await getPaginationAsync<CourseOfferingFilterRequest, any>(
      this.prisma.cOURSE_OFFERINGS,
      filter,
      (f) => {
        const where: any = {};
        if (f.courseId) where.course_id = f.courseId;
        if (f.academicYear) where.academic_year = f.academicYear;
        if (f.status) where.status = f.status;
        if (f.lecturerId) where.lecturers = { some: { lecturer_id: f.lecturerId } };
        if (f.keyword) {
          where.course = {
            OR: [
              { code: { contains: f.keyword, mode: 'insensitive' } },
              { name: { contains: f.keyword, mode: 'insensitive' } },
            ],
          };
        }
        return where;
      },
      { include: INCLUDE, orderBy: [{ academic_year: 'desc' }, { course: { code: 'asc' } }] },
    );
    response.datas = (response.datas ?? []).map((r) => this.toResponse(r));
    return response as PaginationResponse<CourseOfferingResponse>;
  }

  /** Public read: the offering to show for a course in a year, with the fallback of FR-LRN.08.2. */
  async resolveForCourse(courseId: number, academicYear?: number | null): Promise<CourseOfferingResponse | null> {
    const offerings = await this.prisma.cOURSE_OFFERINGS.findMany({
      where: { course_id: courseId, status: OfferingStatusEnum.PUBLISHED },
      select: { id: true, academic_year: true, status: true },
    });
    const picked = resolveOffering(
      offerings.map((o) => ({ id: o.id, academicYear: o.academic_year, status: o.status as 'DRAFT' | 'PUBLISHED' })),
      academicYear,
    );
    return picked ? this.findById(picked.id) : null;
  }

  /** Only DRAFT offerings can be deleted (FR-RDM.08.8). */
  async delete(id: number): Promise<void> {
    const record = await this.prisma.cOURSE_OFFERINGS.findUnique({ where: { id }, select: { status: true } });
    if (!record) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
    if (record.status !== OfferingStatusEnum.DRAFT) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_TRANSITION, 'Unpublish the offering before deleting it', {
        currentStatus: record.status,
      });
    }
    try {
      await this.prisma.cOURSE_OFFERINGS.delete({ where: { id } });
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'delete', id);
    }
  }

  /** Bulk "open courses for a new academic year" (FR-RDM.08.9). */
  async copyYear(fromYear: number, toYear: number): Promise<CourseOfferingCopyYearResponse> {
    if (fromYear === toYear) throw ApiErrors.badRequest(ErrorCodes.INVALID_INPUT, 'Source and target years must differ');
    const sources = await this.prisma.cOURSE_OFFERINGS.findMany({
      where: { academic_year: fromYear, status: OfferingStatusEnum.PUBLISHED },
      select: { id: true, course_id: true },
    });
    const existing = new Set(
      (
        await this.prisma.cOURSE_OFFERINGS.findMany({ where: { academic_year: toYear }, select: { course_id: true } })
      ).map((o) => o.course_id),
    );
    let created = 0;
    let skipped = 0;
    for (const source of sources) {
      if (existing.has(source.course_id)) {
        skipped++;
        continue;
      }
      await this.copyOffering(source.id, source.course_id, toYear);
      created++;
    }
    return { created, skipped };
  }

  /** Copies an offering (fields, lecturers, topics and topic edges) as a DRAFT of another year. */
  private async copyOffering(fromId: number, courseId: number, academicYear: number) {
    const source = await this.prisma.cOURSE_OFFERINGS.findUnique({
      where: { id: fromId },
      include: { lecturers: true, topics: { include: { topicEdgesAsSource: true } } },
    });
    if (!source) throw ApiErrors.notFound(`${ENTITY} with id ${fromId} not found`);
    if (source.course_id !== courseId) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_INPUT, 'The source offering belongs to another course');
    }

    return this.prisma.$transaction(async (tx) => {
      const offering = await tx.cOURSE_OFFERINGS.create({
        data: {
          course_id: courseId,
          academic_year: academicYear,
          status: OfferingStatusEnum.DRAFT,
          student_guide: source.student_guide,
          syllabus_url: source.syllabus_url,
          weight_process: source.weight_process,
          weight_midterm: source.weight_midterm,
          weight_final: source.weight_final,
          has_project: source.has_project,
          project_description: source.project_description,
          copied_from_id: source.id,
        },
      });
      if (source.lecturers.length) {
        await tx.cOURSE_OFFERING_LECTURERS.createMany({
          data: source.lecturers.map((l) => ({
            offering_id: offering.id,
            lecturer_id: l.lecturer_id,
            role: l.role,
            term_in_year: l.term_in_year,
          })),
        });
      }
      if (source.topics.length) {
        const topics = await tx.cOURSE_TOPICS_NODE.createManyAndReturn({
          data: source.topics.map((t) => ({
            offering_id: offering.id,
            slug: t.slug,
            title: t.title,
            description: t.description,
            coords: t.coords ?? undefined,
            learning_objectives: t.learning_objectives,
            resources_url: t.resources_url,
            estimated_hours: t.estimated_hours,
          })),
        });
        const newIdBySlug = new Map(topics.map((t) => [t.slug, t.id]));
        const slugById = new Map(source.topics.map((t) => [t.id, t.slug]));
        const edges = source.topics.flatMap((t) =>
          t.topicEdgesAsSource.map((e) => ({
            source_topic_id: newIdBySlug.get(t.slug)!,
            target_topic_id: newIdBySlug.get(slugById.get(e.target_topic_id)!)!,
          })),
        );
        if (edges.length) await tx.cOURSE_TOPICS_EDGE.createMany({ data: edges });
      }
      return offering;
    });
  }

  private async assertYearFree(courseId: number, academicYear: number): Promise<void> {
    const existing = await this.prisma.cOURSE_OFFERINGS.findUnique({
      where: { course_id_academic_year: { course_id: courseId, academic_year: academicYear } },
      select: { id: true },
    });
    if (existing) {
      throw ApiErrors.conflict(ErrorCodes.COURSE_OFFERING_EXISTS, `The course already has an offering for ${academicYear}`, {
        offeringId: existing.id,
      });
    }
  }

  private async assertLecturers(items: CourseOfferingLecturerRequest[]): Promise<void> {
    const seen = new Set<string>();
    for (const l of items) {
      const key = `${l.lecturerId}:${l.termInYear ?? 'YEAR'}`;
      if (seen.has(key)) throw ApiErrors.badRequest(ErrorCodes.INVALID_INPUT, 'A lecturer is listed twice for the same term');
      seen.add(key);
    }
    const ids = [...new Set(items.map((l) => l.lecturerId))];
    const found = await this.prisma.lECTURERS.count({ where: { id: { in: ids } } });
    if (found !== ids.length) throw ApiErrors.notFound('Some lecturers do not exist');
  }

  private async ensureExists(id: number): Promise<void> {
    const found = await this.prisma.cOURSE_OFFERINGS.findUnique({ where: { id }, select: { id: true } });
    if (!found) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
  }

  toResponse(r: any): CourseOfferingResponse {
    return {
      id: r.id,
      course: toCourseBrief(r.course),
      academicYear: r.academic_year,
      status: r.status,
      studentGuide: r.student_guide ?? undefined,
      syllabusUrl: r.syllabus_url ?? undefined,
      weightProcess: r.weight_process ?? undefined,
      weightMidterm: r.weight_midterm ?? undefined,
      weightFinal: r.weight_final ?? undefined,
      hasProject: r.has_project,
      projectDescription: r.project_description ?? undefined,
      lecturers: (r.lecturers ?? []).map((l: any) => ({
        lecturerId: l.lecturer_id,
        fullName: l.lecturer?.full_name ?? '',
        title: l.lecturer?.title ?? undefined,
        role: l.role,
        termInYear: l.term_in_year ?? undefined,
      })),
      topicCount: r._count?.topics ?? 0,
      copiedFromId: r.copied_from_id ?? undefined,
      canDelete: r.status === OfferingStatusEnum.DRAFT,
      canUpdate: true,
      updatedAt: r.updated_at.toISOString(),
    };
  }
}
