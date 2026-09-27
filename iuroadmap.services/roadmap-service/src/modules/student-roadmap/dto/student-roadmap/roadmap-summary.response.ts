import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** Summary bar of My Roadmap (FR-LRN.03.4). Progress is not capped at 100% (BR-LRN-04). */
export class RoadmapSummaryResponse {
  @ApiProperty({ example: 98 })
  creditsPassed!: number;

  @ApiProperty({ description: 'Credits required by the curriculum (total_credits)', example: 135 })
  totalCredits!: number;

  @ApiProperty({ description: 'Credits currently planned in regular and summer terms', example: 135 })
  plannedCredits!: number;

  @ApiProperty({ description: 'floor(creditsPassed / totalCredits × 100), can exceed 100', example: 72 })
  progressPercent!: number;

  @ApiPropertyOptional({ example: 78.4 })
  gpa100?: number;

  @ApiPropertyOptional({ example: 3.12 })
  gpa4?: number;

  @ApiPropertyOptional({ example: 'roadmap.classification.good' })
  classificationKey?: string;
}
