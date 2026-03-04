import { IsOptional, IsUrl, IsString, IsArray } from 'class-validator';

/**
 * DTO for updating a mentor's profile.
 * All fields are optional (PATCH-style update).
 */
export class UpdateMentorProfileDto {
  @IsOptional()
  @IsString()
  bio?: string; // markdown or rich text

  @IsOptional()
  @IsUrl()
  cvUrl?: string;

  @IsOptional()
  @IsUrl()
  linkedinUrl?: string;

  @IsOptional()
  @IsString()
  industry?: string; // e.g., "BUSINESS_ANALYTICS", "MARKETING"

  @IsOptional()
  @IsArray()
  skills?: string[]; // array of skill names
}