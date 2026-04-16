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
import { PartialType } from '@nestjs/mapped-types';

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

export class UpdateCourseNodeDto extends PartialType(CreateCourseNodeDto) {}

export class CreatePrerequisiteDto {
  @IsInt()
  @Min(1)
  course_node_id!: number;

  @IsInt()
  @Min(1)
  prerequisite_node_id!: number;
}

export class CourseNodeResponseDto {
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

export class PrerequisiteEdgeResponseDto {
  id!: number;
  course_node_id!: number;
  prerequisite_node_id!: number;
  created_at!: string;
  updated_at!: string;
}
