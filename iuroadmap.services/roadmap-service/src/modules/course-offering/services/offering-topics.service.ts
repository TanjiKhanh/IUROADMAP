import { Injectable, Logger } from '@nestjs/common';
import { ErrorCodes, findCycle } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors, handlePrismaError } from '../../../common/api-errors';
import { OfferingStatusEnum } from '../../../common/enums';
import {
  TopicCreateRequest,
  TopicEdgeCreateRequest,
  TopicEdgeResponse,
  TopicResponse,
  TopicUpdateRequest,
  TopicsGraphResponse,
} from '../dto/course-topic';

const ENTITY = 'Topic';

/** Micro roadmap (topics) of one course offering — each academic year has its own (FR-RDM.08.6). */
@Injectable()
export class OfferingTopicsService {
  private readonly logger = new Logger(OfferingTopicsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getGraph(offeringId: number): Promise<TopicsGraphResponse> {
    const offering = await this.prisma.cOURSE_OFFERINGS.findUnique({
      where: { id: offeringId },
      include: {
        course: { select: { id: true, code: true, name: true } },
        topics: { include: { topicEdgesAsSource: true }, orderBy: { id: 'asc' } },
      },
    });
    if (!offering) throw ApiErrors.notFound(`Course offering with id ${offeringId} not found`);
    return {
      offeringId: offering.id,
      academicYear: offering.academic_year,
      status: offering.status as OfferingStatusEnum,
      courseId: offering.course.id,
      courseCode: offering.course.code,
      courseName: offering.course.name,
      topics: offering.topics.map((t) => this.toTopic(t)),
      edges: offering.topics.flatMap((t) =>
        t.topicEdgesAsSource.map((e) => ({ id: e.id, sourceTopicId: e.source_topic_id, targetTopicId: e.target_topic_id })),
      ),
    };
  }

  async createTopic(offeringId: number, dto: TopicCreateRequest): Promise<TopicResponse> {
    await this.ensureOffering(offeringId);
    try {
      const topic = await this.prisma.cOURSE_TOPICS_NODE.create({
        data: {
          offering_id: offeringId,
          slug: dto.slug,
          title: dto.title,
          description: dto.description,
          learning_objectives: dto.learningObjectives,
          resources_url: dto.resourcesUrl,
          estimated_hours: dto.estimatedHours,
          coords: dto.coords ? { x: dto.coords.x, y: dto.coords.y } : undefined,
        },
      });
      return this.toTopic(topic);
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'create');
    }
  }

  async updateTopic(offeringId: number, topicId: number, dto: TopicUpdateRequest): Promise<TopicResponse> {
    await this.ensureTopic(offeringId, topicId);
    try {
      const topic = await this.prisma.cOURSE_TOPICS_NODE.update({
        where: { id: topicId },
        data: {
          slug: dto.slug,
          title: dto.title,
          description: dto.description,
          learning_objectives: dto.learningObjectives,
          resources_url: dto.resourcesUrl,
          estimated_hours: dto.estimatedHours,
          coords: dto.coords ? { x: dto.coords.x, y: dto.coords.y } : undefined,
        },
      });
      return this.toTopic(topic);
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'update', topicId);
    }
  }

  async deleteTopic(offeringId: number, topicId: number): Promise<void> {
    await this.ensureTopic(offeringId, topicId);
    await this.prisma.cOURSE_TOPICS_NODE.delete({ where: { id: topicId } });
  }

  /** Topic relations must stay a DAG (BR-RM-01). */
  async createEdge(offeringId: number, dto: TopicEdgeCreateRequest): Promise<TopicEdgeResponse> {
    if (dto.sourceTopicId === dto.targetTopicId) {
      throw ApiErrors.badRequest(ErrorCodes.CYCLE_DETECTED, 'A topic cannot depend on itself');
    }
    await Promise.all([this.ensureTopic(offeringId, dto.sourceTopicId), this.ensureTopic(offeringId, dto.targetTopicId)]);
    const topics = await this.prisma.cOURSE_TOPICS_NODE.findMany({
      where: { offering_id: offeringId },
      select: { id: true, topicEdgesAsSource: { select: { source_topic_id: true, target_topic_id: true } } },
    });
    const edges = topics.flatMap((t) =>
      t.topicEdgesAsSource.map((e) => ({ source: String(e.source_topic_id), target: String(e.target_topic_id) })),
    );
    const cycle = findCycle(
      topics.map((t) => String(t.id)),
      [...edges, { source: String(dto.sourceTopicId), target: String(dto.targetTopicId) }],
    );
    if (cycle) throw ApiErrors.badRequest(ErrorCodes.CYCLE_DETECTED, 'The relation creates a cycle', { cycle: cycle.map(Number) });

    try {
      const edge = await this.prisma.cOURSE_TOPICS_EDGE.create({
        data: { source_topic_id: dto.sourceTopicId, target_topic_id: dto.targetTopicId },
      });
      return { id: edge.id, sourceTopicId: edge.source_topic_id, targetTopicId: edge.target_topic_id };
    } catch (error) {
      handlePrismaError(this.logger, error, 'Topic relation', 'create');
    }
  }

  async deleteEdge(offeringId: number, edgeId: number): Promise<void> {
    const edge = await this.prisma.cOURSE_TOPICS_EDGE.findUnique({
      where: { id: edgeId },
      include: { sourceTopic: { select: { offering_id: true } } },
    });
    if (!edge || edge.sourceTopic.offering_id !== offeringId) throw ApiErrors.notFound(`Topic relation ${edgeId} not found`);
    await this.prisma.cOURSE_TOPICS_EDGE.delete({ where: { id: edgeId } });
  }

  private async ensureOffering(offeringId: number): Promise<void> {
    const found = await this.prisma.cOURSE_OFFERINGS.findUnique({ where: { id: offeringId }, select: { id: true } });
    if (!found) throw ApiErrors.notFound(`Course offering with id ${offeringId} not found`);
  }

  private async ensureTopic(offeringId: number, topicId: number): Promise<void> {
    const topic = await this.prisma.cOURSE_TOPICS_NODE.findUnique({ where: { id: topicId }, select: { offering_id: true } });
    if (!topic || topic.offering_id !== offeringId) throw ApiErrors.notFound(`${ENTITY} ${topicId} not found in offering ${offeringId}`);
  }

  private toTopic(t: any): TopicResponse {
    const coords = t.coords && typeof t.coords === 'object' ? (t.coords as { x: number; y: number }) : undefined;
    return {
      id: t.id,
      slug: t.slug,
      title: t.title,
      description: t.description ?? undefined,
      learningObjectives: t.learning_objectives ?? undefined,
      resourcesUrl: t.resources_url ?? undefined,
      estimatedHours: t.estimated_hours !== null && t.estimated_hours !== undefined ? Number(t.estimated_hours) : undefined,
      coords,
    };
  }
}
