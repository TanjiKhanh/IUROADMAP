import { Injectable, Logger, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { Prisma, User, AccountStatus } from '../../../generated/prisma-client';
import { getPaginationAsync, PaginationResponse } from '@iuroadmap/shared';
import { 
  UserCreateRequest, 
  UserUpdateRequest, 
  UserFilterRequest, 
  UserResponse, 
  UserDetailResponse 
} from '../dto/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  // --------------------------------------------------------
  // Legacy / Internal Methods (Used by AuthenticationService)
  // --------------------------------------------------------

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ 
      where: { email },
      include: { role: { include: { permissions: true } } }
    });
  }

  async createUser(payload: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: payload });
  }

  // --------------------------------------------------------
  // Master Data CRUD Methods
  // --------------------------------------------------------

  async create(dto: UserCreateRequest): Promise<UserResponse> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

    try {
      const record = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
          roleId: dto.roleId,
          status: AccountStatus.ACTIVE,
        },
      });
      return this.toResponse(record);
    } catch (error) {
      this.handlePrismaError(error, 'Create User');
    }
  }

  async update(dto: UserUpdateRequest): Promise<UserResponse> {
    const { id, ...data } = dto;
    try {
      const record = await this.prisma.user.update({
        where: { id },
        data,
      });
      return this.toResponse(record);
    } catch (error) {
      this.handlePrismaError(error, 'Update User', id);
    }
  }

  async findById(id: string): Promise<UserDetailResponse> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!record) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.toDetailResponse(record);
  }

  async findAll(filter: UserFilterRequest): Promise<PaginationResponse<UserResponse>> {
    const response = await getPaginationAsync(this.prisma.user, filter, (f) => {
      const where: Prisma.UserWhereInput = {};
      if (f.roleId) {
        where.roleId = f.roleId;
      }
      if (f.status) {
        where.status = f.status as AccountStatus;
      }
      if (f.subscriptionTier) {
        where.subscriptionTier = f.subscriptionTier as any; // Using any to avoid type issues with generated client if out of sync
      }
      if (f.keyword) {
        where.OR = [
          { email: { contains: f.keyword, mode: 'insensitive' } },
          { name: { contains: f.keyword, mode: 'insensitive' } },
        ];
      }
      return where;
    }, {
      include: { role: true },
    });

    if (response.datas) {
      response.datas = response.datas.map((record: any) => this.toResponse(record));
    }
    return response as any;
  }

  async softDelete(id: string): Promise<UserResponse> {
    try {
      const record = await this.prisma.user.update({
        where: { id },
        data: { status: AccountStatus.BANNED },
      });
      return this.toResponse(record);
    } catch (error) {
      this.handlePrismaError(error, 'Soft Delete User', id);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      this.handlePrismaError(error, 'Delete User', id);
    }
  }

  // --------------------------------------------------------
  // Private Helpers
  // --------------------------------------------------------

  private handlePrismaError(error: any, operation: string, id?: string): never {
    if (error?.code === 'P2002') {
      throw new ConflictException('User already exists with same unique fields (e.g., email)');
    }
    if (error?.code === 'P2025') {
      throw new NotFoundException(`User ${id ? `with ID ${id} ` : ''}not found`);
    }
    if (error?.code === 'P2003') {
      throw new ConflictException('User is referenced by other records and cannot be hard deleted');
    }
    this.logger.error(`${operation} failed: ${error.message}`, error.stack);
    throw error;
  }

  private toResponse(record: any): UserResponse {
    return {
      id: record.id,
      email: record.email,
      name: record.name,
      roleId: record.roleId,
      status: record.status as any,
      subscriptionTier: record.subscriptionTier as any,
      subscriptionExpiresAt: record.subscriptionExpiresAt ?? undefined,
      createdAt: record.createdAt,
      canDelete: record.email !== 'superadmin@iuroadmap.com', // Protect superadmin
      canUpdate: true,
    };
  }

  private toDetailResponse(record: any): UserDetailResponse {
    const base = this.toResponse(record);
    return {
      ...base,
      role: record.role ? {
        id: record.role.id,
        name: record.role.name,
      } : undefined,
    };
  }
}
