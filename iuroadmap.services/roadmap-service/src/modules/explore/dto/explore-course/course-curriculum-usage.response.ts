import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TermKindEnum } from '../../../../common/enums';
import { CourseRelationRefResponse } from './course-relation-ref.response';

/** "In curricula" tab (FR-LRN.11.4): where the course sits in each published curriculum. */
export class CourseCurriculumUsageResponse {
  @ApiProperty({ example: 3 })
  versionId!: number;

  @ApiProperty({ example: 1 })
  majorId!: number;

  @ApiProperty({ example: 'Data Science' })
  majorName!: string;

  @ApiProperty({ example: 'data-science' })
  majorSlug!: string;

  @ApiProperty({ example: 2023 })
  cohortYear!: number;

  @ApiProperty({ enum: TermKindEnum, enumName: 'TermKind' })
  termKind!: TermKindEnum;

  @ApiPropertyOptional({ example: 2 })
  semesterNo?: number;

  @ApiProperty({ type: [CourseRelationRefResponse], description: 'Courses to take before' })
  before!: CourseRelationRefResponse[];

  @ApiProperty({ type: [CourseRelationRefResponse], description: 'Courses that follow' })
  after!: CourseRelationRefResponse[];
}
