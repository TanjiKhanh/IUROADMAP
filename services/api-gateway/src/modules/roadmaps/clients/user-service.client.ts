// gateway/src/modules/roadmaps/clients/user-service.client.ts

import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServiceUrls } from '../../../config/service-urls.config';
import {
  EnrollRoadmapResponseDto,
  UserEnrollmentDto,
} from '../dtos';

@Injectable()
export class UserServiceClient {
  private readonly logger = new Logger(UserServiceClient.name);
  private readonly userServiceUrl = ServiceUrls.USER_SERVICE;

  constructor(private httpService: HttpService) {}

  /**
   * Enroll user in roadmap (SUD-06)
   */
  async enrollInRoadmap(
    userId: number,
    roadmapId: number,
  ): Promise<EnrollRoadmapResponseDto> {
    try {
      this.logger.log(`Enrolling user ${userId} in roadmap ${roadmapId}`);
      const response = await firstValueFrom(
        this.httpService.post<{ status: string; data: EnrollRoadmapResponseDto }>(
          `${this.userServiceUrl}/api/v1/roadmaps/enroll`,
          { user_id: userId, roadmap_id: roadmapId },
        ),
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response?.status === 409) {
        throw new HttpException(
          {
            status: 'error',
            code: 'ALREADY_ENROLLED',
            message: 'You are already enrolled in this roadmap',
          },
          HttpStatus.CONFLICT,
        );
      }
      if (error.response?.status === 404) {
        throw new HttpException(
          {
            status: 'error',
            code: 'ROADMAP_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      this.logger.error(`Enrollment failed: ${error.message}`);
      throw new HttpException(
        {
          status: 'error',
          code: 'USER_SERVICE_ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get user's enrollments (SUD-10)
   */
  async getUserEnrollments(userId: number): Promise<UserEnrollmentDto[]> {
    try {
      this.logger.log(`Fetching enrollments for user ${userId}`);
      const response = await firstValueFrom(
        this.httpService.get<{ status: string; data: UserEnrollmentDto[] }>(
          `${this.userServiceUrl}/api/v1/user/roadmaps`,
          {
            headers: { 'X-User-Id': userId.toString() },
          },
        ),
      );
      return response.data.data;
    } catch (error: any) {
      this.logger.error(
        `Failed to fetch enrollments for user ${userId}: ${error.message}`,
      );
      throw new HttpException(
        {
          status: 'error',
          code: 'USER_SERVICE_ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get specific enrollment
   */
  async getEnrollment(
    enrollmentId: number,
    userId: number,
  ): Promise<UserEnrollmentDto> {
    try {
      this.logger.log(`Fetching enrollment ${enrollmentId}`);
      const response = await firstValueFrom(
        this.httpService.get<{ status: string; data: UserEnrollmentDto }>(
          `${this.userServiceUrl}/api/v1/roadmaps/${enrollmentId}`,
          {
            headers: { 'X-User-Id': userId.toString() },
          },
        ),
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new HttpException(
          {
            status: 'error',
            code: 'ENROLLMENT_NOT_FOUND',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      this.logger.error(`Failed to fetch enrollment: ${error.message}`);
      throw new HttpException(
        {
          status: 'error',
          code: 'USER_SERVICE_ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}