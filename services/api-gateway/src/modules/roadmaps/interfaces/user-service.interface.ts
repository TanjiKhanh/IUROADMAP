

// Response from User Service: POST /user/roadmaps/enroll
export interface UserServiceEnrollResponse {
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




// services/api-gateway/src/modules/roadmaps/interfaces/roadmap.interface.ts
export interface UserRoadmapOverview {
  userRoadmapId: number;
  roadmapId: number;
  completionPercentage: number;
  totalCreditsEarned: number;
  totalCreditsRequired: number;
  nodeProgress: Array<{
    courseNodeId: number;
    status: 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED';
    creditsEarned: number;
  }>;
}