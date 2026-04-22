import { Global, Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseRepository } from './course.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { DepartmentModule } from '../department/department.module'; // Import to use DepartmentService

@Global()
@Module({
  imports: [DepartmentModule], // Import DepartmentModule so we can validate departmentIds
  controllers: [CourseController],
  providers: [CourseService, CourseRepository, PrismaService],
  exports: [CourseService],
})
export class CourseModule {}