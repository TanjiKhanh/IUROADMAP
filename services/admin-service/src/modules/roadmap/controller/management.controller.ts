// admin-service/src/management/management.controller.ts
import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ManagementService } from '../services/management.service';
import { DepartmentDto , MajorDto} from '../dto/department.dto';

@Controller('admin/management')
export class ManagementController {
  constructor(private readonly service: ManagementService) {}

  // GET /admin/management/departments
  @Get('departments')
  async getDepartments(): Promise<DepartmentDto[]> {
    return this.service.listDepartments();
  }

  // GET /admin/management/majors?departmentSlug=it
  @Get('majors')
  async getMajors(
    @Query('departmentSlug') departmentSlug?: string,
  ): Promise<MajorDto[]> {
    return this.service.listMajors(departmentSlug);
  }


  @Patch('majors/:slug')
  async updateMajorMeta(
    @Param('slug') slug: string,
    @Body() payload: { name?: string; description?: string; totalCreditsRequired?: number },
  ): Promise<MajorDto> {
    return this.service.updateMajorMeta(slug, payload);
  }
}