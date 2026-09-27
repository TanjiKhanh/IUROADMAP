import { Injectable } from '@nestjs/common';
import { ErrorCodes, computeTotal, isValidScore, isValidWeights, resolveOffering } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors } from '../../../common/api-errors';
import { CourseResultStatusEnum, GradingModeEnum, OfferingStatusEnum, StudentRoadmapStatusEnum } from '../../../common/enums';
import { ComputedRoadmap, MergedViewService } from './merged-view.service';
import { OverlayRepository } from './overlay.repository';
import { TermResultItemRequest, TermResultRowResponse, TermResultsResponse, TermResultsSaveRequest } from '../dto/term-result';

/** Semester results drawer: click a term header to enter scores (FL-LRN-05). */
@Injectable()
export class TermResultsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly views: MergedViewService,
    private readonly overlay: OverlayRepository,
  ) {}

  async get(userId: string, id: number, termKey: string): Promise<TermResultsResponse> {
    const record = await this.views.loadOwned(id, userId);
    return this.build(await this.views.compute(record), termKey);
  }

  async save(userId: string, id: number, termKey: string, dto: TermResultsSaveRequest): Promise<TermResultsResponse> {
    const record = await this.views.loadOwned(id, userId);
    const computed = await this.views.compute(record);
    const term = computed.derived.terms.find((t) => t.termKey === termKey);
    if (!term) throw ApiErrors.notFound(`Term ${termKey} not found`);
    if (term.kind === 'ELECTIVE_POOL') {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_OPERATION, 'Results cannot be entered in the elective pool');
    }
    const nodes = new Map(computed.derived.nodes.filter((n) => n.termKey === termKey).map((n) => [n.nodeKey, n]));

    await this.prisma.$transaction(async (tx) => {
      await this.overlay.bumpRevision(tx, id, dto.revision);
      for (const item of dto.items) {
        const node = nodes.get(item.nodeKey);
        if (!node) throw ApiErrors.badRequest(ErrorCodes.NODE_NOT_IN_TERM, 'The course is not in this term', { nodeKey: item.nodeKey });
        if (!node.canHaveResult) {
          throw ApiErrors.badRequest(ErrorCodes.INVALID_OPERATION, 'Choose a course for the elective slot first', { nodeKey: item.nodeKey });
        }
        const where = { student_roadmap_id_node_key: { student_roadmap_id: id, node_key: item.nodeKey } };
        if (item.remove) {
          await tx.sTUDENT_COURSE_RESULTS.deleteMany({ where: { student_roadmap_id: id, node_key: item.nodeKey } });
          continue;
        }
        const data = node.gradingMode === GradingModeEnum.PASS_FAIL ? this.passFailRow(item) : this.scoreRow(item);
        await tx.sTUDENT_COURSE_RESULTS.upsert({
          where,
          create: { student_roadmap_id: id, node_key: item.nodeKey, ...data },
          update: data,
        });
      }
    });

    const refreshed = await this.views.compute(await this.views.loadOwned(id, userId));
    await this.updateCompletion(refreshed);
    return this.build(refreshed, termKey);
  }

  /** PASS_FAIL: only P / F (Intensive English), no scores (FR-LRN.05.12). */
  private passFailRow(item: TermResultItemRequest) {
    const isPassed = item.isPassed ?? null;
    return {
      status: isPassed === null ? CourseResultStatusEnum.IN_PROGRESS : CourseResultStatusEnum.GRADED,
      is_passed: isPassed,
      weight_process: null,
      weight_midterm: null,
      weight_final: null,
      score_process: null,
      score_midterm: null,
      score_final: null,
      total_score: null,
      note: item.note ?? null,
    };
  }

  /** SCORE: total = round_half_up(Σ w·s / 100) when complete, otherwise the typed total (FR-LRN.05.2–05.5). */
  private scoreRow(item: TermResultItemRequest) {
    const weights: [number | null, number | null, number | null] = [
      item.weightProcess ?? null,
      item.weightMidterm ?? null,
      item.weightFinal ?? null,
    ];
    const scores: [number | null, number | null, number | null] = [
      item.scoreProcess ?? null,
      item.scoreMidterm ?? null,
      item.scoreFinal ?? null,
    ];
    if (!isValidWeights(weights)) throw ApiErrors.badRequest(ErrorCodes.INVALID_WEIGHTS, 'Weights must be all empty or sum to 100', { nodeKey: item.nodeKey });
    if (!scores.every(isValidScore)) throw ApiErrors.badRequest(ErrorCodes.INVALID_SCORE, 'Scores must be 0–100 with one decimal', { nodeKey: item.nodeKey });

    const computed = computeTotal(weights, scores);
    const total = computed ?? item.totalScore ?? null;
    const status =
      total !== null ? CourseResultStatusEnum.GRADED : item.status === CourseResultStatusEnum.GRADED ? CourseResultStatusEnum.IN_PROGRESS : item.status ?? CourseResultStatusEnum.IN_PROGRESS;
    return {
      status,
      is_passed: null,
      weight_process: weights[0],
      weight_midterm: weights[1],
      weight_final: weights[2],
      score_process: scores[0],
      score_midterm: scores[1],
      score_final: scores[2],
      total_score: total,
      note: item.note ?? null,
    };
  }

  private async build(computed: ComputedRoadmap, termKey: string): Promise<TermResultsResponse> {
    const term = computed.derived.terms.find((t) => t.termKey === termKey);
    if (!term) throw ApiErrors.notFound(`Term ${termKey} not found`);
    const nodes = computed.derived.nodes
      .filter((n) => n.termKey === termKey)
      .sort((a, b) => a.visualRow - b.visualRow);

    const courseIds = nodes.map((n) => n.courseId).filter((c): c is number => c !== null);
    const offerings = courseIds.length
      ? await this.prisma.cOURSE_OFFERINGS.findMany({
          where: { course_id: { in: courseIds }, status: OfferingStatusEnum.PUBLISHED },
          select: { id: true, course_id: true, academic_year: true, status: true, weight_process: true, weight_midterm: true, weight_final: true },
        })
      : [];

    const rows: TermResultRowResponse[] = nodes.map((n) => {
      const course = n.courseId !== null ? computed.courses.get(n.courseId) : undefined;
      const offering = n.courseId
        ? resolveOffering(
            offerings
              .filter((o) => o.course_id === n.courseId)
              .map((o) => ({ ...o, academicYear: o.academic_year, status: o.status as 'DRAFT' | 'PUBLISHED' })),
            term.resolvedAcademicYear,
          )
        : null;
      return {
        nodeKey: n.nodeKey,
        courseId: course?.id,
        code: course?.code ?? n.custom?.code ?? n.slot?.label ?? '',
        name: course?.name ?? n.custom?.name ?? n.slot?.label ?? '',
        credits: n.credits,
        gradingMode: n.gradingMode as any,
        countsTowardGpa: n.countsTowardGpa,
        countsTowardCredits: n.countsTowardCredits,
        editable: n.canHaveResult,
        defaultWeightProcess: offering?.weight_process ?? undefined,
        defaultWeightMidterm: offering?.weight_midterm ?? undefined,
        defaultWeightFinal: offering?.weight_final ?? undefined,
        state: n.state as any,
        result: n.result ? this.views.toResult(n) : undefined,
      };
    });

    return { revision: computed.record.revision, term: this.views.toTerm(term), rows };
  }

  /**
   * FR-LRN.06.6 (Should): COMPLETED when enough credits are passed and every required curriculum
   * course (not a slot, not in the pool) is PASSED; back to ENROLLED otherwise. DROPPED is kept.
   */
  private async updateCompletion(computed: ComputedRoadmap): Promise<void> {
    const { record, derived } = computed;
    if (record.status === StudentRoadmapStatusEnum.DROPPED) return;
    const poolTerms = new Set(derived.terms.filter((t) => t.kind === 'ELECTIVE_POOL').map((t) => t.termKey));
    const required = derived.nodes.filter((n) => n.origin === 'BASE' && n.kind === 'COURSE' && !poolTerms.has(n.termKey));
    const done = derived.summary.creditsPassed >= derived.summary.totalCredits && required.every((n) => n.state === 'PASSED');
    const next = done ? StudentRoadmapStatusEnum.COMPLETED : StudentRoadmapStatusEnum.ENROLLED;
    if (next !== record.status) {
      await this.prisma.sTUDENT_ROADMAPS.update({ where: { id: record.id }, data: { status: next } });
    }
  }
}
