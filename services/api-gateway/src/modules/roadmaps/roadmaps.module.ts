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
import { ExploreRoadmapsController } from './controllers/exploration-roadmap.controller';
import { ExploreMajorsService } from './services/explore-majors.service';
@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [RoadmapsController, EnrollmentsController, ExploreRoadmapsController],
  providers: [
    RoadmapsService,
    EnrollmentsService,
    AdminServiceClient,
    UserServiceClient,
    RoadmapCacheService,
    ExploreMajorsService,
  ],
  exports: [RoadmapsService, EnrollmentsService],
})
export class RoadmapsModule {}