// gateway/src/modules/roadmaps/dtos/macro-roadmap.dto.ts

export interface MacroRoadmapNode {
  id: number;
  nodeKey: string;
  title: string;
  credits: number;
  status: string;
  color: string;
  coords?: { x: number; y: number };
  isLocked: boolean;
}

export interface MacroRoadmapEdge {
  id: number;
  sourceKey: string;
  targetKey: string;
}

export class MacroRoadmapDto {
  status: string;
  data: {
    title: string;
    completion_percentage: number;
    total_credits_earned: number;
    total_credits_required: number;
    nodes: MacroRoadmapNode[];
    edges: MacroRoadmapEdge[];
  };
}