import { Module } from '@nestjs/common';
import { RoadmapClientService } from './roadmap-client.service';

@Module({
  providers: [RoadmapClientService],
  exports: [RoadmapClientService],
})
export class RoadmapClientModule {}
