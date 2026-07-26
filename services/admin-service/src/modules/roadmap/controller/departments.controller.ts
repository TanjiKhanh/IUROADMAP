import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateDepartmentDto,
  DepartmentResponseDto,
  UpdateDepartmentDto,
} from '../dto/department-crud.dto';
import { DepartmentsService } from '../services/departments.service';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Admin - Departments')
@ApiBearerAuth()
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  @ApiBody({ type: CreateDepartmentDto })
  @ApiResponse({ status: 201, description: 'Department created successfully', type: DepartmentResponseDto })
  async createDepartment(
    @Body() dto: CreateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    return this.departmentsService.createDepartment(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of all departments' })
  @ApiResponse({ status: 200, description: 'Departments retrieved successfully', type: [DepartmentResponseDto] })
  async getDepartmentList(): Promise<DepartmentResponseDto[]> {
    return this.departmentsService.getDepartmentList();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get department details by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Department ID' })
  @ApiResponse({ status: 200, description: 'Department retrieved successfully', type: DepartmentResponseDto })
  @ApiResponse({ status: 404, description: 'Department not found' })
  async getDepartmentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DepartmentResponseDto> {
    return this.departmentsService.getDepartmentById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing department' })
  @ApiParam({ name: 'id', type: Number, description: 'Department ID' })
  @ApiBody({ type: UpdateDepartmentDto })
  @ApiResponse({ status: 200, description: 'Department updated successfully', type: DepartmentResponseDto })
  async updateDepartment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    return this.departmentsService.updateDepartment(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a department by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Department ID' })
  @ApiResponse({ status: 204, description: 'Department deleted successfully' })
  async deleteDepartment(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.departmentsService.deleteDepartment(id);
  }
}