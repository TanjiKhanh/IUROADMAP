import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { MentorSearchController } from './controllers/mentor-search.controller';
import { MentorSearchService } from './services/mentor-search.service';

@Module({
  imports: [PrismaModule],
  controllers: [MentorSearchController],
  providers: [MentorSearchService],
  exports: [MentorSearchService],
})
export class MentorSearchModule {}