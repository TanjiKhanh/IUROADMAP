import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust path if needed
import { Prisma, Department } from '@prisma/client';

@Injectable()
export class DepartmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.DepartmentCreateInput): Promise<Department> {
    return this.prisma.department.create({
      data,
    });
  }

  async findAll(): Promise<Department[]> {
    return this.prisma.department.findMany({
      include: { courses: true }, // Optional: include related courses
      orderBy: { name: 'asc' },
    });
  }

  async findOneBySlug(slug: string): Promise<Department | null> {
    return this.prisma.department.findUnique({
      where: { slug },
      include: { courses: true },
    });
  }

  async findOneById(id: number): Promise<Department | null> {
    return this.prisma.department.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.DepartmentUpdateInput): Promise<Department> {
    return this.prisma.department.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Department> {
    return this.prisma.department.delete({
      where: { id },
    });
  }
}