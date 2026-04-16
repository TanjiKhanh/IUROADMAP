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
import { AdminRoadmapsService } from '../services/major-roadmaps.service';
import {
  AdminCourseNodeResponseDto,
  AdminPrerequisiteEdgeResponseDto,
  CreateCourseNodeDto,
  CreatePrerequisiteDto,
  UpdateCourseNodeDto,
} from '../dtos/major-roadmap-management.dto';
import { AdminRoadmapGraph } from '../../roadmaps/interfaces';

@Controller('api/v1/admin/major-roadmaps')
@UseGuards(JwtGuard, RoleGuard)
export class AdminRoadmapsController {
  constructor(private readonly adminRoadmapsService: AdminRoadmapsService) {}

  //Get All major roadmap 
  @Get()
  @Roles('ADMIN')
  async getAllMajorRoadmaps(): Promise<{ id: number; name: string }[]> {
    return this.adminRoadmapsService.getAllMajorRoadmaps();
  }

  @Get(':roadmapId/graph')
  @Roles('ADMIN')
  async getRoadmapGraph(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
  ): Promise<AdminRoadmapGraph> {
    return this.adminRoadmapsService.getRoadmapGraph(roadmapId);
  }

  @Post(':roadmapId/courses')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.CREATED)
  async createCourseNode(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Body() dto: CreateCourseNodeDto,
  ): Promise<AdminCourseNodeResponseDto> {
    return this.adminRoadmapsService.createCourseNode(roadmapId, dto);
  }

  @Patch(':roadmapId/courses/:courseNodeId')
  @Roles('ADMIN')
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
  async deleteCourseNode(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
  ): Promise<void> {
    return this.adminRoadmapsService.deleteCourseNode(roadmapId, courseNodeId);
  }

  @Post(':roadmapId/prerequisites')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.CREATED)
  async createPrerequisite(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Body() dto: CreatePrerequisiteDto,
  ): Promise<AdminPrerequisiteEdgeResponseDto> {
    return this.adminRoadmapsService.createPrerequisite(roadmapId, dto);
  }

  @Delete(':roadmapId/prerequisites/:edgeId')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePrerequisite(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Param('edgeId', ParseIntPipe) edgeId: number,
  ): Promise<void> {
    return this.adminRoadmapsService.deletePrerequisite(roadmapId, edgeId);
  }
}
