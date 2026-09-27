import { ApiProperty } from '@nestjs/swagger';
import { CurriculumVersionResponse } from '../curriculum-version/curriculum-version.response';
import { CurriculumValidationResponse } from '../curriculum-version/curriculum-validation.response';
import { CanvasTermResponse } from './canvas-term.response';
import { CanvasNodeResponse } from './canvas-node.response';
import { CanvasEdgeResponse } from './canvas-edge.response';

export class CanvasResponse {
  @ApiProperty({ type: CurriculumVersionResponse })
  version!: CurriculumVersionResponse;

  @ApiProperty({ type: [CanvasTermResponse], description: 'Columns in left-to-right order' })
  terms!: CanvasTermResponse[];

  @ApiProperty({ type: [CanvasNodeResponse] })
  nodes!: CanvasNodeResponse[];

  @ApiProperty({ type: [CanvasEdgeResponse] })
  edges!: CanvasEdgeResponse[];

  @ApiProperty({ type: CurriculumValidationResponse, description: 'Current publish issues' })
  issues!: CurriculumValidationResponse;
}
