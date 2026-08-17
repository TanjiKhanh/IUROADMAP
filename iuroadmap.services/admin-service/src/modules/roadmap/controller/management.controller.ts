import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ManagementService } from '../services/management.service';
import { DepartmentDto, MajorDto } from '../dto/department.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { PaginationRequest, DropdownItemDto, PaginationResponse } from '@iuroadmap/shared';
import { ParseIntPipe } from '@nestjs/common';

@ApiTags('Majors')
@ApiBearerAuth()
@Controller('majors')
export class ManagementController {
  constructor(private readonly service: ManagementService) {}

  // ─── CREATE ──────────────────────────────────────────────────────────────────

  @Post('create')
  @ApiOperation({ summary: 'Create a new major' })
  @ApiResponse({ status: 201, description: 'Major created successfully' })
  async create(@Body() dto: any): Promise<any> {
    return this.service.create(dto);
  }

  // ─── UPDATE ──────────────────────────────────────────────────────────────────

  @Post('update')
  @ApiOperation({ summary: 'Update a major' })
  @ApiResponse({ status: 200, description: 'Major updated successfully' })
  async update(@Body() dto: any): Promise<any> {
    const { id, ...data } = dto;
    return this.service.update(id, data);
  }

  // ─── GET BY ID ───────────────────────────────────────────────────────────────

  @Get('getById/:id')
  @ApiOperation({ summary: 'Get major by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Major ID' })
  @ApiResponse({ status: 200, description: 'Major retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Major not found' })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.service.findById(id);
  }

  // ─── GET BY INDEX (PAGINATED) ────────────────────────────────────────────────

  @Get('GetByIndex')
  @ApiOperation({ summary: 'Get paginated list of majors' })
  @ApiQuery({ name: 'currentPage', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'rowsPerPage', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'departmentId', required: false, type: Number, description: 'Filter by department ID' })
  @ApiQuery({ name: 'departmentSlug', required: false, type: String, description: 'Filter by department slug' })
  @ApiResponse({ status: 200, description: 'Majors list retrieved successfully' })
  async getByIndex(@Query() filter: PaginationRequest & { departmentId?: number; departmentSlug?: string }): Promise<PaginationResponse<any>> {
    return this.service.findAll(filter);
  }

  // ─── FOR DROPDOWN ────────────────────────────────────────────────────────────

  @Get('ForDropdown')
  @ApiOperation({ summary: 'Get majors for dropdown selection' })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 50 })
  @ApiQuery({ name: 'parentId', required: false, type: Number, description: 'Department ID for cascading filter' })
  @ApiResponse({ status: 200, description: 'Dropdown data retrieved successfully', type: [DropdownItemDto] })
  async forDropdown(
    @Query('keyword') keyword?: string,
    @Query('limit') limit?: number,
    @Query('parentId') parentId?: number,
  ): Promise<DropdownItemDto[]> {
    return this.service.getDropdownList(keyword, limit || 50, parentId);
  }

  // ─── DELETE ──────────────────────────────────────────────────────────────────

  @Post('delete/:id')
  @ApiOperation({ summary: 'Delete a major' })
  @ApiParam({ name: 'id', type: Number, description: 'Major ID' })
  @ApiResponse({ status: 200, description: 'Major deleted successfully' })
  @ApiResponse({ status: 404, description: 'Major not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> {
    await this.service.delete(id);
    return { success: true };
  }

  // ─── CUSTOM: Update major metadata by slug (legacy) ──────────────────────────

  @Patch(':slug')
  @ApiOperation({ summary: 'Update major metadata by slug' })
  @ApiParam({ name: 'slug', type: String, description: 'Major slug' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        totalCreditsRequired: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Major metadata updated successfully', type: MajorDto })
  async updateMajorMeta(
    @Param('slug') slug: string,
    @Body() payload: { name?: string; description?: string; totalCreditsRequired?: number },
  ): Promise<MajorDto> {
    return this.service.updateMajorMeta(slug, payload);
  }
}