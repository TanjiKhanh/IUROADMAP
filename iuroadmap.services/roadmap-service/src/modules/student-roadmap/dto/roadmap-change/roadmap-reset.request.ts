import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum RoadmapResetScope {
  ALL = 'ALL',
  NODE = 'NODE',
}

/** Reset one curriculum node, or every structural change (results are kept) — FR-LRN.04.11. */
export class RoadmapResetRequest {
  @ApiProperty({ example: 7 })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  revision!: number;

  @ApiProperty({ enum: RoadmapResetScope, enumName: 'RoadmapResetScope' })
  @IsEnum(RoadmapResetScope)
  scope!: RoadmapResetScope;

  @ApiPropertyOptional({ format: 'uuid', description: 'Required when scope = NODE' })
  @IsUUID('4')
  @IsOptional()
  nodeKey?: string;
}
