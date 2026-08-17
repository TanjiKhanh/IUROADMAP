import { ApiProperty } from '@nestjs/swagger';

export class UserRoadmapSummaryDto {
  @ApiProperty({ description: 'Roadmap ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'User ID', example: 1 })
  userId: number;

  @ApiProperty({ description: 'Roadmap title', example: 'Software Engineering Core' })
  title: string;

  @ApiProperty({ description: 'Roadmap slug', example: 'software-engineering-core' })
  slug: string;

  @ApiProperty({ description: 'Progress percentage', example: 45.5 })
  progressPercent: number;

  @ApiProperty({ description: 'Total course nodes', example: 40 })
  totalNodes: number;

  @ApiProperty({ description: 'Completed course nodes', example: 18 })
  completedNodes: number;

  @ApiProperty({ description: 'Start date', example: '2026-01-15T00:00:00.000Z' })
  startDate: string;

  @ApiProperty({ description: 'Last updated timestamp', example: '2026-07-11T00:00:00.000Z' })
  updatedAt: string;
}