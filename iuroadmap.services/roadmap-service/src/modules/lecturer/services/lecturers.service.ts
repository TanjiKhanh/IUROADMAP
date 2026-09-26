import { Injectable, Logger } from '@nestjs/common';
import { DropdownItemDto, ErrorCodes, PaginationResponse, getPaginationAsync } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors, handlePrismaError } from '../../../common/api-errors';
import { LecturerCreateRequest, LecturerFilterRequest, LecturerResponse, LecturerUpdateRequest } from '../dto/lecturer';

const ENTITY = 'Lecturer';
const INCLUDE = { department: { select: { name: true } }, _count: { select: { offerings: true } } } as const;

@Injectable()
export class LecturersService {
  private readonly logger = new Logger(LecturersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: LecturerCreateRequest): Promise<LecturerResponse> {
    await this.ensureDepartment(dto.departmentId);
    try {
      const record = await this.prisma.lECTURERS.create({
        data: {
          full_name: dto.fullName,
          title: dto.title,
          department_id: dto.departmentId,
          email: dto.email,
          status: dto.status,
        },
        include: INCLUDE,
      });
      return this.toResponse(record);
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'create');
    }
  }

  async update(id: number, dto: Omit<LecturerUpdateRequest, 'id'>): Promise<LecturerResponse> {
    await this.ensureExists(id);
    if (dto.departmentId) await this.ensureDepartment(dto.departmentId);
    try {
      const record = await this.prisma.lECTURERS.update({
        where: { id },
        data: {
          full_name: dto.fullName,
          title: dto.title,
          department_id: dto.departmentId,
          email: dto.email,
          status: dto.status,
        },
        include: INCLUDE,
      });
      return this.toResponse(record);
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'update', id);
    }
  }

  async findById(id: number): Promise<LecturerResponse> {
    const record = await this.prisma.lECTURERS.findUnique({ where: { id }, include: INCLUDE });
    if (!record) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
    return this.toResponse(record);
  }

  async findAll(filter: LecturerFilterRequest): Promise<PaginationResponse<LecturerResponse>> {
    const response = await getPaginationAsync<LecturerFilterRequest, any>(
      this.prisma.lECTURERS,
      filter,
      (f) => {
        const where: any = {};
        if (f.departmentId) where.department_id = f.departmentId;
        if (f.status) where.status = f.status;
        if (f.keyword) {
          where.OR = [
            { full_name: { contains: f.keyword, mode: 'insensitive' } },
            { email: { contains: f.keyword, mode: 'insensitive' } },
          ];
        }
        return where;
      },
      { include: INCLUDE, orderBy: { full_name: 'asc' } },
    );
    response.datas = (response.datas ?? []).map((r) => this.toResponse(r));
    return response as PaginationResponse<LecturerResponse>;
  }

  /** Public dropdown for the Course Explorer filter: optionally only lecturers teaching in a year. */
  async getDropdownList(keyword?: string, limit = 50, departmentId?: number, academicYear?: number): Promise<DropdownItemDto[]> {
    const where: any = {};
    if (keyword) where.full_name = { contains: keyword, mode: 'insensitive' };
    if (departmentId) where.department_id = departmentId;
    if (academicYear) where.offerings = { some: { offering: { academic_year: academicYear, status: 'PUBLISHED' } } };
    const records = await this.prisma.lECTURERS.findMany({
      where,
      select: { id: true, full_name: true, title: true, department_id: true },
      take: limit,
      orderBy: { full_name: 'asc' },
    });
    return records.map((r) => ({
      id: String(r.id),
      label: r.title ? `${r.title} ${r.full_name}` : r.full_name,
      metadata: { departmentId: r.department_id },
    }));
  }

  async delete(id: number): Promise<void> {
    const record = await this.prisma.lECTURERS.findUnique({ where: { id }, include: INCLUDE });
    if (!record) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
    if (record._count.offerings > 0) {
      throw ApiErrors.conflict(ErrorCodes.LECTURER_IN_USE, 'Lecturer is assigned to course offerings', {
        offeringCount: record._count.offerings,
      });
    }
    try {
      await this.prisma.lECTURERS.delete({ where: { id } });
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'delete', id);
    }
  }

  private async ensureExists(id: number): Promise<void> {
    const found = await this.prisma.lECTURERS.findUnique({ where: { id }, select: { id: true } });
    if (!found) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
  }

  private async ensureDepartment(id: number): Promise<void> {
    const found = await this.prisma.dEPARTMENTS.findUnique({ where: { id }, select: { id: true } });
    if (!found) throw ApiErrors.notFound(`Department with id ${id} not found`);
  }

  private toResponse(r: any): LecturerResponse {
    const offeringCount = r._count?.offerings ?? 0;
    return {
      id: r.id,
      fullName: r.full_name,
      title: r.title ?? undefined,
      departmentId: r.department_id,
      departmentName: r.department?.name ?? '',
      email: r.email ?? undefined,
      status: r.status,
      offeringCount,
      canDelete: offeringCount === 0,
      canUpdate: true,
    };
  }
}
