import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString, IsUUID, Max, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { AppConstant, EntityConstant } from '@iuroadmap/shared';
import { CourseResultStatusEnum } from '../../../../common/enums';

/**
 * One row of the semester results drawer (FL-LRN-05).
 * SCORE course: weights + component scores (total computed when all 3 are set) or a total typed in.
 * PASS_FAIL course: isPassed only. `remove` deletes the row.
 */
export class TermResultItemRequest {
  @ApiProperty({ format: 'uuid' })
  @IsUUID('4')
  nodeKey!: string;

  @ApiPropertyOptional({ description: 'Delete the result of this course' })
  @IsBoolean()
  @IsOptional()
  remove?: boolean;

  @ApiPropertyOptional({ enum: CourseResultStatusEnum, enumName: 'CourseResultStatus', description: 'IN_PROGRESS = studying, no score yet' })
  @IsEnum(CourseResultStatusEnum)
  @IsOptional()
  status?: CourseResultStatusEnum;

  @ApiPropertyOptional({ nullable: true })
  @IsInt()
  @Min(0)
  @Max(AppConstant.Roadmap.WeightTotal)
  @IsOptional()
  @Type(() => Number)
  weightProcess?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsInt()
  @Min(0)
  @Max(AppConstant.Roadmap.WeightTotal)
  @IsOptional()
  @Type(() => Number)
  weightMidterm?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsInt()
  @Min(0)
  @Max(AppConstant.Roadmap.WeightTotal)
  @IsOptional()
  @Type(() => Number)
  weightFinal?: number | null;

  @ApiPropertyOptional({ nullable: true, description: '0–100, one decimal' })
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(AppConstant.Roadmap.MaxScore)
  @IsOptional()
  @Type(() => Number)
  scoreProcess?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(AppConstant.Roadmap.MaxScore)
  @IsOptional()
  @Type(() => Number)
  scoreMidterm?: number | null;

  @ApiPropertyOptional({ nullable: true })
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(AppConstant.Roadmap.MaxScore)
  @IsOptional()
  @Type(() => Number)
  scoreFinal?: number | null;

  @ApiPropertyOptional({ nullable: true, description: 'Used only when the 3 component scores are not all set' })
  @IsInt()
  @Min(0)
  @Max(AppConstant.Roadmap.MaxScore)
  @IsOptional()
  @Type(() => Number)
  totalScore?: number | null;

  @ApiPropertyOptional({ nullable: true, description: 'PASS_FAIL courses: true = P, false = F' })
  @IsBoolean()
  @IsOptional()
  isPassed?: boolean | null;

  @ApiPropertyOptional({ maxLength: EntityConstant.ShortNote })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.ShortNote)
  note?: string;
}
