import { ApiProperty } from '@nestjs/swagger';

export class TopicEdgeResponse {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 1 })
  sourceTopicId!: number;

  @ApiProperty({ example: 2 })
  targetTopicId!: number;
}
