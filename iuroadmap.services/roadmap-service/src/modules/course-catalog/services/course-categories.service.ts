import { Injectable, Logger } from '@nestjs/common';
import { ErrorCodes, PaginationResponse, getPaginationAsync } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors, handlePrismaError } from '../../../common/api-errors';
import {
  CourseCategoryCreateRequest,
  CourseCategoryFilterRequest,
  CourseCategoryResponse,
  CourseCategoryUpdateRequest,
} from '../dto/course-category';

const ENTITY = 'Course category';
const WITH_COUNT = { _count: { select: { courses: true } } } as const;

@Injectable()
export class CourseCategoriesService {
  private readonly logger = new Logger(CourseCategoriesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CourseCategoryCreateRequest): Promise<CourseCategoryResponse> {
    try {
      const record = await this.prisma.cOURSE_CATEGORIES.create({
        data: {
          code: dto.code,
          name: dto.name,
          fill_color: dto.fillColor,
          border_color: dto.borderColor,
          sort_order: dto.sortOrder ?? 0,
        },
        include: WITH_COUNT,
      });
      return this.toResponse(record);
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'create');
    }
  }

  async update(id: number, dto: Omit<CourseCategoryUpdateRequest, 'id'>): Promise<CourseCategoryResponse> {
    await this.ensureExists(id);
    try {
      const record = await this.prisma.cOURSE_CATEGORIES.update({
        where: { id },
        data: {
          code: dto.code,
          name: dto.name,
          fill_color: dto.fillColor,
          border_color: dto.borderColor,
          sort_order: dto.sortOrder,
        },
        include: WITH_COUNT,
      });
      return this.toResponse(record);
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'update', id);
    }
  }

  async findById(id: number): Promise<CourseCategoryResponse> {
    const record = await this.prisma.cOURSE_CATEGORIES.findUnique({ where: { id }, include: WITH_COUNT });
    if (!record) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
    return this.toResponse(record);
  }

  async findAll(filter: CourseCategoryFilterRequest): Promise<PaginationResponse<CourseCategoryResponse>> {
    const response = await getPaginationAsync<CourseCategoryFilterRequest, any>(
      this.prisma.cOURSE_CATEGORIES,
      filter,
      (f) =>
        f.keyword
          ? {
              OR: [
                { code: { contains: f.keyword, mode: 'insensitive' } },
                { name: { contains: f.keyword, mode: 'insensitive' } },
              ],
            }
          : {},
      { include: WITH_COUNT, orderBy: [{ sort_order: 'asc' }, { code: 'asc' }] },
    );
    response.datas = (response.datas ?? []).map((r) => this.toResponse(r));
    return response as PaginationResponse<CourseCategoryResponse>;
  }

  /** Full list ordered for the color legend (public). */
  async findAllForLegend(): Promise<CourseCategoryResponse[]> {
    const records = await this.prisma.cOURSE_CATEGORIES.findMany({
      include: WITH_COUNT,
      orderBy: [{ sort_order: 'asc' }, { code: 'asc' }],
    });
    return records.map((r) => this.toResponse(r));
  }

  async delete(id: number): Promise<void> {
    const record = await this.prisma.cOURSE_CATEGORIES.findUnique({ where: { id }, include: WITH_COUNT });
    if (!record) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
    if (record._count.courses > 0) {
      throw ApiErrors.conflict(ErrorCodes.CATEGORY_IN_USE, 'Category is still used by courses', {
        courseCount: record._count.courses,
      });
    }
    try {
      await this.prisma.cOURSE_CATEGORIES.delete({ where: { id } });
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'delete', id);
    }
  }

  private async ensureExists(id: number): Promise<void> {
    const found = await this.prisma.cOURSE_CATEGORIES.findUnique({ where: { id }, select: { id: true } });
    if (!found) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
  }

  private toResponse(r: any): CourseCategoryResponse {
    const courseCount = r._count?.courses ?? 0;
    return {
      id: r.id,
      code: r.code,
      name: r.name,
      fillColor: r.fill_color,
      borderColor: r.border_color,
      sortOrder: r.sort_order,
      courseCount,
      canDelete: courseCount === 0,
      canUpdate: true,
    };
  }
}
