import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoadmapNodeDto {
  @IsString()
  @IsNotEmpty()
  nodeKey!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  contentMd?: string;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean = true;

  @IsOptional()
  metadata?: any;

  @IsOptional()
  coords?: any;
}

export class CreateRoadmapEdgeDto {
  @IsString()
  @IsNotEmpty()
  sourceKey!: string;

  @IsString()
  @IsNotEmpty()
  targetKey!: string;
}

/**
 * CreateRoadmapDto - accepts either:
 *  - nodes[] and edges[] top-level arrays
 *  - or structure object containing nodes and edges
 */
export class CreateRoadmapDto {
  @IsOptional()
  @IsString()
  slug?: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  courseId?: number;

  @IsOptional()
  structure?: any;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoadmapNodeDto)
  nodes?: CreateRoadmapNodeDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoadmapEdgeDto)
  edges?: CreateRoadmapEdgeDto[];
}