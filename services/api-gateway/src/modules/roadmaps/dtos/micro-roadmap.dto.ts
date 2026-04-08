// gateway/src/modules/roadmaps/dtos/micro-roadmap.dto.ts

export interface MicroRoadmapTopic {
  id: number;
  topicKey: string;
  title: string;
  status: string;
  coords?: { x: number; y: number };
  learning_objectives?: string;
  resources_url?: string;
}

export interface MicroRoadmapEdge {
  source_topic_id: number;
  target_topic_id: number;
}

export class MicroRoadmapDto {
  status: string;
  data: {
    courseTitle: string;
    topics: MicroRoadmapTopic[];
    edges: MicroRoadmapEdge[];
  };
}