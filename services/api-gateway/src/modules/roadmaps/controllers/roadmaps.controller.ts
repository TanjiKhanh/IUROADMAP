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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Roadmaps')
@Controller({
  path: 'roadmaps',
  version: '1',
})
export class RoadmapsController {
  constructor(private readonly roadmapsService: RoadmapsService) {}

  @UseGuards(JwtGuard)
  @Roles('STUDENT', 'ADMIN')
  @ApiBearerAuth()
  @Get('my')
  @ApiOperation({ summary: 'Get current user roadmap summaries' })
  @ApiResponse({ status: 200, description: 'User roadmap summaries retrieved successfully', type: [UserRoadmapSummaryDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMyRoadmaps(@Req() req: Request): Promise<UserRoadmapSummaryDto[]> {
    const user = (req as any).user;
    const userId = user.userId || user.id || user.sub;
    return this.roadmapsService.getUserRoadmapsSummaries(userId);
  }

  @UseGuards(JwtGuard)
  @Roles('STUDENT', 'ADMIN')
  @ApiBearerAuth()
  @Get('preview/:slug')
  @ApiOperation({ summary: 'Preview a roadmap macro graph by major slug' })
  @ApiParam({ name: 'slug', type: String, description: 'Major slug' })
  @ApiResponse({ status: 200, description: 'Preview roadmap macro graph retrieved successfully', type: MacroRoadmapResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getPreviewRoadmapBySlug(
    @Param('slug') slug: string,
  ): Promise<MacroRoadmapResponseDto> {
    return this.roadmapsService.getPreviewRoadmapBySlug({ slug });
  }

  @UseGuards(JwtGuard)
  @Roles('STUDENT')
  @ApiBearerAuth()
  @Get(':userRoadmapId')
  @ApiOperation({ summary: 'Get macro roadmap details and user progress by user roadmap ID' })
  @ApiParam({ name: 'userRoadmapId', type: Number, description: 'User roadmap ID' })
  @ApiResponse({ status: 200, description: 'Macro roadmap details retrieved successfully', type: MacroRoadmapResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMacroRoadmap(
    @Param('userRoadmapId', ParseIntPipe) userRoadmapId: number,
    @Req() req: Request,
  ): Promise<MacroRoadmapResponseDto> {
    const user = (req as any).user;
    return this.roadmapsService.getMacroRoadmap({ userRoadmapId, user });
  }

  @Get('course-nodes/:courseNodeId/micro')
  @ApiOperation({ summary: 'Get micro roadmap (topic details and graph) for a course node' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiResponse({ status: 200, description: 'Micro roadmap retrieved successfully', type: MicroRoadmapResponseDto })
  async getMicroRoadmap(
    @Param('courseNodeId', ParseIntPipe) courseNodeId: number,
  ): Promise<MicroRoadmapResponseDto> {
    return this.roadmapsService.getMicroRoadmap({ courseNodeId });
  }

  @UseGuards(JwtGuard)
  @Roles('STUDENT')
  @ApiBearerAuth()
  @Patch(':userRoadmapId/courses/:courseNodeId')
  @ApiOperation({ summary: 'Update student progress (status/credits) on a specific course node' })
  @ApiParam({ name: 'userRoadmapId', type: Number, description: 'User roadmap ID' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'Course node ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'COMPLETED' },
        creditsEarned: { type: 'number', example: 4 },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Course progress updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
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


