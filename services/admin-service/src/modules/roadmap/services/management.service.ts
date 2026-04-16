// admin-service/src/management/management.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { DepartmentDto , MajorDto } from '../dto/department.dto';

@Injectable()
export class ManagementService {
  constructor(private readonly prisma: PrismaService) {}

  async listDepartments(): Promise<DepartmentDto[]> {
    const departments = await this.prisma.dEPARTMENTS.findMany({
      orderBy: { id: 'asc' },
    });

    return departments.map((d) => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      description: d.description,
    }));
  }

  async listMajors(departmentSlug?: string): Promise<MajorDto[]> {
    const where: any = {};

    if (departmentSlug) {
      where.department = { slug: departmentSlug };
    }

    const roadmaps = await this.prisma.mAJOR_ROADMAPS.findMany({
      where,
      include: {
        department: true,
        courseNodes: {
          select: { id: true }, // just to count courses
        },
      },
      orderBy: { id: 'asc' },
    });

    return roadmaps.map((r) => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
      description: r.description,
      totalCreditsRequired: r.total_credits,
      totalCourses: r.courseNodes.length,
      department: r.department
        ? {
            id: r.department.id,
            slug: r.department.slug,
            name: r.department.name,
          }
        : null,
    }));
  }



  async updateMajorMeta(
    slug: string,
    payload: { name?: string; description?: string; totalCreditsRequired?: number },
  ): Promise<any> {
    const { name, description, totalCreditsRequired } = payload;

    const updatedMajor = await this.prisma.mAJOR_ROADMAPS.update({
      where: { slug },
      data: { name, description, total_credits: totalCreditsRequired },
    });

    return {
      id: updatedMajor.id,
      slug: updatedMajor.slug,
      name: updatedMajor.name,
      description: updatedMajor.description,
      totalCreditsRequired: updatedMajor.total_credits,
    };
  }
}