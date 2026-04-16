import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { CreateDepartmentDto, UpdateDepartmentDto, DepartmentResponseDto } from '../dtos';

@Injectable()
export class DepartmentAdminServiceClient {
  private readonly logger = new Logger(DepartmentAdminServiceClient.name);

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
}