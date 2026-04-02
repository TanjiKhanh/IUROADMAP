import api from './api';

// --- Types ---

// 1. Enrollment Payload
export interface EnrollPayload {
  slug: string; // e.g., "frontend-developer"
}

// 2. Summary for Dashboard
export interface UserRoadmapSummary {
  id: number;
  userId: number;
  title: string;
  slug: string;
  progressPercent: number; // mapped from backend 'progress'
  totalNodes: number;
  completedNodes: number;
  startDate: string;
  updatedAt: string;
}

// 3. Node Status
export type NodeStatus = 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED' | 'LOCKED' | 'VERIFIED';

// 4. Node on the Map (Lightweight)
export interface UserRoadmapNode {
  nodeKey: string;
  title: string;
  status: NodeStatus;
  summary?: string;
  coords?: { x: number; y: number };
  isRequired?: boolean;
}

// 5. Full Map View (Initial Load)
export interface UserRoadmapDetail {
  id: number;
  title: string;
  progress: number;
  nodes: UserRoadmapNode[];
  edges: any[]; // Edges are needed for React Flow lines
}

// 6. Detailed Content (Lazy Loaded)
export interface NodeDetail {
  nodeKey: string;
  title: string;
  summary: string;
  contentMd: string; // The heavy markdown
  status?: NodeStatus;
}

export const userService = {
  // ==========================================
  // 🚀 ENROLLMENT
  // ==========================================
  enroll: async (courseId: number) => {
    // Note: Backend might expect { courseId } or just the ID in URL depending on your route
    const data = await api.post(`user/roadmaps/enroll`, { courseId });
    return data;
  },

  // ==========================================
  // 📊 DASHBOARD & LISTS
  // ==========================================
  getMyRoadmaps: async () => {
    const data = await api.get<UserRoadmapSummary[]>('/user/roadmaps/my');
    console.log("Fetched User Roadmaps Summary:", data);
    return data;
  },

  /**
   * Initial Map Load (Minimal Data)
   * GET /user/roadmaps/:id
   */
  getRoadmapById: async (id: number) => {
    // 🟢 Debugging: Check what the API actually returns
    const response: any = await api.get(`/user/roadmaps/${id}`);
    
    console.log("API Response for Roadmap:", response);

    // 🛡️ Guard: Handle different Axios configurations
    // Some setups return 'response.data', others return just 'response'
    if (response && response.data && response.data.nodes) {
        return response.data; // Nested case
    }
    return response; // Direct case
  },

  // ==========================================
  // 📖 READ PHASE (Lazy Load)
  // ==========================================
  
  /**
   * Fetch heavy content (Markdown) for a specific node
   * GET /user/roadmaps/:id/nodes/:nodeKey
   */
  getNodeDetail: async (roadmapId: number, nodeKey: string) => {
    const data = await api.get<NodeDetail>(`/user/roadmaps/${roadmapId}/nodes/${nodeKey}`);
    console.log("Fetched Node Detail:", data);
    return data;
  },

  // ==========================================
  // ✍️ WRITE PHASE (Update Status)
  // ==========================================

  /**
   * Update the status of a node (e.g. Pending -> Done)
   * PATCH /user/roadmaps/:id/nodes/:nodeKey/status
   */
  updateNodeStatus: async (roadmapId: number, nodeKey: string, status: string) => {
    const data = await api.patch(`/user/roadmaps/${roadmapId}/nodes/${nodeKey}/status`, { status });
    return data;
  },

  // ==========================================
  // 🟢 START PHASE (Legacy/Optional) 
  // ==========================================
  // Keeps the "Start" logic if you want a specific "Start Learning" button
  startNode: async (roadmapId: number, nodeKey: string) => {
    const data = await api.post<NodeDetail>(`/user/roadmaps/${roadmapId}/nodes/${nodeKey}/start`);
    return data;    
  }
};