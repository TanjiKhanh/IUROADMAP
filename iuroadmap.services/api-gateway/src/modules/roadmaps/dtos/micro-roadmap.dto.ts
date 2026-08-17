import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MicroTopicNodeDto {
  @ApiProperty({ description: 'Topic Node ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Topic slug', example: 'introduction-to-nestjs' })
  slug: string;

  @ApiProperty({ description: 'Topic title', example: 'Introduction to NestJS' })
  title: string;

  @ApiPropertyOptional({ description: 'Topic description', example: 'Overview of NestJS concepts' })
  description?: string | null;

  @ApiPropertyOptional({ description: 'Coordinates for graph rendering', example: { x: 100, y: 200 } })
  coords?: Record<string, any> | null;

  @ApiPropertyOptional({ description: 'Learning objectives', example: 'Understand Dependency Injection' })
  learning_objectives?: string | null;

  @ApiPropertyOptional({ description: 'External resources URL', example: 'https://docs.nestjs.com' })
  resources_url?: string | null;
}

export class MicroTopicEdgeDto {
  @ApiProperty({ description: 'Edge ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Source node ID', example: 1 })
  from: number;

  @ApiProperty({ description: 'Target node ID', example: 2 })
  to: number;
}

export class MicroRoadmapResponseDto {
  @ApiProperty({ description: 'Course Node ID', example: 10 })
  courseNodeId: number;

  @ApiProperty({ description: 'List of micro topics', type: [MicroTopicNodeDto] })
  topics: MicroTopicNodeDto[];

  @ApiProperty({ description: 'List of edges connecting micro topics', type: [MicroTopicEdgeDto] })
  edges: MicroTopicEdgeDto[];
}