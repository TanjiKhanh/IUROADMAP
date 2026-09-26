import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsIn, IsInt, IsOptional, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PaginationRequest } from '@iuroadmap/shared';
import { GradingModeEnum } from '../../../../common/enums';

export const EXPLORE_COURSE_SORTS = ['code', 'name', 'credits', 'comments'] as const;

/**
 * Course Explorer filters (FR-LRN.11.2). `keyword` matches code or name.
 * Department / major: the course is in a PUBLISHED curriculum of that major (or department).
 * Academic year, lecturer, project: taken from PUBLISHED offerings (of that year when given).
 */
export class ExploreCourseFilterRequest extends PaginationRequest {
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

  @ApiPropertyOptional({ description: '2025 = 2025-2026', example: 2025 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  academicYear?: number;

  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  lecturerId?: number;

  @ApiPropertyOptional({ description: 'Exact credits (theory + lab)', example: 4 })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  credits?: number;

  @ApiPropertyOptional()
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  minCredits?: number;

  @ApiPropertyOptional()
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  maxCredits?: number;

  @ApiPropertyOptional({ description: 'Only courses with a project' })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === 'true' ? true : value === 'false' ? false : value))
  hasProject?: boolean;

  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;

  @ApiPropertyOptional({ enum: GradingModeEnum, enumName: 'GradingMode' })
  @IsEnum(GradingModeEnum)
  @IsOptional()
  gradingMode?: GradingModeEnum;

  @ApiPropertyOptional({ enum: EXPLORE_COURSE_SORTS, default: 'code' })
  @IsIn(EXPLORE_COURSE_SORTS as unknown as string[])
  @IsOptional()
  sort?: (typeof EXPLORE_COURSE_SORTS)[number];
}
