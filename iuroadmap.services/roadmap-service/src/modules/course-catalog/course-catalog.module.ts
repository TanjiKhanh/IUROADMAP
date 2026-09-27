import { Module } from '@nestjs/common';
import { CourseCategoriesController } from './controllers/course-categories.controller';
import { CoursesController } from './controllers/courses.controller';
import { CourseCategoriesService } from './services/course-categories.service';
import { CoursesService } from './services/courses.service';

@Module({
  controllers: [CourseCategoriesController, CoursesController],
  providers: [CourseCategoriesService, CoursesService],
  exports: [CourseCategoriesService, CoursesService],
})
export class CourseCatalogModule {}
