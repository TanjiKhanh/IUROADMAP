import { Exclude } from 'class-transformer';

export class MentorResponseDto {
  userId: number;
  bio?: Record<string, any>;
  cvUrl?: string;
  linkedinUrl?: string;
  industry?: string;
  skills: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.userId = data.userId;
    this.bio = data.bio;
    this.cvUrl = data.cvUrl;
    this.linkedinUrl = data.linkedinUrl;
    this.industry = data.industry;
    this.skills = data.skills || [];
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}