import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Matches, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EntityConstant } from '@iuroadmap/shared';
import { Patterns } from '../../../../common/patterns';

export class CourseCategoryUpdateRequest {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  id!: number;

  @ApiPropertyOptional({ maxLength: EntityConstant.EnumLength })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.EnumLength)
  @Matches(Patterns.UpperCode)
  code?: string;

  @ApiPropertyOptional({ maxLength: EntityConstant.ShortString })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.ShortString)
  name?: string;

  @ApiPropertyOptional({ maxLength: EntityConstant.HexColor })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.HexColor)
  @Matches(Patterns.HexColor)
  fillColor?: string;

  @ApiPropertyOptional({ maxLength: EntityConstant.HexColor })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.HexColor)
  @Matches(Patterns.HexColor)
  borderColor?: string;

  @ApiPropertyOptional()
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  sortOrder?: number;
}
