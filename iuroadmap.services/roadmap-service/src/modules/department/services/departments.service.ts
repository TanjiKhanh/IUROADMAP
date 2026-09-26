import { Injectable, Logger } from '@nestjs/common';
import { DropdownItemDto, ErrorCodes, PaginationResponse, getPaginationAsync } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors, handlePrismaError } from '../../../common/api-errors';
import {
  DepartmentCreateRequest,
  DepartmentFilterRequest,
  DepartmentResponse,
  DepartmentUpdateRequest,
} from '../dto/department';

const ENTITY = 'Department';
const WITH_COUNTS = { _count: { select: { majors: true, lecturers: true } } } as const;

@Injectable()
export class DepartmentsService {
  private readonly logger = new Logger(DepartmentsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(data: DepartmentCreateRequest): Promise<DepartmentResponse> {
    try {
      const record = await this.prisma.dEPARTMENTS.create({ data, include: WITH_COUNTS });
      return this.toResponse(record);
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'create');
    }
  }

  async update(id: number, data: Omit<DepartmentUpdateRequest, 'id'>): Promise<DepartmentResponse> {
    await this.ensureExists(id);
    try {
      const record = await this.prisma.dEPARTMENTS.update({ where: { id }, data, include: WITH_COUNTS });
      return this.toResponse(record);
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'update', id);
    }
  }

  async findById(id: number): Promise<DepartmentResponse> {
    const record = await this.prisma.dEPARTMENTS.findUnique({ where: { id }, include: WITH_COUNTS });
    if (!record) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
    return this.toResponse(record);
  }

  async findAll(filter: DepartmentFilterRequest): Promise<PaginationResponse<DepartmentResponse>> {
    const response = await getPaginationAsync<DepartmentFilterRequest, any>(
      this.prisma.dEPARTMENTS,
      filter,
      (f) => {
        if (!f.keyword) return {};
        return {
          OR: [
            { name: { contains: f.keyword, mode: 'insensitive' } },
            { slug: { contains: f.keyword, mode: 'insensitive' } },
          ],
        };
      },
      { include: WITH_COUNTS, orderBy: { name: 'asc' } },
    );
    response.datas = (response.datas ?? []).map((r) => this.toResponse(r));
    return response as PaginationResponse<DepartmentResponse>;
  }

  async getDropdownList(keyword?: string, limit = 50): Promise<DropdownItemDto[]> {
    const records = await this.prisma.dEPARTMENTS.findMany({
      where: keyword ? { name: { contains: keyword, mode: 'insensitive' } } : {},
      select: { id: true, name: true, slug: true },
      take: limit,
      orderBy: { name: 'asc' },
    });
    return records.map((r) => ({ id: String(r.id), label: r.name, metadata: { slug: r.slug } }));
  }

  /** BR-RM-02: no cascade. A department that still has majors or lecturers cannot be deleted. */
  async delete(id: number): Promise<void> {
    const record = await this.prisma.dEPARTMENTS.findUnique({ where: { id }, include: WITH_COUNTS });
    if (!record) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
    if (record._count.majors > 0) {
      throw ApiErrors.conflict(ErrorCodes.DEPARTMENT_HAS_MAJORS, 'Department still has majors', {
        majorCount: record._count.majors,
      });
    }
    if (record._count.lecturers > 0) {
      throw ApiErrors.conflict(ErrorCodes.DEPARTMENT_HAS_LECTURERS, 'Department still has lecturers', {
        lecturerCount: record._count.lecturers,
      });
    }
    try {
      await this.prisma.dEPARTMENTS.delete({ where: { id } });
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'delete', id);
    }
  }

  private async ensureExists(id: number): Promise<void> {
    const found = await this.prisma.dEPARTMENTS.findUnique({ where: { id }, select: { id: true } });
    if (!found) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
  }

  private toResponse(r: any): DepartmentResponse {
    const majorCount = r._count?.majors ?? 0;
    const lecturerCount = r._count?.lecturers ?? 0;
    return {
      id: r.id,
      slug: r.slug,
      name: r.name,
      description: r.description ?? undefined,
      majorCount,
      lecturerCount,
      canDelete: majorCount === 0 && lecturerCount === 0,
      canUpdate: true,
      createdAt: r.created_at.toISOString(),
      updatedAt: r.updated_at.toISOString(),
    };
  }
}
