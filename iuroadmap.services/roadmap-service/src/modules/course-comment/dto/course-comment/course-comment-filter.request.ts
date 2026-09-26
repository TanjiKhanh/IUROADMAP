import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationRequest } from '@iuroadmap/shared';

/** Thread of a course, newest root comments first (FR-LRN.10.12: filter by academic year). */
export class CourseCommentFilterRequest extends PaginationRequest {
  @ApiPropertyOptional({ example: 2025 })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  academicYear?: number;
}
