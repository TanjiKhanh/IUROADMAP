import { Module } from '@nestjs/common';
import { LecturersController } from './controllers/lecturers.controller';
import { LecturersService } from './services/lecturers.service';

@Module({
  controllers: [LecturersController],
  providers: [LecturersService],
  exports: [LecturersService],
})
export class LecturerModule {}
