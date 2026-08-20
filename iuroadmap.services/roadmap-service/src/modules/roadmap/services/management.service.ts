import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { PaginationRequest, DropdownItemDto, PaginationResponse, getPaginationAsync } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ManagementService {
  private readonly logger = new Logger(ManagementService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    try {
      const record = await this.prisma.mAJOR_ROADMAPS.create({
        data,
        include: {
          department: true,
          courseNodes: { select: { id: true } },
        }
      });
      return this.toResponse(record);
    } catch (error: any) {
      this.handlePrismaError(error, 'create');
    }
  }

  async update(id: number, data: any) {
    await this.ensureExists(id);
    try {
      const record = await this.prisma.mAJOR_ROADMAPS.update({
        where: { id },
        data,
        include: {
          department: true,
          courseNodes: { select: { id: true } },
        }
      });
      return this.toResponse(record);
    } catch (error: any) {
      this.handlePrismaError(error, 'update', id.toString());
    }
  }

  async findById(id: number) {
    const record = await this.prisma.mAJOR_ROADMAPS.findUnique({
      where: { id },
      include: {
        department: true,
        courseNodes: { select: { id: true } },
      }
    });
    
    if (!record) {
      throw new NotFoundException(`Major with id ${id} not found`);
    }
    
    return this.toResponse(record);
  }

  async findAll(filter: PaginationRequest & { departmentId?: number; departmentSlug?: string }): Promise<PaginationResponse<any>> {
    const response = await getPaginationAsync(this.prisma.mAJOR_ROADMAPS, filter, (f) => {
      const where: any = {};
      if (f.keyword) {
        where.OR = [
          { name: { contains: f.keyword, mode: 'insensitive' } },
          { slug: { contains: f.keyword, mode: 'insensitive' } },
          { description: { contains: f.keyword, mode: 'insensitive' } },
        ];
      }
      
      if (f.departmentId) {
        where.department_id = Number(f.departmentId);
      }
      if (f.departmentSlug) {
        where.department = { slug: f.departmentSlug };
      }
      return where;
    }, {
      include: {
        department: true,
        courseNodes: { select: { id: true } },
      }
    });

    if (response.datas) {
      response.datas = response.datas.map((record: any) => this.toResponse(record));
    }
    
    return response;
  }

  async delete(id: number): Promise<void> {
    await this.ensureExists(id);
    try {
      await this.prisma.mAJOR_ROADMAPS.delete({ where: { id } });
    } catch (error: any) {
      this.handlePrismaError(error, 'delete', id.toString());
    }
  }

  async getDropdownList(keyword?: string, limit: number = 50, parentId?: number | string): Promise<DropdownItemDto[]> {
    const where: any = {};
    if (keyword) {
      where.name = { contains: keyword, mode: 'insensitive' };
    }
    if (parentId) {
      where.department_id = Number(parentId);
    }

    const records = await this.prisma.mAJOR_ROADMAPS.findMany({
      where,
      select: { id: true, name: true, slug: true, department_id: true },
      take: limit,
      orderBy: { name: 'asc' },
    });

    return records.map((record) => ({
      id: record.id.toString(),
      label: record.name,
      metadata: { slug: record.slug, department_id: record.department_id }
    }));
  }

  async updateMajorMeta(
    slug: string,
    payload: { name?: string; description?: string; totalCreditsRequired?: number },
  ): Promise<any> {
    const existing = await this.prisma.mAJOR_ROADMAPS.findUnique({ where: { slug } });

    if (!existing) {
      throw new NotFoundException(`Major with slug "${slug}" not found`);
    }

    const { name, description, totalCreditsRequired } = payload;

    const updated = await this.prisma.mAJOR_ROADMAPS.update({
      where: { slug },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(totalCreditsRequired !== undefined && { total_credits: totalCreditsRequired }),
      },
      include: {
        department: true,
        courseNodes: { select: { id: true } },
      },
    });

    return this.toResponse(updated);
  }

  /**
   * Custom response mapping — includes department and course count.
   */
  protected toResponse(record: any): any {
    return {
      id: record.id,
      slug: record.slug,
      name: record.name,
      description: record.description ?? null,
      totalCreditsRequired: record.total_credits,
      totalCourses: record.courseNodes?.length ?? 0,
      department: record.department
        ? {
            id: record.department.id,
            slug: record.department.slug,
            name: record.department.name,
          }
        : null,
      created_at: record.created_at instanceof Date
        ? record.created_at.toISOString()
        : record.created_at,
      updated_at: record.updated_at instanceof Date
        ? record.updated_at.toISOString()
        : record.updated_at,
    };
  }

  private async ensureExists(id: number): Promise<void> {
    const record = await this.prisma.mAJOR_ROADMAPS.findUnique({
      where: { id },
      select: { id: true },
    });
    
    if (!record) {
      throw new NotFoundException(`Major with id ${id} not found`);
    }
  }

  private handlePrismaError(error: any, operation: string, id?: string): never {
    if (error?.code === 'P2002') {
      throw new ConflictException(`Major already exists with the same unique fields`);
    }
    if (error?.code === 'P2025') {
      throw new NotFoundException(`Major${id ? ` with id ${id}` : ''} not found`);
    }
    if (error?.code === 'P2003') {
      throw new ConflictException(`Cannot delete Major${id ? ` with id ${id}` : ''}: it is referenced by other records`);
    }
    
    this.logger.error(`${operation} failed for Major: ${error.message}`, error.stack);
    throw error;
  }
}