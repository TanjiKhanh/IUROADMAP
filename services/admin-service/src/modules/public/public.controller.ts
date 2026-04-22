import { Controller, Get, Query, BadRequestException, Param, NotFoundException } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator'; // Your existing @Public decorator
import { CourseService } from '../course/course.service'; // Import CourseService
import { DepartmentService } from '../department/department.service';

@Controller('public')
export class PublicController {
  constructor(private readonly courseService: CourseService, private readonly departmentService: DepartmentService) {}
  @Public()
  @Get('courses') 
  async getCourses(
    @Query('departmentSlug') departmentSlug: string,
    @Query('type') type: string,
  ) {
    return this.courseService.getCourses(departmentSlug, type);
  }

  @Public()
  @Get('departments/:slug') // 2. Route has :slug
  async getDepartments(@Param('slug') slug: string) { // 3. Use @Param, NOT @Query
    const department = await this.departmentService.findOne(slug);
    
    // It's good practice to handle the null case here
    if (!department) {
        throw new NotFoundException(`Department '${slug}' not found`);
    }

    return department;
  }
}