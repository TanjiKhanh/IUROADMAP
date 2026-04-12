// admin-service/src/modules/roadmaps/course-topics.controller.ts
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TopicsRoadmapService } from '../services/topics_roadmap.service';

@Controller('admin/course-nodes')
export class TopicsRoadmapsController {

     constructor(private readonly topicsRoadmapService: TopicsRoadmapService) {}
   

  // Get the topics roadmap for a specific course node ID
  @Get(':courseNodeId/topics')
    async getCourseTopicsGraph(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
  ) {
    // The controller simply asks the service for the answer. Clean and perfect!
    return await this.topicsRoadmapService.getCourseTopicsGraph(courseNodeId);
  }
  
}