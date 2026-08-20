// roadmaps.controller.ts
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CourseNodesService } from '../services/course_roadmap.service';
import { MajorsService } from '../services/majors.service';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Admin - Roadmaps')
@ApiBearerAuth()
@Controller('admin/major-roadmaps')
export class CourseRoadmapsController {
  constructor(
    private readonly roadmapsService: CourseNodesService,
    private readonly majorsService: MajorsService,
  ) {}

  // Get the course_node graph for a specific roadmap ID
  @Get(':roadmapId/graph')
  @ApiOperation({ summary: 'Get formatted course node graph for a specific major roadmap' })
  @ApiParam({ name: 'roadmapId', type: Number, description: 'Roadmap ID' })
  @ApiResponse({ status: 200, description: 'Formatted course roadmap graph retrieved successfully' })
  async getRoadmapGraph(@Param('roadmapId', ParseIntPipe) roadmapId: number) {
    // The controller simply asks the service for the answer. Clean and perfect!
    return await this.roadmapsService.getFormattedRoadmapGraph(roadmapId);
  }


  @Get(':slug')
  @ApiOperation({ summary: 'Get major roadmap details by major slug' })
  @ApiParam({ name: 'slug', type: String, description: 'Slug of the major' })
  @ApiResponse({ status: 200, description: 'Major roadmap details retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Major roadmap not found' })
  async getMajorBySlug(@Param('slug') slug: string) {
    return await this.majorsService.findRoadmapBySlug(slug);
  }

  



}