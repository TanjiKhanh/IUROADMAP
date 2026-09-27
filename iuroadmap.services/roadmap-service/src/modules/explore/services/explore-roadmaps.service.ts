import { Injectable } from '@nestjs/common';
import { PaginationResponse, getPaginationAsync } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors } from '../../../common/api-errors';
import { RoadmapVersionStatusEnum, TermKindEnum } from '../../../common/enums';
import { CanvasService } from '../../curriculum/services/canvas.service';
import { VersionStructureService } from '../../curriculum/services/version-structure.service';
import { ExploreCurriculumCardResponse, ExploreRoadmapFilterRequest, ExploreRoadmapPreviewResponse } from '../dto/explore-roadmap';

const CARD_INCLUDE = {
  roadmap: { include: { department: { select: { id: true, name: true } } } },
  _count: { select: { studentRoadmaps: true } },
  nodes: { select: { course_id: true, term: { select: { kind: true } } } },
} as const;

/** Public browsing of published curricula (FL-LRN-01). */
@Injectable()
export class ExploreRoadmapsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly structures: VersionStructureService,
    private readonly canvas: CanvasService,
  ) {}

  async list(filter: ExploreRoadmapFilterRequest): Promise<PaginationResponse<ExploreCurriculumCardResponse>> {
    const response = await getPaginationAsync<ExploreRoadmapFilterRequest, any>(
      this.prisma.rOADMAP_VERSIONS,
      filter,
      (f) => {
        const where: any = { status: RoadmapVersionStatusEnum.PUBLISHED };
        if (f.cohortYear) where.cohort_year = f.cohortYear;
        if (f.majorId) where.roadmap_id = f.majorId;
        const roadmap: any = {};
        if (f.departmentId) roadmap.department_id = f.departmentId;
        if (f.keyword) {
          roadmap.OR = [
            { name: { contains: f.keyword, mode: 'insensitive' } },
            { slug: { contains: f.keyword, mode: 'insensitive' } },
          ];
        }
        if (Object.keys(roadmap).length) where.roadmap = roadmap;
        return where;
      },
      { include: CARD_INCLUDE, orderBy: [{ roadmap: { name: 'asc' } }, { cohort_year: 'desc' }] },
    );
    response.datas = (response.datas ?? []).map((v) => this.toCard(v));
    return response as PaginationResponse<ExploreCurriculumCardResponse>;
  }

  /** Cohort years that have at least one published curriculum (year filter). */
  async years(): Promise<number[]> {
    const rows = await this.prisma.rOADMAP_VERSIONS.findMany({
      where: { status: RoadmapVersionStatusEnum.PUBLISHED },
      select: { cohort_year: true },
      distinct: ['cohort_year'],
      orderBy: { cohort_year: 'desc' },
    });
    return rows.map((r) => r.cohort_year);
  }

  /** Read-only canvas; latest published year when `cohortYear` is empty (FR-LRN.01.3). */
  async preview(majorSlug: string, cohortYear?: number): Promise<ExploreRoadmapPreviewResponse> {
    const major = await this.prisma.mAJOR_ROADMAPS.findUnique({ where: { slug: majorSlug }, select: { id: true } });
    if (!major) throw ApiErrors.notFound(`Major ${majorSlug} not found`);
    const published = await this.prisma.rOADMAP_VERSIONS.findMany({
      where: { roadmap_id: major.id, status: RoadmapVersionStatusEnum.PUBLISHED },
      include: CARD_INCLUDE,
      orderBy: { cohort_year: 'desc' },
    });
    if (!published.length) throw ApiErrors.notFound('This major has no published curriculum yet');
    const version = cohortYear ? published.find((v) => v.cohort_year === cohortYear) : published[0];
    if (!version) throw ApiErrors.notFound(`No published curriculum for ${cohortYear}`);

    const structure = await this.structures.getStructure(version.id);
    const courses = await this.structures.getCourseBriefs(structure.nodes.map((n) => n.courseId));
    return {
      curriculum: this.toCard(version),
      availableYears: published.map((v) => ({ cohortYear: v.cohort_year, versionId: v.id })),
      ...this.canvas.buildView(structure, courses),
    };
  }

  private toCard(v: any): ExploreCurriculumCardResponse {
    const courseCount = (v.nodes ?? []).filter((n: any) => n.course_id && n.term?.kind !== TermKindEnum.ELECTIVE_POOL).length;
    return {
      versionId: v.id,
      majorId: v.roadmap.id,
      majorName: v.roadmap.name,
      majorSlug: v.roadmap.slug,
      majorDescription: v.roadmap.description ?? undefined,
      departmentId: v.roadmap.department.id,
      departmentName: v.roadmap.department.name,
      cohortYear: v.cohort_year,
      revisionNo: v.revision_no ?? undefined,
      totalCredits: v.total_credits,
      courseCount,
      learnerCount: v._count?.studentRoadmaps ?? 0,
    };
  }
}
