import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'X coordinate', example: 150 })
  @IsNumber()
  x!: number;

  @ApiProperty({ description: 'Y coordinate', example: 250 })
  @IsNumber()
  y!: number;
}

export class UpdateAdminCourseNodeMetaDto {
  @ApiPropertyOptional({ description: 'Course slug', example: 'intro-to-programming' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: 'Course name', example: 'Introduction to Programming' })
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
}

export class UpdateAdminTopicCoordsDto {
  @ApiProperty({ description: 'Topic UI coordinates', type: () => TopicCoordsDto })
  @ValidateNested()
  @Type(() => TopicCoordsDto)
  coords!: TopicCoordsDto;
}

export class CreateAdminTopicNodeDto {
  @ApiProperty({ description: 'Topic slug', example: 'variables-and-types' })
  @IsString()
  slug!: string;

  @ApiProperty({ description: 'Topic title', example: 'Variables and Data Types' })
  @IsString()
  title!: string;

  @ApiPropertyOptional({ description: 'Topic description', example: 'Understanding basic types in programming' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Learning objectives', example: 'Learn how to declare variables' })
  @IsOptional()
  @IsString()
  learningObjectives?: string;

  @ApiPropertyOptional({ description: 'Resources URL', example: 'https://example.com/resources/types' })
  @IsOptional()
  @IsString()
  resourcesUrl?: string;

  @ApiPropertyOptional({ description: 'Topic UI coordinates', type: () => TopicCoordsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => TopicCoordsDto)
  coords?: TopicCoordsDto;
}

export class UpdateAdminTopicNodeDto {
  @ApiPropertyOptional({ description: 'Topic slug', example: 'variables-and-types' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: 'Topic title', example: 'Variables and Data Types' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Topic description', example: 'Understanding basic types in programming' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Learning objectives', example: 'Learn how to declare variables' })
  @IsOptional()
  @IsString()
  learningObjectives?: string;

  @ApiPropertyOptional({ description: 'Resources URL', example: 'https://example.com/resources/types' })
  @IsOptional()
  @IsString()
  resourcesUrl?: string;

  @ApiPropertyOptional({ description: 'Topic UI coordinates', type: () => TopicCoordsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => TopicCoordsDto)
  coords?: TopicCoordsDto;
}

export class CreateAdminTopicEdgeDto {
  @ApiProperty({ description: 'Source topic ID', example: 1 })
  @IsInt()
  @Min(1)
  sourceTopicId!: number;

  @ApiProperty({ description: 'Target topic ID', example: 2 })
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
