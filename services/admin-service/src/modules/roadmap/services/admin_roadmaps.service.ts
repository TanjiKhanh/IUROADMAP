import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../../generated/prisma-client';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  CourseNodeResponseDto,
  CreateCourseNodeDto,
  CreatePrerequisiteDto,
  PrerequisiteEdgeResponseDto,
  UpdateCourseNodeDto,
} from '../dto/course-node-management.dto';

@Injectable()
export class AdminRoadmapsService {
  constructor(private readonly prisma: PrismaService) {}

  private async ensureRoadmapExists(roadmapId: number): Promise<void> {
    const roadmap = await this.prisma.mAJOR_ROADMAPS.findUnique({
      where: { id: roadmapId },
      select: { id: true },
    });

    if (!roadmap) {
      throw new NotFoundException(`Roadmap with id ${roadmapId} not found`);
    }
  }

  private toNodeResponse(node: {
    id: number;
    roadmap_id: number;
    slug: string;
    name: string;
    credits: number;
    description: string | null;
    coords: unknown;
    created_at: Date;
    updated_at: Date;
  }): CourseNodeResponseDto {
    const coords = node.coords as { x?: number; y?: number } | null;

    return {
      id: node.id,
      roadmap_id: node.roadmap_id,
      slug: node.slug,
      name: node.name,
      credits: node.credits,
      description: node.description,
      coords:
        coords && Number.isFinite(coords.x) && Number.isFinite(coords.y)
          ? { x: Number(coords.x), y: Number(coords.y) }
          : null,
      created_at: node.created_at.toISOString(),
      updated_at: node.updated_at.toISOString(),
    };
  }

  async getRoadmapGraph(roadmapId: number) {
    await this.ensureRoadmapExists(roadmapId);

    const nodes = await this.prisma.cOURSE_NODES.findMany({
      where: { roadmap_id: roadmapId },
      orderBy: { id: 'asc' },
    });

    const nodeIds = nodes.map((node) => node.id);

    const edges =
      nodeIds.length > 0
        ? await this.prisma.cOURSE_NODE_PREREQUISITES.findMany({
            where: { course_node_id: { in: nodeIds } },
            orderBy: { id: 'asc' },
          })
        : [];

    return {
      roadmapId,
      nodes: nodes.map((node) => {
        const coords = node.coords as { x?: number; y?: number } | null;

        return {
          id: node.id,
          slug: node.slug,
          name: node.name,
          coords:
            coords && Number.isFinite(coords.x) && Number.isFinite(coords.y)
              ? { x: Number(coords.x), y: Number(coords.y) }
              : null,
          credits: node.credits,
          description: node.description,
        };
      }),
      edges: edges.map((edge) => ({
        id: edge.id,
        from: edge.course_node_id,
        to: edge.prerequisite_node_id,
      })),
    };
  }

  async createCourseNode(
    roadmapId: number,
    dto: CreateCourseNodeDto,
  ): Promise<CourseNodeResponseDto> {
    await this.ensureRoadmapExists(roadmapId);

    try {
      const created = await this.prisma.cOURSE_NODES.create({
        data: {
          roadmap_id: roadmapId,
          slug: dto.slug,
          name: dto.name,
          credits: dto.credits,
          description: dto.description,
          coords: dto.coords
            ? (dto.coords as unknown as Prisma.InputJsonValue)
            : undefined,
        },
      });

      return this.toNodeResponse(created);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Course node slug already exists in this roadmap');
      }

      throw error;
    }
  }

  async updateCourseNode(
    roadmapId: number,
    courseNodeId: number,
    dto: UpdateCourseNodeDto,
  ): Promise<CourseNodeResponseDto> {
    const existing = await this.prisma.cOURSE_NODES.findFirst({
      where: {
        id: courseNodeId,
        roadmap_id: roadmapId,
      },
    });

    if (!existing) {
      throw new NotFoundException(
        `Course node ${courseNodeId} not found in roadmap ${roadmapId}`,
      );
    }

    const data: Prisma.COURSE_NODESUpdateInput = {};

    if (dto.slug !== undefined) data.slug = dto.slug;
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.credits !== undefined) data.credits = dto.credits;
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.coords !== undefined) {
      data.coords = dto.coords as unknown as Prisma.InputJsonValue;
    }

    if (Object.keys(data).length === 0) {
      return this.toNodeResponse(existing);
    }

    try {
      const updated = await this.prisma.cOURSE_NODES.update({
        where: { id: courseNodeId },
        data,
      });

      return this.toNodeResponse(updated);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Course node slug already exists in this roadmap');
      }

      throw error;
    }
  }

  async deleteCourseNode(roadmapId: number, courseNodeId: number): Promise<void> {
    const existing = await this.prisma.cOURSE_NODES.findFirst({
      where: {
        id: courseNodeId,
        roadmap_id: roadmapId,
      },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundException(
        `Course node ${courseNodeId} not found in roadmap ${roadmapId}`,
      );
    }

    await this.prisma.$transaction([
      this.prisma.cOURSE_NODE_PREREQUISITES.deleteMany({
        where: {
          OR: [
            { course_node_id: courseNodeId },
            { prerequisite_node_id: courseNodeId },
          ],
        },
      }),
      this.prisma.cOURSE_NODES.delete({
        where: { id: courseNodeId },
      }),
    ]);
  }

  async createPrerequisite(
    roadmapId: number,
    dto: CreatePrerequisiteDto,
  ): Promise<PrerequisiteEdgeResponseDto> {
    if (dto.course_node_id === dto.prerequisite_node_id) {
      throw new BadRequestException('A course node cannot depend on itself');
    }

    const nodes = await this.prisma.cOURSE_NODES.findMany({
      where: {
        id: { in: [dto.course_node_id, dto.prerequisite_node_id] },
      },
      select: {
        id: true,
        roadmap_id: true,
      },
    });

    if (nodes.length !== 2) {
      throw new NotFoundException('One or more course nodes were not found');
    }

    if (nodes.some((node) => node.roadmap_id !== roadmapId)) {
      throw new BadRequestException('Both nodes must belong to the same roadmap');
    }

    try {
      const created = await this.prisma.cOURSE_NODE_PREREQUISITES.create({
        data: {
          course_node_id: dto.course_node_id,
          prerequisite_node_id: dto.prerequisite_node_id,
        },
      });

      return {
        id: created.id,
        course_node_id: created.course_node_id,
        prerequisite_node_id: created.prerequisite_node_id,
        created_at: created.created_at.toISOString(),
        updated_at: created.updated_at.toISOString(),
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Prerequisite edge already exists');
      }

      throw error;
    }
  }

  async deletePrerequisite(roadmapId: number, edgeId: number): Promise<void> {
    const edge = await this.prisma.cOURSE_NODE_PREREQUISITES.findUnique({
      where: { id: edgeId },
      include: {
        courseNode: {
          select: {
            roadmap_id: true,
          },
        },
      },
    });

    if (!edge || edge.courseNode.roadmap_id !== roadmapId) {
      throw new NotFoundException(
        `Prerequisite edge ${edgeId} not found in roadmap ${roadmapId}`,
      );
    }

    await this.prisma.cOURSE_NODE_PREREQUISITES.delete({
      where: { id: edgeId },
    });
  }
}
