// user-service/src/user-roadmaps/user-roadmaps.controller.ts
import { Body, Controller, Param, ParseIntPipe, Post, Req, UsePipes, ValidationPipe , Get , Patch } from '@nestjs/common';
import { EnrollRoadmapDto } from '../dto/enroll-roadmap.dto';
import { UserRoadmapsService } from '../services/user-roadmaps.service';

@Controller('user/roadmaps')
export class UserRoadmapsController {
  constructor(private readonly service: UserRoadmapsService) {}

  @Post('enroll')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  enroll(@Body() dto: EnrollRoadmapDto) {
    return this.service.enrollUserToRoadmap(dto);
  }


  @Get(':userRoadmapId/overview')
  async getOverview(
    @Param('userRoadmapId', ParseIntPipe) userRoadmapId: number,
    @Req() req: Request,
  ) {
    const userId = Number(req.headers['x-user-id']);
    return this.service.getUserRoadmapOverview(userRoadmapId, userId);
  }



  @Patch(':userRoadmapId/courses/:courseNodeId')
  async updateCourseProgress(
    @Param('userRoadmapId', ParseIntPipe) userRoadmapId: number,
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body('status') status: 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED',
    @Body('creditsEarned') creditsEarned: number,
    @Req() req: Request,
  ) {
    const userId = Number(req.headers['x-user-id']);
    return this.service.updateCourseProgress(userRoadmapId, courseNodeId, status, creditsEarned, userId);

  }

  @Get('my')
  async getMyRoadmaps(@Req() req: Request) {
    const userId = Number(req.headers['x-user-id']);
    return this.service.getUserRoadmapsSummaries(userId);
  }

 

}