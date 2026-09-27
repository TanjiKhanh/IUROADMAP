import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IActionDelete, IActionUpdate } from '@iuroadmap/shared';

export class MajorResponse implements IActionDelete, IActionUpdate {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'computer-science' })
  slug!: string;

  @ApiProperty({ example: 'Computer Science' })
  name!: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({ example: 1 })
  departmentId!: number;

  @ApiProperty({ example: 'School of Computer Science and Engineering' })
  departmentName!: string;

  @ApiProperty({ description: 'Number of curricula (all years, all statuses)', example: 3 })
  curriculumCount!: number;

  @ApiProperty({ description: 'Cohort years that have a PUBLISHED curriculum', type: [Number], example: [2023, 2024] })
  publishedYears!: number[];

  @ApiProperty({ description: 'Learners who cloned a curriculum of this major', example: 120 })
  learnerCount!: number;

  @ApiProperty({ description: 'False once a curriculum has been published (BR-RM-02)' })
  canDelete!: boolean;

  @ApiProperty()
  canUpdate!: boolean;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
