// services/api-gateway/src/modules/roadmaps/dtos/enrollment.dto.ts
import { IsString } from 'class-validator';

export class EnrollRoadmapRequestDto {
  @IsString()
  slug: string;
}

export class EnrollmentSummaryDto {
  id: number;                    
  userId: number;
  roadmapId: number;
  slug: string;
  name: string;
  total_credits_required: number;
  completion_percentage: number;
  total_credits_earned: number;
  enrollmentDate: string;
}