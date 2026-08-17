export interface IDepartment {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface IMajorRoadmap {
  id: string;
  slug: string;
  name: string;
  total_credits: number;
  description?: string | null;
  department_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICourseNode {
  id: string;
  roadmap_id: string;
  slug: string;
  name: string;
  credits: number;
  description?: string | null;
  coords?: { x: number; y: number } | null;
  created_at?: string;
  updated_at?: string;
}

export interface ICourseNodePrerequisite {
  id: string;
  course_node_id: string;
  prerequisite_node_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICourseTopic {
  id: string;
  course_node_id: string;
  slug: string;
  title: string;
  description?: string | null;
  coords?: { x: number; y: number } | null;
  learning_objectives?: string | null;
  resources_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ICourseTopicEdge {
  id: string;
  source_topic_id: string;
  target_topic_id: string;
  created_at?: string;
}
