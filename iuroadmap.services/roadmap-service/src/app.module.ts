import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Global shared modules
import { PrismaModule } from './prisma/prisma.module';

// Feature modules (Roadmap v2 — see iuroadmap.docs/architecture/roadmap-v2-implementation-plan.md)
import { DepartmentModule } from './modules/department/department.module';
import { MajorModule } from './modules/major/major.module';
import { CourseCatalogModule } from './modules/course-catalog/course-catalog.module';
import { LecturerModule } from './modules/lecturer/lecturer.module';
import { GradingModule } from './modules/grading/grading.module';
import { CurriculumModule } from './modules/curriculum/curriculum.module';
import { CourseOfferingModule } from './modules/course-offering/course-offering.module';
import { StudentRoadmapModule } from './modules/student-roadmap/student-roadmap.module';
import { ExploreModule } from './modules/explore/explore.module';
import { CourseCommentModule } from './modules/course-comment/course-comment.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    DepartmentModule,
    MajorModule,
    CourseCatalogModule,
    LecturerModule,
    GradingModule,
    CurriculumModule,
    CourseOfferingModule,
    StudentRoadmapModule,
    ExploreModule,
    CourseCommentModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
