// Data Science curriculum, cohort K2023 (2022 handbook chart).
// Semester totals on the chart: 15, 17, 17, 20, 18, 18 (8 elective), 17 (7 elective), 13 → 135.

import { CurriculumSeed, EdgeSeed, NodeSeed, regularTerms } from '../types';

const DS_ELECTIVE_GROUP = 'DS';

const NODES: NodeSeed[] = [
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
const EDGES: EdgeSeed[] = [
  ['MA001IU', 'MA026IU', 'PREREQUISITE'],
  ['EN007IU', 'EN011IU', 'PREREQUISITE'],
  ['IT149IU', 'IT069IU', 'PREREQUISITE'],
  ['IT083IU', 'IT058IU', 'PREREQUISITE'],
];

export const DATA_SCIENCE_K2023: CurriculumSeed = {
  majorSlug: 'data-science',
  cohortYear: 2023,
  totalCredits: 135,
  decisionRef: 'Handbook 2022 (K2023)',
  terms: regularTerms(8),
  nodes: NODES,
  edges: EDGES,
};
