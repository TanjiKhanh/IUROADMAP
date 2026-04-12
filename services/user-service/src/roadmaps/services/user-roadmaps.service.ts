// user-service/src/user-roadmaps/user-roadmaps.service.ts
import {  Injectable , ConflictException, NotFoundException } from '@nestjs/common';
import { EnrollRoadmapDto } from '../dto/enroll-roadmap.dto';
import { PrismaService } from '../../prisma/prisma.service'; 
import { EnrollmentStatus } from '../../generated/prisma-client';

@Injectable()
export class UserRoadmapsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async enroll(dto: EnrollRoadmapDto) {
    const {
      userId,
      roadmapId,
      totalCreditsRequired,
    } = dto;


    const isEnrolled = await this.isAlreadyEnrolled(userId, roadmapId);
    if(isEnrolled) {
      throw new ConflictException('User is already enrolled in this roadmap');
    }


    const userRoadmap = await this.prisma.uSER_ROADMAPS_PROGRESS.create({
      data: {
        user_id: userId,
        roadmap_id: roadmapId,
        enrollment_status: EnrollmentStatus.ENROLLED,     // or 'ACTIVE'
        completion_percentage: 0,
        total_credits_earned: 0,
        total_credits_required: totalCreditsRequired,
      },
    });

    return userRoadmap;
  }


  // Get course_roadmap progress by userId and roadmapId
  async findRoadmapProgress(userId: number, roadmapId: number) {
    const isEnrolled = await this.isAlreadyEnrolled(userId, roadmapId);
    if(!isEnrolled) {
      throw new ConflictException('User is not enrolled in this roadmap');
    }

    const progress = await this.prisma.uSER_ROADMAPS_PROGRESS.findFirst({
      where: { user_id: userId, roadmap_id: roadmapId },
    });

    return progress;
  }






   //Find roadmap enrollment by userId and roadmapId
  async isAlreadyEnrolled(userId: number, roadmapId: number): Promise<boolean> {
    const existing = await this.prisma.uSER_ROADMAPS_PROGRESS.findFirst({
        where: { user_id: userId, roadmap_id: roadmapId },
    });
    return !!existing; // Returns true if found, false if not
    }   



  
  async getUserRoadmapOverview(userRoadmapId: number, userId: number) {
    
    const roadmap = await this.prisma.uSER_ROADMAPS_PROGRESS.findFirst({
      where: { id: userRoadmapId, user_id: userId },
    });

    if (!roadmap) {
      throw new NotFoundException('User roadmap not found');
    }

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
        status: p.status as 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED',
        creditsEarned: p.credits_earned,
      })),
    };
  }
}

  
