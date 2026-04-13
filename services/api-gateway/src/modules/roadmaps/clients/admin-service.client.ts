// services/api-gateway/src/modules/roadmaps/clients/admin-service.client.ts
import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import { AdminRoadmapGraph, MajorMeta } from '../interfaces';

@Injectable()
export class AdminServiceClient {
  constructor(private readonly http: HttpService) {}

  async getMajorBySlug(slug: string): Promise<MajorMeta> {
    try {
      const { data } = await this.http.axiosRef.get<MajorMeta>(
        `${process.env.ADMIN_SERVICE_URL}/admin/major-roadmaps/${slug}`,
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('Major not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Failed to fetch major information',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }



  async getRoadmapGraph(roadmapId: number): Promise<AdminRoadmapGraph> {
    try {
      const { data } = await this.http.axiosRef.get<AdminRoadmapGraph>(
        `${process.env.ADMIN_SERVICE_URL}/admin/major-roadmaps/${roadmapId}/graph`,
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('Roadmap not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Failed to fetch roadmap graph',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }


  async getCourseTopicsGraph(courseNodeId: number): Promise<any> {
    try {
      const { data } = await this.http.axiosRef.get(
        `${process.env.ADMIN_SERVICE_URL}/admin/course-nodes/${courseNodeId}/topics-graph`,
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      
      if (err.response?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('Course topics graph not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Failed to fetch course topics graph',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  
}