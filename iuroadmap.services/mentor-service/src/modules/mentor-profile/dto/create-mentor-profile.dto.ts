import { ApiPropertyOptional } from '@nestjs/swagger';
import {  IsString, IsArray } from 'class-validator';
/**
 * DTO for creating a mentor profile (used during registration).
 * Used by Auth Service when calling Mentor Service.
 */
export class CreateMentorProfileDto {
  @ApiPropertyOptional({ description: 'URL to CV/Resume', example: 'https://example.com/cv.pdf' })
  @IsString()
  cvUrl?: string;

  @ApiPropertyOptional({ description: 'LinkedIn profile URL', example: 'https://linkedin.com/in/mentor' })
  @IsString()
  linkedinUrl?: string;

  @ApiPropertyOptional({ description: 'Industry category', example: 'BUSINESS_ANALYTICS' })
  @IsString()
  industry?: string;

  @ApiPropertyOptional({ description: 'Array of skill tags', example: ['SQL', 'Python'] })
  @IsArray()
  skills?: string[];

  @ApiPropertyOptional({ description: 'Biography in markdown or text', example: 'Senior Data Scientist with 10+ years experience.' })
  @IsString()
  bio?: string; // markdown or rich text
}