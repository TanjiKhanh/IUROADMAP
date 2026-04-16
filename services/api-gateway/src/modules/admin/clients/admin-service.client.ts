import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { CreateDepartmentDto, UpdateDepartmentDto, DepartmentResponseDto, AdminPrerequisiteEdgeResponseDto, CreatePrerequisiteDto, AdminCourseNodeResponseDto, CreateCourseNodeDto, UpdateCourseNodeDto, AdminRoadmapGraph } from '../dtos';
import { MajorResponseDto, UpdateMajorMetaPayload } from '../dtos/major.dto';
@Injectable()
export class AdminServiceClient {
  private readonly logger = new Logger(AdminServiceClient.name);

  constructor(private readonly http: HttpService) {}

  async createDepartment(dto: CreateDepartmentDto): Promise<DepartmentResponseDto> {
    try {
      const { data } = await this.http.axiosRef.post(
        `${process.env.ADMIN_SERVICE_URL}/departments`,
        dto,
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      this.logger.error(
        `createDepartment failed: status=${err.response?.status} data=${JSON.stringify(
          err.response?.data,
        )}`,
      );
      throw new HttpException(
        'Failed to create department',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getDepartmentList(): Promise<DepartmentResponseDto[]> {
    try {
      const { data } = await this.http.axiosRef.get(
        `${process.env.ADMIN_SERVICE_URL}/departments`,
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      this.logger.error(
        `getDepartmentList failed: status=${err.response?.status}`,
      );
      throw new HttpException(
        'Failed to fetch departments',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getDepartmentById(id: number): Promise<DepartmentResponseDto> {
    try {
      const { data } = await this.http.axiosRef.get(
        `${process.env.ADMIN_SERVICE_URL}/departments/${id}`,
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      this.logger.error(
        `getDepartmentById failed: id=${id} status=${err.response?.status}`,
      );
      throw new HttpException(
        'Failed to fetch department',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async updateDepartment(
    id: number,
    dto: UpdateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    try {
      const { data } = await this.http.axiosRef.patch(
        `${process.env.ADMIN_SERVICE_URL}/departments/${id}`,
        dto,
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      this.logger.error(
        `updateDepartment failed: id=${id} status=${err.response?.status}`,
      );
      throw new HttpException(
        'Failed to update department',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async deleteDepartment(id: number): Promise<void> {
    try {
      await this.http.axiosRef.delete(
        `${process.env.ADMIN_SERVICE_URL}/departments/${id}`,
      );
    } catch (error) {
      const err = error as AxiosError;
      this.logger.error(
        `deleteDepartment failed: id=${id} status=${err.response?.status}`,
      );
      throw new HttpException(
        'Failed to delete department',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }



   async getAdminRoadmapGraph(roadmapId: number): Promise<AdminRoadmapGraph> {
    try {
      const { data } = await this.http.axiosRef.get<AdminRoadmapGraph>(
        `${process.env.ADMIN_SERVICE_URL}/admin/roadmaps/${roadmapId}/graph`,
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('Roadmap not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Failed to fetch admin roadmap graph',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async createAdminCourseNode(
    roadmapId: number,
    dto: CreateCourseNodeDto,
  ): Promise<AdminCourseNodeResponseDto> {
    try {
      const { data } = await this.http.axiosRef.post<AdminCourseNodeResponseDto>(
        `${process.env.ADMIN_SERVICE_URL}/admin/roadmaps/${roadmapId}/courses`,
        dto,
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(
        (err.response?.data as any)?.message || 'Failed to create course node',
        err.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async updateAdminCourseNode(
    roadmapId: number,
    courseNodeId: number,
    dto: UpdateCourseNodeDto,
  ): Promise<AdminCourseNodeResponseDto> {
    try {
      const { data } = await this.http.axiosRef.patch<AdminCourseNodeResponseDto>(
        `${process.env.ADMIN_SERVICE_URL}/admin/roadmaps/${roadmapId}/courses/${courseNodeId}`,
        dto,
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(
        (err.response?.data as any)?.message || 'Failed to update course node',
        err.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async deleteAdminCourseNode(roadmapId: number, courseNodeId: number): Promise<void> {
    try {
      await this.http.axiosRef.delete(
        `${process.env.ADMIN_SERVICE_URL}/admin/roadmaps/${roadmapId}/courses/${courseNodeId}`,
      );
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(
        (err.response?.data as any)?.message || 'Failed to delete course node',
        err.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async createAdminPrerequisite(
    roadmapId: number,
    dto: CreatePrerequisiteDto,
  ): Promise<AdminPrerequisiteEdgeResponseDto> {
    try {
      const { data } = await this.http.axiosRef.post<AdminPrerequisiteEdgeResponseDto>(
        `${process.env.ADMIN_SERVICE_URL}/admin/roadmaps/${roadmapId}/prerequisites`,
        dto,
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(
        (err.response?.data as any)?.message || 'Failed to create prerequisite edge',
        err.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async deleteAdminPrerequisite(roadmapId: number, edgeId: number): Promise<void> {
    try {
      await this.http.axiosRef.delete(
        `${process.env.ADMIN_SERVICE_URL}/admin/roadmaps/${roadmapId}/prerequisites/${edgeId}`,
      );
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(
        (err.response?.data as any)?.message || 'Failed to delete prerequisite edge',
        err.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }


  async getAllMajorRoadmaps(): Promise<MajorResponseDto[]> {
    try {
      const { data } = await this.http.axiosRef.get<MajorResponseDto[]>(
        `${process.env.ADMIN_SERVICE_URL}/admin/management/majors`,
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(
        (err.response?.data as any)?.message || 'Failed to fetch major roadmaps',
        err.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }



  async updateMajorMeta(slug: string, payload: UpdateMajorMetaPayload): Promise<any> {
    try {
      const { data } = await this.http.axiosRef.patch(
        `${process.env.ADMIN_SERVICE_URL}/admin/management/majors/${slug}`,
        payload
      );
      return data;
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(
        (err.response?.data as any)?.message || 'Failed to update major meta',
        err.response?.status || HttpStatus.BAD_GATEWAY,
      );
    }
  }

}

