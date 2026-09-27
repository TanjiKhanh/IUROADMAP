/** Validation patterns shared by roadmap-service DTOs. */
export const Patterns = {
  /** kebab-case: "school-of-computing" */
  Slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  /** "#RRGGBB" */
  HexColor: /^#[0-9A-Fa-f]{6}$/,
  /** Upper-case code: "MAJOR", "FOUNDATION" */
  UpperCode: /^[A-Z0-9_]+$/,
  /** Course code: "IT013IU", "ENTP02-1" */
  CourseCode: /^[A-Za-z0-9-]+$/,
};
