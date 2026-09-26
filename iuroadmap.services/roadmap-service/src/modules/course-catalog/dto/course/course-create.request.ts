import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EntityConstant } from '@iuroadmap/shared';
import { Patterns } from '../../../../common/patterns';
import { GradingModeEnum } from '../../../../common/enums';

export class CourseCreateRequest {
  @ApiProperty({ description: 'Unique course code', example: 'IT089IU', maxLength: EntityConstant.CourseCode })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.CourseCode)
  @Matches(Patterns.CourseCode)
  code!: string;

  @ApiProperty({ description: 'Course name', example: 'Computer Architecture', maxLength: EntityConstant.LongString })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.LongString)
  name!: string;

  @ApiProperty({ description: 'Theory credits (LT)', example: 3, minimum: 0 })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  theoryCredits!: number;

  @ApiProperty({ description: 'Lab credits (TH)', example: 1, minimum: 0 })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  labCredits!: number;

  @ApiProperty({ description: 'Course category ID', example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  categoryId!: number;

  @ApiPropertyOptional({ enum: GradingModeEnum, enumName: 'GradingMode', default: GradingModeEnum.SCORE })
  @IsEnum(GradingModeEnum)
  @IsOptional()
  gradingMode?: GradingModeEnum;

  @ApiPropertyOptional({ description: 'Counted in GPA', default: true })
  @IsBoolean()
  @IsOptional()
  countsTowardGpa?: boolean;

  @ApiPropertyOptional({ description: 'Counted toward graduation credits (false for Intensive English)', default: true })
  @IsBoolean()
  @IsOptional()
  countsTowardCredits?: boolean;

  @ApiPropertyOptional({ description: 'General description (stable across years)', maxLength: EntityConstant.DescriptionLong })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.DescriptionLong)
  description?: string;
}
