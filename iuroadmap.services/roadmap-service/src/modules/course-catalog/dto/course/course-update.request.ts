import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, Matches, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EntityConstant } from '@iuroadmap/shared';
import { Patterns } from '../../../../common/patterns';
import { GradingModeEnum } from '../../../../common/enums';

export class CourseUpdateRequest {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  id!: number;

  @ApiPropertyOptional({ maxLength: EntityConstant.CourseCode })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.CourseCode)
  @Matches(Patterns.CourseCode)
  code?: string;

  @ApiPropertyOptional({ maxLength: EntityConstant.LongString })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.LongString)
  name?: string;

  @ApiPropertyOptional({ minimum: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  theoryCredits?: number;

  @ApiPropertyOptional({ minimum: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  labCredits?: number;

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

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  countsTowardGpa?: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  countsTowardCredits?: boolean;

  @ApiPropertyOptional({ maxLength: EntityConstant.DescriptionLong })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.DescriptionLong)
  description?: string;
}
