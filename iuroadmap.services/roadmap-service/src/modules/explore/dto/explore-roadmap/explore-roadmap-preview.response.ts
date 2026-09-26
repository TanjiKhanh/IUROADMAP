import { ApiProperty } from '@nestjs/swagger';
import { CanvasEdgeResponse, CanvasNodeResponse, CanvasTermResponse } from '../../../curriculum/dto/canvas';
import { ExploreCurriculumCardResponse } from './explore-curriculum-card.response';
import { ExploreYearOptionResponse } from './explore-year-option.response';

/** Read-only semester canvas of one published curriculum (FR-LRN.01.2). */
export class ExploreRoadmapPreviewResponse {
  @ApiProperty({ type: ExploreCurriculumCardResponse })
  curriculum!: ExploreCurriculumCardResponse;

  @ApiProperty({ type: [ExploreYearOptionResponse], description: 'Other published years of the major (year dropdown)' })
  availableYears!: ExploreYearOptionResponse[];

  @ApiProperty({ type: [CanvasTermResponse] })
  terms!: CanvasTermResponse[];

  @ApiProperty({ type: [CanvasNodeResponse] })
  nodes!: CanvasNodeResponse[];

  @ApiProperty({ type: [CanvasEdgeResponse] })
  edges!: CanvasEdgeResponse[];
}
