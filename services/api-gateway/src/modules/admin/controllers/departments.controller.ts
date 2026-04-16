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
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('api/v1/departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  // Create Department
  @UseGuards(JwtGuard)
  @Roles('ADMIN')
  @Post()
  async createDepartment(
    @Body() dto: CreateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    return this.departmentsService.createDepartment(dto);
  }

  // View Department List
  @UseGuards(JwtGuard)
  @Roles('ADMIN')
  @Get()
  async viewDepartmentList(): Promise<DepartmentResponseDto[]> {
    return this.departmentsService.viewDepartmentList();
  }

  // View Department by ID
  @UseGuards(JwtGuard)
  @Roles('ADMIN')
  @Get(':id')
  async viewDepartmentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DepartmentResponseDto> {
    return this.departmentsService.viewDepartmentById(id);
  }

  // Update Department
  @UseGuards(JwtGuard)
  @Roles('ADMIN')
  @Patch(':id')
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
  async deleteDepartment(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.departmentsService.deleteDepartment(id);
  }
}