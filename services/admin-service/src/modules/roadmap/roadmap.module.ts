import { Module } from '@nestjs/common';
import { CourseRoadmapsController } from './controller/course_roadmap.controller';
import { TopicsRoadmapsController } from './controller/topics_roadmap.controller';
import { CourseNodesService } from './services/course_roadmap.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TopicsRoadmapService } from './services/topics_roadmap.service';
import { MajorsService } from './services/majors.service';
import { ManagementController } from './controller/management.controller';
import { ManagementService } from './services/management.service';


@Module({
  controllers: [CourseRoadmapsController , TopicsRoadmapsController , ManagementController],
  providers: [
    PrismaService,
    CourseNodesService,
    TopicsRoadmapService,
    MajorsService,
    ManagementService

  ],
  exports: [CourseNodesService, TopicsRoadmapService],
})
export class RoadmapModule {}