// services/api-gateway/src/modules/roadmaps/clients/user-service.client.ts
import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { UserServiceEnrollResponse , UserRoadmapOverview } from '../interfaces';

export interface UserRoadmapProgressRow {
  id: number;
  user_id: number;
  roadmap_id: number;
  enrollment_status: string;
  completion_percentage: number;
  total_credits_earned: number;
  total_credits_required: number;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class UserServiceClient {
  constructor(private readonly http: HttpService) {}

  private readonly logger = new Logger(UserServiceClient.name);

  async enrollUserToRoadmap(params: {
    userId: number;
    roadmapId: number;
    totalCreditsRequired: number;
    courseNodeIds: number[];
  }): Promise<UserServiceEnrollResponse> {
    try {
      console.log('Enrolling user to roadmap with params:', params);
      const { data } = await this.http.axiosRef.post<UserServiceEnrollResponse>(
        `${process.env.USER_SERVICE_URL}/user/roadmaps/enroll`,
        {
          userId: params.userId,
          roadmapId: params.roadmapId,
          totalCreditsRequired: params.totalCreditsRequired,
          courseNodeIds: params.courseNodeIds,
        },
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === HttpStatus.CONFLICT) {
        const code =
          (err.response.data as any)?.code ?? 'ALREADY_ENROLLED';

        throw new HttpException(
          { message: 'You are already enrolled in this roadmap', code },
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(
        'Failed to enroll in roadmap',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }





  async getUserRoadmapDetail(params: {
    userRoadmapId: number;
    userId: number;
  }): Promise<UserRoadmapOverview> {
    try {
      const { data } = await this.http.axiosRef.get<UserRoadmapOverview>(
        `${process.env.USER_SERVICE_URL}/user/roadmaps/${params.userRoadmapId}/overview`,
        {
          headers: {
            'x-user-id': params.userId, // your user-service can use this
          },
        },
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      this.logger.error(
        `getUserRoadmapDetail failed: status=${err.response?.status} data=${JSON.stringify(
          err.response?.data,
        )}`,
      );

      if (err.response?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('User roadmap not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Failed to fetch user roadmap detail',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getUserRoadmapOverview(params: {
    userRoadmapId: number;
    userId: number;
  }): Promise<UserRoadmapOverview> {
    try {
      const { data } = await this.http.axiosRef.get<UserRoadmapOverview>(
        `${process.env.USER_SERVICE_URL}/user/roadmaps/${params.userRoadmapId}/overview`,
        {
          headers: {
            'x-user-id': params.userId,
          },
        },
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      this.logger.error(
        `getUserRoadmapOverview failed: status=${err.response?.status} data=${JSON.stringify(
          err.response?.data,
        )}`,
      );

      if (err.response?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('User roadmap not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Failed to fetch user roadmap overview',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async updateCourseProgress(params: {
    userRoadmapId: number;
    courseNodeId: number;
    userId: number;
    creditsEarned: number;
  }): Promise<UserRoadmapOverview> {
    try {
      const { data } = await this.http.axiosRef.patch<UserRoadmapOverview>(
        `${process.env.USER_SERVICE_URL}/user/roadmaps/${params.userRoadmapId}/courses/${params.courseNodeId}`,
        {
          creditsEarned: params.creditsEarned,
        },
        {
          headers: {
            'x-user-id': params.userId,
          },
        },
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      this.logger.error(
        `updateCourseProgress failed: status=${err.response?.status} data=${JSON.stringify(
          err.response?.data,
        )}`,
      );

      if (err.response?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('User roadmap or course node not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Failed to update course progress',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }


  async getUserRoadmaps(userId: number): Promise<UserRoadmapProgressRow[]> {
    try {
      const { data } = await this.http.axiosRef.get<UserRoadmapProgressRow[]>(
        `${process.env.USER_SERVICE_URL}/user/roadmaps/my`,
        {
          headers: {
            'x-user-id': userId,
          },
        },
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      this.logger.error(
        `getUserRoadmaps failed: status=${err.response?.status} data=${JSON.stringify(
          err.response?.data,
        )}`,
      );
      throw new HttpException(
        'Failed to fetch user roadmaps',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}