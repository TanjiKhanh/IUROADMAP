// frontend/src/services/explore.service.ts

import api from './api';

export interface Department {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
}

export interface MajorCard {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
  totalCreditsRequired: number;
  totalCourses: number;
  department: {
    id: number;
    slug: string;
    name: string;
  } | null;
}

export interface ExploreMajorsResponse {
  departments: Department[];
  majors: MajorCard[];
}

export const exploreService = {
  /**
   * Fetch departments + majors for Explore page.
   * If departmentSlug is provided (and not 'all'),
   * the backend will filter majors by that department.
   */
  getExploreMajors: async (
    departmentSlug?: string,
  ): Promise<ExploreMajorsResponse> => {
    const params: Record<string, string> = {};

    if (departmentSlug && departmentSlug !== 'all') {
      params.departmentSlug = departmentSlug;
    }

    // api.get will already return response.data (because of your interceptor)
    return api.get('/api/v1/explore/majors', { params });
  },

  
};