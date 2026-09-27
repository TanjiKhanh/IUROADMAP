import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** One published curriculum (major + cohort year) in the Explore list. */
export class ExploreCurriculumCardResponse {
  @ApiProperty({ example: 3 })
  versionId!: number;

  @ApiProperty({ example: 1 })
  majorId!: number;

  @ApiProperty({ example: 'Data Science' })
  majorName!: string;

  @ApiProperty({ example: 'data-science' })
  majorSlug!: string;

  @ApiPropertyOptional()
  majorDescription?: string;

  @ApiProperty({ example: 1 })
  departmentId!: number;

  @ApiProperty({ example: 'School of Computer Science and Engineering' })
  departmentName!: string;

  @ApiProperty({ example: 2023 })
  cohortYear!: number;

  @ApiPropertyOptional({ example: 1 })
  revisionNo?: number;

  @ApiProperty({ example: 135 })
  totalCredits!: number;

  @ApiProperty({ description: 'Courses in regular and summer terms', example: 42 })
  courseCount!: number;

  @ApiProperty({ example: 120 })
  learnerCount!: number;
}
