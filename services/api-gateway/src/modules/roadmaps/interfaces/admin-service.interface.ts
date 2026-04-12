
// Response from Admin Service: GET /admin/majors/{slug}
export interface MajorMeta {
  id: number;
  slug: string;
  name: string;
  total_credits: number;
}



// ADMIN graph response
export interface AdminRoadmapGraph {
  roadmapId: number;
  nodes: Array<{
    id: number;
    slug: string;
    name: string;
    coords: { x: number; y: number } | null;
    credits: number;
    description: string | null;
  }>;
  edges: Array<{
    id: number;
    from: number;
    to: number;
  }>;
}