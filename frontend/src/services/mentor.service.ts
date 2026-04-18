import api from './api';

// --- Types ---
export interface MentorProfile {
  userId: number;
  bio?: string;
  cvUrl?: string;
  linkedinUrl?: string;
  industry?: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MentorFilterDto {
  industry?: string;
  search?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
    pages?: number;
  };
  message: string;
}

export interface MentorStats {
  totalMentors: number;
  byIndustry: Array<{
    industry: string;
    count: number;
  }>;
  topSkills: Array<{
    skill: string;
    count: number;
  }>;
  skillCount: number;
}

export interface CreateMentorDto {
  bio: string;
  cvUrl: string;
  linkedinUrl: string;
  industry: string;
  skills: string[];
}

export interface UpdateMentorDto {
  bio?: string;
  cvUrl?: string;
  linkedinUrl?: string;
  industry?: string;
  skills?: string[];
}

// ✅ Helper function to extract response data
const extractResponse = (response: any) => {
  // If response has .data property, return it
  if (response?.data) {
    return response.data;
  }
  // Otherwise return response as-is
  return response;
};

export const mentorService = {
  // ==========================================
  // 📋 SEARCH & FILTER
  // ==========================================

  /**
   * Get all mentors with optional filtering and pagination
   * GET /mentors?industry=Tech&search=john&limit=10&offset=0
   */
  searchMentors: async (filters: MentorFilterDto = {}) => {
    const params = new URLSearchParams();
    
    if (filters.industry) params.append('industry', filters.industry);
    if (filters.search) params.append('search', filters.search);
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.offset) params.append('offset', filters.offset.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.order) params.append('order', filters.order);

    try {
      console.log('🔍 Searching mentors with filters:', filters);
      
      const response: any = await api.get(`/api/v1/mentors?${params.toString()}`);
      
      console.log('✅ Mentors response:', response);
      console.log('📈 Mentors count:', response?.data?.length);
      console.log('📋 Total mentors:', response?.meta?.total);
      
      return response as PaginatedResponse<MentorProfile>;
    } catch (error) {
      console.error('❌ Error searching mentors:', error);
      throw error;
    }
  },

  /**
   * Get all mentors (with default pagination)
   * GET /mentors?limit=10&offset=0
   */
  getAllMentors: async (limit: number = 10, offset: number = 0) => {
    try {
      console.log('📋 Fetching all mentors...');
      
      const response: any = await api.get(
        `/api/v1/mentors?limit=${limit}&offset=${offset}`
      );
      
      console.log('✅ All mentors fetched:', response?.data?.length);
      
      return response as PaginatedResponse<MentorProfile>;
    } catch (error) {
      console.error('❌ Error fetching all mentors:', error);
      throw error;
    }
  },

  /**
   * Search mentors by industry
   * GET /mentors?industry=Tech&limit=10&offset=0
   */
  searchByIndustry: async (
    industry: string,
    limit: number = 10,
    offset: number = 0
  ) => {
    try {
      console.log(`🏭 Searching mentors in industry: ${industry}`);
      
      const response: any = await api.get(
        `/api/v1/mentors?industry=${industry}&limit=${limit}&offset=${offset}`
      );
      
      return response as PaginatedResponse<MentorProfile>;
    } catch (error) {
      console.error('❌ Error searching by industry:', error);
      throw error;
    }
  },

  /**
   * Search mentors by name/keyword/skill
   * GET /mentors?search=alice&limit=10&offset=0
   */
  searchByName: async (
    search: string,
    limit: number = 10,
    offset: number = 0
  ) => {
    try {
      console.log(`🔎 Searching mentors: ${search}`);
      
      const response: any = await api.get(
        `/api/v1/mentors?search=${search}&limit=${limit}&offset=${offset}`
      );
      
      return response as PaginatedResponse<MentorProfile>;
    } catch (error) {
      console.error('❌ Error searching by name:', error);
      throw error;
    }
  },

  // ==========================================
  // 📊 STATISTICS
  // ==========================================

  /**
   * Get mentor statistics (counts by industry, top skills, etc)
   * GET /mentors/stats
   */
  getMentorStats: async () => {
    try {
      console.log('📊 Fetching mentor statistics...');
      
      const response: any = await api.get('/api/v1/mentors/stats');
      
      const data = extractResponse(response);
      
      console.log('✅ Stats fetched:', data);
      console.log('📈 Industries:', data?.byIndustry);
      console.log('🎯 Top skills:', data?.topSkills?.length);
      
      return data as MentorStats;
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
      throw error;
    }
  },

  // ==========================================
  // 👤 MY MENTOR PROFILE
  // ==========================================

  /**
   * Get my mentor profile (Authenticated)
   * GET /mentor-profiles/me
   */
  getMyProfile: async () => {
    try {
      console.log('👤 Fetching my profile...');
      
      const response: any = await api.get('/api/v1/mentor-profiles/me');
      const data = extractResponse(response);
      
      return data as MentorProfile;
    } catch (error) {
      console.error('❌ Error fetching my profile:', error);
      throw error;
    }
  },

  /**
   * Create mentor profile (Authenticated)
   * POST /mentor-profiles
   */
  createProfile: async (mentor: CreateMentorDto) => {
    try {
      console.log('✨ Creating mentor profile...');
      
      const response: any = await api.post('/api/v1/mentor-profiles', mentor);
      const data = extractResponse(response);
      
      return data as MentorProfile;
    } catch (error) {
      console.error('❌ Error creating profile:', error);
      throw error;
    }
  },

  /**
   * Update mentor profile (Authenticated)
   * PUT /mentor-profiles/me
   */
  updateProfile: async (mentor: UpdateMentorDto) => {
    try {
      console.log('📝 Updating mentor profile...');
      
      const response: any = await api.put('/api/v1/mentor-profiles/me', mentor);
      const data = extractResponse(response);
      
      return data as MentorProfile;
    } catch (error) {
      console.error('❌ Error updating profile:', error);
      throw error;
    }
  },

  /**
   * Get mentor profile by user ID
   * GET /mentor-profiles/:userId
   */
  getProfileByUserId: async (userId: number) => {
    try {
      console.log(`👤 Fetching profile for user ${userId}...`);
      
      const response: any = await api.get(`/api/v1/mentor-profiles/${userId}`);
      const data = extractResponse(response);
      
      return data as MentorProfile;
    } catch (error) {
      console.error('❌ Error fetching profile by user ID:', error);
      throw error;
    }
  },

  // ==========================================
  // ⭐ MENTOR DETAILS
  // ==========================================

  /**
   * Get full mentor details (for mentor profile page)
   */
  getMentorDetails: async (userId: number) => {
    try {
      const profile = await mentorService.getProfileByUserId(userId);
      
      return {
        ...profile,
        averageRating: 4.5,
        totalReviews: 95,
        responseTime: '2 hours',
        sessionPrice: 80,
      };
    } catch (error) {
      console.error('❌ Error fetching mentor details:', error);
      throw error;
    }
  },
};