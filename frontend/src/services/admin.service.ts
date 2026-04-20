import api from './api';

// --- Types ---
export interface Department {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Course {
  id: number;
  slug: string;
  name: string;
  roadmapId: number;
  roadmapSlug: string;
  roadmapName: string;
  credits: number;
  description?: string;
}

export interface UpdateAdminCourseMetaPayload {
  slug?: string;
  name?: string;
  credits?: number;
  description?: string;
}

export interface AdminTopicNode {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  coords?: { x: number; y: number } | null;
  learningObjectives?: string | null;
  resourcesUrl?: string | null;
}

export interface AdminTopicEdge {
  id: number;
  fromTopicId: number;
  toTopicId: number;
}

export interface AdminCourseTopicsGraph {
  courseNodeId: number;
  topics: AdminTopicNode[];
  edges: AdminTopicEdge[];
}

export interface CreateAdminTopicNodePayload {
  slug: string;
  title: string;
  description?: string;
  learningObjectives?: string;
  resourcesUrl?: string;
  coords?: { x: number; y: number };
}

export interface UpdateAdminTopicNodePayload {
  slug?: string;
  title?: string;
  description?: string;
  learningObjectives?: string;
  resourcesUrl?: string;
  coords?: { x: number; y: number };
}


export interface RoadmapNodeInput {
  nodeKey: string;
  title: string;
  coords: { x: number; y: number };
  isRequired?: boolean; // Optional, based on your previous DB schema
}

export interface RoadmapEdgeInput {
  sourceKey: string;
  targetKey: string;
  constraintType?: 'PREREQUISITE' | 'OPTIONAL';
}

export interface Roadmap {
  id?: number;
  slug: string;
  title: string;
  description?: string;
  courseId: number;
  nodes: RoadmapNodeInput[];
  edges: RoadmapEdgeInput[];
}

export interface Major {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
  totalCreditsRequired: number;
  totalCourses?: number;
}

export interface AdminRoadmapGraphNode {
  id: number;
  slug: string;
  name: string;
  coords: { x: number; y: number } | null;
  credits: number;
  description: string | null;
}

export interface AdminRoadmapGraphEdge {
  id: number;
  from: number;
  to: number;
}

export interface AdminRoadmapGraph {
  roadmapId: number;
  nodes: AdminRoadmapGraphNode[];
  edges: AdminRoadmapGraphEdge[];
}

export interface CreateAdminCourseNodePayload {
  slug: string;
  name: string;
  credits: number;
  description?: string;
  coords?: { x: number; y: number };
  Prerequisites?: number[];
}

export interface UpdateAdminCourseNodePayload {
  slug?: string;
  name?: string;
  credits?: number;
  description?: string;
  coords?: { x: number; y: number };
  Prerequisites?: number[];
}

export interface AdminCourseNodeResponse {
  id: number;
  roadmap_id: number;
  slug: string;
  name: string;
  credits: number;
  description: string | null;
  coords: { x: number; y: number } | null;
  created_at: string;
  updated_at: string;
}

export interface CreatePrerequisitePayload {
  course_node_id: number;
  prerequisite_node_id: number;
}

export interface AdminPrerequisiteEdgeResponse {
  id: number;
  course_node_id: number;
  prerequisite_node_id: number;
  created_at: string;
  updated_at: string;
}



export const adminService = {
  // ==========================================
  // 📂 DEPARTMENTS
  // ==========================================
  getAllDepartments: async () => {
    const data = await api.get<Department[]>('/api/v1/departments');
    return data as unknown as Department[];
  },

  getDepartmentById: async (id: number) => {
    const data = await api.get<Department>(`/api/v1/departments/${id}`);
    return data as unknown as Department;
  },

  createDepartment: async (payload: Department) => {
    const data = await api.post<Department>('/api/v1/departments', payload);
    return data as unknown as Department;
  },

  updateDepartment: async (id: number, payload: Partial<Department>) => {
    const data = await api.patch<Department>(`/api/v1/departments/${id}`, payload);
    return data as unknown as Department;
  },

  deleteDepartment: async (id: number) => {
    const data = await api.delete(`/api/v1/departments/${id}`);
    return data as unknown as any;
  },

  // ==========================================
  // 📚 COURSES
  // ==========================================
  getAllCourses: async () => {
    const data = await api.get<Course[]>('/api/v1/admin/courses');
    return data as unknown as Course[];
  },

  updateCourseNodeMeta: async (courseNodeId: number, payload: UpdateAdminCourseMetaPayload) => {
    const data = await api.patch<Course>(`/api/v1/admin/courses/${courseNodeId}`, payload);
    return data as unknown as Course;
  },

  getAdminCourseTopicsGraph: async (courseNodeId: number) => {
    const data = await api.get<AdminCourseTopicsGraph>(
      `/api/v1/admin/courses/${courseNodeId}/topics-graph`,
    );
    return data as unknown as AdminCourseTopicsGraph;
  },

  createAdminTopicNode: async (
    courseNodeId: number,
    payload: CreateAdminTopicNodePayload,
  ) => {
    const data = await api.post<AdminTopicNode>(`/api/v1/admin/courses/${courseNodeId}/topics`, payload);
    return data as unknown as AdminTopicNode;
  },

  updateAdminTopicNode: async (
    courseNodeId: number,
    topicId: number,
    payload: UpdateAdminTopicNodePayload,
  ) => {
    const data = await api.patch<AdminTopicNode>(
      `/api/v1/admin/courses/${courseNodeId}/topics/${topicId}`,
      payload,
    );
    return data as unknown as AdminTopicNode;
  },

  deleteAdminTopicNode: async (courseNodeId: number, topicId: number) => {
    const data = await api.delete(`/api/v1/admin/courses/${courseNodeId}/topics/${topicId}`);
    return data as unknown as any;
  },

  updateAdminTopicCoords: async (
    courseNodeId: number,
    topicId: number,
    coords: { x: number; y: number },
  ) => {
    const data = await api.patch(
      `/api/v1/admin/courses/${courseNodeId}/topics/${topicId}/coords`,
      { coords },
    );
    return data;
  },

  createAdminTopicEdge: async (
    courseNodeId: number,
    payload: { sourceTopicId: number; targetTopicId: number },
  ) => {
    const data = await api.post<AdminTopicEdge>(
      `/api/v1/admin/courses/${courseNodeId}/topics-edges`,
      payload,
    );
    return data as unknown as AdminTopicEdge;
  },

  deleteAdminTopicEdge: async (courseNodeId: number, edgeId: number) => {
    const data = await api.delete(`/api/v1/admin/courses/${courseNodeId}/topics-edges/${edgeId}`);
    return data as unknown as any;
  },

  // ==========================================
  // 🗺️ ROADMAPS
  // ==========================================
  getAllRoadmaps: async () => {
    const data = await api.get<Roadmap[]>('/api/v1/admin/roadmaps');
    return data as unknown as Roadmap[];
  },

  getRoadmapBySlug: async (slug: string) => {
    const data = await api.get<Roadmap>(`/api/v1/admin/roadmaps/${slug}`);
    return data as unknown as Roadmap;
  },

  createRoadmap: async (payload: Roadmap) => {
    const data = await api.post<Roadmap>('/api/v1/admin/roadmaps', payload);
    return data as unknown as Roadmap;
  },

  updateRoadmap: async (id: number, payload: Partial<Roadmap>) => {
    const data = await api.patch<Roadmap>(`/api/v1/admin/roadmaps/${id}`, payload);
    return data as unknown as Roadmap;
  },

  deleteRoadmap: async (id: number) => {
    const data = await api.delete(`/api/v1/admin/roadmaps/${id}`);
    return data as unknown as any;
  },

  // ==========================================
  // 🧠 ADMIN MAJORS + ROADMAP GRAPH DESIGN
  // ==========================================
  getAdminMajors: async () => {
    const data = await api.get<Major[]>('/api/v1/admin/majors');
    return data as unknown as Major[];
  },

  getAdminMajorBySlug: async (slug: string) => {
    const data = await api.get<Major>(`/api/v1/admin/majors/${encodeURIComponent(slug)}`);
    return data as unknown as Major;
  },

  updateAdminMajor: async (
    slug: string,
    payload: Partial<Pick<Major, 'name' | 'description' | 'totalCreditsRequired'>>,
  ) => {
    const data = await api.patch<Major>(`/api/v1/admin/majors/${encodeURIComponent(slug)}`, payload);
    return data as unknown as Major;
  },

  getAdminRoadmapGraph: async (roadmapId: number) => {
    const data = await api.get<AdminRoadmapGraph>(`/api/v1/admin/roadmaps/${roadmapId}/graph`);
    return data as unknown as AdminRoadmapGraph;
  },

  createAdminCourseNode: async (roadmapId: number, payload: CreateAdminCourseNodePayload) => {
    const data = await api.post<AdminCourseNodeResponse>(
      `/api/v1/admin/roadmaps/${roadmapId}/courses`,
      payload,
    );
    return data as unknown as AdminCourseNodeResponse;
  },

  updateAdminCourseNode: async (
    roadmapId: number,
    courseNodeId: number,
    payload: UpdateAdminCourseNodePayload,
  ) => {
    const data = await api.patch<AdminCourseNodeResponse>(
      `/api/v1/admin/roadmaps/${roadmapId}/courses/${courseNodeId}`,
      payload,
    );
    return data as unknown as AdminCourseNodeResponse;
  },

  deleteAdminCourseNode: async (roadmapId: number, courseNodeId: number) => {
    const data = await api.delete(`/api/v1/admin/roadmaps/${roadmapId}/courses/${courseNodeId}`);
    return data as unknown as any;
  },

  createAdminPrerequisite: async (roadmapId: number, payload: CreatePrerequisitePayload) => {
    const data = await api.post<AdminPrerequisiteEdgeResponse>(
      `/api/v1/admin/roadmaps/${roadmapId}/prerequisites`,
      payload,
    );
    return data as unknown as AdminPrerequisiteEdgeResponse;
  },

  deleteAdminPrerequisite: async (roadmapId: number, edgeId: number) => {
    const data = await api.delete(`/api/v1/admin/roadmaps/${roadmapId}/prerequisites/${edgeId}`);
    return data as unknown as any;
  },

};