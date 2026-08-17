// services/api-gateway/src/modules/roadmaps/controllers/enrollments.controller.ts
import {
  Body,
  Controller,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { EnrollmentsService } from '../services/enrollments.service';
import { EnrollmentSummaryDto } from '../dtos';
import { Roles } from '@iuroadmap/shared';
import { JwtGuard } from '@iuroadmap/shared';
import { UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Roadmaps')
@Controller({
  path: 'roadmaps',
  version: '1',
})
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Roles('STUDENT')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post(':slug/enroll')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Enroll current student into a major roadmap by slug' })
  @ApiParam({ name: 'slug', type: String, description: 'Slug of the major roadmap to enroll into' })
  @ApiResponse({ status: 201, description: 'Successfully enrolled into the roadmap', type: EnrollmentSummaryDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Roadmap not found' })
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async enroll(
    @Param('slug') slug: string,
    @Req() req: Request,
  ): Promise<EnrollmentSummaryDto> {
    const user = (req as any).user;
    return this.enrollmentsService.enrollToRoadmap(user, { slug });
  }
}