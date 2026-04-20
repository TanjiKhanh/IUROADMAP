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

@Controller('api/v1/admin/courses')
@UseGuards(JwtGuard, RoleGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @Roles('ADMIN')
  async getCourses(): Promise<AdminCourseListItem[]> {
    return this.coursesService.getCourses();
  }

  @Patch(':courseNodeId')
  @Roles('ADMIN')
  async updateCourseMeta(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body() payload: UpdateAdminCourseNodeMetaDto,
  ): Promise<AdminCourseListItem> {
    return this.coursesService.updateCourseMeta(courseNodeId, payload);
  }

  @Get(':courseNodeId/topics-graph')
  @Roles('ADMIN')
  async getCourseTopicsGraph(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
  ): Promise<AdminCourseTopicsGraph> {
    return this.coursesService.getCourseTopicsGraph(courseNodeId);
  }

  @Post(':courseNodeId/topics')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.CREATED)
  async createTopicNode(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body() payload: CreateAdminTopicNodeDto,
  ) {
    return this.coursesService.createTopicNode(courseNodeId, payload);
  }

  @Patch(':courseNodeId/topics/:topicId')
  @Roles('ADMIN')
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
  async deleteTopicNode(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Param('topicId', ParseIntPipe) topicId: number,
  ): Promise<void> {
    return this.coursesService.deleteTopicNode(courseNodeId, topicId);
  }

  @Patch(':courseNodeId/topics/:topicId/coords')
  @Roles('ADMIN')
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
  async createTopicEdge(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body() payload: CreateAdminTopicEdgeDto,
  ) {
    return this.coursesService.createTopicEdge(courseNodeId, payload);
  }

  @Delete(':courseNodeId/topics-edges/:edgeId')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTopicEdge(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Param('edgeId', ParseIntPipe) edgeId: number,
  ): Promise<void> {
    return this.coursesService.deleteTopicEdge(courseNodeId, edgeId);
  }
}
