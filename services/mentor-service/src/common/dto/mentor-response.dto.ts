import { Exclude } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MentorResponseDto {
  @ApiProperty({ description: 'Mentor User ID', example: 1 })
  userId: number;

  @ApiPropertyOptional({ description: 'Biography structured object or text', example: { headline: 'Senior Engineer' } })
  bio?: Record<string, any>;

  @ApiPropertyOptional({ description: 'URL to curriculum vitae', example: 'https://example.com/cv.pdf' })
  cvUrl?: string;

  @ApiPropertyOptional({ description: 'URL to LinkedIn profile', example: 'https://linkedin.com/in/mentor' })
  linkedinUrl?: string;

  @ApiPropertyOptional({ description: 'Industry specialty', example: 'BUSINESS_ANALYTICS' })
  industry?: string;

  @ApiProperty({ description: 'List of skills', example: ['System Design', 'NestJS', 'PostgreSQL'] })
  skills: string[];

  @ApiProperty({ description: 'Creation timestamp', example: '2026-07-11T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Update timestamp', example: '2026-07-11T00:00:00.000Z' })
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