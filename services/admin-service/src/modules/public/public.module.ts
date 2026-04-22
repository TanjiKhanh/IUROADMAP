import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { CourseModule } from '../course/course.module'; // 👈 Import module containing CourseService
import { DepartmentModule } from '../department/department.module';
@Module({
  imports: [
    CourseModule, // 🟢 This allows injection of CourseService
    DepartmentModule
  ],
  controllers: [PublicController],
  providers: [],
})
export class PublicModule {}