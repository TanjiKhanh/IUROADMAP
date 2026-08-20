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
import { AdminRoadmapsService } from '../services/admin_roadmaps.service';
import {
  CourseNodeResponseDto,
  CreateCourseNodeDto,
  CreatePrerequisiteDto,
  PrerequisiteEdgeResponseDto,
  UpdateCourseNodeDto,
} from '../dto/course-node-management.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Admin - Roadmaps')
@ApiBearerAuth()
@Controller('admin/roadmaps')
export class AdminRoadmapsController {
  constructor(private readonly adminRoadmapsService: AdminRoadmapsService) {}

  @Get(':roadmapId/graph')
  @ApiOperation({ summary: 'Get roadmap graph (nodes and prerequisite edges)' })
  @ApiParam({ name: 'roadmapId', type: Number, description: 'Roadmap ID' })
  @ApiResponse({ status: 200, description: 'Roadmap graph retrieved successfully' })
  async getRoadmapGraph(@Param('roadmapId', ParseIntPipe) roadmapId: number) {
    return this.adminRoadmapsService.getRoadmapGraph(roadmapId);
  }

  @Post(':roadmapId/courses')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a course node inside a roadmap' })
  @ApiParam({ name: 'roadmapId', type: Number, description: 'Roadmap ID' })
  @ApiBody({ type: CreateCourseNodeDto })
  @ApiResponse({ status: 201, description: 'Course node created successfully', type: CourseNodeResponseDto })
  async createCourseNode(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Body() dto: CreateCourseNodeDto,
  ): Promise<CourseNodeResponseDto> {
    return this.adminRoadmapsService.createCourseNode(roadmapId, dto);
  }

  @Patch(':roadmapId/courses/:courseNodeId')
  @ApiOperation({ summary: 'Update a course node in a roadmap' })
  @ApiParam({ name: 'roadmapId', type: Number, description: 'Roadmap ID' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiBody({ type: UpdateCourseNodeDto })
  @ApiResponse({ status: 200, description: 'Course node updated successfully', type: CourseNodeResponseDto })
  async updateCourseNode(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body() dto: UpdateCourseNodeDto,
  ): Promise<CourseNodeResponseDto> {
    return this.adminRoadmapsService.updateCourseNode(roadmapId, courseNodeId, dto);
  }

  @Delete(':roadmapId/courses/:courseNodeId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a course node from a roadmap' })
  @ApiParam({ name: 'roadmapId', type: Number, description: 'Roadmap ID' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiResponse({ status: 204, description: 'Course node deleted successfully' })
  async deleteCourseNode(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
  ): Promise<void> {
    return this.adminRoadmapsService.deleteCourseNode(roadmapId, courseNodeId);
  }

  @Post(':roadmapId/prerequisites')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a prerequisite relationship (edge) between two course nodes' })
  @ApiParam({ name: 'roadmapId', type: Number, description: 'Roadmap ID' })
  @ApiBody({ type: CreatePrerequisiteDto })
  @ApiResponse({ status: 201, description: 'Prerequisite edge created successfully', type: PrerequisiteEdgeResponseDto })
  async createPrerequisite(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Body() dto: CreatePrerequisiteDto,
  ): Promise<PrerequisiteEdgeResponseDto> {
    return this.adminRoadmapsService.createPrerequisite(roadmapId, dto);
  }

  @Delete(':roadmapId/prerequisites/:edgeId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a prerequisite relationship edge' })
  @ApiParam({ name: 'roadmapId', type: Number, description: 'Roadmap ID' })
  @ApiParam({ name: 'edgeId', type: Number, description: 'Edge ID' })
  @ApiResponse({ status: 204, description: 'Prerequisite edge deleted successfully' })
  async deletePrerequisite(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Param('edgeId', ParseIntPipe) edgeId: number,
  ): Promise<void> {
    return this.adminRoadmapsService.deletePrerequisite(roadmapId, edgeId);
  }
}
