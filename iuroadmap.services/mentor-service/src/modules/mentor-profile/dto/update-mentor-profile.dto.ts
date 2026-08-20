import { IsOptional, IsUrl, IsString, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for updating a mentor's profile.
 * All fields are optional (PATCH-style update).
 */
export class UpdateMentorProfileDto {
  @ApiPropertyOptional({ description: 'Mentor biography in markdown or rich text', example: '10+ years in software architecture' })
  @IsOptional()
  @IsString()
  bio?: string; // markdown or rich text

  @ApiPropertyOptional({ description: 'URL to curriculum vitae', example: 'https://example.com/cv.pdf' })
  @IsOptional()
  @IsUrl()
  cvUrl?: string;

  @ApiPropertyOptional({ description: 'URL to LinkedIn profile', example: 'https://linkedin.com/in/mentor' })
  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @ApiPropertyOptional({ description: 'Industry specialty', example: 'BUSINESS_ANALYTICS' })
  @IsOptional()
  @IsString()
  industry?: string; // e.g., "BUSINESS_ANALYTICS", "MARKETING"

  @ApiPropertyOptional({ description: 'List of skills', example: ['System Design', 'NestJS', 'PostgreSQL'] })
  @IsOptional()
  @IsArray()
  skills?: string[]; // array of skill names
}