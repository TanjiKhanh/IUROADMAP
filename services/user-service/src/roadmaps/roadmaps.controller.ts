import { Controller, Get, Post, Body, Param, UseGuards, ParseIntPipe, Request, Patch } from '@nestjs/common';
import { RoadmapsService } from './roadmaps.service';
import { EnrollRoadmapDto } from './dto/enroll-roadmap.dto';
// 👇 Update path to your actual AuthGuard
import { AuthGuard } from '../common/guards/auth.guard'; 
import { RoadmapNodeStatus } from '../generated/prisma-client';

@Controller('user/roadmaps')
@UseGuards(AuthGuard)
export class RoadmapsController {
  constructor(private readonly roadmapsService: RoadmapsService) {}

  /**
   * 🟢 ENROLL
   * POST /user/roadmaps/enroll
   * Body: { "slug": "frontend-developer" }
   */
  @Post('enroll')
  async enroll(@Request() req, @Body() dto: EnrollRoadmapDto) {
    // Takes ID from JWT, but Service will verify with Auth Service as per diagram
    return this.roadmapsService.enroll(req.user.id, dto.slug);
  }

  @Get('my')
  async getMyRoadmaps(@Request() req) {
    return this.roadmapsService.getUserRoadmaps(req.user.id);
  }

  @Get(':id')
  async getMyNode(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.roadmapsService.getRoadMapNodeMinimal(req.user.id, id);
  }
  

  @Get(':id/nodes/:nodeKey') // 👈 GET method (Read Only)
  async getNodeDetail(
    @Request() req, 
    @Param('id', ParseIntPipe) roadmapId: number,
    @Param('nodeKey') nodeKey: string
  ) {
    return this.roadmapsService.getRoadmapNodeDetail(req.user.id, roadmapId, nodeKey);
  }





  @Patch(':id/nodes/:nodeKey/status') // 👈 PATCH for updates
  async updateNodeStatus(
    @Request() req, 
    @Param('id', ParseIntPipe) roadmapId: number,
    @Param('nodeKey') nodeKey: string,
    @Body('status') status: RoadmapNodeStatus // e.g. "COMPLETED", "SKIPPED"
  ) {
    return this.roadmapsService.updateNodeStatus(req.user.id, roadmapId, nodeKey, status);
  }
}
