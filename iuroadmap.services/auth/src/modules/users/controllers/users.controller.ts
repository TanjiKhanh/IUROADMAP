import { Controller, Get, Param, Post, Body, Query, UseGuards, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard, RoleGuard, Roles } from '@iuroadmap/shared';
import { UsersService } from '../services/users.service';
import { 
  UserCreateRequest, 
  UserUpdateRequest, 
  UserFilterRequest, 
  UserResponse, 
  UserDetailResponse 
} from '../dto/user';

@ApiTags('IAM - Users')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Controller({
  path: 'iam/User', // Aligned with master data routing pattern
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully', type: UserResponse })
  async create(@Body() dto: UserCreateRequest) {
    return this.usersService.create(dto);
  }

  @Post('update')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiResponse({ status: 200, description: 'User updated successfully', type: UserResponse })
  @HttpCode(200)
  async update(@Body() dto: UserUpdateRequest) {
    return this.usersService.update(dto);
  }

  @Get('getById/:id')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Get user details by ID' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully', type: UserDetailResponse })
  async getById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('GetByIndex')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Filter and paginate users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async getByIndex(@Query() filters: UserFilterRequest) {
    // Pagination defaults are set by the PaginationRequest base class
    filters.setDefaultValue(); 
    return this.usersService.findAll(filters);
  }

  @Post('softDelete/:id')
  @Roles('ADMIN', 'SUPERADMIN')
  @ApiOperation({ summary: 'Soft delete a user (change status to BANNED)' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User soft deleted successfully', type: UserResponse })
  @HttpCode(200)
  async softDelete(@Param('id') id: string) {
    return this.usersService.softDelete(id);
  }

  @Post('delete/:id')
  @Roles('SUPERADMIN')
  @ApiOperation({ summary: 'Hard delete a user (Superadmin only)' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User hard deleted successfully' })
  @HttpCode(200)
  async delete(@Param('id') id: string) {
    await this.usersService.delete(id);
    return null; // ResponseInterceptor will format this as { status: "success", data: null }
  }
}
