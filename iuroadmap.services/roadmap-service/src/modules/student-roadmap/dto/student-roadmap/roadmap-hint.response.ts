import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** Non-blocking advice (BR-LRN-12): relations are shown to the learner, never enforced. */
export class RoadmapHintResponse {
  @ApiProperty({ enum: ['PLACEMENT', 'CYCLE', 'PREREQUISITE_FAILED', 'CREDITS_SHORT'], enumName: 'RoadmapHintCode' })
  code!: string;

  @ApiProperty({ type: [String] })
  nodeKeys!: string[];

  @ApiProperty({ type: [String] })
  edgeKeys!: string[];

  @ApiPropertyOptional({ type: 'object', additionalProperties: { type: 'number' }, description: 'e.g. { planned: 120, required: 135 }' })
  meta?: Record<string, number>;
}
