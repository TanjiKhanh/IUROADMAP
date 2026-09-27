// Shapes of the seed rows (see ../seed.ts for how each one is written to the database).

export type MajorSeed = { slug: string; name: string; description: string; departmentSlug: string };

export type CourseSeed = {
  code: string;
  name: string;
  theory: number;
  lab: number;
  /** CATEGORIES code */
  category: string;
  gradingMode?: 'SCORE' | 'PASS_FAIL';
  countsTowardGpa?: boolean;
  countsTowardCredits?: boolean;
};

export type OfferingSeed = {
  courseCode: string;
  academicYear: number;
  hasProject: boolean;
  projectDescription: string;
  studentGuide: string;
};

export type TermSeed = { key: string; kind: 'REGULAR' | 'SUMMER' | 'ELECTIVE_POOL'; semesterNo?: number };

export type NodeSeed = {
  /** TermSeed.key; a number n means semester n */
  term: number | string;
  row: number;
  course?: string;
  slot?: { label: string; theory: number; lab: number; group: string | null };
  electiveGroup?: string;
  /** Conditional branch (FR-RDM.07.4): nodes of one branch share choiceGroup */
  branch?: { choiceGroup: string; condition: string };
};

export type EdgeSeed = [string, string, 'PREREQUISITE' | 'PREVIOUS' | 'COREQUISITE'];

/** One published curriculum version of a major, laid out as on the handbook chart */
export type CurriculumSeed = {
  majorSlug: string;
  cohortYear: number;
  totalCredits: number;
  decisionRef: string;
  terms: TermSeed[];
  nodes: NodeSeed[];
  edges: EdgeSeed[];
};

/** Semesters 1..count followed by the elective pool (keys '1'..'n' and 'POOL'). */
export function regularTerms(count: number): TermSeed[] {
  const terms: TermSeed[] = [];
  for (let s = 1; s <= count; s++) terms.push({ key: String(s), kind: 'REGULAR', semesterNo: s });
  terms.push({ key: 'POOL', kind: 'ELECTIVE_POOL' });
  return terms;
}
