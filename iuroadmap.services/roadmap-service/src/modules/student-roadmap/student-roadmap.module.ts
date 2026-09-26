import { Module } from '@nestjs/common';
import { CurriculumModule } from '../curriculum/curriculum.module';
import { GradingModule } from '../grading/grading.module';
import { StudentRoadmapsController } from './controllers/student-roadmaps.controller';
import { StudentRoadmapsService } from './services/student-roadmaps.service';
import { MergedViewService } from './services/merged-view.service';
import { OverlayRepository } from './services/overlay.repository';
import { TermResultsService } from './services/term-results.service';
import { RebaseService } from './services/rebase.service';

@Module({
  imports: [CurriculumModule, GradingModule],
  controllers: [StudentRoadmapsController],
  providers: [StudentRoadmapsService, MergedViewService, OverlayRepository, TermResultsService, RebaseService],
  exports: [MergedViewService],
})
export class StudentRoadmapModule {}
