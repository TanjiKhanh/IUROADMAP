import { Injectable, Logger } from '@nestjs/common';
import { AdminServiceClient } from '../clients/admin-service.client';
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
  DepartmentResponseDto,
} from '../dtos';

@Injectable()
export class DepartmentsService {
  private readonly logger = new Logger(DepartmentsService.name);

  constructor(private readonly adminClient: AdminServiceClient) {}

  async createDepartment(dto: CreateDepartmentDto): Promise<DepartmentResponseDto> {
    this.logger.log(`Creating department: ${dto.slug}`);
    return this.adminClient.createDepartment(dto);
  }

  async viewDepartmentList(): Promise<DepartmentResponseDto[]> {
    this.logger.log('Fetching department list');
    return this.adminClient.getDepartmentList();
  }

  async viewDepartmentById(id: number): Promise<DepartmentResponseDto> {
    this.logger.log(`Fetching department: ${id}`);
    return this.adminClient.getDepartmentById(id);
  }

  async updateDepartment(
    id: number,
    dto: UpdateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    this.logger.log(`Updating department: ${id}`);
    return this.adminClient.updateDepartment(id, dto);
  }

  async deleteDepartment(id: number): Promise<void> {
    this.logger.log(`Deleting department: ${id}`);
    return this.adminClient.deleteDepartment(id);
  }
}