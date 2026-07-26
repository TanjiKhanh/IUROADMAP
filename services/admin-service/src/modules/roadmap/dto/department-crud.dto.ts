import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({ description: 'Department slug', example: 'school-of-computing' })
  @IsString()
  slug: string;

  @ApiProperty({ description: 'Department name', example: 'School of Computing and Information Technology' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Department description', example: 'Leading research and education in computing' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateDepartmentDto {
  @ApiPropertyOptional({ description: 'Department slug', example: 'school-of-computing' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: 'Department name', example: 'School of Computing and Information Technology' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Department description', example: 'Updated department description' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class DepartmentResponseDto {
  @ApiProperty({ description: 'Department ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Department slug', example: 'school-of-computing' })
  slug: string;

  @ApiProperty({ description: 'Department name', example: 'School of Computing and Information Technology' })
  name: string;

  @ApiPropertyOptional({ description: 'Department description', example: 'Leading research and education in computing' })
  description?: string | null;

  @ApiProperty({ description: 'Creation timestamp', example: '2026-07-08T00:00:00.000Z' })
  created_at: string;

  @ApiProperty({ description: 'Last update timestamp', example: '2026-07-08T00:00:00.000Z' })
  updated_at: string;
}