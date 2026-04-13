export class MicroTopicNodeDto {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  coords?: Record<string, any> | null;
  learning_objectives?: string | null;
  resources_url?: string | null;
}

export class MicroTopicEdgeDto {
  id: number;
  from: number;
  to: number;
}

export class MicroRoadmapResponseDto {
  courseNodeId: number;
  topics: MicroTopicNodeDto[];
  edges: MicroTopicEdgeDto[];
}