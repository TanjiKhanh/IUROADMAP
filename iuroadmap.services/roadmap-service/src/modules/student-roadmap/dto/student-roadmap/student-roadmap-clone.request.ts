import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class StudentRoadmapCloneRequest {
  @ApiProperty({ description: 'Major ID', example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  roadmapId!: number;

  @ApiProperty({ description: 'PUBLISHED curriculum of that major (any year)', example: 3 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  versionId!: number;
}
