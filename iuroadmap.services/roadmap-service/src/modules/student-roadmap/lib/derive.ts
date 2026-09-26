import {
  ClassificationBand,
  CourseGradingMode,
  CourseResultInput,
  GradeBand,
  ResultsSummary,
  checkPlacement,
  estimateAcademicYear,
  evaluateResult,
  findCycle,
  layoutColumn,
  progressPercent,
  summarizeResults,
} from '@iuroadmap/shared';
import { MergedNode, MergedRoadmap, MergedTerm } from './overlay-types';

export interface CourseInfo {
  id: number;
  theoryCredits: number;
  labCredits: number;
  gradingMode: CourseGradingMode;
  countsTowardGpa: boolean;
  countsTowardCredits: boolean;
}

export interface ResultRow {
  nodeKey: string;
  status: 'IN_PROGRESS' | 'GRADED';
  weightProcess: number | null;
  weightMidterm: number | null;
  weightFinal: number | null;
  scoreProcess: number | null;
  scoreMidterm: number | null;
  scoreFinal: number | null;
  totalScore: number | null;
  isPassed: boolean | null;
  note: string | null;
}

export type NodeState = 'PLANNED' | 'IN_PROGRESS' | 'PASSED' | 'FAILED';
export type HintCode = 'PLACEMENT' | 'CYCLE' | 'PREREQUISITE_FAILED' | 'CREDITS_SHORT';

export interface DerivedNode extends MergedNode {
  visualRow: number;
  credits: number;
  gradingMode: CourseGradingMode;
  countsTowardGpa: boolean;
  countsTowardCredits: boolean;
  /** An unfilled elective slot cannot hold a result */
  canHaveResult: boolean;
  state: NodeState;
  letter?: string;
  gradePoint?: number;
  result?: ResultRow;
}

export interface DerivedTerm extends MergedTerm {
  /** Explicit academic year, or estimated from the cohort year for curriculum semesters */
  resolvedAcademicYear: number | null;
  academicYearEstimated: boolean;
  courseCredits: number;
  slotCredits: number;
  summary: ResultsSummary | null;
  cumulative: ResultsSummary | null;
}

export interface Hint {
  code: HintCode;
  nodeKeys: string[];
  edgeKeys: string[];
  meta?: Record<string, number>;
}

export interface DerivedSummary {
  creditsPassed: number;
  totalCredits: number;
  plannedCredits: number;
  progressPercent: number;
  gpa100: number | null;
  gpa4: number | null;
  classificationKey?: string;
}

export interface DerivedRoadmap {
  terms: DerivedTerm[];
  nodes: DerivedNode[];
  edges: MergedRoadmap['edges'];
  hints: Hint[];
  summary: DerivedSummary;
}

export interface DeriveInput {
  merged: MergedRoadmap;
  courses: ReadonlyMap<number, CourseInfo>;
  results: ReadonlyMap<string, ResultRow>;
  grades: ReadonlyArray<GradeBand>;
  classifications: ReadonlyArray<ClassificationBand>;
  totalCredits: number;
  cohortYear: number;
}

/**
 * Everything the learner sees that is not stored (design §6.1 rule 3): node state, displayed
 * row, credits per term, GPA per term and cumulative, hints and % progress.
 */
export function deriveRoadmap(input: DeriveInput): DerivedRoadmap {
  const { merged, courses, results, grades, classifications } = input;

  const rows = new Map<string, number>();
  for (const term of merged.terms) {
    const inTerm = merged.nodes.filter((n) => n.termKey === term.termKey).map((n) => ({ key: n.nodeKey, order: n.order }));
    for (const [key, row] of layoutColumn(inTerm)) rows.set(key, row);
  }

  const nodes: DerivedNode[] = merged.nodes.map((n) => {
    const course = n.courseId !== null ? courses.get(n.courseId) : undefined;
    const credits = course
      ? course.theoryCredits + course.labCredits
      : n.custom
        ? n.custom.theoryCredits + n.custom.labCredits
        : n.slot
          ? n.slot.theoryCredits + n.slot.labCredits
          : 0;
    const canHaveResult = n.courseId !== null || n.custom !== null;
    const derived: DerivedNode = {
      ...n,
      visualRow: rows.get(n.nodeKey) ?? 0,
      credits,
      gradingMode: course?.gradingMode ?? 'SCORE',
      countsTowardGpa: course?.countsTowardGpa ?? true,
      countsTowardCredits: course?.countsTowardCredits ?? true,
      canHaveResult,
      state: 'PLANNED',
    };
    const result = results.get(n.nodeKey);
    if (result && canHaveResult) {
      const evaluated = evaluateResult(toResultInput(derived, result), grades);
      derived.result = result;
      derived.state = evaluated.state;
      derived.letter = evaluated.letter;
      derived.gradePoint = evaluated.gradePoint;
    }
    return derived;
  });
  const nodeByKey = new Map(nodes.map((n) => [n.nodeKey, n]));

  const terms: DerivedTerm[] = [];
  const cumulativeInputs: CourseResultInput[] = [];
  let plannedCredits = 0;
  for (const term of merged.terms) {
    const inTerm = nodes.filter((n) => n.termKey === term.termKey);
    const isPool = term.kind === 'ELECTIVE_POOL';
    let courseCredits = 0;
    let slotCredits = 0;
    const termInputs: CourseResultInput[] = [];
    if (!isPool) {
      for (const n of inTerm) {
        if (!n.countsTowardCredits) continue;
        if (n.canHaveResult) courseCredits += n.credits;
        else slotCredits += n.credits;
      }
      plannedCredits += courseCredits + slotCredits;
      for (const n of inTerm) {
        if (n.result) termInputs.push(toResultInput(n, n.result));
      }
      cumulativeInputs.push(...termInputs);
    }
    const explicitYear = term.academicYear;
    const estimated = explicitYear === null && term.origin === 'BASE' ? estimateAcademicYear(input.cohortYear, term.semesterNo) : null;
    terms.push({
      ...term,
      resolvedAcademicYear: explicitYear ?? (term.kind === 'ELECTIVE_POOL' ? null : estimated),
      academicYearEstimated: explicitYear === null && estimated !== null && term.kind !== 'ELECTIVE_POOL',
      courseCredits,
      slotCredits,
      summary: isPool ? null : summarizeResults(termInputs, grades, classifications),
      cumulative: isPool ? null : summarizeResults(cumulativeInputs, grades, classifications),
    });
  }

  const overall = summarizeResults(cumulativeInputs, grades, classifications);
  const hints: Hint[] = [];
  for (const v of checkPlacement(
    merged.terms.map((t) => ({ key: t.termKey, kind: t.kind })),
    merged.nodes.map((n) => ({ key: n.nodeKey, termKey: n.termKey })),
    merged.edges.map((e) => ({ key: e.edgeKey, source: e.sourceKey, target: e.targetKey, type: e.type })),
  )) {
    hints.push({ code: 'PLACEMENT', nodeKeys: [v.source, v.target], edgeKeys: [v.edgeKey] });
  }
  const cycle = findCycle(
    merged.nodes.map((n) => n.nodeKey),
    merged.edges.map((e) => ({ source: e.sourceKey, target: e.targetKey })),
  );
  if (cycle) hints.push({ code: 'CYCLE', nodeKeys: cycle, edgeKeys: [] });
  for (const e of merged.edges) {
    if (e.type !== 'PREREQUISITE') continue;
    const source = nodeByKey.get(e.sourceKey);
    const target = nodeByKey.get(e.targetKey);
    if (source?.state === 'FAILED' && target && target.state !== 'PASSED') {
      hints.push({ code: 'PREREQUISITE_FAILED', nodeKeys: [e.sourceKey, e.targetKey], edgeKeys: [e.edgeKey] });
    }
  }
  if (plannedCredits < input.totalCredits) {
    hints.push({ code: 'CREDITS_SHORT', nodeKeys: [], edgeKeys: [], meta: { planned: plannedCredits, required: input.totalCredits } });
  }

  return {
    terms,
    nodes,
    edges: merged.edges,
    hints,
    summary: {
      creditsPassed: overall.creditsPassed,
      totalCredits: input.totalCredits,
      plannedCredits,
      progressPercent: progressPercent(overall.creditsPassed, input.totalCredits),
      gpa100: overall.gpa100,
      gpa4: overall.gpa4,
      classificationKey: overall.classificationKey,
    },
  };
}

export function toResultInput(
  node: Pick<DerivedNode, 'credits' | 'gradingMode' | 'countsTowardGpa' | 'countsTowardCredits'>,
  result: ResultRow,
): CourseResultInput {
  return {
    credits: node.credits,
    gradingMode: node.gradingMode,
    countsTowardGpa: node.countsTowardGpa,
    countsTowardCredits: node.countsTowardCredits,
    status: result.status,
    totalScore: result.totalScore,
    isPassed: result.isPassed,
  };
}
