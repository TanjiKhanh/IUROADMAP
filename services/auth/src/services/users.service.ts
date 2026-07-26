import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/user.repository';
import { Prisma, User } from '../generated/prisma-client';
import { FilterUsersDto } from 'src/dto/filter-users.dto';
import { of } from 'rxjs';

/**
 * UsersService is a thin layer calling UsersRepository (Prisma).
 * Implementations may already exist in your project - keep as-is if so.
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
  
  // Updated findAll method to accept optional filters
  async findAll(filters: FilterUsersDto) {

    // --- PAGINATION CALCULATION ---
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const offset = (page - 1) * limit;

    // --- ROLE & STATUS FILTERING ---

    const data = await this.usersRepo.findAll(
      { role: filters.role, status: filters.status, search: filters.search },
      offset,
      limit
    );

    // Security: Strip passwords before sending to frontend!
    const sanitizedData = data.data.map((user) => {
      const { password, ...safeUser } = user;
      return safeUser;
    });

    // Return the standard pagination format
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