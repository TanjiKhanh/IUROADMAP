// user-service/src/user-roadmaps/user-roadmaps.controller.ts
import { Body, Controller, Param, ParseIntPipe, Post, Req, UsePipes, ValidationPipe , Get , Patch } from '@nestjs/common';
import { EnrollRoadmapDto, EnrollRoadmapResponseDto } from '../dto/enroll-roadmap.dto';
import { UserRoadmapsService } from '../services/user-roadmaps.service';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('User - Roadmaps')
@ApiBearerAuth()
@Controller('user/roadmaps')
export class UserRoadmapsController {
  constructor(private readonly service: UserRoadmapsService) {}

  @Post('enroll')
  @ApiOperation({ summary: 'Enroll a user in a roadmap' })
  @ApiBody({ type: EnrollRoadmapDto })
  @ApiResponse({ status: 201, description: 'Successfully enrolled in roadmap', type: EnrollRoadmapResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request / Validation Error' })
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  enroll(@Body() dto: EnrollRoadmapDto) {
    return this.service.enrollUserToRoadmap(dto);
  }

  @Get(':userRoadmapId/overview')
  @ApiOperation({ summary: 'Get overview of a specific user roadmap' })
  @ApiParam({ name: 'userRoadmapId', type: Number, description: 'ID of the user roadmap' })
  @ApiResponse({ status: 200, description: 'Roadmap overview retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Roadmap not found' })
  async getOverview(
    @Param('userRoadmapId', ParseIntPipe) userRoadmapId: number,
    @Req() req: Request,
  ) {
    const userId = Number(req.headers['x-user-id']);
    return this.service.getUserRoadmapOverview(userRoadmapId, userId);
  }

  @Patch(':userRoadmapId/courses/:courseNodeId')
  @ApiOperation({ summary: 'Update status and progress of a course node in user roadmap' })
  @ApiParam({ name: 'userRoadmapId', type: Number, description: 'ID of the user roadmap' })
  @ApiParam({ name: 'courseNodeId', type: Number, description: 'ID of the course node' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['AVAILABLE', 'IN_PROGRESS', 'COMPLETED'] },
        creditsEarned: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Course progress updated successfully' })
  @ApiResponse({ status: 404, description: 'Course node not found' })
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
  @ApiOperation({ summary: 'Get all summaries of roadmaps enrolled by current user' })
  @ApiResponse({ status: 200, description: 'User roadmaps summaries retrieved successfully' })
  async getMyRoadmaps(@Req() req: Request) {
    const userId = Number(req.headers['x-user-id']);
    return this.service.getUserRoadmapsSummaries(userId);
  }
}