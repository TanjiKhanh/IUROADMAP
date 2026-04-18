export class MacroRoadmapNodeDto {
  id: number;
  slug: string;
  name: string;
  credits: number;
  status: 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED';
}

export class MacroRoadmapEdgeDto {
  id: number;
  from: number;
  to: number;
}

export class MacroRoadmapResponseDto {
  userRoadmapId: number;
  roadmapId: number;
  completion_percentage: number;
  total_credits_earned: number;
  total_credits_required: number;
  nodes: MacroRoadmapNodeDto[];
  edges: MacroRoadmapEdgeDto[];
}