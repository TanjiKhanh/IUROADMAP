import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationRequest } from '@iuroadmap/shared';
import { GradingModeEnum } from '../../../../common/enums';

/** `keyword` matches code or name. */
export class CourseFilterRequest extends PaginationRequest {
  @ApiPropertyOptional({ description: 'Filter by category' })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  categoryId?: number;

  @ApiPropertyOptional({ description: 'Courses used in at least one curriculum of this major (FR-RDM.00.6)' })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  majorId?: number;

  @ApiPropertyOptional({ enum: GradingModeEnum, enumName: 'GradingMode' })
  @IsEnum(GradingModeEnum)
  @IsOptional()
  gradingMode?: GradingModeEnum;
}
