import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/** GPA block of a term or of the cumulative results up to a term (FR-LRN.06). */
export class TermResultSummaryResponse {
  @ApiPropertyOptional({ description: 'Average on the 100 scale, 1 decimal', example: 73.9 })
  gpa100?: number;

  @ApiPropertyOptional({ description: 'Average on the 4 scale, 2 decimals', example: 2.97 })
  gpa4?: number;

  @ApiProperty({ description: 'Credits of passed courses that count toward graduation', example: 15 })
  creditsPassed!: number;

  @ApiProperty({ description: 'Credits in the GPA denominator', example: 17 })
  creditsInGpa!: number;

  @ApiPropertyOptional({ description: 'i18n key of the classification (GPA 100)', example: 'roadmap.classification.good' })
  classificationKey?: string;
}
