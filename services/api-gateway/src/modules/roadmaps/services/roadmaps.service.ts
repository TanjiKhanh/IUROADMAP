// services/api-gateway/src/modules/roadmaps/services/roadmaps.service.ts
import { Injectable } from '@nestjs/common';
import { AdminServiceClient } from '../clients/admin-service.client';
import { UserServiceClient } from '../clients/user-service.client';
import { RoadmapCacheService } from './roadmap-cache.service';
import {
  MacroRoadmapResponseDto,
  MacroRoadmapNodeDto,
  MicroRoadmapResponseDto,
  MicroTopicNodeDto,
} from '../dtos';

@Injectable()
export class RoadmapsService {
  constructor(
    private readonly adminClient: AdminServiceClient,
    private readonly userClient: UserServiceClient,
    private readonly roadmapCache: RoadmapCacheService,
  ) {}

  // SUD-07: Get macro roadmap (roadmap progress + graph) for a user
  async getMacroRoadmap(params: {
    userRoadmapId: number;
    user: { sub: number; role: string; id?: number };
  }): Promise<MacroRoadmapResponseDto> {
    const { userRoadmapId, user } = params;
    const userId = (user as any).id ?? user.sub;

    // Get overview (USER_ROADMAPS_PROGRESS + USER_NODE_PROGRESS)
    const overview = await this.userClient.getUserRoadmapOverview({
      userRoadmapId,
      userId,
    });

    // Try cache graph first
    let roadmapGraph = await this.roadmapCache.getGraph(overview.roadmapId);

    if (!roadmapGraph) {
      // Cache miss, fetch from admin service and set cache
      roadmapGraph = await this.adminClient.getRoadmapGraph(overview.roadmapId);
      await this.roadmapCache.setGraph(overview.roadmapId, roadmapGraph);
    }


    // Merge overview.nodeProgress with graph.nodes
    const progressByNodeId = new Map<
      number,
      { status: MacroRoadmapNodeDto['status']; creditsEarned: number }
    >();

    for (const p of overview.nodeProgress) {
      progressByNodeId.set(p.courseNodeId, {
        status: p.status as MacroRoadmapNodeDto['status'],
        creditsEarned: p.creditsEarned,
      });
    }

    const mergedNodes: MacroRoadmapNodeDto[] = roadmapGraph.nodes.map((n: any) => {
      const p = progressByNodeId.get(n.id);
      const status: MacroRoadmapNodeDto['status'] =
        (p?.status as MacroRoadmapNodeDto['status']) ?? 'AVAILABLE';

      return {
        id: n.id,
        slug: n.slug,
        name: n.name,
        credits: n.credits,
        status,
      };
    });

    // 4. Build response DTO
    return {
      userRoadmapId: overview.userRoadmapId,
      roadmapId: overview.roadmapId,
      completion_percentage: overview.completionPercentage,
      total_credits_earned: overview.totalCreditsEarned,
      total_credits_required: overview.totalCreditsRequired,
      nodes: mergedNodes,
      edges: roadmapGraph.edges,
    };
  }

  // USD 8: Get micro roadmap (topics + edges for a course node)
  async getMicroRoadmap(params: {
    courseNodeId: number;
  }): Promise<MicroRoadmapResponseDto> {
    const { courseNodeId } = params;

    const graph = await this.adminClient.getCourseTopicsGraph(courseNodeId);

    // 2. Map to DTOs (mostly pass-through)
    const topics: MicroTopicNodeDto[] = (graph.topics ?? []).map((t: any) => ({
      id: t.id,
      slug: t.slug,
      title: t.title,
      description: t.description ?? null,
      coords: t.coords ?? null,
      learning_objectives: t.learningObjectives ?? t.learning_objectives ?? null,
      resources_url: t.resourcesUrl ?? t.resources_url ?? null,
    }));

    return {
      courseNodeId: graph.courseNodeId ?? courseNodeId,
      topics,
      edges: graph.edges ?? [],
    };
  }


  // SUD-09: Mark course node complete + recalculate progress
  async markCourseComplete(params: {
    userRoadmapId: number;
    courseNodeId: number;
    creditsEarned: number;
    user: { sub: number; role: string; id?: number };
  }): Promise<MacroRoadmapResponseDto> {
    const { userRoadmapId, courseNodeId, creditsEarned, user } = params;
    const userId = (user as any).id ?? user.sub;

    // 1. Update progress in User Service and get updated overview
    const overview = await this.userClient.updateCourseProgress({
      userRoadmapId,
      courseNodeId,
      creditsEarned,
      userId,
    });

    const roadmapId = overview.roadmapId;

    // 2. Get roadmap graph (using cache)
    let graph = await this.roadmapCache.getGraph(roadmapId);
    if (!graph) {
      graph = await this.adminClient.getRoadmapGraph(roadmapId);
      await this.roadmapCache.setGraph(roadmapId, graph);
    }

    // 3. Merge node progress with graph nodes
    const progressByNodeId = new Map<
      number,
      { status: MacroRoadmapNodeDto['status']; creditsEarned: number }
    >();

    for (const p of overview.nodeProgress) {
      progressByNodeId.set(p.courseNodeId, {
        status: p.status as MacroRoadmapNodeDto['status'],
        creditsEarned: p.creditsEarned,
      });
    }

    const mergedNodes: MacroRoadmapNodeDto[] = graph.nodes.map((n: any) => {
      const p = progressByNodeId.get(n.id);
      const status: MacroRoadmapNodeDto['status'] =
        (p?.status as MacroRoadmapNodeDto['status']) ?? 'AVAILABLE';

      return {
        id: n.id,
        slug: n.slug,
        name: n.name,
        credits: n.credits,
        status,
      };
    });

    // 4. Build macro roadmap response back to frontend
    return {
      userRoadmapId: overview.userRoadmapId,
      roadmapId: overview.roadmapId,
      completion_percentage: overview.completionPercentage,
      total_credits_earned: overview.totalCreditsEarned,
      total_credits_required: overview.totalCreditsRequired,
      nodes: mergedNodes,
      edges: graph.edges,
    };
  }
}