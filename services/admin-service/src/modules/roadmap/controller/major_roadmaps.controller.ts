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

@Controller('admin/roadmaps')
export class AdminRoadmapsController {
  constructor(private readonly adminRoadmapsService: AdminRoadmapsService) {}

  @Get(':roadmapId/graph')
  async getRoadmapGraph(@Param('roadmapId', ParseIntPipe) roadmapId: number) {
    return this.adminRoadmapsService.getRoadmapGraph(roadmapId);
  }

  @Post(':roadmapId/courses')
  @HttpCode(HttpStatus.CREATED)
  async createCourseNode(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Body() dto: CreateCourseNodeDto,
  ): Promise<CourseNodeResponseDto> {
    return this.adminRoadmapsService.createCourseNode(roadmapId, dto);
  }

  @Patch(':roadmapId/courses/:courseNodeId')
  async updateCourseNode(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body() dto: UpdateCourseNodeDto,
  ): Promise<CourseNodeResponseDto> {
    return this.adminRoadmapsService.updateCourseNode(roadmapId, courseNodeId, dto);
  }

  @Delete(':roadmapId/courses/:courseNodeId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCourseNode(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
  ): Promise<void> {
    return this.adminRoadmapsService.deleteCourseNode(roadmapId, courseNodeId);
  }

  @Post(':roadmapId/prerequisites')
  @HttpCode(HttpStatus.CREATED)
  async createPrerequisite(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Body() dto: CreatePrerequisiteDto,
  ): Promise<PrerequisiteEdgeResponseDto> {
    return this.adminRoadmapsService.createPrerequisite(roadmapId, dto);
  }

  @Delete(':roadmapId/prerequisites/:edgeId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePrerequisite(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Param('edgeId', ParseIntPipe) edgeId: number,
  ): Promise<void> {
    return this.adminRoadmapsService.deletePrerequisite(roadmapId, edgeId);
  }
}
