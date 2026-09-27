import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class TopicEdgeCreateRequest {
  @ApiProperty({ description: 'Topic learned first', example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  sourceTopicId!: number;

  @ApiProperty({ description: 'Topic learned after', example: 2 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  targetTopicId!: number;
}
