import { GradingModeEnum } from '../../../common/enums';
import { CourseBriefResponse } from '../dto/course/course-brief.response';

/** Prisma include that loads everything `toCourseBrief` needs. */
export const COURSE_BRIEF_INCLUDE = { category: true } as const;

export interface CourseWithCategory {
  id: number;
  code: string;
  name: string;
  theory_credits: number;
  lab_credits: number;
  grading_mode: string;
  counts_toward_gpa: boolean;
  counts_toward_credits: boolean;
  category: { code: string; fill_color: string; border_color: string };
}

export function toCourseBrief(r: CourseWithCategory): CourseBriefResponse {
  return {
    id: r.id,
    code: r.code,
    name: r.name,
    theoryCredits: r.theory_credits,
    labCredits: r.lab_credits,
    categoryCode: r.category.code,
    fillColor: r.category.fill_color,
    borderColor: r.category.border_color,
    gradingMode: r.grading_mode as GradingModeEnum,
    countsTowardGpa: r.counts_toward_gpa,
    countsTowardCredits: r.counts_toward_credits,
  };
}
