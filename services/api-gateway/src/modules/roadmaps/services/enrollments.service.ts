// services/api-gateway/src/modules/roadmaps/services/enrollments.service.ts
import { Injectable, ForbiddenException } from '@nestjs/common';
import { AdminServiceClient } from '../clients/admin-service.client';
import { UserServiceClient } from '../clients/user-service.client';
import { RoadmapCacheService } from './roadmap-cache.service';
import {
  EnrollRoadmapRequestDto,
  EnrollmentSummaryDto,
} from '../dtos';

@Injectable()
export class EnrollmentsService {
  constructor(
    private readonly adminClient: AdminServiceClient,
    private readonly userClient: UserServiceClient,
    private readonly roadmapCache: RoadmapCacheService,
  ) {}

  /**
   * Clone Major and Generate Macro-Roadmap (Enroll)
   */
  async enrollToRoadmap(
    user: { sub: number; role: string },
    dto: EnrollRoadmapRequestDto,
  ): Promise<EnrollmentSummaryDto> {

    const userId = user.sub;
    const slug = dto.slug;

    const major = await this.adminClient.getMajorBySlug(slug);


    // Try cache graph first
    let roadmapGraph = await this.roadmapCache.getGraph(major.id);

    if (!roadmapGraph) {
      // Cache miss, fetch from admin service and set cache
      roadmapGraph = await this.adminClient.getRoadmapGraph(major.id);
      if (!roadmapGraph) {
        throw new ForbiddenException('Roadmap not found');
      }
      await this.roadmapCache.setGraph(major.id, roadmapGraph);
    }


    

    const enrollResult = await this.userClient.enrollUserToRoadmap({
      userId,
      roadmapId: major.id,
      totalCreditsRequired: major.total_credits,
      courseNodeIds: roadmapGraph.nodes.map((n) => n.id),
    });

    const summary: EnrollmentSummaryDto = {
      id: enrollResult.id,
      userId: enrollResult.user_id,
      roadmapId: enrollResult.roadmap_id,
      slug: major.slug,
      name: major.name,
      total_credits_required: enrollResult.total_credits_required,
      completion_percentage: enrollResult.completion_percentage,
      total_credits_earned: enrollResult.total_credits_earned,
      enrollmentDate: enrollResult.created_at,
    };

    return summary;
  }
}