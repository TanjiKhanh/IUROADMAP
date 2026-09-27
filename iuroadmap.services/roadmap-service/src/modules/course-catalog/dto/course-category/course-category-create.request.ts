import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EntityConstant } from '@iuroadmap/shared';
import { Patterns } from '../../../../common/patterns';

export class CourseCategoryCreateRequest {
  @ApiProperty({ description: 'Unique upper-case code', example: 'MAJOR', maxLength: EntityConstant.EnumLength })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.EnumLength)
  @Matches(Patterns.UpperCode)
  code!: string;

  @ApiProperty({ description: 'Display name', example: 'Major', maxLength: EntityConstant.ShortString })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.ShortString)
  name!: string;

  @ApiProperty({ description: 'Node fill color (#RRGGBB)', example: '#BDD7EE', maxLength: EntityConstant.HexColor })
  @IsString()
  @MaxLength(EntityConstant.HexColor)
  @Matches(Patterns.HexColor)
  fillColor!: string;

  @ApiProperty({ description: 'Node border color (#RRGGBB)', example: '#2F5597', maxLength: EntityConstant.HexColor })
  @IsString()
  @MaxLength(EntityConstant.HexColor)
  @Matches(Patterns.HexColor)
  borderColor!: string;

  @ApiPropertyOptional({ description: 'Order in the color legend', example: 1 })
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  sortOrder?: number;
}
