// gateway/src/modules/roadmaps/controllers/enrollments.controller.ts

import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { RoleGuard } from '../../../common/guards/role.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { EnrollmentsService } from '../services/enrollments.service';
import {
  EnrollmentSummaryDto,
  UserEnrollmentsDto,
} from '../dtos';

@Controller('api/v1')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  /**
   * SUD-06: Enroll in a roadmap
   * POST /api/v1/roadmaps/{roadmapId}/enroll
   */
  @Post('roadmaps/:roadmapId/enroll')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles('LEARNER')
  @HttpCode(HttpStatus.CREATED)
  async enrollInRoadmap(
    @Param('roadmapId') roadmapId: string,
    @CurrentUser('userId') userId: number,
  ): Promise<EnrollmentSummaryDto> {
    const roadmapIdNum = parseInt(roadmapId, 10);

    if (isNaN(roadmapIdNum)) {
      throw new BadRequestException({
        status: 'error',
        code: 'INVALID_ROADMAP_ID',
        message: 'Invalid roadmap ID',
      });
    }

    const enrollment = await this.enrollmentsService.enrollInRoadmap(
      userId,
      roadmapIdNum,
    );

    return {
      status: 'success',
      data: enrollment,
    };
  }

  /**
   * Get all user's enrollments (SUD-10)
   * GET /api/v1/user/roadmaps
   */
  @Get('user/roadmaps')
  @UseGuards(JwtGuard)
  async getUserEnrollments(
    @CurrentUser('userId') userId: number,
  ): Promise<UserEnrollmentsDto> {
    const enrollments = await this.enrollmentsService.getUserEnrollments(userId);

    return {
      status: 'success',
      data: enrollments,
    };
  }

  /**
   * Get specific enrollment
   * GET /api/v1/roadmaps/{enrollmentId}
   */
  @Get('roadmaps/:enrollmentId')
  @UseGuards(JwtGuard)
  async getEnrollment(
    @Param('enrollmentId') enrollmentId: string,
    @CurrentUser('userId') userId: number,
  ) {
    const enrollmentIdNum = parseInt(enrollmentId, 10);

    if (isNaN(enrollmentIdNum)) {
      throw new BadRequestException({
        status: 'error',
        code: 'INVALID_ENROLLMENT_ID',
        message: 'Invalid enrollment ID',
      });
    }

    const enrollment = await this.enrollmentsService.getEnrollment(
      enrollmentIdNum,
      userId,
    );

    return {
      status: 'success',
      data: enrollment,
    };
  }
}