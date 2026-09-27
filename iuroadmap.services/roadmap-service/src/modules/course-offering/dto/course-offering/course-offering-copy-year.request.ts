import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { AppConstant } from '@iuroadmap/shared';

/** Copies every PUBLISHED offering of `fromYear` to `toYear` as DRAFT (FR-RDM.08.9). */
export class CourseOfferingCopyYearRequest {
  @ApiProperty({ example: 2025 })
  @IsInt()
  @Min(AppConstant.AcademicYear.Min)
  @Max(AppConstant.AcademicYear.Max)
  @Type(() => Number)
  fromYear!: number;

  @ApiProperty({ example: 2026 })
  @IsInt()
  @Min(AppConstant.AcademicYear.Min)
  @Max(AppConstant.AcademicYear.Max)
  @Type(() => Number)
  toYear!: number;
}
