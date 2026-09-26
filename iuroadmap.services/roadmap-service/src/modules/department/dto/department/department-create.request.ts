import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { EntityConstant } from '@iuroadmap/shared';
import { Patterns } from '../../../../common/patterns';

export class DepartmentCreateRequest {
  @ApiProperty({ description: 'Unique kebab-case slug', example: 'school-of-computing', maxLength: EntityConstant.ShortString })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.ShortString)
  @Matches(Patterns.Slug)
  slug!: string;

  @ApiProperty({ description: 'Department name', example: 'School of Computer Science and Engineering', maxLength: EntityConstant.LongString })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.LongString)
  name!: string;

  @ApiPropertyOptional({ description: 'Description', maxLength: EntityConstant.DescriptionLong })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.DescriptionLong)
  description?: string;
}
