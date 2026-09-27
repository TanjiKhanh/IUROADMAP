import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EntityConstant } from '@iuroadmap/shared';
import { Patterns } from '../../../../common/patterns';

export class MajorCreateRequest {
  @ApiProperty({ description: 'Unique kebab-case slug', example: 'computer-science', maxLength: EntityConstant.ShortString })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.ShortString)
  @Matches(Patterns.Slug)
  slug!: string;

  @ApiProperty({ description: 'Major name', example: 'Computer Science', maxLength: EntityConstant.LongString })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.LongString)
  name!: string;

  @ApiProperty({ description: 'Department ID', example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  departmentId!: number;

  @ApiPropertyOptional({ description: 'Description', maxLength: EntityConstant.DescriptionLong })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.DescriptionLong)
  description?: string;
}
