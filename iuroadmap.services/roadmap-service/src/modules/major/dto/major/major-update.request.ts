import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Matches, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EntityConstant } from '@iuroadmap/shared';
import { Patterns } from '../../../../common/patterns';

export class MajorUpdateRequest {
  @ApiProperty({ description: 'Major ID', example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  id!: number;

  @ApiPropertyOptional({ maxLength: EntityConstant.ShortString })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.ShortString)
  @Matches(Patterns.Slug)
  slug?: string;

  @ApiPropertyOptional({ maxLength: EntityConstant.LongString })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.LongString)
  name?: string;

  @ApiPropertyOptional({ description: 'Move the major to another department' })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  departmentId?: number;

  @ApiPropertyOptional({ maxLength: EntityConstant.DescriptionLong })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.DescriptionLong)
  description?: string;
}
