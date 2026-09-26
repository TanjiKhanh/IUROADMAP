import { Injectable } from '@nestjs/common';
import { ResultsSummary } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors } from '../../../common/api-errors';
import { RoadmapVersionStatusEnum } from '../../../common/enums';
import { CourseBriefResponse } from '../../course-catalog/dto/course/course-brief.response';
import { VersionStructureService } from '../../curriculum/services/version-structure.service';
import { GradingService } from '../../grading/services/grading.service';
import { CourseInfo, DerivedRoadmap, DerivedNode, DerivedTerm, ResultRow, deriveRoadmap } from '../lib/derive';
import { mergeRoadmap } from '../lib/merge';
import { DeltaState } from '../lib/overlay-types';
import {
  CourseResultResponse,
  MergedNodeResponse,
  MergedTermResponse,
  StudentRoadmapResponse,
  StudentRoadmapSummaryResponse,
  TermResultSummaryResponse,
} from '../dto/student-roadmap';
import { OverlayRepository } from './overlay.repository';

export const STUDENT_ROADMAP_INCLUDE = {
  roadmap: { select: { id: true, name: true, slug: true, department: { select: { name: true } } } },
  version: { select: { id: true, cohort_year: true, revision_no: true, total_credits: true, status: true, roadmap_id: true } },
} as const;

export interface ComputedRoadmap {
  record: any;
  deltas: DeltaState;
  results: Map<string, ResultRow>;
  derived: DerivedRoadmap;
  courses: Map<number, CourseBriefResponse>;
}

/** Builds the merged view (design §6.3): curriculum (cached) ⊕ overlay ⊕ results, derived at read time. */
@Injectable()
export class MergedViewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly structures: VersionStructureService,
    private readonly overlay: OverlayRepository,
    private readonly grading: GradingService,
  ) {}

  /** Loads a roadmap and checks that it belongs to the caller (BR-LRN-14). */
  async loadOwned(id: number, userId: string) {
    const record = await this.prisma.sTUDENT_ROADMAPS.findUnique({ where: { id }, include: STUDENT_ROADMAP_INCLUDE });
    if (!record) throw ApiErrors.notFound(`Student roadmap ${id} not found`);
    if (record.user_id !== userId) throw ApiErrors.forbidden();
    return record;
  }

  async compute(record: any): Promise<ComputedRoadmap> {
    const structure = await this.structures.getStructure(record.version_id);
    const [deltas, results, bands] = await Promise.all([
      this.overlay.loadDeltas(record.id),
      this.overlay.loadResults(record.id),
      this.grading.getBands(),
    ]);
    const merged = mergeRoadmap(this.overlay.toBase(structure), deltas);
    const courses = await this.structures.getCourseBriefs(merged.nodes.map((n) => n.courseId));
    const courseInfo = new Map<number, CourseInfo>(
      [...courses.values()].map((c) => [
        c.id,
        {
          id: c.id,
          theoryCredits: c.theoryCredits,
          labCredits: c.labCredits,
          gradingMode: c.gradingMode,
          countsTowardGpa: c.countsTowardGpa,
          countsTowardCredits: c.countsTowardCredits,
        },
      ]),
    );
    const derived = deriveRoadmap({
      merged,
      courses: courseInfo,
      results,
      grades: bands.grades,
      classifications: bands.classifications,
      totalCredits: record.version.total_credits,
      cohortYear: record.version.cohort_year,
    });
    return { record, deltas, results, derived, courses };
  }

  async getView(id: number, userId: string): Promise<StudentRoadmapResponse> {
    const record = await this.loadOwned(id, userId);
    return this.toView(await this.compute(record));
  }

  async toView(computed: ComputedRoadmap): Promise<StudentRoadmapResponse> {
    const { derived, courses } = computed;
    return {
      ...(await this.toSummary(computed)),
      terms: derived.terms.map((t) => this.toTerm(t)),
      nodes: derived.nodes.map((n) => this.toNode(n, courses)),
      edges: derived.edges.map((e) => ({ ...e }) as any),
      hints: derived.hints.map((h) => ({ ...h })),
    };
  }

  async toSummary(computed: ComputedRoadmap): Promise<StudentRoadmapSummaryResponse> {
    const { record, derived } = computed;
    const newer = await this.prisma.rOADMAP_VERSIONS.findFirst({
      where: {
        roadmap_id: record.version.roadmap_id,
        cohort_year: record.version.cohort_year,
        status: RoadmapVersionStatusEnum.PUBLISHED,
        id: { not: record.version.id },
        revision_no: { gt: record.version.revision_no ?? 0 },
      },
      select: { id: true },
    });
    return {
      id: record.id,
      roadmapId: record.roadmap_id,
      majorName: record.roadmap.name,
      majorSlug: record.roadmap.slug,
      departmentName: record.roadmap.department?.name ?? '',
      version: {
        id: record.version.id,
        cohortYear: record.version.cohort_year,
        revisionNo: record.version.revision_no ?? undefined,
        totalCredits: record.version.total_credits,
        status: record.version.status,
      },
      status: record.status,
      revision: record.revision,
      summary: {
        creditsPassed: derived.summary.creditsPassed,
        totalCredits: derived.summary.totalCredits,
        plannedCredits: derived.summary.plannedCredits,
        progressPercent: derived.summary.progressPercent,
        gpa100: derived.summary.gpa100 ?? undefined,
        gpa4: derived.summary.gpa4 ?? undefined,
        classificationKey: derived.summary.classificationKey,
      },
      newerVersionId: newer?.id,
      updatedAt: record.updated_at.toISOString(),
    };
  }

  toTerm(t: DerivedTerm): MergedTermResponse {
    return {
      termKey: t.termKey,
      origin: t.origin as any,
      kind: t.kind as any,
      position: t.position,
      semesterNo: t.semesterNo ?? undefined,
      customLabel: t.customLabel ?? undefined,
      academicYear: t.academicYear ?? undefined,
      termInYear: (t.termInYear as any) ?? undefined,
      resolvedAcademicYear: t.resolvedAcademicYear ?? undefined,
      academicYearEstimated: t.academicYearEstimated,
      courseCredits: t.courseCredits,
      slotCredits: t.slotCredits,
      summary: t.summary ? this.toResultSummary(t.summary) : undefined,
      cumulative: t.cumulative ? this.toResultSummary(t.cumulative) : undefined,
    };
  }

  toNode(n: DerivedNode, courses: Map<number, CourseBriefResponse>): MergedNodeResponse {
    return {
      nodeKey: n.nodeKey,
      origin: n.origin as any,
      isModified: n.isModified,
      kind: n.kind as any,
      termKey: n.termKey,
      order: n.order,
      visualRow: n.visualRow,
      course: n.courseId !== null ? courses.get(n.courseId) : undefined,
      customCourse: n.custom ?? undefined,
      slot: n.slot
        ? {
            label: n.slot.label,
            theoryCredits: n.slot.theoryCredits,
            labCredits: n.slot.labCredits,
            electiveGroup: n.slot.electiveGroup ?? undefined,
          }
        : undefined,
      electiveGroup: n.electiveGroup ?? undefined,
      credits: n.credits,
      gradingMode: n.gradingMode as any,
      countsTowardGpa: n.countsTowardGpa,
      countsTowardCredits: n.countsTowardCredits,
      canHaveResult: n.canHaveResult,
      state: n.state as any,
      result: n.result ? this.toResult(n) : undefined,
    };
  }

  toResult(n: DerivedNode): CourseResultResponse {
    const r = n.result!;
    return {
      status: r.status as any,
      weightProcess: r.weightProcess ?? undefined,
      weightMidterm: r.weightMidterm ?? undefined,
      weightFinal: r.weightFinal ?? undefined,
      scoreProcess: r.scoreProcess ?? undefined,
      scoreMidterm: r.scoreMidterm ?? undefined,
      scoreFinal: r.scoreFinal ?? undefined,
      totalScore: r.totalScore ?? undefined,
      isPassed: r.isPassed ?? undefined,
      note: r.note ?? undefined,
      letter: n.letter,
      gradePoint: n.gradePoint,
    };
  }

  private toResultSummary(s: ResultsSummary): TermResultSummaryResponse {
    return {
      gpa100: s.gpa100 ?? undefined,
      gpa4: s.gpa4 ?? undefined,
      creditsPassed: s.creditsPassed,
      creditsInGpa: s.creditsInGpa,
      classificationKey: s.classificationKey,
    };
  }
}
