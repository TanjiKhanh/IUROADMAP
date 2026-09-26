import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RoadmapChangeOpRequest } from './roadmap-change-op.request';

/** One batch = one transaction (design §6.4). */
export class RoadmapChangesRequest {
  @ApiProperty({ description: 'Revision the client loaded; mismatch → 409 REVISION_CONFLICT', example: 7 })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  revision!: number;

  @ApiProperty({ type: [RoadmapChangeOpRequest] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => RoadmapChangeOpRequest)
  ops!: RoadmapChangeOpRequest[];
}
