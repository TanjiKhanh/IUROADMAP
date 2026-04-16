import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DepartmentsController } from './controllers/departments.controller';
import { DepartmentsService } from './services/departments.service';
import { AdminServiceClient } from './clients/admin-service.client';
import { AdminRoadmapsController } from './controllers/major-roadmaps.controller';
import { AdminRoadmapsAliasController } from './controllers/admin-roadmaps-alias.controller';
import { MajorsController } from './controllers/majors.controller';
import { AdminRoadmapsService } from './services/major-roadmaps.service';

@Module({
  imports: [HttpModule],
  controllers: [
    DepartmentsController,
    AdminRoadmapsController,
    AdminRoadmapsAliasController,
    MajorsController,
  ],
  providers: [DepartmentsService, AdminServiceClient, AdminRoadmapsService],
  exports: [DepartmentsService],
})
export class AdminModule {}