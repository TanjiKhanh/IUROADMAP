import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CoordsDto {
  @ApiProperty({ description: 'X coordinate', example: 100 })
  @IsNumber()
  x!: number;

  @ApiProperty({ description: 'Y coordinate', example: 200 })
  @IsNumber()
  y!: number;
}

export class CreateCourseNodeDto {
  @ApiProperty({ description: 'Course node slug', example: 'intro-to-programming' })
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiProperty({ description: 'Course node name', example: 'Introduction to Programming' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'Number of credits', example: 3 })
  @IsInt()
  @Min(0)
  credits!: number;

  @ApiPropertyOptional({ description: 'Course description', example: 'Basic programming concepts in Python' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'UI coordinates', type: () => CoordsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CoordsDto)
  coords?: CoordsDto;

  @ApiPropertyOptional({ description: 'Array of prerequisite node IDs', example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  Prerequisites?: number[];
}

export class UpdateCourseNodeDto {
  @ApiPropertyOptional({ description: 'Course node slug', example: 'intro-to-programming' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: 'Course node name', example: 'Introduction to Programming' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Number of credits', example: 3 })
  @IsOptional()
  @IsInt()
  @Min(0)
  credits?: number;

  @ApiPropertyOptional({ description: 'Course description', example: 'Basic programming concepts in Python' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'UI coordinates', type: () => CoordsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CoordsDto)
  coords?: CoordsDto;

  @ApiPropertyOptional({ description: 'Array of prerequisite node IDs', example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  Prerequisites?: number[];
}

export class CreatePrerequisiteDto {
  @ApiProperty({ description: 'Target course node ID', example: 2 })
  @IsInt()
  @Min(1)
  course_node_id!: number;

  @ApiProperty({ description: 'Prerequisite course node ID', example: 1 })
  @IsInt()
  @Min(1)
  prerequisite_node_id!: number;
}

export class AdminCourseNodeResponseDto {
  @ApiProperty({ description: 'Course node ID', example: 10 })
  id!: number;

  @ApiProperty({ description: 'Roadmap ID', example: 1 })
  roadmap_id!: number;

  @ApiProperty({ description: 'Course node slug', example: 'intro-to-programming' })
  slug!: string;

  @ApiProperty({ description: 'Course node name', example: 'Introduction to Programming' })
  name!: string;

  @ApiProperty({ description: 'Number of credits', example: 3 })
  credits!: number;

  @ApiPropertyOptional({ description: 'Course description', example: 'Basic programming concepts in Python' })
  description!: string | null;

  @ApiPropertyOptional({ description: 'UI coordinates', example: { x: 100, y: 200 } })
  coords!: { x: number; y: number } | null;

  @ApiProperty({ description: 'Creation timestamp', example: '2026-07-08T00:00:00.000Z' })
  created_at!: string;

  @ApiProperty({ description: 'Last update timestamp', example: '2026-07-08T00:00:00.000Z' })
  updated_at!: string;
}

export class AdminPrerequisiteEdgeResponseDto {
  @ApiProperty({ description: 'Edge ID', example: 1 })
  id!: number;

  @ApiProperty({ description: 'Target course node ID', example: 2 })
  course_node_id!: number;

  @ApiProperty({ description: 'Prerequisite course node ID', example: 1 })
  prerequisite_node_id!: number;

  @ApiProperty({ description: 'Creation timestamp', example: '2026-07-08T00:00:00.000Z' })
  created_at!: string;

  @ApiProperty({ description: 'Last update timestamp', example: '2026-07-08T00:00:00.000Z' })
  updated_at!: string;
}



export interface AdminRoadmapGraph {
  roadmapId: number;
  nodes: Array<{
    id: number;
    slug: string;
    name: string;
    coords: { x: number; y: number } | null;
    credits: number;
    description: string | null;
  }>;
  edges: Array<{
    id: number;
    from: number;
    to: number;
  }>;
}