import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CourseNodesService {
  constructor(private readonly prisma: PrismaService) {}

  async getFormattedRoadmapGraph(roadmapId: number) {
    const nodes = await this.prisma.cOURSE_NODES.findMany({
      where: { roadmap_id: roadmapId },
      orderBy: { id: 'asc' },
    });

    const nodeIds = nodes.map((n) => n.id);
    const edgesRaw = await this.prisma.cOURSE_NODE_PREREQUISITES.findMany({
      where: { course_node_id: { in: nodeIds } },
      orderBy: { id: 'asc' },
    });

    return {
      roadmapId,
      nodes: nodes.map((n) => ({ 
        id: n.id,
        slug: n.slug,
        name: n.name,
        coords: n.coords,
        credits: n.credits,
        description: n.description,
       })),
      edges: edgesRaw.map((edge) => ({ 
        id: edge.id,
        from: edge.course_node_id,
        to: edge.prerequisite_node_id,
      
       })),
    };
  }
}