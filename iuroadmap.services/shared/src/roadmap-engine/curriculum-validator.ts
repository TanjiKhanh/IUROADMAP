import { findCycle } from './graph';
import { checkPlacement } from './placement';
import { EngineEdge, EngineTerm, RoadmapNodeKind } from './types';

export type CurriculumIssueSeverity = 'ERROR' | 'WARNING';

export type CurriculumIssueCode =
  | 'CYCLE'
  | 'PLACEMENT'
  | 'COURSE_MISSING'
  | 'SLOT_CREDITS_MISSING'
  | 'EMPTY_CURRICULUM'
  | 'TOTAL_CREDITS_MISMATCH'
  | 'TERM_CREDITS_EXCEEDED';

export interface CurriculumIssue {
  code: CurriculumIssueCode;
  severity: CurriculumIssueSeverity;
  nodeKeys: string[];
  edgeKeys: string[];
  termKey?: string;
  /** Numbers for the UI message, e.g. { expected: 140, actual: 138 } */
  meta?: Record<string, number>;
}

export interface CurriculumNodeInput {
  key: string;
  termKey: string;
  kind: RoadmapNodeKind;
  /** COURSE: the linked course id (null when missing) */
  courseId?: number | null;
  /** COURSE: theory + lab of the course; ELECTIVE_SLOT: theory + lab of the slot */
  credits: number | null;
  /** false for courses such as Intensive English (not counted toward graduation) */
  countsTowardCredits?: boolean;
}

export interface CurriculumValidationInput {
  /** Terms in left-to-right order */
  terms: ReadonlyArray<EngineTerm>;
  nodes: ReadonlyArray<CurriculumNodeInput>;
  edges: ReadonlyArray<EngineEdge>;
  totalCredits: number;
  maxCreditsPerTerm: number;
}

export interface CurriculumValidationResult {
  errors: CurriculumIssue[];
  warnings: CurriculumIssue[];
}

export interface TermCreditSummary {
  /** x in "Semester n (x+y)": credits of concrete courses */
  courseCredits: number;
  /** y in "Semester n (x+y)": credits of elective slots */
  slotCredits: number;
}

/** Header numbers of one column. ELECTIVE_POOL columns always return 0 + 0. */
export function termCreditSummary(
  term: EngineTerm,
  nodesInTerm: ReadonlyArray<CurriculumNodeInput>,
): TermCreditSummary {
  if (term.kind === 'ELECTIVE_POOL') return { courseCredits: 0, slotCredits: 0 };
  let courseCredits = 0;
  let slotCredits = 0;
  for (const n of nodesInTerm) {
    if (n.countsTowardCredits === false) continue;
    const c = n.credits ?? 0;
    if (n.kind === 'ELECTIVE_SLOT') slotCredits += c;
    else courseCredits += c;
  }
  return { courseCredits, slotCredits };
}

/**
 * Full validation run before publishing a curriculum (FR-RDM.04.4, BR-RM-09).
 * Errors block publishing; warnings must be acknowledged by the admin.
 */
export function validateCurriculum(input: CurriculumValidationInput): CurriculumValidationResult {
  const errors: CurriculumIssue[] = [];
  const warnings: CurriculumIssue[] = [];
  const { terms, nodes, edges } = input;

  if (nodes.length === 0) {
    errors.push({ code: 'EMPTY_CURRICULUM', severity: 'ERROR', nodeKeys: [], edgeKeys: [] });
  }

  const cycle = findCycle(nodes.map((n) => n.key), edges);
  if (cycle) {
    errors.push({ code: 'CYCLE', severity: 'ERROR', nodeKeys: cycle, edgeKeys: [] });
  }

  for (const v of checkPlacement(terms, nodes, edges)) {
    errors.push({ code: 'PLACEMENT', severity: 'ERROR', nodeKeys: [v.source, v.target], edgeKeys: [v.edgeKey] });
  }

  for (const n of nodes) {
    if (n.kind === 'COURSE' && (n.courseId === null || n.courseId === undefined)) {
      errors.push({ code: 'COURSE_MISSING', severity: 'ERROR', nodeKeys: [n.key], edgeKeys: [] });
    }
    if (n.kind === 'ELECTIVE_SLOT' && (!n.credits || n.credits <= 0)) {
      errors.push({ code: 'SLOT_CREDITS_MISSING', severity: 'ERROR', nodeKeys: [n.key], edgeKeys: [] });
    }
  }

  let planned = 0;
  for (const term of terms) {
    if (term.kind === 'ELECTIVE_POOL') continue;
    const inTerm = nodes.filter((n) => n.termKey === term.key);
    const { courseCredits, slotCredits } = termCreditSummary(term, inTerm);
    const termTotal = courseCredits + slotCredits;
    planned += termTotal;
    if (termTotal > input.maxCreditsPerTerm) {
      warnings.push({
        code: 'TERM_CREDITS_EXCEEDED',
        severity: 'WARNING',
        nodeKeys: inTerm.map((n) => n.key),
        edgeKeys: [],
        termKey: term.key,
        meta: { actual: termTotal, max: input.maxCreditsPerTerm },
      });
    }
  }

  if (nodes.length > 0 && planned !== input.totalCredits) {
    warnings.push({
      code: 'TOTAL_CREDITS_MISMATCH',
      severity: 'WARNING',
      nodeKeys: [],
      edgeKeys: [],
      meta: { expected: input.totalCredits, actual: planned },
    });
  }

  return { errors, warnings };
}
