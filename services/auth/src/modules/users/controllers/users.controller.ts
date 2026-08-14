import { Controller, Get, Param, NotFoundException, Query, ValidationPipe, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { FilterUsersRequestDto } from '../dto/requests/filter-users.request.dto';
import { UserResponseDto } from '../dto/responses/user.response.dto';

@ApiTags('User')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 1. Fetch all users WITH FILTERS and PAGINATION
  @Get()
  @ApiOperation({ summary: 'Filter and paginate users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async findAll(
    @Query(new ValidationPipe({ transform: true })) filters: FilterUsersRequestDto,
  ) {
    const result = await this.usersService.findAll(filters);
    
    return {
      data: result.data.map(user => new UserResponseDto(user)),
      meta: result.meta
    };
  }

  // 2. Fetch single user
  @Get(':id')
  @ApiOperation({ summary: 'Get user profile details by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully', type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(Number(id));
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return new UserResponseDto(user);
  }
}
