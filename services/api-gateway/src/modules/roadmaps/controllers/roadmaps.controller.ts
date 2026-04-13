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
import { MacroRoadmapResponseDto, MicroRoadmapResponseDto } from '../dtos';
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('api/v1/roadmaps')
export class RoadmapsController {
  constructor(private readonly roadmapsService: RoadmapsService) {}

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

  @Patch(':userRoadmapId/courses/:courseNodeId')
  async updateCourseProgress(
    @Param('userRoadmapId', ParseIntPipe) userRoadmapId: number,
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
    @Body('creditsEarned') creditsEarned: number,
    @Req() req: Request,
  ) {
    const user = (req as any).user;
    return this.roadmapsService.markCourseComplete({
      userRoadmapId,
      courseNodeId,
      creditsEarned,
      user,
    });
  }
}


