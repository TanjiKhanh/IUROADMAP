// roadmaps.controller.ts
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CourseNodesService } from '../services/course_roadmap.service';
import { MajorsService } from '../services/majors.service';

@Controller('admin/major-roadmaps')
export class CourseRoadmapsController {
  constructor(
    private readonly roadmapsService: CourseNodesService,
    private readonly majorsService: MajorsService,
  ) {}

  // Get the course_node graph for a specific roadmap ID
  @Get(':roadmapId/graph')
  async getRoadmapGraph(@Param('roadmapId', ParseIntPipe) roadmapId: number) {
    // The controller simply asks the service for the answer. Clean and perfect!
    return await this.roadmapsService.getFormattedRoadmapGraph(roadmapId);
  }


  @Get(':slug')
  async getMajorBySlug(@Param('slug') slug: string) {
    return await this.majorsService.findRoadmapBySlug(slug);
  }



}