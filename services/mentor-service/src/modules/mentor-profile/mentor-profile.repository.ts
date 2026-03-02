import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';

/**
 * MentorProfileRepository
 * 
 * Encapsulates all database operations for mentor profiles.
 * Data access layer — business logic does NOT touch Prisma directly.
 */
@Injectable()
export class MentorProfileRepository {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: number) {
    return this.prisma.mentorProfile.findUnique({
      where: { userId },
    });
  }

  async create(userId: number, data: CreateMentorProfileDto) {
    return this.prisma.mentorProfile.create({
      data: {
        userId,
        bio: data.bio ? { text: data.bio } : null,
        cvUrl: data.cvUrl || null,
        linkedinUrl: data.linkedinUrl || null,
        industry: data.industry || null,
        skills: data.skills || [],
      },
    });
  }

  async update(userId: number, data: UpdateMentorProfileDto) {
    return this.prisma.mentorProfile.update({
      where: { userId },
      data: {
        ...(data.bio !== undefined && { bio: { text: data.bio } }),
        ...(data.cvUrl !== undefined && { cvUrl: data.cvUrl }),
        ...(data.linkedinUrl !== undefined && { linkedinUrl: data.linkedinUrl }),
        ...(data.industry !== undefined && { industry: data.industry }),
        ...(data.skills !== undefined && { skills: data.skills }),
        updatedAt: new Date(),
      },
    });
  }

  async upsert(userId: number, data: CreateMentorProfileDto) {
    return this.prisma.mentorProfile.upsert({
      where: { userId },
      create: {
        userId,
        bio: data.bio ? { text: data.bio } : null,
        cvUrl: data.cvUrl || null,
        linkedinUrl: data.linkedinUrl || null,
        industry: data.industry || null,
        skills: data.skills || [],
      },
      update: {
        ...(data.bio !== undefined && { bio: { text: data.bio } }),
        ...(data.cvUrl !== undefined && { cvUrl: data.cvUrl }),
        ...(data.linkedinUrl !== undefined && { linkedinUrl: data.linkedinUrl }),
        ...(data.industry !== undefined && { industry: data.industry }),
        ...(data.skills !== undefined && { skills: data.skills }),
        updatedAt: new Date(),
      },
    });
  }

  async delete(userId: number) {
    return this.prisma.mentorProfile.delete({ where: { userId } });
  }

  async findMany(skip = 0, take = 10, where?: any) {
    return this.prisma.mentorProfile.findMany({
      skip,
      take,
      where,
    });
  }
}