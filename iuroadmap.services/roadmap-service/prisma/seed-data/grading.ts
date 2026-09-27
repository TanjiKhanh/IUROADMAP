// Grade scale and academic classifications (imported by seed.ts and by the grading unit tests,
// which treat these bands as the source of truth).

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
