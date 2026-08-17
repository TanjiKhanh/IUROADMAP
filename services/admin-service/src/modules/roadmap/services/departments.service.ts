import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PaginationRequest, DropdownItemDto, PaginationResponse, getPaginationAsync } from '@iuroadmap/shared';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../dto/department-crud.dto';

@Injectable()
export class DepartmentsService {
  private readonly logger = new Logger(DepartmentsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDepartmentDto) {
    try {
      const record = await this.prisma.dEPARTMENTS.create({ data: data as any });
      return this.toResponse(record);
    } catch (error: any) {
      this.handlePrismaError(error, 'create');
    }
  }

  async update(id: number, data: Partial<UpdateDepartmentDto>) {
    await this.ensureExists(id);
    try {
      const record = await this.prisma.dEPARTMENTS.update({
        where: { id },
        data: data as any,
      });
      return this.toResponse(record);
    } catch (error: any) {
      this.handlePrismaError(error, 'update', id.toString());
    }
  }

  async findById(id: number) {
    const record = await this.prisma.dEPARTMENTS.findUnique({
      where: { id },
    });
    
    if (!record) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }
    
    return this.toResponse(record);
  }

  async findAll(filter: PaginationRequest): Promise<PaginationResponse<any>> {
    const response = await getPaginationAsync(this.prisma.dEPARTMENTS, filter, (f) => {
      const where: any = {};
      if (f.keyword) {
        where.OR = [
          { name: { contains: f.keyword, mode: 'insensitive' } },
          { slug: { contains: f.keyword, mode: 'insensitive' } },
          { description: { contains: f.keyword, mode: 'insensitive' } },
        ];
      }
      return where;
    });

    if (response.datas) {
      response.datas = response.datas.map(record => this.toResponse(record));
    }
    
    return response;
  }

  async delete(id: number): Promise<void> {
    await this.ensureExists(id);
    try {
      await this.prisma.dEPARTMENTS.delete({ where: { id } });
    } catch (error: any) {
      this.handlePrismaError(error, 'delete', id.toString());
    }
  }

  async getDropdownList(keyword?: string, limit: number = 50): Promise<DropdownItemDto[]> {
    const where: any = {};
    if (keyword) {
      where.name = { contains: keyword, mode: 'insensitive' };
    }

    const records = await this.prisma.dEPARTMENTS.findMany({
      where,
      select: { id: true, name: true, slug: true },
      take: limit,
      orderBy: { name: 'asc' },
    });

    return records.map((record) => ({
      id: record.id.toString(),
      label: record.name,
      metadata: { slug: record.slug }
    }));
  }

  /**
   * Custom response mapping — converts DB snake_case timestamps to ISO strings.
   */
  protected toResponse(record: any): any {
    return {
      id: record.id,
      slug: record.slug,
      name: record.name,
      description: record.description ?? null,
      created_at: record.created_at instanceof Date
        ? record.created_at.toISOString()
        : record.created_at,
      updated_at: record.updated_at instanceof Date
        ? record.updated_at.toISOString()
        : record.updated_at,
    };
  }

  private async ensureExists(id: number): Promise<void> {
    const record = await this.prisma.dEPARTMENTS.findUnique({
      where: { id },
      select: { id: true },
    });
    
    if (!record) {
      throw new NotFoundException(`Department with id ${id} not found`);
    }
  }

  private handlePrismaError(error: any, operation: string, id?: string): never {
    if (error?.code === 'P2002') {
      throw new ConflictException(`Department already exists with the same unique fields`);
    }
    if (error?.code === 'P2025') {
      throw new NotFoundException(`Department${id ? ` with id ${id}` : ''} not found`);
    }
    if (error?.code === 'P2003') {
      throw new ConflictException(`Cannot delete Department${id ? ` with id ${id}` : ''}: it is referenced by other records`);
    }
    
    this.logger.error(`${operation} failed for Department: ${error.message}`, error.stack);
    throw error;
  }
}