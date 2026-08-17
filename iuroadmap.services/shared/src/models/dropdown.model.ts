import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class BaseDropdownRequestDto {
  @ApiPropertyOptional({ description: 'Filter by keyword', example: 'computing' })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({ description: 'Max items to return', example: 50, default: 50 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 50;

  @ApiPropertyOptional({ description: 'Parent ID for cascading filter', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  parentId?: number;
}

export class DropdownItemDto {
  @ApiProperty({ description: 'Record ID', example: 'uuid-string' })
  id!: string;

  @ApiProperty({ description: 'Display label', example: 'School of Computing' })
  label!: string;

  @ApiPropertyOptional({ description: 'Optional metadata', example: { slug: 'school-of-computing' } })
  metadata?: Record<string, any>;
}
