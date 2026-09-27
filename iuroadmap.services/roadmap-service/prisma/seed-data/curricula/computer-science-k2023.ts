// Computer Science curriculum, cohort K2023 (imported by seed.ts and by unit tests).
// Source: IU School of CSE handbook chart "Curriculum - Computer Science", decision
// 89/QĐ-ĐHQT.07.03.2022, https://it.hcmiu.edu.vn/wp-content/uploads/2023/09/cs-new-23-clean-09.2023-full-1.pdf
// Terms, rows and relations are read from the chart (rows follow its vertical layout);
// solid arrows are PREREQUISITE, dashed arrows PREVIOUS, unlabelled solid links COREQUISITE.
//
// Chart headers: 17, 19, 20, 16+3, 17+3, 19, summer 3, 13, 10 (the "+3" is Physical Training).
// Physical Training counts toward credits in this system, as in the Data Science seed, so the
// total is 134 + 6 = 140.
//
// ⚠️ Chart inconsistencies, resolved as follows (check with the handbook text):
// - Semester 5 header says 17 but its boxes sum to 13, and the elective numbering jumps from
//   CS2 to CS4: the missing box is taken to be "Elective CS3" (3,1).
// - The semester 6 free elective box says "(3,1)" but its label says "3 credits" and the header
//   19 only adds up with 3: seeded as (3,0).
// - Thesis IT058 is drawn as (0,7) but the semester 8 header is 10; the course already exists
//   as (0,10) (Data Science seed) and courses are shared, so it stays (0,10).
// - The chart draws MA003 → IT154 as a prerequisite inside the same semester, which breaks the
//   semester-order rule (BR-RM-08), so that relation is left out.
// - "Law (3,0)" is General Law PE021IU.

import type { CurriculumSeed, EdgeSeed, NodeSeed, TermSeed } from '../types';

const CS_ELECTIVE_GROUP = 'CS';
/** Semester 8: GPA ≥ 70 → Thesis, GPA < 70 → Special Study 2 + two electives */
const THESIS_BRANCH = { choiceGroup: 'HK8', condition: 'CUM_GPA100>=70' };
const SPECIAL_STUDY_BRANCH = { choiceGroup: 'HK8', condition: 'CUM_GPA100<70' };

const TERMS: TermSeed[] = [
  { key: '1', kind: 'REGULAR', semesterNo: 1 },
  { key: '2', kind: 'REGULAR', semesterNo: 2 },
  { key: '3', kind: 'REGULAR', semesterNo: 3 },
  { key: '4', kind: 'REGULAR', semesterNo: 4 },
  { key: '5', kind: 'REGULAR', semesterNo: 5 },
  { key: '6', kind: 'REGULAR', semesterNo: 6 },
  { key: 'SUMMER', kind: 'SUMMER' },
  { key: '7', kind: 'REGULAR', semesterNo: 7 },
  { key: '8', kind: 'REGULAR', semesterNo: 8 },
  { key: 'POOL', kind: 'ELECTIVE_POOL' },
];

const NODES: NodeSeed[] = [
  // Semester 1 (17)
  { term: 1, row: 1, course: 'IT064IU' },
  { term: 1, row: 2, course: 'MA001IU' },
  { term: 1, row: 8, course: 'IT116IU' },
  { term: 1, row: 13, course: 'PH013IU' },
  { term: 1, row: 15, course: 'EN008IU' },
  { term: 1, row: 16, course: 'EN007IU' },
  // Semester 2 (19)
  { term: 2, row: 5, course: 'IT091IU' },
  { term: 2, row: 7, course: 'IT153IU' },
  { term: 2, row: 9, course: 'IT069IU' },
  { term: 2, row: 13, course: 'PH015IU' },
  { term: 2, row: 14, course: 'PH016IU' },
  { term: 2, row: 15, course: 'EN012IU' },
  { term: 2, row: 16, course: 'EN011IU' },
  // Semester 3 (20)
  { term: 3, row: 2, course: 'MA003IU' },
  { term: 3, row: 4, course: 'IT154IU' },
  { term: 3, row: 7, course: 'IT013IU' },
  { term: 3, row: 12, course: 'IT079IU' },
  { term: 3, row: 13, course: 'PE015IU' },
  { term: 3, row: 15, course: 'PE016IU' },
  // Semester 4 (16 + 3)
  { term: 4, row: 1, slot: { label: 'Elective CS1', theory: 3, lab: 1, group: CS_ELECTIVE_GROUP } },
  { term: 4, row: 8, course: 'IT089IU' },
  { term: 4, row: 10, course: 'IT090IU' },
  { term: 4, row: 12, course: 'IT093IU' },
  { term: 4, row: 16, course: 'PT001IU' },
  // Semester 5 (17 + 3)
  { term: 5, row: 0, slot: { label: 'Elective CS2', theory: 3, lab: 1, group: CS_ELECTIVE_GROUP } },
  { term: 5, row: 1, course: 'IT092IU' },
  { term: 5, row: 2, course: 'MA026IU' },
  { term: 5, row: 3, slot: { label: 'Elective CS3', theory: 3, lab: 1, group: CS_ELECTIVE_GROUP } }, // ⚠️ inferred, see top
  { term: 5, row: 15, course: 'PE017IU' },
  { term: 5, row: 16, course: 'PT002IU' },
  // Semester 6 (19)
  { term: 6, row: 1, course: 'IT120IU' },
  { term: 6, row: 3, slot: { label: 'Free Elective', theory: 3, lab: 0, group: null } },
  { term: 6, row: 6, course: 'IT159IU' },
  { term: 6, row: 11, course: 'IT076IU' },
  { term: 6, row: 15, course: 'PE018IU' },
  { term: 6, row: 16, course: 'PE021IU' },
  // Summer (3)
  { term: 'SUMMER', row: 2, course: 'IT082IU' },
  // Semester 7 (13)
  { term: 7, row: 1, course: 'IT083IU' },
  { term: 7, row: 3, slot: { label: 'Elective CS4', theory: 3, lab: 1, group: CS_ELECTIVE_GROUP } },
  { term: 7, row: 7, course: 'IT017IU' },
  { term: 7, row: 15, course: 'PE019IU' },
  // Semester 8 (10): conditional branch on the cumulative GPA
  { term: 8, row: 0, course: 'IT058IU', branch: THESIS_BRANCH },
  { term: 8, row: 2, course: 'IT168IU', branch: SPECIAL_STUDY_BRANCH },
  { term: 8, row: 3, slot: { label: 'Elective', theory: 3, lab: 1, group: CS_ELECTIVE_GROUP }, branch: SPECIAL_STUDY_BRANCH },
  { term: 8, row: 4, slot: { label: 'Elective', theory: 3, lab: 1, group: CS_ELECTIVE_GROUP }, branch: SPECIAL_STUDY_BRANCH },
  // Elective pool (both "Elective" columns of the chart)
  { term: 'POOL', row: 0, course: 'IT130IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 1, course: 'IT114IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 2, course: 'IT096IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 3, course: 'IT134IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 4, course: 'IT024IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 5, course: 'IT056IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 6, course: 'IT160IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 7, course: 'IT133IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 8, course: 'IT094IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 9, course: 'IT164IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 10, course: 'IT165IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 11, course: 'IT166IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 12, course: 'IT044IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 13, course: 'IT157IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 14, course: 'IT131IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 15, course: 'IT067IU', electiveGroup: CS_ELECTIVE_GROUP },
  { term: 'POOL', row: 16, course: 'IT099IU', electiveGroup: CS_ELECTIVE_GROUP },
];

const EDGES: EdgeSeed[] = [
  // Math / physics / language / political
  ['MA001IU', 'MA003IU', 'PREREQUISITE'],
  ['MA003IU', 'MA026IU', 'PREREQUISITE'],
  ['IT153IU', 'IT154IU', 'COREQUISITE'],
  ['PH013IU', 'PH015IU', 'PREREQUISITE'],
  ['PH015IU', 'PH016IU', 'COREQUISITE'],
  ['EN007IU', 'EN011IU', 'PREREQUISITE'],
  ['PE015IU', 'PE016IU', 'COREQUISITE'],
  ['PE016IU', 'PE017IU', 'PREVIOUS'],
  ['PE017IU', 'PE018IU', 'PREVIOUS'],
  ['PE018IU', 'PE019IU', 'PREVIOUS'],
  // Programming track
  ['IT116IU', 'IT091IU', 'PREVIOUS'],
  ['IT116IU', 'IT153IU', 'PREREQUISITE'],
  ['IT116IU', 'IT069IU', 'PREREQUISITE'],
  ['IT116IU', 'IT079IU', 'PREVIOUS'],
  ['IT069IU', 'IT013IU', 'PREVIOUS'],
  ['IT069IU', 'IT090IU', 'PREREQUISITE'],
  ['IT069IU', 'IT093IU', 'PREREQUISITE'],
  ['IT069IU', 'IT076IU', 'PREVIOUS'],
  ['IT069IU', 'IT159IU', 'PREVIOUS'],
  ['IT153IU', 'IT159IU', 'PREVIOUS'],
  ['IT079IU', 'IT093IU', 'PREREQUISITE'],
  ['IT013IU', 'IT017IU', 'PREREQUISITE'],
  ['IT089IU', 'IT017IU', 'PREREQUISITE'],
  // Into the elective pool
  ['IT091IU', 'IT096IU', 'PREREQUISITE'],
  ['IT091IU', 'IT134IU', 'PREREQUISITE'],
  ['IT069IU', 'IT024IU', 'PREVIOUS'],
  ['IT069IU', 'IT056IU', 'PREVIOUS'],
  ['IT069IU', 'IT160IU', 'PREVIOUS'],
  ['IT090IU', 'IT133IU', 'PREREQUISITE'],
  ['IT079IU', 'IT094IU', 'PREVIOUS'],
  ['IT067IU', 'IT099IU', 'COREQUISITE'],
  // Semester 7 → 8
  ['IT083IU', 'IT058IU', 'PREREQUISITE'],
  ['IT083IU', 'IT168IU', 'PREREQUISITE'],
];

export const COMPUTER_SCIENCE_K2023: CurriculumSeed = {
  majorSlug: 'computer-science',
  cohortYear: 2023,
  totalCredits: 140,
  decisionRef: '89/QĐ-ĐHQT.07.03.2022 (Handbook 2023)',
  terms: TERMS,
  nodes: NODES,
  edges: EDGES,
};
