import { CourseGradingMode } from './types';

/**
 * Grade computation (design §9). All numbers use the 100-point scale for scores and
 * the 4-point scale for grade points. Letters, points and PASSED/FAILED are always
 * derived at read time from GRADE_SCALES, never stored.
 */

export interface GradeBand {
  letter: string;
  /** inclusive */
  minScore: number;
  /** inclusive */
  maxScore: number;
  gradePoint: number;
  isPassing: boolean;
}

/**
 * Academic classification is decided on the 100-point GPA (IU handbook: Excellent 90–100,
 * Very good 80–<90, Good 70–<80, Average good 60–<70, Ordinary 50–<60).
 */
export interface ClassificationBand {
  labelKey: string;
  /** inclusive, 100-point scale */
  minGpa100: number;
  /** exclusive, except for the highest band which includes its max */
  maxGpa100: number;
}

export type Weights = [number | null, number | null, number | null];
export type ComponentScores = [number | null, number | null, number | null];

export const MAX_SCORE = 100;
export const WEIGHT_TOTAL = 100;

/** Half-up rounding that is safe against binary floating error (77.5 → 78, 73.88 → 73.9). */
export function roundHalfUp(value: number, decimals = 0): number {
  const factor = 10 ** decimals;
  const shifted = value * factor;
  const rounded = Math.floor(shifted + 0.5 + 1e-9);
  return rounded / factor;
}

/** Weights are valid when all three are empty, or each is 0..100 and they sum to 100. */
export function isValidWeights(weights: Weights): boolean {
  const filled = weights.filter((w) => w !== null && w !== undefined);
  if (filled.length === 0) return true;
  if (filled.length !== 3) return false;
  if (filled.some((w) => !Number.isInteger(w) || (w as number) < 0 || (w as number) > WEIGHT_TOTAL)) return false;
  return (filled as number[]).reduce((s, w) => s + w, 0) === WEIGHT_TOTAL;
}

/** A component score is valid when empty, or within 0..100 with at most one decimal. */
export function isValidScore(score: number | null | undefined): boolean {
  if (score === null || score === undefined) return true;
  if (score < 0 || score > MAX_SCORE) return false;
  return Math.abs(Math.round(score * 10) - score * 10) < 1e-9;
}

/**
 * total = round_half_up(Σ wᵢ·sᵢ / 100) when the three weights and the three scores are set.
 * Computed on integers (scores × 10) to avoid floating error. Returns null otherwise.
 */
export function computeTotal(weights: Weights, scores: ComponentScores): number | null {
  if (weights.some((w) => w === null || w === undefined)) return null;
  if (scores.some((s) => s === null || s === undefined)) return null;
  if (!isValidWeights(weights)) return null;
  let numerator = 0;
  for (let i = 0; i < 3; i++) {
    numerator += (weights[i] as number) * Math.round((scores[i] as number) * 10);
  }
  // numerator / 1000 is the exact weighted average
  return Math.floor((numerator + 500) / 1000);
}

export function lookupGrade(bands: ReadonlyArray<GradeBand>, total: number): GradeBand | undefined {
  return bands.find((b) => total >= b.minScore && total <= b.maxScore);
}

export function lookupClassification(
  bands: ReadonlyArray<ClassificationBand>,
  gpa100: number | null,
): ClassificationBand | undefined {
  if (gpa100 === null) return undefined;
  const top = bands.reduce<ClassificationBand | undefined>(
    (best, b) => (!best || b.maxGpa100 > best.maxGpa100 ? b : best),
    undefined,
  );
  return bands.find(
    (b) => gpa100 >= b.minGpa100 && (gpa100 < b.maxGpa100 || (b === top && gpa100 <= b.maxGpa100)),
  );
}

/**
 * Checks GRADE_SCALES: bands cover 0..100 on integers with no overlap and no gap (BR-RM-14).
 * Returns a list of problems (empty = valid).
 */
export function validateGradeBands(bands: ReadonlyArray<GradeBand>): string[] {
  const problems: string[] = [];
  const sorted = [...bands].sort((a, b) => a.minScore - b.minScore);
  let expected = 0;
  for (const b of sorted) {
    if (b.minScore > b.maxScore) problems.push(`${b.letter}: min > max`);
    if (b.minScore > expected) problems.push(`gap ${expected}..${b.minScore - 1}`);
    if (b.minScore < expected) problems.push(`${b.letter} overlaps the previous band`);
    expected = Math.max(expected, b.maxScore + 1);
  }
  if (expected <= MAX_SCORE) problems.push(`gap ${expected}..${MAX_SCORE}`);
  if (expected > MAX_SCORE + 1) problems.push(`exceeds ${MAX_SCORE}`);
  return problems;
}

/** Checks ACADEMIC_CLASSIFICATIONS: bands cover 0..100 (GPA 100) with no overlap and no gap. */
export function validateClassificationBands(bands: ReadonlyArray<ClassificationBand>): string[] {
  const problems: string[] = [];
  const sorted = [...bands].sort((a, b) => a.minGpa100 - b.minGpa100);
  let expected = 0;
  for (const b of sorted) {
    if (b.minGpa100 >= b.maxGpa100) problems.push(`${b.labelKey}: min >= max`);
    if (Math.abs(b.minGpa100 - expected) > 1e-9) problems.push(`${b.labelKey}: expected to start at ${expected}`);
    expected = b.maxGpa100;
  }
  if (Math.abs(expected - MAX_SCORE) > 1e-9) problems.push(`must end at ${MAX_SCORE}`);
  return problems;
}

export type EvaluatedState = 'IN_PROGRESS' | 'PASSED' | 'FAILED';

export interface CourseResultInput {
  /** theory + lab */
  credits: number;
  gradingMode: CourseGradingMode;
  countsTowardGpa: boolean;
  countsTowardCredits: boolean;
  status: 'IN_PROGRESS' | 'GRADED';
  totalScore?: number | null;
  /** PASS_FAIL only */
  isPassed?: boolean | null;
}

export interface EvaluatedResult {
  state: EvaluatedState;
  /** 'P' / 'F' for PASS_FAIL */
  letter?: string;
  gradePoint?: number;
}

export function evaluateResult(
  result: CourseResultInput,
  bands: ReadonlyArray<GradeBand>,
): EvaluatedResult {
  if (result.gradingMode === 'PASS_FAIL') {
    if (result.isPassed === true) return { state: 'PASSED', letter: 'P' };
    if (result.isPassed === false) return { state: 'FAILED', letter: 'F' };
    return { state: 'IN_PROGRESS' };
  }
  if (result.status !== 'GRADED' || result.totalScore === null || result.totalScore === undefined) {
    return { state: 'IN_PROGRESS' };
  }
  const band = lookupGrade(bands, result.totalScore);
  if (!band) return { state: 'IN_PROGRESS' };
  return {
    state: band.isPassing ? 'PASSED' : 'FAILED',
    letter: band.letter,
    gradePoint: band.gradePoint,
  };
}

export interface ResultsSummary {
  /** Weighted average on the 100 scale, 1 decimal; null when nothing counts */
  gpa100: number | null;
  /** Weighted average on the 4 scale, 2 decimals */
  gpa4: number | null;
  /** Credits of PASSED courses that count toward graduation */
  creditsPassed: number;
  /** Credits used in the GPA denominator */
  creditsInGpa: number;
  classificationKey?: string;
}

/**
 * Semester or cumulative summary (FR-LRN.06.1/06.2, BR-LRN-13).
 * - GPA uses SCORE courses with countsTowardGpa and a total, **including failed ones**.
 * - Credits passed use PASSED courses with countsTowardCredits (PASS_FAIL included).
 */
export function summarizeResults(
  results: ReadonlyArray<CourseResultInput>,
  bands: ReadonlyArray<GradeBand>,
  classifications: ReadonlyArray<ClassificationBand> = [],
): ResultsSummary {
  let weighted100 = 0;
  let weighted4 = 0;
  let creditsInGpa = 0;
  let creditsPassed = 0;

  for (const r of results) {
    const evaluated = evaluateResult(r, bands);
    if (evaluated.state === 'PASSED' && r.countsTowardCredits) creditsPassed += r.credits;
    if (
      r.gradingMode === 'SCORE' &&
      r.countsTowardGpa &&
      evaluated.state !== 'IN_PROGRESS' &&
      r.totalScore !== null &&
      r.totalScore !== undefined &&
      evaluated.gradePoint !== undefined
    ) {
      weighted100 += r.totalScore * r.credits;
      weighted4 += evaluated.gradePoint * r.credits;
      creditsInGpa += r.credits;
    }
  }

  const gpa100 = creditsInGpa ? roundHalfUp(weighted100 / creditsInGpa, 1) : null;
  const gpa4 = creditsInGpa ? roundHalfUp(weighted4 / creditsInGpa, 2) : null;
  return {
    gpa100,
    gpa4,
    creditsPassed,
    creditsInGpa,
    classificationKey: lookupClassification(classifications, gpa100)?.labelKey,
  };
}

/** % progress (BR-LRN-04): not capped at 100 because learners may take extra credits. */
export function progressPercent(creditsPassed: number, totalCredits: number): number {
  if (!totalCredits || totalCredits <= 0) return 0;
  return Math.floor((creditsPassed / totalCredits) * 100);
}
