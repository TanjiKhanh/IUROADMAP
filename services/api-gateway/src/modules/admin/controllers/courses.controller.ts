import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
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
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { RoleGuard } from '../../../common/guards/role.guard';
import { CoursesService } from '../services/courses.service';
import {
  AdminCourseListItem,
  AdminCourseTopicsGraph,
  CreateAdminTopicNodeDto,
  CreateAdminTopicEdgeDto,
  UpdateAdminCourseNodeMetaDto,
  UpdateAdminTopicCoordsDto,
  UpdateAdminTopicNodeDto,
} from '../dtos';

@ApiTags('Courses')
@ApiBearerAuth()
@Controller({
  path: 'admin/courses',
  version: '1',
})
@UseGuards(JwtGuard, RoleGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get list of all courses for Admin' })
  @ApiResponse({ status: 200, description: 'Courses retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Admin required)' })
  async getCourses(): Promise<AdminCourseListItem[]> {
    return this.coursesService.getCourses();
  }

  @Patch(':courseNodeId')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update course node metadata' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiBody({ type: UpdateAdminCourseNodeMetaDto })
  @ApiResponse({ status: 200, description: 'Course metadata updated successfully' })
  async updateCourseMeta(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body() payload: UpdateAdminCourseNodeMetaDto,
  ): Promise<AdminCourseListItem> {
    return this.coursesService.updateCourseMeta(courseNodeId, payload);
  }

  @Get(':courseNodeId/topics-graph')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get course topics micro-graph for Admin' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiResponse({ status: 200, description: 'Course topics graph retrieved successfully' })
  async getCourseTopicsGraph(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
  ): Promise<AdminCourseTopicsGraph> {
    return this.coursesService.getCourseTopicsGraph(courseNodeId);
  }

  @Post(':courseNodeId/topics')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a topic node under a course node' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiBody({ type: CreateAdminTopicNodeDto })
  @ApiResponse({ status: 201, description: 'Topic node created successfully' })
  async createTopicNode(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body() payload: CreateAdminTopicNodeDto,
  ) {
    return this.coursesService.createTopicNode(courseNodeId, payload);
  }

  @Patch(':courseNodeId/topics/:topicId')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a topic node' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiParam({ name: 'topicId', type: Number, description: 'Topic ID' })
  @ApiBody({ type: UpdateAdminTopicNodeDto })
  @ApiResponse({ status: 200, description: 'Topic node updated successfully' })
  async updateTopicNode(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
    @Body() payload: UpdateAdminTopicNodeDto,
  ) {
    return this.coursesService.updateTopicNode(courseNodeId, topicId, payload);
  }

  @Delete(':courseNodeId/topics/:topicId')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a topic node' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiParam({ name: 'topicId', type: Number, description: 'Topic ID' })
  @ApiResponse({ status: 204, description: 'Topic node deleted successfully' })
  async deleteTopicNode(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
  ): Promise<void> {
    return this.coursesService.deleteTopicNode(courseNodeId, topicId);
  }

  @Patch(':courseNodeId/topics/:topicId/coords')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update coordinates of a topic node' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiParam({ name: 'topicId', type: Number, description: 'Topic ID' })
  @ApiBody({ type: UpdateAdminTopicCoordsDto })
  @ApiResponse({ status: 200, description: 'Topic coordinates updated successfully' })
  async updateTopicCoords(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
    @Body() payload: UpdateAdminTopicCoordsDto,
  ) {
    return this.coursesService.updateTopicCoords(courseNodeId, topicId, payload.coords);
  }

  @Post(':courseNodeId/topics-edges')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an edge connecting two topic nodes' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiBody({ type: CreateAdminTopicEdgeDto })
  @ApiResponse({ status: 201, description: 'Topic edge created successfully' })
  async createTopicEdge(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body() payload: CreateAdminTopicEdgeDto,
  ) {
    return this.coursesService.createTopicEdge(courseNodeId, payload);
  }

  @Delete(':courseNodeId/topics-edges/:edgeId')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a topic edge' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiParam({ name: 'edgeId', type: Number, description: 'Edge ID' })
  @ApiResponse({ status: 204, description: 'Topic edge deleted successfully' })
  async deleteTopicEdge(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Param('edgeId', ParseIntPipe) edgeId: number,
  ): Promise<void> {
    return this.coursesService.deleteTopicEdge(courseNodeId, edgeId);
  }
}
