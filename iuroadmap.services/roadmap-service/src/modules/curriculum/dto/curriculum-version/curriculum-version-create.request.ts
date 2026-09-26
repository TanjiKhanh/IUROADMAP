import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { AppConstant, EntityConstant } from '@iuroadmap/shared';

export class CurriculumVersionCreateRequest {
  @ApiProperty({ description: 'Cohort year the curriculum applies to (K2023 → 2023)', example: 2026 })
  @IsInt()
  @Min(AppConstant.AcademicYear.Min)
  @Max(AppConstant.AcademicYear.Max)
  @Type(() => Number)
  cohortYear!: number;

  @ApiProperty({ description: 'Credits required to graduate for this cohort', example: 135 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  totalCredits!: number;

  @ApiPropertyOptional({ description: 'Decision reference', example: '89/QĐ-ĐHQT.07.03.2022', maxLength: EntityConstant.DecisionRef })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.DecisionRef)
  decisionRef?: string;

  @ApiPropertyOptional({ description: 'Copy terms, nodes and relations (keys kept) from this curriculum; empty = blank draft' })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  fromVersionId?: number;
}
