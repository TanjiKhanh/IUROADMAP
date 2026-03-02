import { Controller, Get, Param, NotFoundException, Query, ValidationPipe, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { FilterUsersDto  } from '../dto/filter-users.dto';
import {  UserResponseDto  } from '../dto/user-response.dto';



@Controller('users') 
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 1. Fetch all users WITH FILTERS and PAGINATION 
  @Get()
  async findAll(
    @Query(new ValidationPipe({ transform: true })) filters: FilterUsersDto,
  ) {
    const result = await this.usersService.findAll(filters);
    
    // Wrap every single user in the DTO so the Interceptor can strip the passwords
    return {
      data: result.data.map(user => new UserResponseDto(user)),
      meta: result.meta
    };
  }

  // 2. Fetch single user
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(Number(id));
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return new UserResponseDto(user);
  }
}