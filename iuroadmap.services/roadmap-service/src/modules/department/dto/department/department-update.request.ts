import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Matches, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EntityConstant } from '@iuroadmap/shared';
import { Patterns } from '../../../../common/patterns';

export class DepartmentUpdateRequest {
  @ApiProperty({ description: 'Department ID', example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  id!: number;

  @ApiPropertyOptional({ description: 'Unique kebab-case slug', maxLength: EntityConstant.ShortString })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.ShortString)
  @Matches(Patterns.Slug)
  slug?: string;

  @ApiPropertyOptional({ description: 'Department name', maxLength: EntityConstant.LongString })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.LongString)
  name?: string;

  @ApiPropertyOptional({ description: 'Description', maxLength: EntityConstant.DescriptionLong })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.DescriptionLong)
  description?: string;
}
