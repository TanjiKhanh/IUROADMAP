import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class TopicCoordsDto {
  @ApiProperty({ description: 'X coordinate', example: 150 })
  @IsNumber()
  x!: number;

  @ApiProperty({ description: 'Y coordinate', example: 250 })
  @IsNumber()
  y!: number;
}

export class CreateTopicNodeDto {
  @ApiProperty({ description: 'Topic slug', example: 'variables-and-types' })
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @ApiProperty({ description: 'Topic title', example: 'Variables and Data Types' })
  @IsString()
  @IsNotEmpty()
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

export class UpdateTopicNodeDto {
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

export class UpdateCourseNodeMetaDto {
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

export class UpdateTopicCoordsDto {
  @ApiProperty({ description: 'Topic UI coordinates', type: () => TopicCoordsDto })
  @ValidateNested()
  @Type(() => TopicCoordsDto)
  coords!: TopicCoordsDto;
}

export class CreateTopicEdgeDto {
  @ApiProperty({ description: 'Source topic ID', example: 1 })
  @IsInt()
  @Min(1)
  sourceTopicId!: number;

  @ApiProperty({ description: 'Target topic ID', example: 2 })
  @IsInt()
  @Min(1)
  targetTopicId!: number;
}

export class CourseNodeListItemDto {
  @ApiProperty({ description: 'Course node ID', example: 10 })
  id!: number;

  @ApiProperty({ description: 'Roadmap ID', example: 1 })
  roadmapId!: number;

  @ApiProperty({ description: 'Roadmap slug', example: 'computer-science' })
  roadmapSlug!: string;

  @ApiProperty({ description: 'Roadmap name', example: 'Computer Science Roadmap' })
  roadmapName!: string;

  @ApiProperty({ description: 'Course node slug', example: 'intro-to-programming' })
  slug!: string;

  @ApiProperty({ description: 'Course node name', example: 'Introduction to Programming' })
  name!: string;

  @ApiProperty({ description: 'Number of credits', example: 3 })
  credits!: number;

  @ApiPropertyOptional({ description: 'Course description', example: 'Basic programming concepts in Python' })
  description!: string | null;
}

export class TopicEdgeResponseDto {
  @ApiProperty({ description: 'Edge ID', example: 1 })
  id!: number;

  @ApiProperty({ description: 'Source topic ID', example: 1 })
  fromTopicId!: number;

  @ApiProperty({ description: 'Target topic ID', example: 2 })
  toTopicId!: number;
}

export class TopicNodeResponseDto {
  @ApiProperty({ description: 'Topic ID', example: 1 })
  id!: number;

  @ApiProperty({ description: 'Topic slug', example: 'variables-and-types' })
  slug!: string;

  @ApiProperty({ description: 'Topic title', example: 'Variables and Data Types' })
  title!: string;

  @ApiPropertyOptional({ description: 'Topic description', example: 'Understanding basic types in programming' })
  description!: string | null;

  @ApiPropertyOptional({ description: 'Topic UI coordinates', example: { x: 150, y: 250 } })
  coords!: { x: number; y: number } | null;

  @ApiPropertyOptional({ description: 'Learning objectives', example: 'Learn how to declare variables' })
  learningObjectives!: string | null;

  @ApiPropertyOptional({ description: 'Resources URL', example: 'https://example.com/resources/types' })
  resourcesUrl!: string | null;
}

export class CourseTopicsGraphResponseDto {
  @ApiProperty({ description: 'Course node ID', example: 10 })
  courseNodeId!: number;

  @ApiProperty({ description: 'Array of topic nodes', type: [TopicNodeResponseDto] })
  topics!: TopicNodeResponseDto[];

  @ApiProperty({ description: 'Array of topic edges', type: [TopicEdgeResponseDto] })
  edges!: TopicEdgeResponseDto[];
}
