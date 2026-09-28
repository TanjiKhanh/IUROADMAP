import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ErrorCodes } from '../../constants/error.constant';

export interface UserPurgeResult {
  deletedRoadmaps: number;
  anonymizedComments: number;
}

/**
 * Calls roadmap-service internal endpoints (x-api-key = ROADMAP_SERVICE_API_KEY).
 * Used by auth when a user is hard-deleted (roadmap-schema § Xoá user, BR-CFG-05).
 */
@Injectable()
export class RoadmapClientService {
  private readonly logger = new Logger(RoadmapClientService.name);

  private readonly baseUrl = process.env.ROADMAP_SERVICE_URL || 'http://localhost:4100';

  /** Deletes the student roadmaps of the user and anonymizes their course comments. */
  async purgeUser(userId: string): Promise<UserPurgeResult> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/v1/internal/users/${encodeURIComponent(userId)}/purge`,
        {},
        { headers: { 'x-api-key': process.env.ROADMAP_SERVICE_API_KEY } },
      );
      // Unwrap the ResponseInterceptor envelope { status, data }
      return response.data?.data ?? response.data;
    } catch (error: any) {
      this.logger.error(`Failed to purge roadmap data of user ${userId}: ${error.message}`);
      throw new HttpException(
        { status: 'error', code: ErrorCodes.ROADMAP_SERVICE_ERROR, message: 'Could not remove the roadmap data of the user' },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
