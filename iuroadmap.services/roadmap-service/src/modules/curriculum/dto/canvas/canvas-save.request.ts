import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CanvasTermRequest } from './canvas-term.request';
import { CanvasNodeRequest } from './canvas-node.request';
import { CanvasEdgeRequest } from './canvas-edge.request';

/** Full canvas state, matched by key (FR-RDM.05.8). */
export class CanvasSaveRequest {
  @ApiProperty({ description: 'Revision the client loaded; mismatch → 409 REVISION_CONFLICT', example: 3 })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  revision!: number;

  @ApiProperty({ type: [CanvasTermRequest], description: 'Columns in left-to-right order' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CanvasTermRequest)
  terms!: CanvasTermRequest[];

  @ApiProperty({ type: [CanvasNodeRequest] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CanvasNodeRequest)
  nodes!: CanvasNodeRequest[];

  @ApiProperty({ type: [CanvasEdgeRequest] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CanvasEdgeRequest)
  edges!: CanvasEdgeRequest[];
}
