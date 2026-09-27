import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationRequest } from '@iuroadmap/shared';

/** Filter published curricula (FR-LRN.01.1). `keyword` matches the major name or slug. */
export class ExploreRoadmapFilterRequest extends PaginationRequest {
  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  departmentId?: number;

  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  majorId?: number;

  @ApiPropertyOptional({ description: 'Cohort year (K2023 → 2023)', example: 2023 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  cohortYear?: number;
}
