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

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Admin - Roadmaps')
@ApiBearerAuth()
@Controller('admin/course-nodes')
export class TopicsRoadmapsController {
  constructor(private readonly topicsRoadmapService: TopicsRoadmapService) {}

  @Get()
  @ApiOperation({ summary: 'List all course nodes' })
  @ApiResponse({ status: 200, description: 'Course nodes retrieved successfully' })
  async listCourseNodes() {
    return this.topicsRoadmapService.listCourseNodes();
  }

  @Patch(':courseNodeId')
  @ApiOperation({ summary: 'Update course node metadata' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiBody({ type: UpdateCourseNodeMetaDto })
  @ApiResponse({ status: 200, description: 'Course node metadata updated successfully' })
  async updateCourseNodeMeta(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body() payload: UpdateCourseNodeMetaDto,
  ) {
    return this.topicsRoadmapService.updateCourseNodeMeta(courseNodeId, payload);
  }

  // Get the topics roadmap for a specific course node ID
  @Get(':courseNodeId/topics-graph')
  @ApiOperation({ summary: 'Get topic micro-roadmap graph for a specific course node' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiResponse({ status: 200, description: 'Course topics graph retrieved successfully' })
  async getCourseTopicsGraph(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
  ) {
    // The controller simply asks the service for the answer. Clean and perfect!
    return await this.topicsRoadmapService.getCourseTopicsGraph(courseNodeId);
  }

  @Post(':courseNodeId/topics')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a topic node under a course node' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiBody({ type: CreateTopicNodeDto })
  @ApiResponse({ status: 201, description: 'Topic node created successfully' })
  async createTopicNode(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body() payload: CreateTopicNodeDto,
  ) {
    return this.topicsRoadmapService.createTopicNode(courseNodeId, payload);
  }

  @Patch(':courseNodeId/topics/:topicId')
  @ApiOperation({ summary: 'Update a topic node' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiParam({ name: 'topicId', type: Number, description: 'Topic node ID' })
  @ApiBody({ type: UpdateTopicNodeDto })
  @ApiResponse({ status: 200, description: 'Topic node updated successfully' })
  async updateTopicNode(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
    @Body() payload: UpdateTopicNodeDto,
  ) {
    return this.topicsRoadmapService.updateTopicNode(courseNodeId, topicId, payload);
  }

  @Delete(':courseNodeId/topics/:topicId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a topic node' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiParam({ name: 'topicId', type: Number, description: 'Topic node ID' })
  @ApiResponse({ status: 204, description: 'Topic node deleted successfully' })
  async deleteTopicNode(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
  ): Promise<void> {
    return this.topicsRoadmapService.deleteTopicNode(courseNodeId, topicId);
  }

  @Patch(':courseNodeId/topics/:topicId/coords')
  @ApiOperation({ summary: 'Update graph coordinates for a topic node' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiParam({ name: 'topicId', type: Number, description: 'Topic node ID' })
  @ApiBody({ type: UpdateTopicCoordsDto })
  @ApiResponse({ status: 200, description: 'Topic coordinates updated successfully' })
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
  @ApiOperation({ summary: 'Create an edge connecting two topic nodes' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiBody({ type: CreateTopicEdgeDto })
  @ApiResponse({ status: 201, description: 'Topic edge created successfully' })
  async createTopicEdge(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body() payload: CreateTopicEdgeDto,
  ) {
    return this.topicsRoadmapService.createTopicEdge(courseNodeId, payload);
  }

  @Delete(':courseNodeId/topics-edges/:edgeId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a topic edge' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiParam({ name: 'edgeId', type: Number, description: 'Edge ID' })
  @ApiResponse({ status: 204, description: 'Topic edge deleted successfully' })
  async deleteTopicEdge(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Param('edgeId', ParseIntPipe) edgeId: number,
  ): Promise<void> {
    return this.topicsRoadmapService.deleteTopicEdge(courseNodeId, edgeId);
  }
}