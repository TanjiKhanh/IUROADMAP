import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { RoadmapsService } from '../services/roadmaps.service';
import {
  MacroRoadmapNodeDto,
  MacroRoadmapResponseDto,
  MicroRoadmapResponseDto,
  UserRoadmapSummaryDto,
} from '../dtos';
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('api/v1/roadmaps')
export class RoadmapsController {
  constructor(private readonly roadmapsService: RoadmapsService) {}

  @UseGuards(JwtGuard)
  @Roles('STUDENT', 'ADMIN')
  @Get('my')
  async getMyRoadmaps(@Req() req: Request): Promise<UserRoadmapSummaryDto[]> {
    const user = (req as any).user;
    const userId = user.userId || user.id || user.sub;
    return this.roadmapsService.getUserRoadmapsSummaries(userId);
  }

  @UseGuards(JwtGuard)
  @Roles('STUDENT') 
  @Get(':userRoadmapId')
  async getMacroRoadmap(
    @Param('userRoadmapId', ParseIntPipe) userRoadmapId: number,
    @Req() req: Request,
  ): Promise<MacroRoadmapResponseDto> {
    const user = (req as any).user;
    return this.roadmapsService.getMacroRoadmap({ userRoadmapId, user });
  }


  @Get('course-nodes/:courseNodeId/micro')
  async getMicroRoadmap(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
  ): Promise<MicroRoadmapResponseDto> {
    return this.roadmapsService.getMicroRoadmap({ courseNodeId });
  }

  @UseGuards(JwtGuard)
  @Roles('STUDENT', 'ADMIN')
  @Patch(':userRoadmapId/courses/:courseNodeId')
  async updateCourseProgress(
    @Param('userRoadmapId', ParseIntPipe) userRoadmapId: number,
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body('status') status: MacroRoadmapNodeDto['status'],
    @Body('creditsEarned') creditsEarned: number,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    return this.roadmapsService.markCourseComplete({
      userRoadmapId,
      courseNodeId,
      status,
      creditsEarned,
      user,
    });
  }

}


