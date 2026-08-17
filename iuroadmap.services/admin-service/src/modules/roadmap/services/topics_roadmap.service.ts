// roadmaps.service.ts
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../../../generated/prisma-client';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  CourseNodeListItemDto,
  CourseTopicsGraphResponseDto,
  CreateTopicNodeDto,
  CreateTopicEdgeDto,
  TopicEdgeResponseDto,
  TopicNodeResponseDto,
  UpdateCourseNodeMetaDto,
  UpdateTopicNodeDto,
} from '../dto/course-topic-management.dto';

@Injectable()
export class TopicsRoadmapService {
  constructor(private readonly prisma: PrismaService) {}

  private mapTopicNode(
    topic: {
      id: number;
      slug: string;
      title: string;
      description: string | null;
      coords: unknown;
      learning_objectives: string | null;
      resources_url: string | null;
    },
  ): TopicNodeResponseDto {
    const coords = topic.coords as { x?: number; y?: number } | null;
    return {
      id: topic.id,
      slug: topic.slug,
      title: topic.title,
      description: topic.description,
      coords:
        coords && Number.isFinite(coords.x) && Number.isFinite(coords.y)
          ? { x: Number(coords.x), y: Number(coords.y) }
          : null,
      learningObjectives: topic.learning_objectives,
      resourcesUrl: topic.resources_url,
    };
  }

  async listCourseNodes(): Promise<CourseNodeListItemDto[]> {
    const rows = await this.prisma.cOURSE_NODES.findMany({
      include: {
        roadmap: {
          select: {
            id: true,
            slug: true,
            name: true,
          },
        },
      },
      orderBy: [{ roadmap_id: 'asc' }, { id: 'asc' }],
    });

    return rows.map((row) => ({
      id: row.id,
      roadmapId: row.roadmap_id,
      roadmapSlug: row.roadmap.slug,
      roadmapName: row.roadmap.name,
      slug: row.slug,
      name: row.name,
      credits: row.credits,
      description: row.description,
    }));
  }

  async updateCourseNodeMeta(
    courseNodeId: number,
    payload: UpdateCourseNodeMetaDto,
  ): Promise<CourseNodeListItemDto> {
    const existing = await this.prisma.cOURSE_NODES.findUnique({
      where: { id: courseNodeId },
      include: {
        roadmap: {
          select: {
            id: true,
            slug: true,
            name: true,
          },
        },
      },
    });

    if (!existing) {
      throw new NotFoundException(`Course node ${courseNodeId} not found`);
    }

    if (Object.keys(payload).length === 0) {
      return {
        id: existing.id,
        roadmapId: existing.roadmap_id,
        roadmapSlug: existing.roadmap.slug,
        roadmapName: existing.roadmap.name,
        slug: existing.slug,
        name: existing.name,
        credits: existing.credits,
        description: existing.description,
      };
    }

    try {
      const updated = await this.prisma.cOURSE_NODES.update({
        where: { id: courseNodeId },
        data: {
          slug: payload.slug,
          name: payload.name,
          credits: payload.credits,
          description: payload.description,
        },
        include: {
          roadmap: {
            select: {
              id: true,
              slug: true,
              name: true,
            },
          },
        },
      });

      return {
        id: updated.id,
        roadmapId: updated.roadmap_id,
        roadmapSlug: updated.roadmap.slug,
        roadmapName: updated.roadmap.name,
        slug: updated.slug,
        name: updated.name,
        credits: updated.credits,
        description: updated.description,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Course slug already exists in this roadmap');
      }

      throw error;
    }
  }

  async getCourseTopicsGraph(courseNodeId: number): Promise<CourseTopicsGraphResponseDto> {
    const courseNode = await this.prisma.cOURSE_NODES.findUnique({
      where: { id: courseNodeId },
      select: { id: true },
    });

    if (!courseNode) {
      throw new NotFoundException(`Course node ${courseNodeId} not found`);
    }

    const topics = await this.prisma.cOURSE_TOPICS_NODE.findMany({
      where: { course_node_id: courseNodeId },
      orderBy: { id: 'asc' },
    });

    const topicIds = topics.map((t) => t.id);
    const edgesRaw = await this.prisma.cOURSE_TOPICS_EDGE.findMany({
      where: {
        OR: [
          { source_topic_id: { in: topicIds } },
          { target_topic_id: { in: topicIds } },
        ],
      },
      orderBy: { id: 'asc' },
    });

    return {
      courseNodeId,
      topics: topics.map((t) => {
        return this.mapTopicNode(t);
      }),
      edges: edgesRaw.map((e) => ({
        id: e.id,
        fromTopicId: e.source_topic_id,
        toTopicId: e.target_topic_id,
      })),
    };
  }

  async updateTopicCoords(
    courseNodeId: number,
    topicId: number,
    coords: { x: number; y: number },
  ) {
    const topic = await this.prisma.cOURSE_TOPICS_NODE.findFirst({
      where: {
        id: topicId,
        course_node_id: courseNodeId,
      },
    });

    if (!topic) {
      throw new NotFoundException(
        `Topic ${topicId} not found for course node ${courseNodeId}`,
      );
    }

    const updated = await this.prisma.cOURSE_TOPICS_NODE.update({
      where: { id: topicId },
      data: {
        coords: coords as unknown as Prisma.InputJsonValue,
      },
    });

    return {
      id: updated.id,
      coords: this.mapTopicNode(updated).coords,
      updated_at: updated.updated_at.toISOString(),
    };
  }

  async createTopicNode(
    courseNodeId: number,
    payload: CreateTopicNodeDto,
  ): Promise<TopicNodeResponseDto> {
    const courseNode = await this.prisma.cOURSE_NODES.findUnique({
      where: { id: courseNodeId },
      select: { id: true },
    });

    if (!courseNode) {
      throw new NotFoundException(`Course node ${courseNodeId} not found`);
    }

    try {
      const created = await this.prisma.cOURSE_TOPICS_NODE.create({
        data: {
          course_node_id: courseNodeId,
          slug: payload.slug,
          title: payload.title,
          description: payload.description,
          learning_objectives: payload.learningObjectives,
          resources_url: payload.resourcesUrl,
          coords: payload.coords
            ? (payload.coords as unknown as Prisma.InputJsonValue)
            : undefined,
        },
      });

      return this.mapTopicNode(created);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Topic slug already exists in this course node');
      }

      throw error;
    }
  }

  async updateTopicNode(
    courseNodeId: number,
    topicId: number,
    payload: UpdateTopicNodeDto,
  ): Promise<TopicNodeResponseDto> {
    const existing = await this.prisma.cOURSE_TOPICS_NODE.findFirst({
      where: {
        id: topicId,
        course_node_id: courseNodeId,
      },
    });

    if (!existing) {
      throw new NotFoundException(
        `Topic ${topicId} not found for course node ${courseNodeId}`,
      );
    }

    const data: Prisma.COURSE_TOPICS_NODEUpdateInput = {};

    if (payload.slug !== undefined) data.slug = payload.slug;
    if (payload.title !== undefined) data.title = payload.title;
    if (payload.description !== undefined) data.description = payload.description;
    if (payload.learningObjectives !== undefined) {
      data.learning_objectives = payload.learningObjectives;
    }
    if (payload.resourcesUrl !== undefined) {
      data.resources_url = payload.resourcesUrl;
    }
    if (payload.coords !== undefined) {
      data.coords = payload.coords as unknown as Prisma.InputJsonValue;
    }

    if (Object.keys(data).length === 0) {
      return this.mapTopicNode(existing);
    }

    try {
      const updated = await this.prisma.cOURSE_TOPICS_NODE.update({
        where: { id: topicId },
        data,
      });
      return this.mapTopicNode(updated);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Topic slug already exists in this course node');
      }

      throw error;
    }
  }

  async deleteTopicNode(courseNodeId: number, topicId: number): Promise<void> {
    const existing = await this.prisma.cOURSE_TOPICS_NODE.findFirst({
      where: {
        id: topicId,
        course_node_id: courseNodeId,
      },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundException(
        `Topic ${topicId} not found for course node ${courseNodeId}`,
      );
    }

    await this.prisma.$transaction([
      this.prisma.cOURSE_TOPICS_EDGE.deleteMany({
        where: {
          OR: [{ source_topic_id: topicId }, { target_topic_id: topicId }],
        },
      }),
      this.prisma.cOURSE_TOPICS_NODE.delete({
        where: { id: topicId },
      }),
    ]);
  }

  async createTopicEdge(
    courseNodeId: number,
    dto: CreateTopicEdgeDto,
  ): Promise<TopicEdgeResponseDto> {
    if (dto.sourceTopicId === dto.targetTopicId) {
      throw new BadRequestException('A topic cannot connect to itself');
    }

    const topics = await this.prisma.cOURSE_TOPICS_NODE.findMany({
      where: {
        id: { in: [dto.sourceTopicId, dto.targetTopicId] },
      },
      select: {
        id: true,
        course_node_id: true,
      },
    });

    if (topics.length !== 2) {
      throw new NotFoundException('One or more topics were not found');
    }

    if (topics.some((topic) => topic.course_node_id !== courseNodeId)) {
      throw new BadRequestException('Both topics must belong to this course node');
    }

    // Use SQL upsert to ensure both created_at and updated_at are populated,
    // even if the Prisma model is temporarily out of sync with DB constraints.
    const rows = await this.prisma.$queryRaw<
      Array<{ id: number; source_topic_id: number; target_topic_id: number }>
    >`
      INSERT INTO course_topics_edge (source_topic_id, target_topic_id, created_at, updated_at)
      VALUES (${dto.sourceTopicId}, ${dto.targetTopicId}, NOW(), NOW())
      ON CONFLICT (source_topic_id, target_topic_id)
      DO UPDATE SET updated_at = NOW()
      RETURNING id, source_topic_id, target_topic_id
    `;

    const edge = rows[0];

    if (!edge) {
      throw new BadRequestException('Failed to create topic edge');
    }

    return {
      id: edge.id,
      fromTopicId: edge.source_topic_id,
      toTopicId: edge.target_topic_id,
    };
  }

  async deleteTopicEdge(courseNodeId: number, edgeId: number): Promise<void> {
    const edge = await this.prisma.cOURSE_TOPICS_EDGE.findUnique({
      where: { id: edgeId },
      include: {
        sourceTopic: {
          select: { course_node_id: true },
        },
        targetTopic: {
          select: { course_node_id: true },
        },
      },
    });

    if (
      !edge ||
      edge.sourceTopic.course_node_id !== courseNodeId ||
      edge.targetTopic.course_node_id !== courseNodeId
    ) {
      throw new NotFoundException(
        `Topic edge ${edgeId} not found for course node ${courseNodeId}`,
      );
    }

    await this.prisma.cOURSE_TOPICS_EDGE.delete({
      where: { id: edgeId },
    });
  }
}