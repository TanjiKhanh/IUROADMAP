import { Controller, Post, Get, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { RolesService } from '../services/roles.service';
import { RoleCreateRequest, RoleUpdateRequest, RoleResponse, RoleDetailResponse } from '../dto/role';
import { JwtGuard, RoleGuard, Roles } from '@iuroadmap/shared';
import { RoleFilterRequest } from '../dto/role';

@ApiTags('IAM - Roles')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Controller({
  path: 'iam/Role',
  version: '1',
})
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new role (Admin only)' })
  @ApiResponse({ status: 201, description: 'Record created successfully', type: RoleResponse })
  async create(@Body() dto: RoleCreateRequest): Promise<RoleResponse> {
    return this.rolesService.create(dto);
  }

  @Post('update')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a role (Admin only)' })
  @ApiResponse({ status: 200, description: 'Record updated successfully', type: RoleResponse })
  async update(@Body() dto: RoleUpdateRequest): Promise<RoleResponse> {
    const { id, ...data } = dto;
    return this.rolesService.update(id, data);
  }

  @Get('getById/:id')
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Get record by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Record ID' })
  @ApiResponse({ status: 200, description: 'Record retrieved successfully', type: RoleDetailResponse })
  async getById(@Param('id') id: string): Promise<RoleDetailResponse> {
    return this.rolesService.findById(id);
  }

  @Get('GetAllPermission')
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Get all permissions grouped' })
  @ApiResponse({ status: 200, description: 'Permissions retrieved successfully' })
  async getAllPermissions() {
    return this.rolesService.getAllPermissions();
  }

  @Get('GetByIndex')
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Get paginated list of records' })
  @ApiQuery({ name: 'currentPage', required: false, type: Number })
  @ApiQuery({ name: 'rowsPerPage', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Paginated list retrieved successfully' })
  async getByIndex(@Query() filter: RoleFilterRequest) {
    return this.rolesService.findAll(filter);
  }

  @Get('ForDropdown')
  @Roles('ADMIN', 'USER')
  @ApiOperation({ summary: 'Get lightweight dropdown data' })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Dropdown data retrieved successfully' })
  async forDropdown(
    @Query('keyword') keyword?: string,
    @Query('limit') limit?: number,
  ) {
    return this.rolesService.getDropdownList(keyword, limit || 50);
  }

  @Post('delete/:id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a record by ID (Admin only)' })
  @ApiParam({ name: 'id', type: String, description: 'Record ID' })
  @ApiResponse({ status: 200, description: 'Record deleted successfully' })
  async delete(@Param('id') id: string) {
    await this.rolesService.delete(id);
    return { success: true };
  }
}
