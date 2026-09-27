// Seed data for roadmap-service (imported by seed.ts and by unit tests).
// See seed.ts for the sources of each block.

// ─── Master data ───────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { code: 'MAJOR', name: 'Major', fill_color: '#BDD7EE', border_color: '#2F5597', sort_order: 1 },
  { code: 'GENERAL', name: 'General', fill_color: '#FFFFFF', border_color: '#7F7F7F', sort_order: 2 },
  { code: 'FOUNDATION', name: 'Foundation (Math/Physics)', fill_color: '#FFF2CC', border_color: '#BF9000', sort_order: 3 },
  { code: 'POLITICAL', name: 'Political', fill_color: '#F8CBAD', border_color: '#C55A11', sort_order: 4 },
  { code: 'LANGUAGE', name: 'Language', fill_color: '#FFFFFF', border_color: '#548235', sort_order: 5 },
  { code: 'PHYSICAL', name: 'Physical education', fill_color: '#FFFFFF', border_color: '#7030A0', sort_order: 6 },
];

// IU handbook 2022: A+ 90–100 (4.0), A 80–<90 (3.5), B+ 70–<80 (3.0), B 60–<70 (2.5), C 50–<60 (2.0).
// Below 50 fails (transcript: 45 → D+ 1.5, not passed). ⚠️ D+ lower bound, D and F are ASSUMPTIONS
// (decision D4) — confirm with the regulation and edit here; no code change is needed.
export const GRADE_SCALES = [
  { letter: 'A+', min_score: 90, max_score: 100, grade_point: 4.0, is_passing: true },
  { letter: 'A', min_score: 80, max_score: 89, grade_point: 3.5, is_passing: true },
  { letter: 'B+', min_score: 70, max_score: 79, grade_point: 3.0, is_passing: true },
  { letter: 'B', min_score: 60, max_score: 69, grade_point: 2.5, is_passing: true },
  { letter: 'C', min_score: 50, max_score: 59, grade_point: 2.0, is_passing: true },
  { letter: 'D+', min_score: 40, max_score: 49, grade_point: 1.5, is_passing: false }, // ⚠️ min 40 assumed
  { letter: 'D', min_score: 30, max_score: 39, grade_point: 1.0, is_passing: false }, // ⚠️ assumed
  { letter: 'F', min_score: 0, max_score: 29, grade_point: 0.0, is_passing: false }, // ⚠️ assumed
];

// IU handbook 2022: classification on the 100-point GPA. label_key is an i18n key.
// ⚠️ "weak" (< 50) is not in the handbook excerpt — assumption.
export const CLASSIFICATIONS = [
  { label_key: 'roadmap.classification.excellent', min_gpa100: 90, max_gpa100: 100 },
  { label_key: 'roadmap.classification.veryGood', min_gpa100: 80, max_gpa100: 90 },
  { label_key: 'roadmap.classification.good', min_gpa100: 70, max_gpa100: 80 },
  { label_key: 'roadmap.classification.averageGood', min_gpa100: 60, max_gpa100: 70 },
  { label_key: 'roadmap.classification.ordinary', min_gpa100: 50, max_gpa100: 60 },
  { label_key: 'roadmap.classification.weak', min_gpa100: 0, max_gpa100: 50 },
];

// ─── Departments ───────────────────────────────────────────────────────────────

export const DEPARTMENTS = [
  { slug: 'school-of-computing', name: 'School of Computer Science and Engineering', description: 'Computer science, IT, networking and data science programs.' },
  { slug: 'school-of-business', name: 'School of Business Administration', description: 'Business, finance and marketing programs.' },
  { slug: 'school-of-engineering', name: 'School of Engineering', description: 'Electrical, industrial and civil engineering programs.' },
  { slug: 'school-of-biotechnology', name: 'School of Biotechnology', description: 'Biotechnology and food science programs.' },
];

// ─── Courses ───────────────────────────────────────────────────────────────────
// (theory, lab) come from the Computer/Network Engineering KS 09.2023 charts when the course
// appears there. The Data Science chart only shows totals, so for DS-only courses the split is
// ASSUMED: 4 credits → (3,1), 3 credits → (3,0).

export type CourseSeed = {
  code: string;
  name: string;
  theory: number;
  lab: number;
  category: string;
  gradingMode?: 'SCORE' | 'PASS_FAIL';
  countsTowardGpa?: boolean;
  countsTowardCredits?: boolean;
};

export const COURSES: CourseSeed[] = [
  // Intensive English (transcript): Pass/Fail, not counted toward credits or GPA
  { code: 'ENTP01', name: 'Intensive English 1 - Twinning Program', theory: 17, lab: 0, category: 'LANGUAGE', gradingMode: 'PASS_FAIL', countsTowardGpa: false, countsTowardCredits: false },
  { code: 'ENTP02-1', name: 'Intensive English 02 - Twinning Program', theory: 13, lab: 0, category: 'LANGUAGE', gradingMode: 'PASS_FAIL', countsTowardGpa: false, countsTowardCredits: false },

  // General / foundation / language / political / physical
  { code: 'MA001IU', name: 'Calculus 1', theory: 4, lab: 0, category: 'FOUNDATION' },
  { code: 'MA026IU', name: 'Probability, Statistic & Random Process', theory: 3, lab: 0, category: 'FOUNDATION' },
  { code: 'IT154IU', name: 'Linear Algebra', theory: 3, lab: 0, category: 'FOUNDATION' },
  { code: 'EN007IU', name: 'Writing AE1', theory: 2, lab: 0, category: 'LANGUAGE' },
  { code: 'EN008IU', name: 'Listening AE1', theory: 2, lab: 0, category: 'LANGUAGE' },
  { code: 'EN011IU', name: 'Writing AE2', theory: 2, lab: 0, category: 'LANGUAGE' },
  { code: 'EN012IU', name: 'Speaking AE2', theory: 2, lab: 0, category: 'LANGUAGE' },
  { code: 'PE015IU', name: 'Philosophy Marxism', theory: 3, lab: 0, category: 'POLITICAL' },
  { code: 'PE016IU', name: 'Marxist - Leninist Political Economy', theory: 2, lab: 0, category: 'POLITICAL' },
  { code: 'PE017IU', name: 'Scientific Socialism', theory: 2, lab: 0, category: 'POLITICAL' },
  { code: 'PE018IU', name: 'History of Vietnamese Communist Party', theory: 2, lab: 0, category: 'POLITICAL' },
  { code: 'PE019IU', name: "Ho Chi Minh's Thoughts", theory: 2, lab: 0, category: 'POLITICAL' },
  { code: 'PE021IU', name: 'General Law', theory: 3, lab: 0, category: 'GENERAL' },
  // Physical training counts toward graduation credits but not toward GPA
  { code: 'PT001IU', name: 'Physical Training 1', theory: 0, lab: 3, category: 'PHYSICAL', countsTowardGpa: false },
  { code: 'PT002IU', name: 'Physical Training 2', theory: 0, lab: 3, category: 'PHYSICAL', countsTowardGpa: false },

  // Data Science core & specialized (required)
  { code: 'IT135IU', name: 'Introduction to Data Science', theory: 3, lab: 0, category: 'MAJOR' }, // 3 = semester 1 total (15) − other courses
  { code: 'IT149IU', name: 'Fundamentals of Programming', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT069IU', name: 'Object-Oriented Programming', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT151IU', name: 'Statistical Methods', theory: 3, lab: 0, category: 'MAJOR' },
  { code: 'IT013IU', name: 'Data Structures and Algorithms', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT159IU', name: 'Artificial Intelligence', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT140IU', name: 'Fundamental Concepts of Data Security', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT079IU', name: 'Principles of Database Management', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT171IU', name: 'Statistical Learning', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT136IU', name: 'Regression Analysis', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT138IU', name: 'Data Science and Data Visualization', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT160IU', name: 'Data Mining', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT139IU', name: 'Scalable and Distributed Computing', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT137IU', name: 'Data Analysis', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT172IU', name: 'Machine Learning', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT157IU', name: 'Deep Learning', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT173IU', name: 'Big Data Analytics', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT083IU', name: 'Special Study of the Field', theory: 0, lab: 3, category: 'MAJOR' },
  { code: 'IT082IU', name: 'Internship', theory: 0, lab: 3, category: 'MAJOR' },
  { code: 'IT058IU', name: 'Thesis', theory: 0, lab: 10, category: 'MAJOR' },
  { code: 'IT168IU', name: 'Special Study of the Field 2', theory: 0, lab: 3, category: 'MAJOR' },

  // Data Science electives (semester 6–7 elective pool)
  { code: 'IT146IU', name: 'Theory of Networks', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT076IU', name: 'Software Engineering', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT164IU', name: 'Cloud Computing', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT145IU', name: 'Decision Support Systems', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT056IU', name: 'IT Project Management', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT094IU', name: 'Information System Management', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT169IU', name: 'Time Series Analysis', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT144IU', name: 'Business Process Analysis', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT170IU', name: 'Natural Language Processing', theory: 3, lab: 1, category: 'MAJOR' },
  // ⚠️ The DS chart shows 4 credits, the CE/NE 2023 charts show (3+0): kept (3,0), to be checked
  { code: 'IT153IU', name: 'Discrete Mathematics', theory: 3, lab: 0, category: 'MAJOR' },
  { code: 'IT163IU', name: 'Optimization and Applications', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT150IU', name: 'Blockchain', theory: 3, lab: 1, category: 'MAJOR' },
  { code: 'IT120IU', name: 'Entrepreneurship', theory: 3, lab: 0, category: 'MAJOR' },
];

// ─── Data Science curriculum K2023 ─────────────────────────────────────────────
// Semester totals on the chart: 15, 17, 17, 20, 18, 18 (8 elective), 17 (7 elective), 13 → 135.

export type NodeSeed = {
  term: number | 'POOL';
  row: number;
  course?: string;
  slot?: { label: string; theory: number; lab: number; group: string | null };
  electiveGroup?: string;
};

export const DS_ELECTIVE_GROUP = 'DS';

export const DATA_SCIENCE_2023: NodeSeed[] = [
  // Semester 1 (15)
  { term: 1, row: 0, course: 'MA001IU' },
  { term: 1, row: 1, course: 'EN008IU' },
  { term: 1, row: 2, course: 'EN007IU' },
  { term: 1, row: 3, course: 'IT135IU' },
  { term: 1, row: 6, course: 'IT149IU' },
  // Semester 2 (17)
  { term: 2, row: 0, course: 'MA026IU' },
  { term: 2, row: 1, course: 'IT154IU' },
  { term: 2, row: 2, course: 'EN012IU' },
  { term: 2, row: 3, course: 'EN011IU' },
  { term: 2, row: 4, course: 'PE015IU' },
  { term: 2, row: 6, course: 'IT069IU' },
  // Semester 3 (17)
  { term: 3, row: 0, course: 'PE016IU' },
  { term: 3, row: 1, course: 'IT151IU' },
  { term: 3, row: 2, course: 'IT013IU' },
  { term: 3, row: 3, course: 'IT159IU' },
  { term: 3, row: 4, course: 'IT140IU' },
  // Semester 4 (20)
  { term: 4, row: 0, course: 'PE017IU' },
  { term: 4, row: 1, course: 'PE021IU' },
  { term: 4, row: 2, course: 'IT079IU' },
  { term: 4, row: 3, course: 'IT171IU' },
  { term: 4, row: 4, course: 'IT136IU' },
  { term: 4, row: 5, course: 'PT001IU' },
  // Semester 5 (18)
  { term: 5, row: 0, course: 'PE018IU' },
  { term: 5, row: 1, course: 'IT138IU' },
  { term: 5, row: 2, course: 'IT160IU' },
  { term: 5, row: 3, course: 'IT139IU' },
  { term: 5, row: 4, course: 'IT137IU' },
  // Semester 6 (18, of which 8 elective)
  { term: 6, row: 0, course: 'PE019IU' },
  { term: 6, row: 1, course: 'IT172IU' },
  { term: 6, row: 2, course: 'IT157IU' },
  { term: 6, row: 3, slot: { label: 'Elective', theory: 3, lab: 1, group: DS_ELECTIVE_GROUP } },
  { term: 6, row: 4, slot: { label: 'Elective', theory: 3, lab: 1, group: DS_ELECTIVE_GROUP } },
  // Semester 7 (17, of which 7 elective)
  { term: 7, row: 0, course: 'IT083IU' },
  { term: 7, row: 1, course: 'IT173IU' },
  { term: 7, row: 2, slot: { label: 'Free Elective', theory: 3, lab: 1, group: null } },
  { term: 7, row: 3, slot: { label: 'Elective', theory: 3, lab: 0, group: DS_ELECTIVE_GROUP } },
  { term: 7, row: 4, course: 'PT002IU' },
  // Semester 8 (13): Internship + Thesis. Alternative to the thesis (IT168IU + 4C + 3C electives)
  // is kept in the elective pool until conditional branches (FR-RDM.07.4, Could) are modelled.
  { term: 8, row: 0, course: 'IT082IU' },
  { term: 8, row: 1, course: 'IT058IU' },
  // Elective pool
  { term: 'POOL', row: 0, course: 'IT146IU', electiveGroup: DS_ELECTIVE_GROUP },
  { term: 'POOL', row: 1, course: 'IT076IU', electiveGroup: DS_ELECTIVE_GROUP },
  { term: 'POOL', row: 2, course: 'IT164IU', electiveGroup: DS_ELECTIVE_GROUP },
  { term: 'POOL', row: 3, course: 'IT145IU', electiveGroup: DS_ELECTIVE_GROUP },
  { term: 'POOL', row: 4, course: 'IT056IU', electiveGroup: DS_ELECTIVE_GROUP },
  { term: 'POOL', row: 5, course: 'IT094IU', electiveGroup: DS_ELECTIVE_GROUP },
  { term: 'POOL', row: 6, course: 'IT169IU', electiveGroup: DS_ELECTIVE_GROUP },
  { term: 'POOL', row: 7, course: 'IT144IU', electiveGroup: DS_ELECTIVE_GROUP },
  { term: 'POOL', row: 8, course: 'IT170IU', electiveGroup: DS_ELECTIVE_GROUP },
  { term: 'POOL', row: 9, course: 'IT153IU', electiveGroup: DS_ELECTIVE_GROUP },
  { term: 'POOL', row: 10, course: 'IT163IU', electiveGroup: DS_ELECTIVE_GROUP },
  { term: 'POOL', row: 11, course: 'IT150IU', electiveGroup: DS_ELECTIVE_GROUP },
  { term: 'POOL', row: 12, course: 'IT120IU', electiveGroup: DS_ELECTIVE_GROUP },
  { term: 'POOL', row: 13, course: 'IT168IU', electiveGroup: DS_ELECTIVE_GROUP },
];

// Only relations that are clearly drawn on the chart
export const DATA_SCIENCE_2023_EDGES: Array<[string, string, 'PREREQUISITE' | 'PREVIOUS' | 'COREQUISITE']> = [
  ['MA001IU', 'MA026IU', 'PREREQUISITE'],
  ['EN007IU', 'EN011IU', 'PREREQUISITE'],
  ['IT149IU', 'IT069IU', 'PREREQUISITE'],
  ['IT083IU', 'IT058IU', 'PREREQUISITE'],
];
