import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationRequest } from '@iuroadmap/shared';
import { OfferingStatusEnum } from '../../../../common/enums';

/** `keyword` matches the course code or name. */
export class CourseOfferingFilterRequest extends PaginationRequest {
  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  courseId?: number;

  @ApiPropertyOptional({ example: 2025 })
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

  @ApiPropertyOptional({ enum: OfferingStatusEnum, enumName: 'OfferingStatus' })
  @IsEnum(OfferingStatusEnum)
  @IsOptional()
  status?: OfferingStatusEnum;
}
