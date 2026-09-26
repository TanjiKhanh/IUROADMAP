import { ApiProperty } from '@nestjs/swagger';
import { StudentRoadmapSummaryResponse } from './student-roadmap-summary.response';
import { MergedTermResponse } from './merged-term.response';
import { MergedNodeResponse } from './merged-node.response';
import { MergedEdgeResponse } from './merged-edge.response';
import { RoadmapHintResponse } from './roadmap-hint.response';

/** Merged view: curriculum ⊕ learner overlay ⊕ results (FL-LRN-03). */
export class StudentRoadmapResponse extends StudentRoadmapSummaryResponse {
  @ApiProperty({ type: [MergedTermResponse], description: 'Columns in left-to-right order' })
  terms!: MergedTermResponse[];

  @ApiProperty({ type: [MergedNodeResponse] })
  nodes!: MergedNodeResponse[];

  @ApiProperty({ type: [MergedEdgeResponse] })
  edges!: MergedEdgeResponse[];

  @ApiProperty({ type: [RoadmapHintResponse] })
  hints!: RoadmapHintResponse[];
}
