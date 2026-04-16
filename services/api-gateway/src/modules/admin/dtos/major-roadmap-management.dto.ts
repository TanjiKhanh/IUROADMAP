import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CoordsDto {
  @IsNumber()
  x!: number;

  @IsNumber()
  y!: number;
}

export class CreateCourseNodeDto {
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsInt()
  @Min(0)
  credits!: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordsDto)
  coords?: CoordsDto;
}

export class UpdateCourseNodeDto {
  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  credits?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordsDto)
  coords?: CoordsDto;
}

export class CreatePrerequisiteDto {
  @IsInt()
  @Min(1)
  course_node_id!: number;

  @IsInt()
  @Min(1)
  prerequisite_node_id!: number;
}

export class AdminCourseNodeResponseDto {
  id!: number;
  roadmap_id!: number;
  slug!: string;
  name!: string;
  credits!: number;
  description!: string | null;
  coords!: { x: number; y: number } | null;
  created_at!: string;
  updated_at!: string;
}

export class AdminPrerequisiteEdgeResponseDto {
  id!: number;
  course_node_id!: number;
  prerequisite_node_id!: number;
  created_at!: string;
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