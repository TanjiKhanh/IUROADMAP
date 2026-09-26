import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IActionDelete, IActionUpdate } from '@iuroadmap/shared';
import { RoadmapVersionStatusEnum } from '../../../../common/enums';

export class CurriculumVersionResponse implements IActionDelete, IActionUpdate {
  @ApiProperty({ example: 3 })
  id!: number;

  @ApiProperty({ example: 1 })
  roadmapId!: number;

  @ApiProperty({ example: 'Data Science' })
  majorName!: string;

  @ApiProperty({ example: 'data-science' })
  majorSlug!: string;

  @ApiProperty({ example: 2023 })
  cohortYear!: number;

  @ApiPropertyOptional({ description: 'Issue number within the year (null while DRAFT)', example: 1 })
  revisionNo?: number;

  @ApiProperty({ example: 135 })
  totalCredits!: number;

  @ApiPropertyOptional({ example: 'Handbook 2022 (K2023)' })
  decisionRef?: string;

  @ApiProperty({ enum: RoadmapVersionStatusEnum, enumName: 'RoadmapVersionStatus' })
  status!: RoadmapVersionStatusEnum;

  @ApiProperty({ description: 'Optimistic-lock counter of the canvas', example: 4 })
  revision!: number;

  @ApiPropertyOptional()
  publishedAt?: string;

  @ApiProperty({ description: 'Learners using this curriculum', example: 120 })
  learnerCount!: number;

  @ApiProperty({ example: 49 })
  nodeCount!: number;

  @ApiProperty({ description: 'Only a DRAFT can be deleted' })
  canDelete!: boolean;

  @ApiProperty({ description: 'Only a DRAFT can be edited' })
  canUpdate!: boolean;

  @ApiProperty()
  createdAt!: string;
}
