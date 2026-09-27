import { checkPlacement, findCycle } from '@iuroadmap/shared/roadmap-engine';
import type {
  CanvasEdgeResponse,
  CanvasNodeResponse,
  CanvasTermResponse,
  MergedTermResponse,
  RoadmapHintResponse,
  TermInYear,
} from '@iuroadmap/api-gen';
import { branchView, type CanvasEdgeView, type CanvasNodeView, type CanvasTermView } from '../../../components/semester-canvas';
import type { TranslationParams } from '../../../hooks/useTranslation';
import type { LearnerDoc } from '../hooks/useRoadmapEditor';

type T = (key: string, params?: TranslationParams) => string;

const SLOT_COLORS = { fill: '#FFFFFF', border: '#1E293B' };

/** "2025-2026" */
export function academicYearLabel(year: number): string {
  return `${year}-${year + 1}`;
}

/** "HK1 2025-2026" (FR-LRN.06): term in year + academic year; "~2025-2026" when estimated. */
export function termYearLabel(t: T, academicYear?: number | null, termInYear?: TermInYear | null, estimated?: boolean): string | undefined {
  if (academicYear === null || academicYear === undefined) return undefined;
  const year = academicYearLabel(academicYear);
  if (estimated) return t('roadmap.term.estimatedYear', { year });
  return termInYear ? t(`roadmap.term.inYear.${termInYear}`, { year }) : year;
}

export function learnerTermTitle(t: T, term: Pick<MergedTermResponse, 'kind' | 'semesterNo' | 'customLabel'>): string {
  if (term.customLabel) return term.customLabel;
  if (term.kind === 'SUMMER') return t('roadmap.term.summer');
  if (term.kind === 'ELECTIVE_POOL') return t('roadmap.term.electivePool');
  return t('roadmap.term.semester', { n: term.semesterNo ?? '?' });
}

/**
 * Hints (design §4.4, BR-LRN-12): never block, recomputed live while the learner edits, with the
 * same rules as the server (placement, cycle, failed prerequisite, credits short).
 */
export function computeHints(doc: LearnerDoc, totalCredits: number): RoadmapHintResponse[] {
  const hints: RoadmapHintResponse[] = [];
  for (const v of checkPlacement(
    doc.terms.map((t) => ({ key: t.termKey, kind: t.kind })),
    doc.nodes.map((n) => ({ key: n.nodeKey, termKey: n.termKey })),
    doc.edges.map((e) => ({ key: e.edgeKey, source: e.sourceKey, target: e.targetKey, type: e.type })),
  )) {
    hints.push({ code: 'PLACEMENT', nodeKeys: [v.source, v.target], edgeKeys: [v.edgeKey] });
  }
  const cycle = findCycle(
    doc.nodes.map((n) => n.nodeKey),
    doc.edges.map((e) => ({ source: e.sourceKey, target: e.targetKey })),
  );
  if (cycle) hints.push({ code: 'CYCLE', nodeKeys: cycle, edgeKeys: [] });
  const byKey = new Map(doc.nodes.map((n) => [n.nodeKey, n]));
  for (const e of doc.edges) {
    if (e.type !== 'PREREQUISITE') continue;
    const source = byKey.get(e.sourceKey);
    const target = byKey.get(e.targetKey);
    if (source?.state === 'FAILED' && target && target.state !== 'PASSED') {
      hints.push({ code: 'PREREQUISITE_FAILED', nodeKeys: [e.sourceKey, e.targetKey], edgeKeys: [e.edgeKey] });
    }
  }
  const planned = doc.terms.filter((t) => t.kind !== 'ELECTIVE_POOL').reduce((sum, t) => sum + t.courseCredits + t.slotCredits, 0);
  if (planned < totalCredits) hints.push({ code: 'CREDITS_SHORT', nodeKeys: [], edgeKeys: [], meta: { planned, required: totalCredits } });
  return hints;
}

export function buildLearnerCanvasViews(doc: LearnerDoc, hints: ReadonlyArray<RoadmapHintResponse>, t: T, showSummaries: boolean) {
  const hintNodes = new Set(hints.flatMap((h) => h.nodeKeys));
  const hintEdges = new Set(hints.flatMap((h) => h.edgeKeys));

  const terms: CanvasTermView[] = doc.terms.map((term) => {
    const summary = term.summary;
    return {
      key: term.termKey,
      kind: term.kind,
      title: learnerTermTitle(t, term),
      subtitle: term.kind === 'ELECTIVE_POOL' ? undefined : termYearLabel(t, term.resolvedAcademicYear, term.termInYear, term.academicYearEstimated),
      courseCredits: term.courseCredits,
      slotCredits: term.slotCredits,
      isCustom: term.origin === 'CUSTOM',
      footnote:
        showSummaries && summary && summary.gpa100 !== undefined && summary.gpa100 !== null
          ? t('roadmap.results.headerGpa', { gpa100: summary.gpa100.toFixed(1), gpa4: (summary.gpa4 ?? 0).toFixed(2) })
          : undefined,
    };
  });

  const nodes: CanvasNodeView[] = doc.nodes.map((n) => {
    const base = {
      key: n.nodeKey,
      termKey: n.termKey,
      order: n.order,
      isCustom: n.origin === 'CUSTOM',
      isModified: n.isModified,
      state: n.state,
      letter: n.result?.letter,
      hasHint: hintNodes.has(n.nodeKey),
      noCredit: !n.countsTowardCredits,
      branch: branchView(t, n.choiceGroup, n.condition, n.branchActive ?? null),
    };
    if (n.kind === 'ELECTIVE_SLOT' && n.slot) {
      const filled = Boolean(n.course);
      return {
        ...base,
        kind: 'ELECTIVE_SLOT' as const,
        code: n.course?.code ?? n.slot.label,
        name: n.course?.name ?? (n.slot.electiveGroup ? t('roadmap.canvas.slotGroup', { group: n.slot.electiveGroup }) : t('roadmap.canvas.freeElective')),
        theoryCredits: n.course?.theoryCredits ?? n.slot.theoryCredits,
        labCredits: n.course?.labCredits ?? n.slot.labCredits,
        fillColor: n.course?.fillColor ?? SLOT_COLORS.fill,
        borderColor: n.course?.borderColor ?? SLOT_COLORS.border,
        slotLabel: n.slot.label,
        slotFilled: filled,
      };
    }
    return {
      ...base,
      kind: 'COURSE' as const,
      code: n.course?.code ?? n.customCourse?.code ?? '?',
      name: n.course?.name ?? n.customCourse?.name ?? '',
      theoryCredits: n.course?.theoryCredits ?? n.customCourse?.theoryCredits ?? 0,
      labCredits: n.course?.labCredits ?? n.customCourse?.labCredits ?? 0,
      fillColor: n.course?.fillColor ?? '#F5F3FF',
      borderColor: n.course?.borderColor ?? '#7C3AED',
    };
  });

  const edges: CanvasEdgeView[] = doc.edges.map((e) => ({
    key: e.edgeKey,
    source: e.sourceKey,
    target: e.targetKey,
    type: e.type,
    isCustom: e.origin === 'CUSTOM',
    hasIssue: hintEdges.has(e.edgeKey),
  }));

  return { terms, nodes, edges };
}

/** Read-only views of a published curriculum (Explore preview). */
export function buildPreviewCanvasViews(
  source: { terms: CanvasTermResponse[]; nodes: CanvasNodeResponse[]; edges: CanvasEdgeResponse[] },
  t: T,
) {
  const terms: CanvasTermView[] = source.terms.map((term) => ({
    key: term.termKey,
    kind: term.kind,
    title: learnerTermTitle(t, { kind: term.kind, semesterNo: term.semesterNo }),
    courseCredits: term.courseCredits,
    slotCredits: term.slotCredits,
  }));
  const nodes: CanvasNodeView[] = source.nodes.map((n) =>
    n.kind === 'ELECTIVE_SLOT'
      ? {
          key: n.nodeKey,
          termKey: n.termKey,
          order: n.rowIndex,
          kind: 'ELECTIVE_SLOT',
          code: n.slotLabel ?? '',
          name: n.electiveGroup ? t('roadmap.canvas.slotGroup', { group: n.electiveGroup }) : t('roadmap.canvas.freeElective'),
          theoryCredits: n.slotTheoryCredits ?? 0,
          labCredits: n.slotLabCredits ?? 0,
          fillColor: SLOT_COLORS.fill,
          borderColor: SLOT_COLORS.border,
          slotLabel: n.slotLabel,
          slotFilled: false,
          branch: branchView(t, n.choiceGroup, n.condition),
        }
      : {
          key: n.nodeKey,
          termKey: n.termKey,
          order: n.rowIndex,
          kind: 'COURSE',
          code: n.course?.code ?? '?',
          name: n.electiveGroup ? `[${n.electiveGroup}] ${n.course?.name ?? ''}` : n.course?.name ?? '',
          theoryCredits: n.course?.theoryCredits ?? 0,
          labCredits: n.course?.labCredits ?? 0,
          fillColor: n.course?.fillColor ?? '#FFFFFF',
          borderColor: n.course?.borderColor ?? '#94A3B8',
          noCredit: n.course ? !n.course.countsTowardCredits : false,
          branch: branchView(t, n.choiceGroup, n.condition),
        },
  );
  const edges: CanvasEdgeView[] = source.edges.map((e) => ({ key: e.edgeKey, source: e.sourceKey, target: e.targetKey, type: e.type }));
  return { terms, nodes, edges };
}
