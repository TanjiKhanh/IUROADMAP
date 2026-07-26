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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { RoleGuard } from '../../../common/guards/role.guard';
import { AdminRoadmapsService } from '../services/major-roadmaps.service';
import {
  AdminCourseNodeResponseDto,
  AdminPrerequisiteEdgeResponseDto,
  CreateCourseNodeDto,
  CreatePrerequisiteDto,
  UpdateCourseNodeDto,
} from '../dtos/major-roadmap-management.dto';
import { AdminRoadmapGraph } from '../../roadmaps/interfaces';

@ApiTags('Admin-Roadmaps')
@ApiBearerAuth()
@Controller({
  path: 'admin/major-roadmaps',
  version: '1',
})
@UseGuards(JwtGuard, RoleGuard)
export class AdminRoadmapsController {
  constructor(private readonly adminRoadmapsService: AdminRoadmapsService) {}

  //Get All major roadmap 
  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get summary list of all major roadmaps (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of major roadmaps retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Admin required)' })
  async getAllMajorRoadmaps(): Promise<{ id: number; name: string }[]> {
    return this.adminRoadmapsService.getAllMajorRoadmaps();
  }

  @Get(':roadmapId/graph')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get full roadmap graph (nodes & prerequisite edges) for Admin' })
  @ApiParam({ name: 'roadmapId', type: Number, description: 'Roadmap ID' })
  @ApiResponse({ status: 200, description: 'Roadmap graph retrieved successfully' })
  async getRoadmapGraph(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
  ): Promise<AdminRoadmapGraph> {
    return this.adminRoadmapsService.getRoadmapGraph(roadmapId);
  }

  @Post(':roadmapId/courses')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a course node to a roadmap' })
  @ApiParam({ name: 'roadmapId', type: Number, description: 'Roadmap ID' })
  @ApiBody({ type: CreateCourseNodeDto })
  @ApiResponse({ status: 201, description: 'Course node added successfully', type: AdminCourseNodeResponseDto })
  async createCourseNode(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Body() dto: CreateCourseNodeDto,
  ): Promise<AdminCourseNodeResponseDto> {
    return this.adminRoadmapsService.createCourseNode(roadmapId, dto);
  }

  @Patch(':roadmapId/courses/:courseNodeId')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update an existing course node in a roadmap' })
  @ApiParam({ name: 'roadmapId', type: Number, description: 'Roadmap ID' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiBody({ type: UpdateCourseNodeDto })
  @ApiResponse({ status: 200, description: 'Course node updated successfully', type: AdminCourseNodeResponseDto })
  async updateCourseNode(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body() dto: UpdateCourseNodeDto,
  ): Promise<AdminCourseNodeResponseDto> {
    return this.adminRoadmapsService.updateCourseNode(roadmapId, courseNodeId, dto);
  }

  @Delete(':roadmapId/courses/:courseNodeId')
  @Roles('ADMIN')
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
  @Roles('ADMIN')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a prerequisite relationship edge between course nodes' })
  @ApiParam({ name: 'roadmapId', type: Number, description: 'Roadmap ID' })
  @ApiBody({ type: CreatePrerequisiteDto })
  @ApiResponse({ status: 201, description: 'Prerequisite edge created successfully', type: AdminPrerequisiteEdgeResponseDto })
  async createPrerequisite(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Body() dto: CreatePrerequisiteDto,
  ): Promise<AdminPrerequisiteEdgeResponseDto> {
    return this.adminRoadmapsService.createPrerequisite(roadmapId, dto);
  }

  @Delete(':roadmapId/prerequisites/:edgeId')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a prerequisite relationship edge' })
  @ApiParam({ name: 'roadmapId', type: Number, description: 'Roadmap ID' })
  @ApiParam({ name: 'edgeId', type: Number, description: 'Prerequisite edge ID' })
  @ApiResponse({ status: 204, description: 'Prerequisite edge deleted successfully' })
  async deletePrerequisite(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Param('edgeId', ParseIntPipe) edgeId: number,
  ): Promise<void> {
    return this.adminRoadmapsService.deletePrerequisite(roadmapId, edgeId);
  }
}
