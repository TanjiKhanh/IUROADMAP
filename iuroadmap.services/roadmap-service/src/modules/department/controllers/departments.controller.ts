import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DropdownItemDto } from '@iuroadmap/shared';
import { AdminOnly } from '../../../common/auth.decorators';
import { ApiPaginatedResponse } from '../../../common/api-paginated-response.decorator';
import { SuccessResponse } from '../../../common/success.response';
import { DepartmentsService } from '../services/departments.service';
import {
  DepartmentCreateRequest,
  DepartmentFilterRequest,
  DepartmentResponse,
  DepartmentUpdateRequest,
} from '../dto/department';

@ApiTags('Departments')
@Controller({ path: 'departments', version: '1' })
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post('create')
  @AdminOnly()
  @ApiOperation({ summary: 'Create a department' })
  @ApiResponse({ status: 201, type: DepartmentResponse })
  @ApiResponse({ status: 409, description: 'Slug already exists' })
  async create(@Body() dto: DepartmentCreateRequest): Promise<DepartmentResponse> {
    return this.departmentsService.create(dto);
  }

  @Post('update')
  @AdminOnly()
  @ApiOperation({ summary: 'Update a department' })
  @ApiResponse({ status: 200, type: DepartmentResponse })
  async update(@Body() dto: DepartmentUpdateRequest): Promise<DepartmentResponse> {
    const { id, ...data } = dto;
    return this.departmentsService.update(id, data);
  }

  @Get('getById/:id')
  @AdminOnly()
  @ApiOperation({ summary: 'Get a department by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: DepartmentResponse })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<DepartmentResponse> {
    return this.departmentsService.findById(id);
  }

  @Get('GetByIndex')
  @AdminOnly()
  @ApiOperation({ summary: 'Paginated list of departments' })
  @ApiPaginatedResponse(DepartmentResponse)
  async getByIndex(@Query() filter: DepartmentFilterRequest) {
    return this.departmentsService.findAll(filter);
  }

  @Get('ForDropdown')
  @ApiOperation({ summary: 'Departments for dropdowns (public: used by Explore filters)' })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, type: [DropdownItemDto] })
  async forDropdown(@Query('keyword') keyword?: string, @Query('limit') limit?: number): Promise<DropdownItemDto[]> {
    return this.departmentsService.getDropdownList(keyword, Number(limit) || 50);
  }

  @Post('delete/:id')
  @AdminOnly()
  @ApiOperation({ summary: 'Delete a department (blocked while it has majors or lecturers)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: SuccessResponse })
  @ApiResponse({ status: 409, description: 'DEPARTMENT_HAS_MAJORS / DEPARTMENT_HAS_LECTURERS' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<SuccessResponse> {
    await this.departmentsService.delete(id);
    return { success: true };
  }
}
