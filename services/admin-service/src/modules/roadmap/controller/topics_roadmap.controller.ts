// admin-service/src/modules/roadmaps/course-topics.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TopicsRoadmapService } from '../services/topics_roadmap.service';
import {
  CreateTopicNodeDto,
  CreateTopicEdgeDto,
  UpdateCourseNodeMetaDto,
  UpdateTopicCoordsDto,
  UpdateTopicNodeDto,
} from '../dto/course-topic-management.dto';

@Controller('admin/course-nodes')
export class TopicsRoadmapsController {

     constructor(private readonly topicsRoadmapService: TopicsRoadmapService) {}

  @Get()
  async listCourseNodes() {
    return this.topicsRoadmapService.listCourseNodes();
  }

  @Patch(':courseNodeId')
  async updateCourseNodeMeta(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body() payload: UpdateCourseNodeMetaDto,
  ) {
    return this.topicsRoadmapService.updateCourseNodeMeta(courseNodeId, payload);
  }
   

  // Get the topics roadmap for a specific course node ID
  @Get(':courseNodeId/topics-graph')
    async getCourseTopicsGraph(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
  ) {
    // The controller simply asks the service for the answer. Clean and perfect!
    return await this.topicsRoadmapService.getCourseTopicsGraph(courseNodeId);
  }

  @Post(':courseNodeId/topics')
  @HttpCode(HttpStatus.CREATED)
  async createTopicNode(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body() payload: CreateTopicNodeDto,
  ) {
    return this.topicsRoadmapService.createTopicNode(courseNodeId, payload);
  }

  @Patch(':courseNodeId/topics/:topicId')
  async updateTopicNode(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
    @Body() payload: UpdateTopicNodeDto,
  ) {
    return this.topicsRoadmapService.updateTopicNode(courseNodeId, topicId, payload);
  }

  @Delete(':courseNodeId/topics/:topicId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTopicNode(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
  ): Promise<void> {
    return this.topicsRoadmapService.deleteTopicNode(courseNodeId, topicId);
  }

  @Patch(':courseNodeId/topics/:topicId/coords')
  async updateTopicCoords(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
    @Body() payload: UpdateTopicCoordsDto,
  ) {
    return this.topicsRoadmapService.updateTopicCoords(
      courseNodeId,
      topicId,
      payload.coords,
    );
  }

  @Post(':courseNodeId/topics-edges')
  @HttpCode(HttpStatus.CREATED)
  async createTopicEdge(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body() payload: CreateTopicEdgeDto,
  ) {
    return this.topicsRoadmapService.createTopicEdge(courseNodeId, payload);
  }

  @Delete(':courseNodeId/topics-edges/:edgeId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTopicEdge(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Param('edgeId', ParseIntPipe) edgeId: number,
  ): Promise<void> {
    return this.topicsRoadmapService.deleteTopicEdge(courseNodeId, edgeId);
  }
  
}