import api from './api';

export interface UserRoadmapDetailNode {
  id: number;
  slug: string;
  coords?: { x: number; y: number } | null;
  name: string;
  credits: number;
  status: 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED';
  description?: string | null;
}

export type MacroCourseStatus = 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED';

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

export interface MicroTopicNode {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  coords?: { x?: number; y?: number } | null;
  learning_objectives?: string | null;
  resources_url?: string | null;
}

export interface MicroTopicEdge {
  id: number;
  from: number;
  to: number;
}

export interface MicroRoadmapResponse {
  courseNodeId: number;
  topics: MicroTopicNode[];
  edges: MicroTopicEdge[];
}

export interface UpdateCourseStatusPayload {
  status: MacroCourseStatus;
  creditsEarned: number;
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

  /**
   * Fetch readonly roadmap preview by major slug.
   * GET /api/v1/roadmaps/preview/:slug
   */
  getPreviewRoadmapBySlug: async (slug: string) => {
    const data = await api.get<UserRoadmapProgressDetail>(`/api/v1/roadmaps/preview/${encodeURIComponent(slug)}`);
    return data as unknown as UserRoadmapProgressDetail;
  },

  /**
   * Fetch a micro roadmap for a specific course node.
   * GET /api/v1/roadmaps/course-nodes/:courseNodeId/micro
   */
  getMicroRoadmap: async (courseNodeId: number) => {
    const data = await api.get<MicroRoadmapResponse>(`/api/v1/roadmaps/course-nodes/${courseNodeId}/micro`);
    return data as unknown as MicroRoadmapResponse;
  },

  /**
   * Update status of a course node in a user roadmap.
   * PATCH /api/v1/roadmaps/:userRoadmapId/courses/:courseNodeId
   */
  updateCourseStatus: async (
    userRoadmapId: number,
    courseNodeId: number,
    payload: UpdateCourseStatusPayload
  ) => {
    const data = await api.patch(`/api/v1/roadmaps/${userRoadmapId}/courses/${courseNodeId}`, payload);
    return data;
  },
};