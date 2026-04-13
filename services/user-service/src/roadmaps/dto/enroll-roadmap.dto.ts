import { IsInt, IsNotEmpty, IsArray, Min } from 'class-validator';

export class EnrollRoadmapDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  roadmapId: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  totalCreditsRequired: number;

  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  courseNodeIds: number[]; // List of all course node IDs for this roadmap
}

export class EnrollRoadmapResponseDto {
  id: number;
  user_id: number;
  roadmap_id: number;
  enrollment_status: string;
  completion_percentage: number;
  total_credits_earned: number;
  total_credits_required: number;
  created_at: string;
  updated_at: string;
}