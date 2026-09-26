import { Module } from '@nestjs/common';
import { CurriculumVersionsController } from './controllers/curriculum-versions.controller';
import { CanvasController } from './controllers/canvas.controller';
import { CurriculumVersionsService } from './services/curriculum-versions.service';
import { CanvasService } from './services/canvas.service';
import { VersionStructureService } from './services/version-structure.service';

@Module({
  controllers: [CurriculumVersionsController, CanvasController],
  providers: [CurriculumVersionsService, CanvasService, VersionStructureService],
  exports: [CurriculumVersionsService, CanvasService, VersionStructureService],
})
export class CurriculumModule {}
