import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { DepartmentRepository } from './department.repository';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  
  
  constructor(private readonly repository: DepartmentRepository) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    // Check if slug exists
    const existing = await this.repository.findOneBySlug(createDepartmentDto.slug);
    if (existing) {
      throw new ConflictException(`Department with slug '${createDepartmentDto.slug}' already exists`);
    }

    return this.repository.create(createDepartmentDto);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(slug: string) {
    const department = await this.repository.findOneBySlug(slug);
    if (!department) {
      throw new NotFoundException(`Department with slug '${slug}' not found`);
    }
    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    // Verify existence
    const existing = await this.repository.findOneById(id);
    if (!existing) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return this.repository.update(id, updateDepartmentDto);
  }

  async remove(id: number) {
    return this.repository.remove(id);
  }

  async findOneById(departmentId: number) {
    return this.repository.findOneById(departmentId);
  }

  
}