// gateway/src/modules/roadmaps/dtos/enrollment.dto.ts

import { IsNumber, IsString, IsOptional } from 'class-validator';

export class EnrollRoadmapRequestDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  roadmap_id: number;
}

export class EnrollRoadmapResponseDto {
  @IsNumber()
  id: number;

  @IsNumber()
  user_id: number;

  @IsNumber()
  roadmap_id: number;

  @IsString()
  enrollment_status: string;

  @IsNumber()
  completion_percentage: number;

  @IsNumber()
  total_credits_earned: number;

  @IsNumber()
  total_credits_required: number;

  @IsOptional()
  created_at?: Date;

  @IsOptional()
  updated_at?: Date;
}

export class EnrollmentSummaryDto {
  status: string;
  data: EnrollRoadmapResponseDto;
}

export class UserEnrollmentDto {
  @IsNumber()
  id: number;

  @IsNumber()
  roadmap_id: number;

  @IsString()
  enrollment_status: string;

  @IsNumber()
  completion_percentage: number;

  @IsNumber()
  total_credits_earned: number;

  @IsNumber()
  total_credits_required: number;

  @IsOptional()
  start_date?: Date;
}

export class UserEnrollmentsDto {
  status: string;
  data: UserEnrollmentDto[];
}