import { Injectable, Logger } from '@nestjs/common';
import { AdminServiceClient } from '../clients/admin-service.client';
import {
  AdminCourseListItem,
  AdminCourseTopicsGraph,
  AdminTopicCoordsUpdateResponse,
  AdminTopicEdge,
  AdminTopicNode,
  CreateAdminTopicNodeDto,
  CreateAdminTopicEdgeDto,
  UpdateAdminCourseNodeMetaDto,
  UpdateAdminTopicNodeDto,
} from '../dtos';

@Injectable()
export class CoursesService {
  private readonly logger = new Logger(CoursesService.name);

  constructor(private readonly adminClient: AdminServiceClient) {}

  async getCourses(): Promise<AdminCourseListItem[]> {
    this.logger.log('Fetching admin course node list');
    return this.adminClient.getAdminCourseNodes();
  }

  async updateCourseMeta(
    courseNodeId: number,
    payload: UpdateAdminCourseNodeMetaDto,
  ): Promise<AdminCourseListItem> {
    this.logger.log(`Updating admin course node ${courseNodeId}`);
    return this.adminClient.updateAdminCourseNodeMeta(courseNodeId, payload);
  }

  async getCourseTopicsGraph(courseNodeId: number): Promise<AdminCourseTopicsGraph> {
    this.logger.log(`Fetching topics graph for course node ${courseNodeId}`);
    return this.adminClient.getAdminCourseTopicsGraph(courseNodeId);
  }

  async createTopicNode(
    courseNodeId: number,
    payload: CreateAdminTopicNodeDto,
  ): Promise<AdminTopicNode> {
    this.logger.log(`Creating topic node in course node ${courseNodeId}`);
    return this.adminClient.createAdminTopicNode(courseNodeId, payload);
  }

  async updateTopicNode(
    courseNodeId: number,
    topicId: number,
    payload: UpdateAdminTopicNodeDto,
  ): Promise<AdminTopicNode> {
    this.logger.log(`Updating topic node ${topicId} in course node ${courseNodeId}`);
    return this.adminClient.updateAdminTopicNode(courseNodeId, topicId, payload);
  }

  async deleteTopicNode(courseNodeId: number, topicId: number): Promise<void> {
    this.logger.log(`Deleting topic node ${topicId} in course node ${courseNodeId}`);
    return this.adminClient.deleteAdminTopicNode(courseNodeId, topicId);
  }

  async updateTopicCoords(
    courseNodeId: number,
    topicId: number,
    coords: { x: number; y: number },
  ): Promise<AdminTopicCoordsUpdateResponse> {
    this.logger.log(`Updating coords for topic ${topicId} in course node ${courseNodeId}`);
    return this.adminClient.updateAdminTopicCoords(courseNodeId, topicId, coords);
  }

  async createTopicEdge(
    courseNodeId: number,
    payload: CreateAdminTopicEdgeDto,
  ): Promise<AdminTopicEdge> {
    this.logger.log(`Creating topic edge for course node ${courseNodeId}`);
    return this.adminClient.createAdminTopicEdge(courseNodeId, payload);
  }

  async deleteTopicEdge(courseNodeId: number, edgeId: number): Promise<void> {
    this.logger.log(`Deleting topic edge ${edgeId} in course node ${courseNodeId}`);
    return this.adminClient.deleteAdminTopicEdge(courseNodeId, edgeId);
  }
}
