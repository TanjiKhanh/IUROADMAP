import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../../generated/prisma-client';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  CreateDepartmentDto,
  DepartmentResponseDto,
  UpdateDepartmentDto,
} from '../dto/department-crud.dto';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  private toResponse(department: {
    id: number;
    slug: string;
    name: string;
    description?: string | null;
    created_at: Date;
    updated_at: Date;
  }): DepartmentResponseDto {
    return {
      id: department.id,
      slug: department.slug,
      name: department.name,
      description: department.description ?? null,
      created_at: department.created_at.toISOString(),
      updated_at: department.updated_at.toISOString(),
    };
  }

  async createDepartment(dto: CreateDepartmentDto): Promise<DepartmentResponseDto> {
    try {
      const department = await this.prisma.dEPARTMENTS.create({
        data: {
          slug: dto.slug,
          name: dto.name,
          description: dto.description,
        },
      });

      return this.toResponse(department);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Department slug already exists');
      }

      throw error;
    }
  }

  async getDepartmentList(): Promise<DepartmentResponseDto[]> {
    const departments = await this.prisma.dEPARTMENTS.findMany({
      orderBy: { id: 'asc' },
    });

    return departments.map((department) => this.toResponse(department));
  }

  async getDepartmentById(id: number): Promise<DepartmentResponseDto> {
    const department = await this.prisma.dEPARTMENTS.findUnique({
      where: { id },
    });

    if (!department) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }

    return this.toResponse(department);
  }

  async updateDepartment(
    id: number,
    dto: UpdateDepartmentDto,
  ): Promise<DepartmentResponseDto> {
    try {
      const department = await this.prisma.dEPARTMENTS.update({
        where: { id },
        data: {
          slug: dto.slug,
          name: dto.name,
          description: dto.description,
        },
      });

      return this.toResponse(department);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Department slug already exists');
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Department with id ${id} not found`);
      }

      throw error;
    }
  }

  async deleteDepartment(id: number): Promise<void> {
    try {
      await this.prisma.dEPARTMENTS.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Department with id ${id} not found`);
      }

      throw error;
    }
  }
}