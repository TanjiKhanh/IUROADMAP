import { Module } from '@nestjs/common';
import { CurriculumModule } from '../curriculum/curriculum.module';
import { CourseOfferingModule } from '../course-offering/course-offering.module';
import { ExploreRoadmapsController } from './controllers/explore-roadmaps.controller';
import { ExploreCoursesController } from './controllers/explore-courses.controller';
import { ExploreRoadmapsService } from './services/explore-roadmaps.service';
import { ExploreCoursesService } from './services/explore-courses.service';

@Module({
  imports: [CurriculumModule, CourseOfferingModule],
  controllers: [ExploreRoadmapsController, ExploreCoursesController],
  providers: [ExploreRoadmapsService, ExploreCoursesService],
})
export class ExploreModule {}
