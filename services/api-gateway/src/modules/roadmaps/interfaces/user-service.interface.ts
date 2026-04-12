

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




// USER_ROADMAPS row from user-service
export interface UserRoadmapDetail {
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

// User progress (you will implement this in user-service)
export interface UserRoadmapProgress {
  roadmapId: number;
  progress: Array<{
    courseNodeId: number;
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
    creditsEarned: number;
  }>;
}