// services/api-gateway/src/modules/roadmaps/services/explore-majors.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { AdminServiceClient } from '../clients/admin-service.client';
import {
  ExploreMajorsResponseDto,
  DepartmentFilterDto,
  MajorCardDto,
} from '../dtos';

@Injectable()
export class ExploreMajorsService {
  private readonly logger = new Logger(ExploreMajorsService.name);

  constructor(private readonly adminClient: AdminServiceClient) {}

  async getExploreMajorsData(
    departmentSlug?: string,
  ): Promise<ExploreMajorsResponseDto> {
    this.logger.log(
      `Fetching explore majors data${departmentSlug ? ` for department: ${departmentSlug}` : ' (all departments)'}`,
    );

    // Fetch all departments (for the filter chips)
    const departments = await this.adminClient.getDepartments();

    // Fetch majors (optionally filtered by department)
    const majors = await this.adminClient.getMajors(departmentSlug);

    // Transform Admin DTOs to Gateway DTOs
    const departmentFilters: DepartmentFilterDto[] = departments.map((d) => ({
      id: d.id,
      slug: d.slug,
      name: d.name,
      description: d.description || null,
    }));

    const majorCards: MajorCardDto[] = majors.map((m) => ({
      id: m.id,
      slug: m.slug,
      name: m.name,
      description: m.description || null,
      totalCreditsRequired: m.totalCreditsRequired,
      totalCourses: m.totalCourses,
      department: m.department,
    }));

    this.logger.log(
      `Successfully fetched ${departmentFilters.length} departments and ${majorCards.length} majors`,
    );

    return {
      departments: departmentFilters,
      majors: majorCards,
    };
  }
}