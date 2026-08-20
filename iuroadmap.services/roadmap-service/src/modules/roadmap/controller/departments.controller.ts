import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { DepartmentsService } from '../services/departments.service';
import {
  CreateDepartmentDto,
  DepartmentResponseDto,
  UpdateDepartmentDto,
} from '../dto/department-crud.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { PaginationRequest, DropdownItemDto, PaginationResponse } from '@iuroadmap/shared';

@ApiTags('Departments')
@ApiBearerAuth()
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  // ─── CREATE ──────────────────────────────────────────────────────────────────

  @Post('create')
  @ApiOperation({ summary: 'Create a new department' })
  @ApiBody({ type: CreateDepartmentDto })
  @ApiResponse({ status: 201, description: 'Department created successfully', type: DepartmentResponseDto })
  @ApiResponse({ status: 409, description: 'Department slug already exists' })
  async create(@Body() dto: CreateDepartmentDto): Promise<DepartmentResponseDto> {
    return this.departmentsService.create(dto);
  }

  // ─── UPDATE ──────────────────────────────────────────────────────────────────

  @Post('update')
  @ApiOperation({ summary: 'Update an existing department' })
  @ApiBody({ type: UpdateDepartmentDto })
  @ApiResponse({ status: 200, description: 'Department updated successfully', type: DepartmentResponseDto })
  @ApiResponse({ status: 404, description: 'Department not found' })
  async update(@Body() dto: UpdateDepartmentDto & { id: number }): Promise<DepartmentResponseDto> {
    const { id, ...data } = dto;
    return this.departmentsService.update(id, data);
  }

  // ─── GET BY ID ───────────────────────────────────────────────────────────────

  @Get('getById/:id')
  @ApiOperation({ summary: 'Get department by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Department ID' })
  @ApiResponse({ status: 200, description: 'Department retrieved successfully', type: DepartmentResponseDto })
  @ApiResponse({ status: 404, description: 'Department not found' })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<DepartmentResponseDto> {
    return this.departmentsService.findById(id);
  }

  // ─── GET BY INDEX (PAGINATED) ────────────────────────────────────────────────

  @Get('GetByIndex')
  @ApiOperation({ summary: 'Get paginated list of departments' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiResponse({ status: 200, description: 'Departments list retrieved successfully' })
  async getByIndex(@Query() filter: PaginationRequest): Promise<PaginationResponse<DepartmentResponseDto>> {
    return this.departmentsService.findAll(filter);
  }

  // ─── FOR DROPDOWN ────────────────────────────────────────────────────────────

  @Get('ForDropdown')
  @ApiOperation({ summary: 'Get departments for dropdown selection' })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 50 })
  @ApiResponse({ status: 200, description: 'Dropdown data retrieved successfully', type: [DropdownItemDto] })
  async forDropdown(
    @Query('keyword') keyword?: string,
    @Query('limit') limit?: number,
  ): Promise<DropdownItemDto[]> {
    return this.departmentsService.getDropdownList(keyword, limit || 50);
  }

  // ─── DELETE ──────────────────────────────────────────────────────────────────

  @Post('delete/:id')
  @ApiOperation({ summary: 'Delete a department' })
  @ApiParam({ name: 'id', type: Number, description: 'Department ID' })
  @ApiResponse({ status: 200, description: 'Department deleted successfully' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  @ApiResponse({ status: 409, description: 'Cannot delete: department has associated majors' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> {
    await this.departmentsService.delete(id);
    return { success: true };
  }
}