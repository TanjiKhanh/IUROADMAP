/**
 * Conditional branches of a curriculum (FR-RDM.07.4, design §9.4), e.g. semester 8 of the CS
 * curriculum: `CUM_GPA100>=70` → Thesis, `CUM_GPA100<70` → Special Study 2 + electives.
 * Nodes of one branch share a `choice_group`; the condition is limited to the cumulative GPA
 * on the 100-point scale so it can be evaluated from the learner's results.
 */

export type BranchOperator = '>=' | '<';

export interface BranchCondition {
  metric: 'CUM_GPA100';
  operator: BranchOperator;
  /** 0..100 */
  threshold: number;
}

const PATTERN = /^\s*CUM_GPA100\s*(>=|<)\s*(\d{1,3}(?:\.\d+)?)\s*$/;
const MAX_THRESHOLD = 100;

/** Parses "CUM_GPA100>=70" / "CUM_GPA100 < 70"; null when the text is not a supported condition. */
export function parseBranchCondition(text: string | null | undefined): BranchCondition | null {
  if (!text) return null;
  const match = PATTERN.exec(text);
  if (!match) return null;
  const threshold = Number(match[2]);
  if (!Number.isFinite(threshold) || threshold < 0 || threshold > MAX_THRESHOLD) return null;
  return { metric: 'CUM_GPA100', operator: match[1] as BranchOperator, threshold };
}

/** Canonical text stored in ROADMAP_NODES.condition. */
export function formatBranchCondition(condition: BranchCondition): string {
  return `${condition.metric}${condition.operator}${condition.threshold}`;
}

/**
 * Whether the branch applies to a learner (FR-LRN.06.7). `null` while there is no GPA yet:
 * the branch is neither suggested nor ruled out.
 */
export function evaluateBranch(condition: BranchCondition | null, cumGpa100: number | null | undefined): boolean | null {
  if (!condition || cumGpa100 === null || cumGpa100 === undefined) return null;
  return condition.operator === '>=' ? cumGpa100 >= condition.threshold : cumGpa100 < condition.threshold;
}

/**
 * Checks the branch fields of one node: both set or both empty, and a supported condition.
 * Returns an error key, or null when valid.
 */
export function branchFieldsProblem(choiceGroup: string | null | undefined, condition: string | null | undefined): 'GROUP_WITHOUT_CONDITION' | 'CONDITION_WITHOUT_GROUP' | 'INVALID_CONDITION' | null {
  const hasGroup = Boolean(choiceGroup && choiceGroup.trim());
  const hasCondition = Boolean(condition && condition.trim());
  if (!hasGroup && !hasCondition) return null;
  if (hasGroup && !hasCondition) return 'GROUP_WITHOUT_CONDITION';
  if (!hasGroup && hasCondition) return 'CONDITION_WITHOUT_GROUP';
  return parseBranchCondition(condition) ? null : 'INVALID_CONDITION';
}
