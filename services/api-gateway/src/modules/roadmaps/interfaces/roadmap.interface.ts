// gateway/src/modules/roadmaps/interfaces/roadmap.interface.ts

export interface IRoadmap {
  id: number;
  slug: string;
  name: string;
  total_credits: number;
  created_at: Date;
  updated_at: Date;
}

export interface IEnrollment {
  id: number;
  user_id: number;
  roadmap_id: number;
  enrollment_status: string;
  completion_percentage: number;
  total_credits_earned: number;
  total_credits_required: number;
  start_date: Date;
}

export interface IMacroRoadmapNode {
  id: number;
  nodeKey: string;
  title: string;
  credits: number;
  status: string;
  color: string;
}

export interface IMacroRoadmap {
  title: string;
  nodes: IMacroRoadmapNode[];
  completion_percentage: number;
}