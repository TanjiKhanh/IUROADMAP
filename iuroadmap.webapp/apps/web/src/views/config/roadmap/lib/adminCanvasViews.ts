import { termCreditSummary, validateCurriculum, type CurriculumIssue, type CurriculumNodeInput } from '@iuroadmap/shared/roadmap-engine';
import { AppConstant } from '@iuroadmap/shared/constants';
import { branchView, type CanvasEdgeView, type CanvasNodeView, type CanvasTermView } from '../../../../components/semester-canvas';
import type { TranslationParams } from '../../../../hooks/useTranslation';
import { semesterNumbers, type EditorNode, type EditorState } from '../hooks/useCurriculumEditor';

type T = (key: string, params?: TranslationParams) => string;

/** Neutral colors of an elective slot (it has no category yet). */
export const SLOT_COLORS = { fill: '#FFFFFF', border: '#1E293B' };

export function nodeCredits(n: EditorNode): number {
  if (n.kind === 'ELECTIVE_SLOT') return (n.slotTheoryCredits ?? 0) + (n.slotLabCredits ?? 0);
  return n.course ? n.course.theoryCredits + n.course.labCredits : 0;
}

function toValidationNode(n: EditorNode): CurriculumNodeInput {
  return {
    key: n.nodeKey,
    termKey: n.termKey,
    kind: n.kind,
    courseId: n.course?.id ?? null,
    credits: nodeCredits(n),
    countsTowardCredits: n.kind === 'COURSE' ? n.course?.countsTowardCredits ?? true : true,
  };
}

/** Same validation as the publish endpoint (FR-RDM.04.4), run live on the unsaved canvas. */
export function validateEditorState(state: EditorState, totalCredits: number) {
  return validateCurriculum({
    terms: state.terms.map((t) => ({ key: t.termKey, kind: t.kind })),
    nodes: state.nodes.map(toValidationNode),
    edges: state.edges.map((e) => ({ key: e.edgeKey, source: e.sourceKey, target: e.targetKey, type: e.type })),
    totalCredits,
    maxCreditsPerTerm: AppConstant.Roadmap.MaxCreditsPerTerm,
  });
}

export function termTitle(t: T, kind: CanvasTermView['kind'], semesterNo?: number | null, customLabel?: string | null): string {
  if (customLabel) return customLabel;
  if (kind === 'SUMMER') return t('roadmap.term.summer');
  if (kind === 'ELECTIVE_POOL') return t('roadmap.term.electivePool');
  return t('roadmap.term.semester', { n: semesterNo ?? '?' });
}

export function buildAdminCanvasViews(state: EditorState, errors: ReadonlyArray<CurriculumIssue>, t: T) {
  const numbers = semesterNumbers(state.terms);
  const issueNodes = new Set(errors.flatMap((i) => i.nodeKeys));
  const issueEdges = new Set(errors.flatMap((i) => i.edgeKeys));

  const terms: CanvasTermView[] = state.terms.map((term) => {
    const inTerm = state.nodes.filter((n) => n.termKey === term.termKey).map(toValidationNode);
    const { courseCredits, slotCredits } = termCreditSummary({ key: term.termKey, kind: term.kind }, inTerm);
    return {
      key: term.termKey,
      kind: term.kind,
      title: termTitle(t, term.kind, numbers.get(term.termKey)),
      courseCredits,
      slotCredits,
    };
  });

  const nodes: CanvasNodeView[] = state.nodes.map((n) =>
    n.kind === 'ELECTIVE_SLOT'
      ? {
          key: n.nodeKey,
          termKey: n.termKey,
          order: n.order,
          kind: n.kind,
          code: n.slotLabel ?? '',
          name: n.electiveGroup ? t('roadmap.canvas.slotGroup', { group: n.electiveGroup }) : t('roadmap.canvas.freeElective'),
          theoryCredits: n.slotTheoryCredits ?? 0,
          labCredits: n.slotLabCredits ?? 0,
          fillColor: SLOT_COLORS.fill,
          borderColor: SLOT_COLORS.border,
          slotLabel: n.slotLabel,
          slotFilled: false,
          hasIssue: issueNodes.has(n.nodeKey),
          branch: branchView(t, n.choiceGroup, n.condition),
        }
      : {
          key: n.nodeKey,
          termKey: n.termKey,
          order: n.order,
          kind: n.kind,
          code: n.course?.code ?? '?',
          name: n.electiveGroup ? `[${n.electiveGroup}] ${n.course?.name ?? ''}` : n.course?.name ?? '',
          theoryCredits: n.course?.theoryCredits ?? 0,
          labCredits: n.course?.labCredits ?? 0,
          fillColor: n.course?.fillColor ?? '#FFFFFF',
          borderColor: n.course?.borderColor ?? '#94A3B8',
          hasIssue: issueNodes.has(n.nodeKey),
          noCredit: n.course ? !n.course.countsTowardCredits : false,
          branch: branchView(t, n.choiceGroup, n.condition),
        },
  );

  const edges: CanvasEdgeView[] = state.edges.map((e) => ({
    key: e.edgeKey,
    source: e.sourceKey,
    target: e.targetKey,
    type: e.type,
    hasIssue: issueEdges.has(e.edgeKey),
  }));

  return { terms, nodes, edges };
}
