import {
  Injectable,
  ConflictException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EnrollRoadmapDto, EnrollRoadmapResponseDto } from '../dto/enroll-roadmap.dto';
import { EnrollmentStatus, NodeProgressStatus } from '../../generated/prisma-client';

@Injectable()
export class UserRoadmapsService {
  private readonly logger = new Logger(UserRoadmapsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * SUD-06: Enroll user to roadmap + initialize USER_NODE_PROGRESS
   */
  async enrollUserToRoadmap(
    dto: EnrollRoadmapDto,
  ): Promise<EnrollRoadmapResponseDto> {
    const { userId, roadmapId, totalCreditsRequired, courseNodeIds  } = dto;

    this.logger.log(
      `Enrolling user ${userId} to roadmap ${roadmapId} with ${courseNodeIds.length} course nodes`,
    );

    // Check if already enrolled
    const existing = await this.prisma.uSER_ROADMAPS_PROGRESS.findFirst({
      where: {
        user_id: userId,
        roadmap_id: roadmapId,
      },
    });

    if (existing) {
      this.logger.warn(
        `User ${userId} is already enrolled in roadmap ${roadmapId}`,
      );
      throw new ConflictException({
        statusCode: 409,
        code: 'ALREADY_ENROLLED',
        message: 'You are already enrolled in this roadmap',
        error: 'Conflict',
      });
    }

    try {
      // Step 1: Create USER_ROADMAPS entry
      const userRoadmap = await this.prisma.uSER_ROADMAPS_PROGRESS.create({
        data: {
          user_id: userId,
          roadmap_id: roadmapId,
          enrollment_status: EnrollmentStatus.ENROLLED,
          completion_percentage: 0,
          total_credits_earned: 0,
          total_credits_required: totalCreditsRequired,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      this.logger.log(`Created USER_ROADMAPS with id ${userRoadmap.id}`);

      // Step 2: Initialize USER_NODE_PROGRESS for each course node
      if (courseNodeIds.length > 0) {
        await this.prisma.uSER_NODE_PROGRESS.createMany({
          data: courseNodeIds.map((nodeId) => ({
            user_roadmap_id: userRoadmap.id,
            course_node_id: nodeId,
            status: NodeProgressStatus.AVAILABLE,
            credits_earned: 0,
            created_at: new Date(),
            updated_at: new Date(),
          })),
        });

        this.logger.log(
          `Initialized ${courseNodeIds.length} USER_NODE_PROGRESS rows`,
        );
      }

      return {
        id: userRoadmap.id,
        user_id: userRoadmap.user_id,
        roadmap_id: userRoadmap.roadmap_id,
        enrollment_status: userRoadmap.enrollment_status,
        completion_percentage: userRoadmap.completion_percentage,
        total_credits_earned: userRoadmap.total_credits_earned,
        total_credits_required: userRoadmap.total_credits_required,
        created_at: userRoadmap.created_at.toISOString(),
        updated_at: userRoadmap.updated_at.toISOString(),
      };
    } catch (error) {
      this.logger.error(`Enrollment failed for user ${userId}: ${error}`);
      throw error;
    }
  }

  /**
   * SUD-07: Get user roadmap overview (totals + per-node progress)
   */
  async getUserRoadmapOverview(userRoadmapId: number, userId: number) {
    // Verify roadmap belongs to user
    const roadmap = await this.prisma.uSER_ROADMAPS_PROGRESS.findFirst({
      where: { id: userRoadmapId, user_id: userId },
    });

    if (!roadmap) {
      throw new NotFoundException('User roadmap not found');
    }

    // Get node progress
    const nodeProgress = await this.prisma.uSER_NODE_PROGRESS.findMany({
      where: { user_roadmap_id: userRoadmapId },
      orderBy: { course_node_id: 'asc' },
    });

    return {
      userRoadmapId: roadmap.id,
      roadmapId: roadmap.roadmap_id,
      completionPercentage: roadmap.completion_percentage,
      totalCreditsEarned: roadmap.total_credits_earned,
      totalCreditsRequired: roadmap.total_credits_required,
      nodeProgress: nodeProgress.map((p) => ({
        courseNodeId: p.course_node_id,
        status: p.status as NodeProgressStatus,
        creditsEarned: p.credits_earned,
      })),
    };
  }

  // SUD-08: Update course node progress + recalculate roadmap progress
  // user-service/src/user-roadmaps/user-roadmaps.service.ts

  async updateCourseProgress(
    userRoadmapId: number,
    courseNodeId: number,
    creditsEarned: number,
    userId: number,
  ) {
    // Verify roadmap belongs to user
    const roadmap = await this.prisma.uSER_ROADMAPS_PROGRESS.findFirst({
      where: { id: userRoadmapId, user_id: userId },
    });

    if (!roadmap) {
      throw new NotFoundException('User roadmap not found');
    }

    //Check that the course node exists and belongs to the roadmap before updating/creating progress 

    const nodeProgress = await this.prisma.uSER_NODE_PROGRESS.findFirst({
      where: {
        user_roadmap_id: userRoadmapId,
        course_node_id: courseNodeId,
      },
    });

    if (!nodeProgress) {
      throw new NotFoundException('Course node not found in this roadmap');
    }
    
    // Update existing node progress
    await this.prisma.uSER_NODE_PROGRESS.updateMany({
      where: {
        user_roadmap_id: userRoadmapId,
        course_node_id: courseNodeId,
      },
      data: {
        status: NodeProgressStatus.COMPLETED,
        credits_earned: creditsEarned,
        updated_at: new Date(),
      },
    });



    // Recalculate total_credits_earned from all COMPLETED nodes
    const creditsAgg = await this.prisma.uSER_NODE_PROGRESS.aggregate({
      where: {
        user_roadmap_id: userRoadmapId,
        status: NodeProgressStatus.COMPLETED,
      },
      _sum: {
        credits_earned: true,
      },
    });

    const totalCreditsEarned = creditsAgg._sum.credits_earned ?? 0;

    // Recalculate completion_percentage using credits
    const totalCreditsRequired = roadmap.total_credits_required;

    const completionPercentage =
      totalCreditsRequired === 0
        ? 0
        : Math.floor((totalCreditsEarned / totalCreditsRequired) * 100);

    //  Update USER_ROADMAPS_PROGRESS with new totals
    await this.prisma.uSER_ROADMAPS_PROGRESS.update({
      where: { id: userRoadmapId },
      data: {
        total_credits_earned: totalCreditsEarned,
        completion_percentage: completionPercentage,
        updated_at: new Date(),
      },
    });

    // Return updated overview (reuse existing overview method)
    return this.getUserRoadmapOverview(userRoadmapId, userId);
  }
}