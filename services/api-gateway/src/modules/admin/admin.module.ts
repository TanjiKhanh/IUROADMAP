import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DepartmentsController } from './controllers/departments.controller';
import { DepartmentsService } from './services/departments.service';
import { AdminServiceClient } from './clients/admin-service.client';
import { AdminRoadmapsController } from './controllers/major-roadmaps.controller';
import { AdminRoadmapsAliasController } from './controllers/admin-roadmaps-alias.controller';
import { MajorsController } from './controllers/majors.controller';
import { CoursesController } from './controllers/courses.controller';
import { AdminRoadmapsService } from './services/major-roadmaps.service';
import { CoursesService } from './services/courses.service';

@Module({
  imports: [HttpModule],
  controllers: [
    DepartmentsController,
    AdminRoadmapsController,
    AdminRoadmapsAliasController,
    MajorsController,
    CoursesController,
  ],
  providers: [
    DepartmentsService,
    AdminServiceClient,
    AdminRoadmapsService,
    CoursesService,
  ],
  exports: [DepartmentsService],
})
export class AdminModule {}