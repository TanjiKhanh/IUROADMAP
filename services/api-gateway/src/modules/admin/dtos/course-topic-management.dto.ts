import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TopicCoordsDto {
  @IsNumber()
  x!: number;

  @IsNumber()
  y!: number;
}

export class UpdateAdminCourseNodeMetaDto {
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
}

export class UpdateAdminTopicCoordsDto {
  @ValidateNested()
  @Type(() => TopicCoordsDto)
  coords!: TopicCoordsDto;
}

export class CreateAdminTopicNodeDto {
  @IsString()
  slug!: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  learningObjectives?: string;

  @IsOptional()
  @IsString()
  resourcesUrl?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TopicCoordsDto)
  coords?: TopicCoordsDto;
}

export class UpdateAdminTopicNodeDto {
  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  learningObjectives?: string;

  @IsOptional()
  @IsString()
  resourcesUrl?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => TopicCoordsDto)
  coords?: TopicCoordsDto;
}

export class CreateAdminTopicEdgeDto {
  @IsInt()
  @Min(1)
  sourceTopicId!: number;

  @IsInt()
  @Min(1)
  targetTopicId!: number;
}

export interface AdminCourseListItem {
  id: number;
  roadmapId: number;
  roadmapSlug: string;
  roadmapName: string;
  slug: string;
  name: string;
  credits: number;
  description: string | null;
}

export interface AdminTopicNode {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  coords: { x: number; y: number } | null;
  learningObjectives: string | null;
  resourcesUrl: string | null;
}

export interface AdminTopicEdge {
  id: number;
  fromTopicId: number;
  toTopicId: number;
}

export interface AdminCourseTopicsGraph {
  courseNodeId: number;
  topics: AdminTopicNode[];
  edges: AdminTopicEdge[];
}

export interface AdminTopicCoordsUpdateResponse {
  id: number;
  coords: { x: number; y: number } | null;
  updated_at: string;
}
