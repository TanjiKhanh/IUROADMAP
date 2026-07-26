import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, AccountStatus, Role } from '../generated/prisma-client';

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(UsersRepository.name);
  
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    // Directly transmit 'data' so Prisma can automatically map the fields (including profile, role, etc.).
    // No need to destructure manually here.
    return this.prisma.user.create({
      data: data
    })
  }


  async findAll(
    filters: { role?: Role; status?: AccountStatus; search?: string },
    skip: number,
    take: number
  ): Promise<{ data: User[]; total: number }> {
    
    // 1. Build the dynamic WHERE clause
    const where: Prisma.UserWhereInput = {};
    if (filters?.role) where.role = filters.role;
    if (filters?.status) where.status = filters.status;
    if (filters?.search) {
      where.OR = [
        { email: { contains: filters.search, mode: 'insensitive' } },
        { name: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    // 2. Run both queries simultaneously
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip, // How many records to skip
        take, // How many records to return
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }), // Total count matching the filters
    ]);

    return { data, total };
  }

}