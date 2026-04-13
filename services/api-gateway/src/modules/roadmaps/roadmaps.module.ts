// gateway/src/modules/roadmaps/roadmaps.module.ts

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RoadmapsController } from './controllers/roadmaps.controller';
import { EnrollmentsController } from './controllers/enrollments.controller';
import { RoadmapsService } from './services/roadmaps.service';
import { EnrollmentsService } from './services/enrollments.service';
import { AdminServiceClient } from './clients/admin-service.client';
import { UserServiceClient } from './clients/user-service.client';
import { RoadmapCacheService } from './services/roadmap-cache.service';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [RoadmapsController, EnrollmentsController],
  providers: [
    RoadmapsService,
    EnrollmentsService,
    AdminServiceClient,
    UserServiceClient,
    RoadmapCacheService,
  ],
  exports: [RoadmapsService, EnrollmentsService],
})
export class RoadmapsModule {}