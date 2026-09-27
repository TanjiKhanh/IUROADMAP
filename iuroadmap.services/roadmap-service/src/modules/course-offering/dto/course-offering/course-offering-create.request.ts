import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { AppConstant } from '@iuroadmap/shared';

export class CourseOfferingCreateRequest {
  @ApiProperty({ description: 'Course ID', example: 12 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  courseId!: number;

  @ApiProperty({ description: 'Start year of the academic year (2025 = 2025-2026)', example: 2025 })
  @IsInt()
  @Min(AppConstant.AcademicYear.Min)
  @Max(AppConstant.AcademicYear.Max)
  @Type(() => Number)
  academicYear!: number;

  @ApiPropertyOptional({ description: 'Copy info, weights, project, lecturers and topics from this offering' })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  fromOfferingId?: number;
}
