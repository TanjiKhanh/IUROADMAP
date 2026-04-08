// gateway/src/modules/roadmaps/services/enrollments.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { AdminServiceClient } from '../clients/admin-service.client';
import { UserServiceClient } from '../clients/user-service.client';
import {
  EnrollRoadmapResponseDto,
  UserEnrollmentDto,
} from '../dtos';

@Injectable()
export class EnrollmentsService {
  private readonly logger = new Logger(EnrollmentsService.name);

  constructor(
    private adminClient: AdminServiceClient,
    private userClient: UserServiceClient,
  ) {}

  /**
   * SUD-06: Enroll in a roadmap
   */
  async enrollInRoadmap(
    userId: number,
    roadmapId: number,
  ): Promise<EnrollRoadmapResponseDto> {
    this.logger.log(`User ${userId} enrolling in roadmap ${roadmapId}`);

    // Validate roadmap exists
    await this.adminClient.getRoadmapById(roadmapId);

    // Create enrollment
    return this.userClient.enrollInRoadmap(userId, roadmapId);
  }

  /**
   * Get user's enrollments (SUD-10)
   */
  async getUserEnrollments(userId: number): Promise<UserEnrollmentDto[]> {
    this.logger.log(`Fetching enrollments for user ${userId}`);
    return this.userClient.getUserEnrollments(userId);
  }

  /**
   * Get specific enrollment
   */
  async getEnrollment(
    enrollmentId: number,
    userId: number,
  ): Promise<UserEnrollmentDto> {
    this.logger.log(`Fetching enrollment ${enrollmentId} for user ${userId}`);
    return this.userClient.getEnrollment(enrollmentId, userId);
  }
}