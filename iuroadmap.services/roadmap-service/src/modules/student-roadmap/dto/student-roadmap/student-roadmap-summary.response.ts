import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StudentRoadmapStatusEnum } from '../../../../common/enums';
import { StudentRoadmapVersionResponse } from './student-roadmap-version.response';
import { RoadmapSummaryResponse } from './roadmap-summary.response';

/** Card on the My Roadmaps dashboard (FR-LRN.03.6). */
export class StudentRoadmapSummaryResponse {
  @ApiProperty({ example: 42 })
  id!: number;

  @ApiProperty({ example: 1 })
  roadmapId!: number;

  @ApiProperty({ example: 'Data Science' })
  majorName!: string;

  @ApiProperty({ example: 'data-science' })
  majorSlug!: string;

  @ApiProperty({ example: 'School of Computer Science and Engineering' })
  departmentName!: string;

  @ApiProperty({ type: StudentRoadmapVersionResponse })
  version!: StudentRoadmapVersionResponse;

  @ApiProperty({ enum: StudentRoadmapStatusEnum, enumName: 'StudentRoadmapStatus' })
  status!: StudentRoadmapStatusEnum;

  @ApiProperty({ description: 'Optimistic-lock counter', example: 8 })
  revision!: number;

  @ApiProperty({ type: RoadmapSummaryResponse })
  summary!: RoadmapSummaryResponse;

  @ApiPropertyOptional({ description: 'A newer issue of the same year was published (banner, FR-LRN.07.1)' })
  newerVersionId?: number;

  @ApiProperty()
  updatedAt!: string;
}
