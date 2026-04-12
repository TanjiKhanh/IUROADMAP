// services/api-gateway/src/modules/roadmaps/clients/user-service.client.ts
import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { UserServiceEnrollResponse , UserRoadmapDetail , UserRoadmapProgress } from '../interfaces';

@Injectable()
export class UserServiceClient {
  constructor(private readonly http: HttpService) {}

  private readonly logger = new Logger(UserServiceClient.name);

  async enrollUserToRoadmap(params: {
    userId: number;
    roadmapId: number;
    totalCreditsRequired: number;
  }): Promise<UserServiceEnrollResponse> {
    try {
      console.log('Enrolling user to roadmap with params:', params);
      const { data } = await this.http.axiosRef.post<UserServiceEnrollResponse>(
        `${process.env.USER_SERVICE_URL}/user/roadmaps/enroll`,
        {
          userId: params.userId,
          roadmapId: params.roadmapId,
          totalCreditsRequired: params.totalCreditsRequired,
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
  }): Promise<UserRoadmapDetail> {
    try {
      const { data } = await this.http.axiosRef.get<UserRoadmapDetail>(
        `${process.env.USER_SERVICE_URL}/user/roadmaps/${params.userRoadmapId}`,
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

  async getUserRoadmapProgress(params: {
    userRoadmapId: number;
    userId: number;
  }): Promise<UserRoadmapProgress> {
    try {
      const { data } = await this.http.axiosRef.get<UserRoadmapProgress>(
        `${process.env.USER_SERVICE_URL}/user/roadmaps/${params.userRoadmapId}/progress`,
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
        `getUserRoadmapProgress failed: status=${err.response?.status} data=${JSON.stringify(
          err.response?.data,
        )}`,
      );

      if (err.response?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('User roadmap not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Failed to fetch user roadmap progress',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}