import { APIRequestContext } from '@playwright/test';
import { API_ROUTES } from '../support/app-routes';

/**
 * Reusable API client wrapper for Admin Management endpoints.
 */
export class AdminApiClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = API_ROUTES.BASE_URL;
  }

  async createDepartment(payload: Record<string, any>, token: string) {
    return await this.request.post(`${this.baseUrl}${API_ROUTES.ADMIN.DEPARTMENTS}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
  }

  async deleteDepartment(id: string, token: string) {
    return await this.request.delete(`${this.baseUrl}${API_ROUTES.ADMIN.DEPARTMENT_BY_ID(id)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async createMajor(payload: Record<string, any>, token: string) {
    return await this.request.post(`${this.baseUrl}${API_ROUTES.ADMIN.MAJORS}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
  }

  async saveLayout(majorId: string, payload: Record<string, any>, token: string) {
    return await this.request.put(`${this.baseUrl}${API_ROUTES.ADMIN.MAJOR_LAYOUT(majorId)}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
  }

  async createPrerequisite(majorId: string, payload: Record<string, any>, token: string) {
    return await this.request.post(`${this.baseUrl}${API_ROUTES.ADMIN.MAJOR_PREREQUISITES(majorId)}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
  }

  async createTopic(courseId: string, payload: Record<string, any>, token: string) {
    return await this.request.post(`${this.baseUrl}${API_ROUTES.ADMIN.COURSE_TOPICS(courseId)}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
  }

  async selfDeleteCheck(adminUserId: string, token: string) {
    return await this.request.delete(`${this.baseUrl}${API_ROUTES.ADMIN.USERS_SELF_DELETE_CHECK(adminUserId)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async rejectMentor(mentorId: string, reason: string, token: string) {
    return await this.request.post(`${this.baseUrl}${API_ROUTES.ADMIN.REJECT_MENTOR(mentorId)}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { reason },
    });
  }
}
