import { ApiProperty } from '@nestjs/swagger';
import { StudentRoadmapVersionResponse } from '../student-roadmap/student-roadmap-version.response';
import { UpgradePreviewItemResponse } from './upgrade-preview-item.response';

/** Dry run of an upgrade (FR-LRN.07.2). Results are never lost. */
export class UpgradePreviewResponse {
  @ApiProperty({ type: StudentRoadmapVersionResponse })
  targetVersion!: StudentRoadmapVersionResponse;

  @ApiProperty({ description: 'Overrides kept as they are', example: 12 })
  keptCount!: number;

  @ApiProperty({ type: [UpgradePreviewItemResponse], description: 'Same course at another place in the target' })
  remapped!: UpgradePreviewItemResponse[];

  @ApiProperty({ type: [UpgradePreviewItemResponse], description: 'Courses removed from the curriculum (no result)' })
  dropped!: UpgradePreviewItemResponse[];

  @ApiProperty({ type: [UpgradePreviewItemResponse], description: 'Graded courses removed from the curriculum, kept as your own' })
  convertedToCustom!: UpgradePreviewItemResponse[];

  @ApiProperty({ description: 'Academic-year labels that no longer apply', example: 0 })
  droppedTermCount!: number;

  @ApiProperty({ description: 'Your relations whose course disappeared', example: 0 })
  droppedEdgeCount!: number;
}
