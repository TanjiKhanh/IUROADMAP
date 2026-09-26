import { Injectable, Logger } from '@nestjs/common';
import { DropdownItemDto, ErrorCodes, PaginationResponse, getPaginationAsync } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors, handlePrismaError } from '../../../common/api-errors';
import { MajorCreateRequest, MajorFilterRequest, MajorResponse, MajorUpdateRequest } from '../dto/major';

const ENTITY = 'Major';
const INCLUDE = {
  department: { select: { id: true, name: true } },
  versions: { select: { cohort_year: true, status: true } },
  _count: { select: { studentRoadmaps: true } },
} as const;

@Injectable()
export class MajorsService {
  private readonly logger = new Logger(MajorsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: MajorCreateRequest): Promise<MajorResponse> {
    await this.ensureDepartment(dto.departmentId);
    try {
      const record = await this.prisma.mAJOR_ROADMAPS.create({
        data: { slug: dto.slug, name: dto.name, description: dto.description, department_id: dto.departmentId },
        include: INCLUDE,
      });
      return this.toResponse(record);
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'create');
    }
  }

  async update(id: number, dto: Omit<MajorUpdateRequest, 'id'>): Promise<MajorResponse> {
    await this.ensureExists(id);
    if (dto.departmentId) await this.ensureDepartment(dto.departmentId);
    try {
      const record = await this.prisma.mAJOR_ROADMAPS.update({
        where: { id },
        data: {
          slug: dto.slug,
          name: dto.name,
          description: dto.description,
          department_id: dto.departmentId,
        },
        include: INCLUDE,
      });
      return this.toResponse(record);
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'update', id);
    }
  }

  async findById(id: number): Promise<MajorResponse> {
    const record = await this.prisma.mAJOR_ROADMAPS.findUnique({ where: { id }, include: INCLUDE });
    if (!record) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
    return this.toResponse(record);
  }

  async findAll(filter: MajorFilterRequest): Promise<PaginationResponse<MajorResponse>> {
    const response = await getPaginationAsync<MajorFilterRequest, any>(
      this.prisma.mAJOR_ROADMAPS,
      filter,
      (f) => {
        const where: any = {};
        if (f.departmentId) where.department_id = f.departmentId;
        if (f.keyword) {
          where.OR = [
            { name: { contains: f.keyword, mode: 'insensitive' } },
            { slug: { contains: f.keyword, mode: 'insensitive' } },
          ];
        }
        return where;
      },
      { include: INCLUDE, orderBy: { name: 'asc' } },
    );
    response.datas = (response.datas ?? []).map((r) => this.toResponse(r));
    return response as PaginationResponse<MajorResponse>;
  }

  async getDropdownList(keyword?: string, limit = 50, departmentId?: number): Promise<DropdownItemDto[]> {
    const where: any = {};
    if (keyword) where.name = { contains: keyword, mode: 'insensitive' };
    if (departmentId) where.department_id = departmentId;
    const records = await this.prisma.mAJOR_ROADMAPS.findMany({
      where,
      select: { id: true, name: true, slug: true, department_id: true },
      take: limit,
      orderBy: { name: 'asc' },
    });
    return records.map((r) => ({
      id: String(r.id),
      label: r.name,
      metadata: { slug: r.slug, departmentId: r.department_id },
    }));
  }

  /**
   * BR-RM-02: a major that has ever published a curriculum (PUBLISHED or ARCHIVED) cannot be
   * deleted. A major with drafts only is deleted together with its drafts.
   */
  async delete(id: number): Promise<void> {
    const record = await this.prisma.mAJOR_ROADMAPS.findUnique({ where: { id }, include: INCLUDE });
    if (!record) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
    const publishedYears = this.publishedYears(record);
    if (publishedYears.length > 0 || record._count.studentRoadmaps > 0) {
      throw ApiErrors.conflict(ErrorCodes.MAJOR_HAS_PUBLISHED_CURRICULUM, 'Major has a published curriculum', {
        years: publishedYears,
        learnerCount: record._count.studentRoadmaps,
      });
    }
    try {
      await this.prisma.mAJOR_ROADMAPS.delete({ where: { id } });
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'delete', id);
    }
  }

  private publishedYears(record: any): number[] {
    const years = new Set<number>();
    for (const v of record.versions ?? []) {
      if (v.status !== 'DRAFT') years.add(v.cohort_year);
    }
    return [...years].sort((a, b) => a - b);
  }

  private async ensureExists(id: number): Promise<void> {
    const found = await this.prisma.mAJOR_ROADMAPS.findUnique({ where: { id }, select: { id: true } });
    if (!found) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
  }

  private async ensureDepartment(departmentId: number): Promise<void> {
    const found = await this.prisma.dEPARTMENTS.findUnique({ where: { id: departmentId }, select: { id: true } });
    if (!found) throw ApiErrors.notFound(`Department with id ${departmentId} not found`);
  }

  private toResponse(r: any): MajorResponse {
    const publishedYears = [
      ...new Set<number>((r.versions ?? []).filter((v: any) => v.status === 'PUBLISHED').map((v: any) => v.cohort_year)),
    ].sort((a, b) => a - b);
    const everPublished = this.publishedYears(r).length > 0;
    return {
      id: r.id,
      slug: r.slug,
      name: r.name,
      description: r.description ?? undefined,
      departmentId: r.department_id,
      departmentName: r.department?.name ?? '',
      curriculumCount: r.versions?.length ?? 0,
      publishedYears,
      learnerCount: r._count?.studentRoadmaps ?? 0,
      canDelete: !everPublished && (r._count?.studentRoadmaps ?? 0) === 0,
      canUpdate: true,
      createdAt: r.created_at.toISOString(),
      updatedAt: r.updated_at.toISOString(),
    };
  }
}
