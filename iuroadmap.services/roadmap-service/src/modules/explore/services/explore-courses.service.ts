import { Injectable } from '@nestjs/common';
import { PaginationResponse, resolveOffering } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors } from '../../../common/api-errors';
import { CommentStatusEnum, OfferingStatusEnum, RelationTypeEnum, RoadmapVersionStatusEnum, TermKindEnum } from '../../../common/enums';
import { COURSE_BRIEF_INCLUDE, toCourseBrief } from '../../course-catalog/services/course-brief.mapper';
import { CourseOfferingsService } from '../../course-offering/services/course-offerings.service';
import { OfferingTopicsService } from '../../course-offering/services/offering-topics.service';
import { TopicsGraphResponse } from '../../course-offering/dto/course-topic';
import {
  CourseCurriculumUsageResponse,
  ExploreCourseCardResponse,
  ExploreCourseDetailResponse,
  ExploreCourseFilterRequest,
} from '../dto/explore-course';

const MAX_MAJORS_ON_CARD = 3;

/** Course Explorer (FL-LRN-11): public course search, course page by academic year, topics. */
@Injectable()
export class ExploreCoursesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly offerings: CourseOfferingsService,
    private readonly topics: OfferingTopicsService,
  ) {}

  async list(filter: ExploreCourseFilterRequest): Promise<PaginationResponse<ExploreCourseCardResponse>> {
    const where = this.buildWhere(filter);
    const candidates = await this.prisma.cOURSES.findMany({
      where,
      select: {
        id: true,
        code: true,
        name: true,
        theory_credits: true,
        lab_credits: true,
        _count: { select: { comments: { where: { status: CommentStatusEnum.VISIBLE } } } },
      },
    });

    // Credits are theory + lab, so they are filtered after the query (the catalog is small).
    const filtered = candidates.filter((c) => {
      const credits = c.theory_credits + c.lab_credits;
      if (filter.credits !== undefined && credits !== filter.credits) return false;
      if (filter.minCredits !== undefined && credits < filter.minCredits) return false;
      if (filter.maxCredits !== undefined && credits > filter.maxCredits) return false;
      return true;
    });
    const sort = filter.sort ?? 'code';
    filtered.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'credits') return b.theory_credits + b.lab_credits - (a.theory_credits + a.lab_credits) || a.code.localeCompare(b.code);
      if (sort === 'comments') return b._count.comments - a._count.comments || a.code.localeCompare(b.code);
      return a.code.localeCompare(b.code);
    });

    const currentPage = filter.currentPage ?? 1;
    const rowsPerPage = filter.rowsPerPage ?? 20;
    const page = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    const commentCount = new Map(page.map((c) => [c.id, c._count.comments]));

    const details = page.length
      ? await this.prisma.cOURSES.findMany({
          where: { id: { in: page.map((c) => c.id) } },
          include: {
            ...COURSE_BRIEF_INCLUDE,
            offerings: {
              where: { status: OfferingStatusEnum.PUBLISHED },
              include: { lecturers: { include: { lecturer: { select: { full_name: true, title: true } } } } },
            },
            roadmapNodes: {
              where: { version: { status: RoadmapVersionStatusEnum.PUBLISHED } },
              select: { version: { select: { roadmap: { select: { id: true, name: true, slug: true } } } } },
            },
          },
        })
      : [];
    const byId = new Map(details.map((d) => [d.id, d]));

    const response = new PaginationResponse<ExploreCourseCardResponse>();
    response.currentPage = currentPage;
    response.rowsPerPage = rowsPerPage;
    response.totalRows = filtered.length;
    response.datas = page.map((c) => {
      const d = byId.get(c.id)!;
      const offering = resolveOffering(
        d.offerings.map((o) => ({ ...o, academicYear: o.academic_year, status: o.status as 'DRAFT' | 'PUBLISHED' })),
        filter.academicYear ?? null,
      );
      const majors = new Map<number, { id: number; name: string; slug: string }>();
      for (const n of d.roadmapNodes) majors.set(n.version.roadmap.id, n.version.roadmap);
      return {
        course: toCourseBrief(d),
        categoryName: d.category.name,
        credits: d.theory_credits + d.lab_credits,
        offeringYear: offering?.academicYear,
        lecturers: (offering?.lecturers ?? []).map((l: any) => ({
          lecturerId: l.lecturer_id,
          fullName: l.lecturer.full_name,
          title: l.lecturer.title ?? undefined,
          role: l.role,
          termInYear: l.term_in_year ?? undefined,
        })),
        hasProject: offering?.has_project ?? false,
        majors: [...majors.values()].slice(0, MAX_MAJORS_ON_CARD),
        commentCount: commentCount.get(c.id) ?? 0,
      };
    });
    return response;
  }

  /** Academic years with at least one published offering (year filter). */
  async academicYears(): Promise<number[]> {
    const rows = await this.prisma.cOURSE_OFFERINGS.findMany({
      where: { status: OfferingStatusEnum.PUBLISHED },
      select: { academic_year: true },
      distinct: ['academic_year'],
      orderBy: { academic_year: 'desc' },
    });
    return rows.map((r) => r.academic_year);
  }

  async detail(courseId: number, academicYear?: number): Promise<ExploreCourseDetailResponse> {
    const course = await this.prisma.cOURSES.findUnique({
      where: { id: courseId },
      include: {
        ...COURSE_BRIEF_INCLUDE,
        offerings: { where: { status: OfferingStatusEnum.PUBLISHED }, select: { academic_year: true }, orderBy: { academic_year: 'desc' } },
        _count: { select: { comments: { where: { status: CommentStatusEnum.VISIBLE } } } },
      },
    });
    if (!course) throw ApiErrors.notFound(`Course ${courseId} not found`);
    const offering = await this.offerings.resolveForCourse(courseId, academicYear ?? null);
    return {
      course: toCourseBrief(course),
      categoryName: course.category.name,
      description: course.description ?? undefined,
      availableYears: course.offerings.map((o) => o.academic_year),
      requestedYear: academicYear,
      offering: offering ?? undefined,
      commentCount: course._count.comments,
    };
  }

  /** Where the course sits in each published curriculum, with the courses before and after it. */
  async curricula(courseId: number): Promise<CourseCurriculumUsageResponse[]> {
    const nodes = await this.prisma.rOADMAP_NODES.findMany({
      where: { course_id: courseId, version: { status: RoadmapVersionStatusEnum.PUBLISHED } },
      include: {
        term: { select: { kind: true, semester_no: true } },
        version: { select: { id: true, cohort_year: true, roadmap: { select: { id: true, name: true, slug: true } } } },
        edgesIn: { include: { sourceNode: { include: { course: { select: { code: true, name: true } } } } } },
        edgesOut: { include: { targetNode: { include: { course: { select: { code: true, name: true } } } } } },
      },
      orderBy: [{ version: { cohort_year: 'desc' } }],
    });
    return nodes.map((n) => ({
      versionId: n.version.id,
      majorId: n.version.roadmap.id,
      majorName: n.version.roadmap.name,
      majorSlug: n.version.roadmap.slug,
      cohortYear: n.version.cohort_year,
      termKind: n.term.kind as TermKindEnum,
      semesterNo: n.term.semester_no ?? undefined,
      before: n.edgesIn
        .filter((e) => e.sourceNode.course)
        .map((e) => ({ code: e.sourceNode.course!.code, name: e.sourceNode.course!.name, type: e.type as RelationTypeEnum })),
      after: n.edgesOut
        .filter((e) => e.targetNode.course)
        .map((e) => ({ code: e.targetNode.course!.code, name: e.targetNode.course!.name, type: e.type as RelationTypeEnum })),
    }));
  }

  /** Topics of the offering of that year, or of the nearest earlier published one (FR-LRN.08.2). */
  async topicsGraph(courseId: number, academicYear?: number): Promise<TopicsGraphResponse> {
    const offering = await this.offerings.resolveForCourse(courseId, academicYear ?? null);
    if (!offering) throw ApiErrors.notFound('This course has no published content yet');
    return this.topics.getGraph(offering.id);
  }

  private buildWhere(f: ExploreCourseFilterRequest): any {
    const where: any = {};
    if (f.keyword) {
      where.OR = [
        { code: { contains: f.keyword, mode: 'insensitive' } },
        { name: { contains: f.keyword, mode: 'insensitive' } },
      ];
    }
    if (f.categoryId) where.category_id = f.categoryId;
    if (f.gradingMode) where.grading_mode = f.gradingMode;
    if (f.majorId || f.departmentId) {
      const version: any = { status: RoadmapVersionStatusEnum.PUBLISHED };
      if (f.majorId) version.roadmap_id = f.majorId;
      if (f.departmentId) version.roadmap = { department_id: f.departmentId };
      where.roadmapNodes = { some: { version } };
    }
    if (f.academicYear || f.lecturerId || f.hasProject !== undefined) {
      const offering: any = { status: OfferingStatusEnum.PUBLISHED };
      if (f.academicYear) offering.academic_year = f.academicYear;
      if (f.lecturerId) offering.lecturers = { some: { lecturer_id: f.lecturerId } };
      if (f.hasProject !== undefined) offering.has_project = f.hasProject;
      where.offerings = { some: offering };
    }
    return where;
  }
}
