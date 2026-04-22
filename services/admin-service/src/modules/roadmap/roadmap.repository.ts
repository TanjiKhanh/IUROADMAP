import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type {
  CreateRoadmapDto,
  CreateRoadmapNodeDto,
  CreateRoadmapEdgeDto,
} from './dto/create-roadmap.dto';

@Injectable()
export class RoadmapRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createWithNodesAndEdges(dto: CreateRoadmapDto) {
    return this.prisma.$transaction(async (tx) => {
      const roadmap = await tx.roadmap.create({
        data: {
          slug: dto.slug!,
          title: dto.title,
          description: dto.description ?? undefined,
          courseId: dto.courseId ?? undefined,
          structure: dto.structure ?? undefined,
        },
      });

      // create nodes if present
      const nodes = dto.nodes ?? (dto.structure?.nodes ?? undefined);
      if (nodes && nodes.length > 0) {
        const nodesData = (nodes as CreateRoadmapNodeDto[]).map((n) => {
          const node: any = {
            roadmapId: roadmap.id,
            nodeKey: n.nodeKey,
            title: n.title,
            // only include optional fields if defined (use undefined to omit)
            summary: n.summary ?? undefined,
            contentMd: n.contentMd ?? undefined,
            isRequired: typeof n.isRequired === 'boolean' ? n.isRequired : true,
            metadata: n.metadata ?? undefined,
            coords: n.coords ?? undefined,
          };
          return node;
        });
        // createMany expects non-null for fields you don't want to set; use undefined to omit them
        await tx.roadmapNode.createMany({ data: nodesData });
      }

      // create edges if present
      const edges = dto.edges ?? (dto.structure?.edges ?? undefined);
      if (edges && edges.length > 0) {
        const edgesData = (edges as CreateRoadmapEdgeDto[]).map((e) => ({
          roadmapId: roadmap.id,
          sourceKey: e.sourceKey,
          targetKey: e.targetKey,
        }));
        await tx.roadmapEdge.createMany({ data: edgesData });
      }

      return roadmap;
    });
  }

  async findAll() {
    return this.prisma.roadmap.findMany({
      orderBy: { createdAt: 'desc' },
      include: { course: true },
    });
  }

  async findBySlugWithNodesAndEdges(slug: string) {
    return this.prisma.roadmap.findUnique({
      where: { slug },
      include: {
        nodes: { orderBy: { id: 'asc' } },
        edges: { orderBy: { id: 'asc' } },
        course: true,
      },
    });
  }

  async findOneById(id: number) {
    return this.prisma.roadmap.findUnique({
      where: { id },
      include: { nodes: true, edges: true, course: true },
    });
  }

  async findOneBySlug(slug: string) {
    return this.prisma.roadmap.findUnique({
      where: { slug },
    });
  }


  async findSummaryBySlug(slug: string) {
    const roadmap = await this.prisma.roadmap.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        title: true,
        updatedAt: true, // 👈 Use this as your "version"
        // ⚡ AGGREGATION: Just count the nodes, don't fetch them!
        _count: {
          select: { nodes: true }
        }
      }
    });

    if (!roadmap) return null;

    // Flatten the result to match your DTO
    return {
      id: roadmap.id,
      slug: roadmap.slug,
      title: roadmap.title,
      version: roadmap.updatedAt.toISOString(),
      totalNodes: roadmap._count.nodes // 👈 The count is here
    };
  }

  async updateBasic(id: number, data: { title?: string; description?: string; structure?: any; courseId?: number }) {
    return this.prisma.roadmap.update({
      where: { id },
      data,
    });
  }
  

  /**
   * Replace nodes and edges for a roadmap inside a transaction.
   * Note: This performs deleteMany then createMany for nodes & edges.
   */
  async replaceNodesAndEdges(roadmapId: number, nodes?: CreateRoadmapNodeDto[], edges?: CreateRoadmapEdgeDto[]) {
    return this.prisma.$transaction(async (tx) => {
      // delete existing nodes and edges
      await tx.roadmapEdge.deleteMany({ where: { roadmapId } });
      await tx.roadmapNode.deleteMany({ where: { roadmapId } });

      if (nodes && nodes.length > 0) {
        const nodesData = nodes.map((n) => ({
          roadmapId,
          nodeKey: n.nodeKey,
          title: n.title,
          summary: n.summary ?? undefined,
          contentMd: n.contentMd ?? undefined,
          isRequired: typeof n.isRequired === 'boolean' ? n.isRequired : true,
          metadata: n.metadata ?? undefined,
          coords: n.coords ?? undefined,
        }));
        await tx.roadmapNode.createMany({ data: nodesData });
      }

      if (edges && edges.length > 0) {
        const edgesData = edges.map((e) => ({
          roadmapId,
          sourceKey: e.sourceKey,
          targetKey: e.targetKey,
        }));
        await tx.roadmapEdge.createMany({ data: edgesData });
      }
    });
  }

  async remove(id: number) {
    return this.prisma.roadmap.delete({ where: { id } });
  }
}