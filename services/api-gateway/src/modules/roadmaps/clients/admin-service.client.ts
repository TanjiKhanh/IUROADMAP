// gateway/src/modules/roadmaps/clients/admin-service.client.ts

import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ServiceUrls } from '../../../config/service-urls.config';
import { RoadmapDto } from '../dtos';

@Injectable()
export class AdminServiceClient {
  private readonly logger = new Logger(AdminServiceClient.name);
  private readonly adminServiceUrl = ServiceUrls.ADMIN_SERVICE;

  constructor(private httpService: HttpService) {}

  /**
   * Get all roadmaps (SUD-05)
   */
  async getAllRoadmaps(): Promise<RoadmapDto[]> {
    try {
      this.logger.log('Fetching all roadmaps from Admin Service');
      const response = await firstValueFrom(
        this.httpService.get<{ status: string; data: RoadmapDto[] }>(
          `${this.adminServiceUrl}/api/v1/roadmaps`,
        ),
      );
      return response.data.data;
    } catch (error: any) {
      this.logger.error(`Failed to fetch roadmaps: ${error.message}`);
      throw new HttpException(
        {
          status: 'error',
          code: 'ADMIN_SERVICE_ERROR',
          message: 'Failed to fetch roadmaps',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get roadmap by ID (SUD-06)
   */
  async getRoadmapById(roadmapId: number): Promise<RoadmapDto> {
    try {
      this.logger.log(`Fetching roadmap ${roadmapId} from Admin Service`);
      const response = await firstValueFrom(
        this.httpService.get<{ status: string; data: RoadmapDto }>(
          `${this.adminServiceUrl}/api/v1/roadmaps/${roadmapId}/meta`,
        ),
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new HttpException(
          {
            status: 'error',
            code: 'ROADMAP_NOT_FOUND',
            message: 'Roadmap not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      this.logger.error(`Failed to fetch roadmap ${roadmapId}: ${error.message}`);
      throw new HttpException(
        {
          status: 'error',
          code: 'ADMIN_SERVICE_ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get macro roadmap structure (SUD-07)
   */
  async getMacroRoadmap(roadmapId: number) {
    try {
      this.logger.log(`Fetching macro roadmap ${roadmapId} from Admin Service`);
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.adminServiceUrl}/api/v1/roadmaps/${roadmapId}/structure`,
        ),
      );
      return response.data.data;
    } catch (error: any) {
      this.logger.error(`Failed to fetch macro roadmap: ${error.message}`);
      throw new HttpException(
        {
          status: 'error',
          code: 'ADMIN_SERVICE_ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get micro roadmap (topic structure) (SUD-08)
   */
  async getMicroRoadmap(roadmapId: number, courseNodeId: number) {
    try {
      this.logger.log(
        `Fetching micro roadmap ${courseNodeId} from Admin Service`,
      );
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.adminServiceUrl}/api/v1/roadmaps/${roadmapId}/courses/${courseNodeId}/topics`,
        ),
      );
      return response.data.data;
    } catch (error: any) {
      this.logger.error(`Failed to fetch micro roadmap: ${error.message}`);
      throw new HttpException(
        {
          status: 'error',
          code: 'ADMIN_SERVICE_ERROR',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}