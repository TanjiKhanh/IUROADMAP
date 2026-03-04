import {  IsString, IsArray } from 'class-validator';
/**
 * DTO for creating a mentor profile (used during registration).
 * Used by Auth Service when calling Mentor Service.
 */
export class CreateMentorProfileDto {
  @IsString()
  cvUrl?: string;

  @IsString()
  linkedinUrl?: string;

  @IsString()
  industry?: string;

  @IsArray()
  skills?: string[];

  @IsString()
  bio?: string; // markdown or rich text
}