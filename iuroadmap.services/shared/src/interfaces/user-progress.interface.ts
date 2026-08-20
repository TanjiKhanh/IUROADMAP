export interface IUserRoadmapProgress {
  id: string;
  user_id: string;
  roadmap_id: string;
  enrollment_status: string;
  completion_percentage: number;
  total_credits_earned: number;
  total_credits_required: number;
  created_at?: string;
  updated_at?: string;
}

export interface IUserNodeProgress {
  id: string;
  user_roadmap_id: string;
  course_node_id: string;
  status: string;
  credits_earned: number;
  created_at?: string;
  updated_at?: string;
}
