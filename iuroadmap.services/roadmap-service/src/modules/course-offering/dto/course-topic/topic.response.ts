import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TopicCoordsResponse {
  @ApiProperty()
  x!: number;

  @ApiProperty()
  y!: number;
}

export class TopicResponse {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'variables-and-types' })
  slug!: string;

  @ApiProperty({ example: 'Variables and Data Types' })
  title!: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  learningObjectives?: string;

  @ApiPropertyOptional()
  resourcesUrl?: string;

  @ApiPropertyOptional({ example: 2.5 })
  estimatedHours?: number;

  @ApiPropertyOptional({ type: TopicCoordsResponse })
  coords?: TopicCoordsResponse;
}
