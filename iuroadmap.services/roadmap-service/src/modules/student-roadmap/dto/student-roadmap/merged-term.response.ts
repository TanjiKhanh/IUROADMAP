import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DeltaOriginEnum, TermInYearEnum, TermKindEnum } from '../../../../common/enums';
import { TermResultSummaryResponse } from './term-result-summary.response';

export class MergedTermResponse {
  @ApiProperty({ format: 'uuid' })
  termKey!: string;

  @ApiProperty({ enum: DeltaOriginEnum, enumName: 'DeltaOrigin', description: 'BASE = curriculum term, CUSTOM = added by the learner' })
  origin!: DeltaOriginEnum;

  @ApiProperty({ enum: TermKindEnum, enumName: 'TermKind' })
  kind!: TermKindEnum;

  @ApiProperty({ description: '0-based column position', example: 0 })
  position!: number;

  @ApiPropertyOptional({ description: 'Curriculum semester number', example: 1 })
  semesterNo?: number;

  @ApiPropertyOptional({ description: 'Custom term label', example: 'IE1' })
  customLabel?: string;

  @ApiPropertyOptional({ description: 'Academic year set by the learner (2025 = 2025-2026)', example: 2025 })
  academicYear?: number;

  @ApiPropertyOptional({ enum: TermInYearEnum, enumName: 'TermInYear' })
  termInYear?: TermInYearEnum;

  @ApiPropertyOptional({ description: 'academicYear, or an estimate from the cohort year', example: 2025 })
  resolvedAcademicYear?: number;

  @ApiProperty({ description: 'True when resolvedAcademicYear is an estimate' })
  academicYearEstimated!: boolean;

  @ApiProperty({ description: 'x in "(x+y)": credits of courses', example: 16 })
  courseCredits!: number;

  @ApiProperty({ description: 'y in "(x+y)": credits of unfilled elective slots', example: 4 })
  slotCredits!: number;

  @ApiPropertyOptional({ type: TermResultSummaryResponse, description: 'Results of this term' })
  summary?: TermResultSummaryResponse;

  @ApiPropertyOptional({ type: TermResultSummaryResponse, description: 'Cumulative results up to this term' })
  cumulative?: TermResultSummaryResponse;
}
