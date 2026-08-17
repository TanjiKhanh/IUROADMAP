import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MacroRoadmapNodeDto {
  @ApiProperty({ description: 'Node ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Node slug', example: 'calculus-1' })
  slug: string;

  @ApiProperty({ description: 'Node name', example: 'Calculus I' })
  name: string;

  @ApiProperty({ description: 'Credits required', example: 3 })
  credits: number;

  @ApiPropertyOptional({ description: 'Graph coordinates', example: { x: 0, y: 100 } })
  coords?: { x?: number; y?: number } | null;

  @ApiProperty({ description: 'Node completion status', example: 'AVAILABLE', enum: ['AVAILABLE', 'IN_PROGRESS', 'COMPLETED'] })
  status: 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED';
}

export class MacroRoadmapEdgeDto {
  @ApiProperty({ description: 'Edge ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Source node ID', example: 1 })
  from: number;

  @ApiProperty({ description: 'Target node ID', example: 2 })
  to: number;
}

export class MacroRoadmapResponseDto {
  @ApiProperty({ description: 'User Roadmap ID', example: 1 })
  userRoadmapId: number;

  @ApiPropertyOptional({ description: 'Roadmap description', example: 'Core engineering curriculum' })
  description?: string | null;

  @ApiProperty({ description: 'Roadmap ID', example: 101 })
  roadmapId: number;

  @ApiProperty({ description: 'Completion percentage', example: 25.0 })
  completion_percentage: number;

  @ApiProperty({ description: 'Total credits earned so far', example: 30 })
  total_credits_earned: number;

  @ApiProperty({ description: 'Total credits required', example: 130 })
  total_credits_required: number;

  @ApiProperty({ description: 'Macro roadmap nodes', type: [MacroRoadmapNodeDto] })
  nodes: MacroRoadmapNodeDto[];

  @ApiProperty({ description: 'Macro roadmap edges', type: [MacroRoadmapEdgeDto] })
  edges: MacroRoadmapEdgeDto[];
}