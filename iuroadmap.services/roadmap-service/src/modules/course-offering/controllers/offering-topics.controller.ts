import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminOnly } from '../../../common/auth.decorators';
import { SuccessResponse } from '../../../common/success.response';
import { OfferingTopicsService } from '../services/offering-topics.service';
import {
  TopicCoordsRequest,
  TopicCreateRequest,
  TopicEdgeCreateRequest,
  TopicEdgeResponse,
  TopicResponse,
  TopicUpdateRequest,
  TopicsGraphResponse,
} from '../dto/course-topic';

@ApiTags('Admin Offering Topics')
@Controller({ path: 'admin/course-offerings', version: '1' })
export class OfferingTopicsController {
  constructor(private readonly topicsService: OfferingTopicsService) {}

  @Get(':id/topics-graph')
  @AdminOnly()
  @ApiOperation({ summary: 'Topics and topic relations of an offering (micro canvas)' })
  @ApiParam({ name: 'id', type: Number, description: 'Offering ID' })
  @ApiResponse({ status: 200, type: TopicsGraphResponse })
  async getGraph(@Param('id', ParseIntPipe) id: number): Promise<TopicsGraphResponse> {
    return this.topicsService.getGraph(id);
  }

  @Post(':id/topics/create')
  @AdminOnly()
  @ApiOperation({ summary: 'Add a topic' })
  @ApiParam({ name: 'id', type: Number, description: 'Offering ID' })
  @ApiResponse({ status: 201, type: TopicResponse })
  async createTopic(@Param('id', ParseIntPipe) id: number, @Body() dto: TopicCreateRequest): Promise<TopicResponse> {
    return this.topicsService.createTopic(id, dto);
  }

  @Post(':id/topics/:topicId/update')
  @AdminOnly()
  @ApiOperation({ summary: 'Update a topic' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'topicId', type: Number })
  @ApiResponse({ status: 200, type: TopicResponse })
  async updateTopic(
    @Param('id', ParseIntPipe) id: number,
    @Param('topicId', ParseIntPipe) topicId: number,
    @Body() dto: TopicUpdateRequest,
  ): Promise<TopicResponse> {
    return this.topicsService.updateTopic(id, topicId, dto);
  }

  @Post(':id/topics/:topicId/coords')
  @AdminOnly()
  @ApiOperation({ summary: 'Move a topic on the micro canvas' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'topicId', type: Number })
  @ApiResponse({ status: 200, type: TopicResponse })
  async updateCoords(
    @Param('id', ParseIntPipe) id: number,
    @Param('topicId', ParseIntPipe) topicId: number,
    @Body() dto: TopicCoordsRequest,
  ): Promise<TopicResponse> {
    return this.topicsService.updateTopic(id, topicId, { coords: dto });
  }

  @Post(':id/topics/:topicId/delete')
  @AdminOnly()
  @ApiOperation({ summary: 'Delete a topic (its relations are removed too)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'topicId', type: Number })
  @ApiResponse({ status: 200, type: SuccessResponse })
  async deleteTopic(@Param('id', ParseIntPipe) id: number, @Param('topicId', ParseIntPipe) topicId: number): Promise<SuccessResponse> {
    await this.topicsService.deleteTopic(id, topicId);
    return { success: true };
  }

  @Post(':id/topics-edges/create')
  @AdminOnly()
  @ApiOperation({ summary: 'Add a topic relation (must stay acyclic)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 201, type: TopicEdgeResponse })
  @ApiResponse({ status: 400, description: 'CYCLE_DETECTED' })
  async createEdge(@Param('id', ParseIntPipe) id: number, @Body() dto: TopicEdgeCreateRequest): Promise<TopicEdgeResponse> {
    return this.topicsService.createEdge(id, dto);
  }

  @Post(':id/topics-edges/:edgeId/delete')
  @AdminOnly()
  @ApiOperation({ summary: 'Delete a topic relation' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'edgeId', type: Number })
  @ApiResponse({ status: 200, type: SuccessResponse })
  async deleteEdge(@Param('id', ParseIntPipe) id: number, @Param('edgeId', ParseIntPipe) edgeId: number): Promise<SuccessResponse> {
    await this.topicsService.deleteEdge(id, edgeId);
    return { success: true };
  }
}
