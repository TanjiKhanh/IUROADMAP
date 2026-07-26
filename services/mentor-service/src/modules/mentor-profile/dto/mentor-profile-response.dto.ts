import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MentorProfileResponseDto {
  @ApiProperty({ description: 'User ID of mentor', example: 1 })
  userId!: number;

  @ApiPropertyOptional({ description: 'Bio data or markdown content', example: 'Lead Architect with 10+ years experience' })
  bio?: any;

  @ApiPropertyOptional({ description: 'URL to curriculum vitae', example: 'https://example.com/cv.pdf' })
  cvUrl?: string;

  @ApiPropertyOptional({ description: 'URL to LinkedIn profile', example: 'https://linkedin.com/in/mentor' })
  linkedinUrl?: string;

  @ApiPropertyOptional({ description: 'Industry specialty', example: 'BUSINESS_ANALYTICS' })
  industry?: string;

  @ApiProperty({ description: 'List of skills', example: ['System Design', 'NestJS', 'PostgreSQL'] })
  skills: string[];

  @ApiProperty({ description: 'Creation timestamp', example: '2026-07-11T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ description: 'Last update timestamp', example: '2026-07-11T00:00:00.000Z' })
  updatedAt!: Date;
}