import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'Unique node key', example: 'node-1' })
  @IsString()
  @IsNotEmpty()
  nodeKey!: string;

  @ApiProperty({ description: 'Node title', example: 'Introduction to Node.js' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ description: 'Brief summary of the node', example: 'Learn basic Node.js concepts' })
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiPropertyOptional({ description: 'Detailed markdown content', example: '# Node.js Basics\nExplain concepts here.' })
  @IsOptional()
  @IsString()
  contentMd?: string;

  @ApiPropertyOptional({ description: 'Whether this node is required', default: true, example: true })
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean = true;

  @ApiPropertyOptional({ description: 'Additional metadata object', example: { estimatedHours: 5 } })
  @IsOptional()
  metadata?: any;

  @ApiPropertyOptional({ description: 'UI coordinates', example: { x: 100, y: 200 } })
  @IsOptional()
  coords?: any;
}

export class CreateRoadmapEdgeDto {
  @ApiProperty({ description: 'Source node key', example: 'node-1' })
  @IsString()
  @IsNotEmpty()
  sourceKey!: string;

  @ApiProperty({ description: 'Target node key', example: 'node-2' })
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
  @ApiPropertyOptional({ description: 'Roadmap slug', example: 'nodejs-backend-roadmap' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ description: 'Roadmap title', example: 'Node.js Backend Roadmap' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({ description: 'Roadmap description', example: 'Complete guide to becoming a Node.js backend developer' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Associated course ID', example: 1 })
  @IsOptional()
  @IsNumber()
  courseId?: number;

  @ApiPropertyOptional({ description: 'Roadmap structure object containing nodes and edges', example: { nodes: [], edges: [] } })
  @IsOptional()
  structure?: any;

  @ApiPropertyOptional({ description: 'Array of roadmap nodes', type: [CreateRoadmapNodeDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoadmapNodeDto)
  nodes?: CreateRoadmapNodeDto[];

  @ApiPropertyOptional({ description: 'Array of roadmap edges', type: [CreateRoadmapEdgeDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRoadmapEdgeDto)
  edges?: CreateRoadmapEdgeDto[];
}