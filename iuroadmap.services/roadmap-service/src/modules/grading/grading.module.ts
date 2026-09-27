import { Module } from '@nestjs/common';
import { GradingController } from './controllers/grading.controller';
import { GradingService } from './services/grading.service';

@Module({
  controllers: [GradingController],
  providers: [GradingService],
  exports: [GradingService],
})
export class GradingModule {}
