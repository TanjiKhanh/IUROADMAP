import { parseBranchCondition } from '@iuroadmap/shared/roadmap-engine';
import type { TranslationParams } from '../../../hooks/useTranslation';

type T = (key: string, params?: TranslationParams) => string;

/** "GPA ≥ 70" / "GPA < 70" for a stored condition ("CUM_GPA100>=70"); the raw text when unknown. */
export function branchLabel(t: T, condition: string): string {
  const parsed = parseBranchCondition(condition);
  if (!parsed) return condition;
  return t(parsed.operator === '>=' ? 'roadmap.branch.gte' : 'roadmap.branch.lt', { n: parsed.threshold });
}

/** Canvas branch view of a node, or undefined when it is not in a branch. */
export function branchView(t: T, choiceGroup?: string | null, condition?: string | null, active?: boolean | null) {
  if (!choiceGroup || !condition) return undefined;
  return { key: `${choiceGroup}|${condition}`, label: branchLabel(t, condition), active };
}
