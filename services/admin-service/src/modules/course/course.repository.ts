import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Course, CourseType } from '@prisma/client';

@Injectable()
export class CourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.CourseCreateInput): Promise<Course> {
    return this.prisma.course.create({
      data,
    });
  }

  async findAll(): Promise<Course[]> {
    return this.prisma.course.findMany({
      include: { department: true }, // Include department details
      orderBy: { title: 'asc' },
    });
  }

  async findOneBySlug(slug: string): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: { slug },
      include: { 
        department: true,
        roadmaps: true // Include related roadmaps
      },
    });
  }

  async findOneById(id: number): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: { id },
      include: { department: true },
    });
  }

  async update(id: number, data: Prisma.CourseUpdateInput): Promise<Course> {
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Course> {
    return this.prisma.course.delete({
      where: { id },
    });
  }


  async findCoursesByDepartmentIdAndType(departmentId: number, type: string): Promise<Course[]> {
    if( type === 'JOB' ) {
      return this.prisma.course.findMany({
        where: {
          department: {
            id: departmentId,
          },
          type: CourseType.JOB,
        },
      });
    }
    if( type === 'BASIC' ) {
      return this.prisma.course.findMany({
        where: {
          department: {
            id: departmentId,
          },
          type: CourseType.BASIC,
        },
      });
    }
    return [];
  }
}