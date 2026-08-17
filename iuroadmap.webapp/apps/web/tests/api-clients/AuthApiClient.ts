import { APIRequestContext, expect } from '@playwright/test';
import { API_ROUTES } from '../support/app-routes';

/**
 * Reusable API client wrapper for Authentication endpoints.
 */
export class AuthApiClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = API_ROUTES.BASE_URL;
  }

  async registerLearner(payload: Record<string, any>) {
    return await this.request.post(`${this.baseUrl}${API_ROUTES.AUTH.REGISTER_LEARNER}`, {
      data: payload,
    });
  }

  async login(email: string, password = 'Password123!') {
    return await this.request.post(`${this.baseUrl}${API_ROUTES.AUTH.LOGIN}`, {
      data: { email, password },
    });
  }

  async getAccessToken(email: string, password = 'Password123!'): Promise<string> {
    const res = await this.login(email, password);
    if (res.status() === 200) {
      const body = await res.json();
      return body.data?.accessToken || '';
    }
    return '';
  }
}
