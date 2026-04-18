// roadmaps.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TopicsRoadmapService {
  constructor(private readonly prisma: PrismaService) {}

  async getCourseTopicsGraph(courseNodeId: number) {
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
      topics: topics.map((t) => ({
        id: t.id,
        slug: t.slug,
        title: t.title,
        description: t.description,
        coords: t.coords,
        learningObjectives: t.learning_objectives,
        resourcesUrl: t.resources_url,
      })),
      edges: edgesRaw.map((e) => ({
        id: e.id,
        fromTopicId: e.source_topic_id,
        toTopicId: e.target_topic_id,
      })),
    };
  }
}