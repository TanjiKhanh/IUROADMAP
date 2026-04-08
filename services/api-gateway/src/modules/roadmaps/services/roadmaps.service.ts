// gateway/src/modules/roadmaps/services/roadmaps.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { AdminServiceClient } from '../clients/admin-service.client';
import { RoadmapDto } from '../dtos';

@Injectable()
export class RoadmapsService {
  private readonly logger = new Logger(RoadmapsService.name);

  constructor(private adminClient: AdminServiceClient) {}

  /**
   * SUD-05: Browse all roadmaps
   */
  async browseRoadmaps(): Promise<RoadmapDto[]> {
    this.logger.log('Browsing all roadmaps');
    return this.adminClient.getAllRoadmaps();
  }
}