import { APIRequestContext } from '@playwright/test';
import { API_ROUTES } from '../support/app-routes';

/**
 * Reusable API client wrapper for Learner Portal endpoints.
 */
export class LearnerApiClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = API_ROUTES.BASE_URL;
  }

  async exploreMajors(search?: string) {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    return await this.request.get(`${this.baseUrl}${API_ROUTES.LEARNER.EXPLORE_MAJORS}${query}`);
  }

  async enrollMajor(slug: string, token: string) {
    return await this.request.post(`${this.baseUrl}${API_ROUTES.LEARNER.ENROLL_MAJOR(slug)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getMyRoadmaps(token: string) {
    return await this.request.get(`${this.baseUrl}${API_ROUTES.LEARNER.MY_ROADMAPS}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getRoadmapOverview(roadmapId: string | number, token: string) {
    return await this.request.get(`${this.baseUrl}${API_ROUTES.LEARNER.ROADMAP_OVERVIEW(roadmapId)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async updateCourseProgress(roadmapId: string | number, courseId: string, payload: Record<string, any>, token: string) {
    return await this.request.patch(`${this.baseUrl}${API_ROUTES.LEARNER.UPDATE_COURSE_PROGRESS(roadmapId, courseId)}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
  }
}
