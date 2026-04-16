import { Module } from '@nestjs/common';
import { CourseRoadmapsController } from './controller/course_roadmap.controller';
import { TopicsRoadmapsController } from './controller/topics_roadmap.controller';
import { AdminRoadmapsController } from './controller/major_roadmaps.controller';
import { CourseNodesService } from './services/course_roadmap.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TopicsRoadmapService } from './services/topics_roadmap.service';
import { MajorsService } from './services/majors.service';
import { ManagementController } from './controller/management.controller';
import { ManagementService } from './services/management.service';
import { DepartmentsController } from './controller/departments.controller';
import { DepartmentsService } from './services/departments.service';
import { AdminRoadmapsService } from './services/admin_roadmaps.service';


@Module({
  controllers: [
    CourseRoadmapsController,
    TopicsRoadmapsController,
    AdminRoadmapsController,
    ManagementController,
    DepartmentsController,
  ],
  providers: [
    PrismaService,
    CourseNodesService,
    TopicsRoadmapService,
    MajorsService,
    ManagementService,
    DepartmentsService,
    AdminRoadmapsService,

  ],
  exports: [CourseNodesService, TopicsRoadmapService],
})
export class RoadmapModule {}