import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { Prisma, User } from '../../../generated/prisma-client';
import { FilterUsersRequestDto } from '../dto/requests/filter-users.request.dto';

/**
 * UsersService is a thin layer calling UsersRepository (Prisma).
 */
@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findByEmail(email);
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepo.findById(id);
  }

  createUser(payload: Prisma.UserCreateInput): Promise<User> {
    return this.usersRepo.create(payload);
  }
  
  async findAll(filters: FilterUsersRequestDto) {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const offset = (page - 1) * limit;

    const data = await this.usersRepo.findAll(
      { role: filters.role as any, status: filters.status as any, search: filters.search },
      offset,
      limit
    );

    // Security: Strip passwords before sending to frontend!
    const sanitizedData = data.data.map((user) => {
      const { password, ...safeUser } = user;
      return safeUser;
    });

    return {
      data: sanitizedData,
      meta: {
        total: data.total,
        page,
        limit,
        totalPages: Math.ceil(data.total / limit),
      },
    };
  }
}
