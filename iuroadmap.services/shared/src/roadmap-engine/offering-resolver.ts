export interface OfferingRef {
  id: number;
  /** Start year of the academic year: 2024 = 2024-2025 */
  academicYear: number;
  status: 'DRAFT' | 'PUBLISHED';
}

/**
 * Picks the course offering to show for an academic year (FR-LRN.08.2, FR-LRN.11.6):
 * the PUBLISHED offering of that year, else the latest PUBLISHED one before it,
 * else the earliest PUBLISHED one after it. `year = null` means "latest".
 */
export function resolveOffering<T extends OfferingRef>(
  offerings: ReadonlyArray<T>,
  year: number | null | undefined,
): T | null {
  const published = offerings
    .filter((o) => o.status === 'PUBLISHED')
    .sort((a, b) => a.academicYear - b.academicYear);
  if (!published.length) return null;
  if (year === null || year === undefined) return published[published.length - 1];

  const exact = published.find((o) => o.academicYear === year);
  if (exact) return exact;
  const earlier = published.filter((o) => o.academicYear < year);
  if (earlier.length) return earlier[earlier.length - 1];
  return published[0];
}

/**
 * Academic year of a curriculum semester when the learner has not labelled the term:
 * cohort_year + floor((semester_no − 1) / 2). Semester 1–2 → first year, 3–4 → second, …
 */
export function estimateAcademicYear(
  cohortYear: number | null | undefined,
  semesterNo: number | null | undefined,
): number | null {
  if (!cohortYear || !semesterNo || semesterNo < 1) return cohortYear ?? null;
  return cohortYear + Math.floor((semesterNo - 1) / 2);
}
