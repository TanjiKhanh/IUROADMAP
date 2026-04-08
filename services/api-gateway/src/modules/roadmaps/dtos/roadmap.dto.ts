// gateway/src/modules/roadmaps/dtos/roadmap.dto.ts

import { IsNumber, IsString, IsOptional } from 'class-validator';

export class RoadmapDto {
  @IsNumber()
  id: number;

  @IsString()
  slug: string;

  @IsString()
  name: string;

  @IsNumber()
  total_credits: number;

  @IsOptional()
  created_at?: Date;

  @IsOptional()
  updated_at?: Date;
}

export class BrowseRoadmapsDto {
  status: string;
  data: RoadmapDto[];
}