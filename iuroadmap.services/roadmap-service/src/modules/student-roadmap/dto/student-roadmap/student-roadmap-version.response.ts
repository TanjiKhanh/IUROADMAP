import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoadmapVersionStatusEnum } from '../../../../common/enums';

/** Curriculum a student roadmap is based on. */
export class StudentRoadmapVersionResponse {
  @ApiProperty({ example: 3 })
  id!: number;

  @ApiProperty({ example: 2023 })
  cohortYear!: number;

  @ApiPropertyOptional({ example: 1 })
  revisionNo?: number;

  @ApiProperty({ example: 135 })
  totalCredits!: number;

  @ApiProperty({ enum: RoadmapVersionStatusEnum, enumName: 'RoadmapVersionStatus' })
  status!: RoadmapVersionStatusEnum;
}
