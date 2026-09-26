import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EntityConstant } from '@iuroadmap/shared';

/** Only a DRAFT can be updated (BR-RM-11). */
export class CurriculumVersionUpdateRequest {
  @ApiPropertyOptional({ example: 135 })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  totalCredits?: number;

  @ApiPropertyOptional({ maxLength: EntityConstant.DecisionRef })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.DecisionRef)
  decisionRef?: string;
}
