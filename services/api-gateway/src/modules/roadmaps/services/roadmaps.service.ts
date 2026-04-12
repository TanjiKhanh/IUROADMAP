import { Injectable } from '@nestjs/common';
import { AdminServiceClient } from '../clients/admin-service.client';
import { UserServiceClient } from '../clients/user-service.client';
import {
  MacroRoadmapResponseDto,
  MacroRoadmapNodeDto,
} from '../dtos';

@Injectable()
export class RoadmapsService {
  constructor(
    private readonly adminClient: AdminServiceClient,
    private readonly userClient: UserServiceClient,
  ) {}

  async getMacroRoadmap(params: {
    userRoadmapId: number;
    user: { sub: number; role: string };
  }): Promise<MacroRoadmapResponseDto> {
    const { userRoadmapId, user } = params;

    // 3. Get USER_ROADMAPS
    const detail = await this.userClient.getUserRoadmapDetail({
      userRoadmapId,
      userId: user.sub,
    });

    // 4. Get node progress
    const progress = await this.userClient.getUserRoadmapProgress({
      userRoadmapId,
      userId: user.sub,
    });

    // 5. Get structure from Admin
    const graph = await this.adminClient.getRoadmapGraph(detail.roadmap_id);

    // 6. Merge
    const progressByNodeId = new Map<
      number,
      { status: MacroRoadmapNodeDto['status']; creditsEarned: number }
    >();

    for (const p of progress.progress) {
      progressByNodeId.set(p.courseNodeId, {
        status: p.status,
        creditsEarned: p.creditsEarned,
      });
    }

    const mergedNodes: MacroRoadmapNodeDto[] = graph.nodes.map((n) => {
      const p = progressByNodeId.get(n.id);
      const status = (p?.status ?? 'NOT_STARTED') as
        | 'NOT_STARTED'
        | 'IN_PROGRESS'
        | 'COMPLETED';
      const creditsEarned = p?.creditsEarned ?? 0;

      // Lock rule: node is locked if it has any prerequisite not completed
      const incoming = graph.edges.filter((e) => e.to === n.id);
      let isLocked = false;
      if (incoming.length > 0) {
        isLocked = incoming.some((edge) => {
          const prereq = progressByNodeId.get(edge.from);
          return prereq?.status !== 'COMPLETED';
        });
      }

      return {
        id: n.id,
        slug: n.slug,
        name: n.name,
        coords: n.coords,
        credits: n.credits,
        description: n.description,
        status,
        isLocked,
        creditsEarned,
      };
    });

    return {
      userRoadmapId,
      roadmapId: detail.roadmap_id,
      completion_percentage: detail.completion_percentage,
      total_credits_earned: detail.total_credits_earned,
      total_credits_required: detail.total_credits_required,
      nodes: mergedNodes,
      edges: graph.edges,
    };
  }
}