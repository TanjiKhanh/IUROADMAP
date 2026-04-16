import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateDepartmentDto,
  DepartmentResponseDto,
  UpdateDepartmentDto,
} from '../dto/department-crud.dto';
import { DepartmentsService } from '../services/departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  async createDepartment(
    @Body() dto: CreateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    return this.departmentsService.createDepartment(dto);
  }

  @Get()
  async getDepartmentList(): Promise<DepartmentResponseDto[]> {
    return this.departmentsService.getDepartmentList();
  }

  @Get(':id')
  async getDepartmentById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DepartmentResponseDto> {
    return this.departmentsService.getDepartmentById(id);
  }

  @Patch(':id')
  async updateDepartment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    return this.departmentsService.updateDepartment(id, dto);
  }

  @Delete(':id')
  async deleteDepartment(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.departmentsService.deleteDepartment(id);
  }
}