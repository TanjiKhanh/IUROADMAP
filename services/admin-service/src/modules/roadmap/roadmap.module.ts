import { Module } from '@nestjs/common';
import { CourseRoadmapsController } from './controller/course_roadmap.controller';
import { TopicsRoadmapsController } from './controller/topics_roadmap.controller';
import { CourseNodesService } from './services/course_roadmap.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TopicsRoadmapService } from './services/topics_roadmap.service';
import { MajorsService } from './services/majors.service';


@Module({
  controllers: [CourseRoadmapsController , TopicsRoadmapsController],
  providers: [
    PrismaService,
    CourseNodesService,
    TopicsRoadmapService,
    MajorsService

  ],
  exports: [CourseNodesService, TopicsRoadmapService],
})
export class RoadmapModule {}