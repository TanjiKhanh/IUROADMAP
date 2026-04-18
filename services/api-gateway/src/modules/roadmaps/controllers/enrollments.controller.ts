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
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Controller('api/v1/roadmaps')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}
  @Roles('STUDENT')
  @UseGuards(JwtGuard)
  @Post(':slug/enroll')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async enroll(
  @Param('slug') slug: string,
  @Req() req: Request,
  ): Promise<EnrollmentSummaryDto> {
    const user = (req as any).user;
    return this.enrollmentsService.enrollToRoadmap(user, { slug });
  }
}