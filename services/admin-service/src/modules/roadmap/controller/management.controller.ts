// admin-service/src/management/management.controller.ts
import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ManagementService } from '../services/management.service';
import { DepartmentDto, MajorDto } from '../dto/department.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Admin - Roadmaps')
@ApiBearerAuth()
@Controller('admin/management')
export class ManagementController {
  constructor(private readonly service: ManagementService) {}

  // GET /admin/management/departments
  @Get('departments')
  @ApiOperation({ summary: 'Get list of all departments' })
  @ApiResponse({ status: 200, description: 'Departments retrieved successfully', type: [DepartmentDto] })
  async getDepartments(): Promise<DepartmentDto[]> {
    return this.service.listDepartments();
  }

  // GET /admin/management/majors?departmentSlug=it
  @Get('majors')
  @ApiOperation({ summary: 'Get list of majors, optionally filtered by department slug' })
  @ApiQuery({ name: 'departmentSlug', required: false, type: String, description: 'Filter by department slug' })
  @ApiResponse({ status: 200, description: 'Majors retrieved successfully', type: [MajorDto] })
  async getMajors(
    @Query('departmentSlug') departmentSlug?: string,
  ): Promise<MajorDto[]> {
    return this.service.listMajors(departmentSlug);
  }

  @Patch('majors/:slug')
  @ApiOperation({ summary: 'Update major metadata' })
  @ApiParam({ name: 'slug', type: String, description: 'Slug of the major' })
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