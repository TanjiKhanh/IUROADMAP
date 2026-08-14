import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { DepartmentsService } from '../services/departments.service';
import {
  CreateDepartmentDto,
  UpdateDepartmentDto,
  DepartmentResponseDto,
} from '../dtos';
import { JwtGuard } from '@iuroadmap/shared';
import { Roles } from '@iuroadmap/shared';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Departments')
@ApiBearerAuth()
@Controller({
  path: 'departments',
  version: '1',
})
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  // Create Department
  @UseGuards(JwtGuard)
  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Create a new department (Admin only)' })
  @ApiBody({ type: CreateDepartmentDto })
  @ApiResponse({ status: 201, description: 'Department created successfully', type: DepartmentResponseDto })
  async createDepartment(
    @Body() dto: CreateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    return this.departmentsService.createDepartment(dto);
  }

  // View Department List
  @UseGuards(JwtGuard)
  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Get list of all departments (Admin only)' })
  @ApiResponse({ status: 200, description: 'Departments retrieved successfully', type: [DepartmentResponseDto] })
  async viewDepartmentList(): Promise<DepartmentResponseDto[]> {
    return this.departmentsService.viewDepartmentList();
  }

  // View Department by ID
  @UseGuards(JwtGuard)
  @Roles('ADMIN')
  @Get(':id')
  @ApiOperation({ summary: 'Get department details by ID (Admin only)' })
  @ApiParam({ name: 'id', type: Number, description: 'Department ID' })
  @ApiResponse({ status: 200, description: 'Department retrieved successfully', type: DepartmentResponseDto })
  @ApiResponse({ status: 404, description: 'Department not found' })
  async viewDepartmentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DepartmentResponseDto> {
    return this.departmentsService.viewDepartmentById(id);
  }

  // Update Department
  @UseGuards(JwtGuard)
  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing department (Admin only)' })
  @ApiParam({ name: 'id', type: Number, description: 'Department ID' })
  @ApiBody({ type: UpdateDepartmentDto })
  @ApiResponse({ status: 200, description: 'Department updated successfully', type: DepartmentResponseDto })
  async updateDepartment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    return this.departmentsService.updateDepartment(id, dto);
  }

  // Delete Department
  @UseGuards(JwtGuard)
  @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a department by ID (Admin only)' })
  @ApiParam({ name: 'id', type: Number, description: 'Department ID' })
  @ApiResponse({ status: 204, description: 'Department deleted successfully' })
  async deleteDepartment(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.departmentsService.deleteDepartment(id);
  }
}