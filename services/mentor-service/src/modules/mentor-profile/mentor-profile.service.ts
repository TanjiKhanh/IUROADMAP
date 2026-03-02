import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { MentorProfileRepository } from './mentor-profile.repository';
import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';
import { MentorProfileResponseDto } from './dto/mentor-profile-response.dto';

/**
 * MentorProfileService
 * 
 * Core business logic for mentor profiles.
 * - Validates business rules
 * - Orchestrates repository calls
 * - Can call other services (e.g., MentorSkillsService) if needed
 */
@Injectable()
export class MentorProfileService {
  constructor(private readonly repository: MentorProfileRepository) {}

  async getProfile(userId: number): Promise<MentorProfileResponseDto> {
    const profile = await this.repository.findByUserId(userId);
    if (!profile) {
      throw new NotFoundException(`Mentor profile for user ${userId} not found`);
    }
    return this.mapToResponseDto(profile);
  }

  async createProfile(userId: number, dto: CreateMentorProfileDto): Promise<MentorProfileResponseDto> {
    const existing = await this.repository.findByUserId(userId);
    if (existing) {
      throw new BadRequestException('Mentor profile already exists for this user');
    }

    const created = await this.repository.create(userId, dto);
    return this.mapToResponseDto(created);
  }

  async updateProfile(userId: number, dto: UpdateMentorProfileDto): Promise<MentorProfileResponseDto> {
    const existing = await this.repository.findByUserId(userId);
    if (!existing) {
      throw new NotFoundException(`Mentor profile for user ${userId} not found`);
    }

    const updated = await this.repository.update(userId, dto);
    return this.mapToResponseDto(updated);
  }

  async upsertProfile(userId: number, dto: CreateMentorProfileDto): Promise<MentorProfileResponseDto> {
    const upserted = await this.repository.upsert(userId, dto);
    return this.mapToResponseDto(upserted);
  }

  async deleteProfile(userId: number): Promise<void> {
    const existing = await this.repository.findByUserId(userId);
    if (!existing) {
      throw new NotFoundException(`Mentor profile for user ${userId} not found`);
    }
    await this.repository.delete(userId);
  }

  async listProfiles(skip = 0, take = 10) {
    const profiles = await this.repository.findMany(skip, take);
    return profiles.map((p) => this.mapToResponseDto(p));
  }

  private mapToResponseDto(profile: any): MentorProfileResponseDto {
    return {
      userId: profile.userId,
      bio: profile.bio,
      cvUrl: profile.cvUrl,
      linkedinUrl: profile.linkedinUrl,
      industry: profile.industry,
      skills: profile.skills || [],
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
}