// gateway/src/modules/roadmaps/dtos/roadmap.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class RoadmapDto {
  @ApiProperty({ description: 'Roadmap ID', example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Roadmap slug', example: 'computer-science' })
  @IsString()
  slug: string;

  @ApiProperty({ description: 'Roadmap name', example: 'Computer Science Roadmap' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Total credits required', example: 120 })
  @IsNumber()
  total_credits: number;

  @ApiPropertyOptional({ description: 'Creation timestamp', example: '2026-07-08T00:00:00.000Z' })
  @IsOptional()
  created_at?: Date;

  @ApiPropertyOptional({ description: 'Last update timestamp', example: '2026-07-08T00:00:00.000Z' })
  @IsOptional()
  updated_at?: Date;
}

export class BrowseRoadmapsDto {
  @ApiProperty({ description: 'Response status', example: 'success' })
  status: string;

  @ApiProperty({ description: 'List of roadmaps', type: [RoadmapDto] })
  data: RoadmapDto[];
}