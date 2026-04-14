import api from './api';

export interface UserRoadmapDetailNode {
  id: number;
  slug: string;
  name: string;
  credits: number;
  status: 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED' | 'LOCKED';
}

export interface UserRoadmapEdge {
  id: number;
  from: number;
  to: number;
}

export interface UserRoadmapProgressDetail {
  userRoadmapId: number;
  roadmapId: number;
  completion_percentage: number;
  total_credits_earned: number;
  total_credits_required: number;
  nodes: UserRoadmapDetailNode[];
  edges: UserRoadmapEdge[];
}

export const roadmapService = {
  /**
   * Enroll/clone a major roadmap by slug.
   * Requires auth; token is attached by api interceptor.
   */
  enrollToRoadmap: async (slug: string) => {
    // Example: POST /api/v1/roadmaps/:slug/enroll
    return api.post(`/api/v1/roadmaps/${slug}/enroll`);
  },

  /**
   * Fetch enrolled roadmap detail by userRoadmapId.
   * GET /api/v1/roadmaps/:userRoadmapId
   */
  getUserRoadmapDetail: async (userRoadmapId: number) => {
    const data = await api.get<UserRoadmapProgressDetail>(`/api/v1/roadmaps/${userRoadmapId}`);
    return data as unknown as UserRoadmapProgressDetail;
  },
};