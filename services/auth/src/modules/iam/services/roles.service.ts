import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { DropdownItemDto, PaginationResponse, getPaginationAsync, AppConstant } from '@iuroadmap/shared';
import { RoleCreateRequest, RoleUpdateRequest, RoleResponse, RoleDetailResponse } from '../dto/role';
import { RoleFilterRequest } from '../dto/role';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(data: RoleCreateRequest): Promise<RoleResponse> {
    try {
      const { permissionIds, ...roleData } = data;
      
      const record = await this.prisma.role.create({
        data: {
          ...roleData,
          ...(permissionIds && permissionIds.length > 0 ? {
            permissions: {
              connect: permissionIds.map(id => ({ id }))
            }
          } : {})
        },
        include: { permissions: true },
      });
      return this.toResponse(record);
    } catch (error: any) {
      this.handlePrismaError(error, 'create');
    }
  }

  async update(id: string, data: Partial<RoleUpdateRequest>): Promise<RoleResponse> {
    await this.ensureExists(id);
    try {
      const { permissionIds, ...roleData } = data;

      const record = await this.prisma.role.update({
        where: { id },
        data: {
          ...roleData,
          ...(permissionIds ? {
            permissions: {
              set: permissionIds.map(permId => ({ id: permId }))
            }
          } : {})
        },
        include: { permissions: true },
      });
      return this.toResponse(record);
    } catch (error: any) {
      this.handlePrismaError(error, 'update', id);
    }
  }

  async findById(id: string): Promise<RoleDetailResponse> {
    const record = await this.prisma.role.findUnique({
      where: { id },
      include: { permissions: true },
    });
    
    if (!record) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    
    const groups = await this.prisma.permissionGroup.findMany({
      include: { permissions: true },
    });

    const rolePermissionIds = new Set(record.permissions.map(p => p.id));

    const permissionGroups = groups.map(group => ({
      id: group.id,
      groupName: group.name,
      permissions: group.permissions.map(p => ({
        id: p.id,
        displayName: p.displayName ?? undefined,
        normalizationName: p.name,
        groupId: group.id,
        isInRole: rolePermissionIds.has(p.id),
      })),
    }));

    return {
      id: record.id,
      name: record.name,
      normalizedName: record.name.toUpperCase(),
      permissionGroups,
    };
  }

  async getAllPermissions() {
    const groups = await this.prisma.permissionGroup.findMany({
      include: { permissions: true },
    });

    return groups.map(group => ({
      id: group.id,
      groupName: group.name,
      permissions: group.permissions.map(p => ({
        id: p.id,
        displayName: p.displayName ?? undefined,
        normalizationName: p.name,
        groupId: group.id,
        isInRole: false,
      })),
    }));
  }

  async findAll(filter: RoleFilterRequest): Promise<PaginationResponse<RoleResponse>> {
    const response = await getPaginationAsync(this.prisma.role, filter, (f) => {
      const where: any = {};
      if (f.keyword) {
        where.name = { contains: f.keyword, mode: 'insensitive' };
      }
      return where;
    }, {
      include: { permissions: true }
    });

    if (response.datas) {
      response.datas = response.datas.map((record: any) => this.toResponse(record));
    }
    
    return response as any;
  }

  async delete(id: string): Promise<void> {
    await this.ensureExists(id);
    try {
      await this.prisma.role.delete({ where: { id } });
    } catch (error: any) {
      this.handlePrismaError(error, 'delete', id);
    }
  }

  async getDropdownList(keyword?: string, limit: number = 50): Promise<DropdownItemDto[]> {
    const where: any = {};
    if (keyword) {
      where.name = { contains: keyword, mode: 'insensitive' };
    }

    const records = await this.prisma.role.findMany({
      where,
      select: { id: true, name: true },
      take: limit,
      orderBy: { name: 'asc' },
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }

  async assignPermissions(roleId: string, permissionIds: string[]): Promise<RoleResponse> {
    await this.ensureExists(roleId);
    
    const record = await this.prisma.role.update({
      where: { id: roleId },
      data: {
        permissions: {
          set: permissionIds.map(id => ({ id })),
        },
      },
      include: { permissions: true },
    });
    return this.toResponse(record);
  }

  private toResponse(record: any): RoleResponse {
    return {
      id: record.id,
      name: record.name,
      description: record.description ?? undefined,
      permissionIds: record.permissions?.map((p: any) => p.id) ?? [],
      canDelete: ![AppConstant.RoleName.SuperAdmin, AppConstant.RoleName.Admin].includes(record.name), // Cannot delete system roles
      canUpdate: ![AppConstant.RoleName.SuperAdmin].includes(record.name), // Cannot update SUPERADMIN
    };
  }

  private async ensureExists(id: string): Promise<void> {
    const record = await this.prisma.role.findUnique({
      where: { id },
      select: { id: true },
    });
    
    if (!record) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
  }

  private handlePrismaError(error: any, operation: string, id?: string): never {
    if (error?.code === 'P2002') {
      throw new ConflictException(`Role already exists with the same unique fields`);
    }
    if (error?.code === 'P2025') {
      throw new NotFoundException(`Role${id ? ` with id ${id}` : ''} not found`);
    }
    if (error?.code === 'P2003') {
      throw new ConflictException(`Cannot delete Role${id ? ` with id ${id}` : ''}: it is referenced by other records`);
    }
    
    this.logger.error(`${operation} failed for Role: ${error.message}`, error.stack);
    throw error;
  }
}
