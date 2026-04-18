import { Module } from '@nestjs/common';
import { UserRoadmapsService } from './services/user-roadmaps.service';
import { UserRoadmapsController } from './controllers/user-roadmaps.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UserRoadmapsController],
  providers: [
    UserRoadmapsService, 
    PrismaService
  ], 
})
export class RoadmapsModule {}