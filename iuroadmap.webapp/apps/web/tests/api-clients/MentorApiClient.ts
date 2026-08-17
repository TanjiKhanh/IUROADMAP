import { APIRequestContext } from '@playwright/test';
import { API_ROUTES } from '../support/app-routes';

/**
 * Reusable API client wrapper for Mentor Portal endpoints.
 */
export class MentorApiClient {
  readonly request: APIRequestContext;
  readonly baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = API_ROUTES.BASE_URL;
  }

  async getRequests(token: string) {
    return await this.request.get(`${this.baseUrl}${API_ROUTES.MENTOR.REQUESTS}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async acceptRequest(requestId: string, token: string) {
    return await this.request.post(`${this.baseUrl}${API_ROUTES.MENTOR.ACCEPT_REQUEST(requestId)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async declineRequest(requestId: string, token: string) {
    return await this.request.post(`${this.baseUrl}${API_ROUTES.MENTOR.DECLINE_REQUEST(requestId)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async addAvailability(payload: Record<string, any>, token: string) {
    return await this.request.post(`${this.baseUrl}${API_ROUTES.MENTOR.AVAILABILITY}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
  }

  async sendChatMessage(receiverId: string, content: string, token: string) {
    return await this.request.post(`${this.baseUrl}${API_ROUTES.MENTOR.SEND_CHAT}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { receiverId, content },
    });
  }

  async giveFeedback(learnerId: string, content: string, rating: number, token: string) {
    return await this.request.post(`${this.baseUrl}${API_ROUTES.MENTOR.GIVE_FEEDBACK(learnerId)}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { content, rating },
    });
  }
}
