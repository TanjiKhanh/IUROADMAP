// gateway/src/modules/roadmaps/controllers/roadmaps.controller.ts

import { Controller, Get } from '@nestjs/common';
import { RoadmapsService } from '../services/roadmaps.service';
import { BrowseRoadmapsDto } from '../dtos';

@Controller('api/v1/roadmaps')
export class RoadmapsController {
  constructor(private readonly roadmapsService: RoadmapsService) {}

  /**
   * SUD-05: Browse all roadmaps
   * GET /api/v1/roadmaps
   */
  @Get()
  async browseRoadmaps(): Promise<BrowseRoadmapsDto> {
    const roadmaps = await this.roadmapsService.browseRoadmaps();
    return {
      status: 'success',
      data: roadmaps,
    };
  }
}