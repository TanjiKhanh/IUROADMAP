import { Module } from '@nestjs/common';
import { MajorsController } from './controllers/majors.controller';
import { MajorsService } from './services/majors.service';

@Module({
  controllers: [MajorsController],
  providers: [MajorsService],
  exports: [MajorsService],
})
export class MajorModule {}
