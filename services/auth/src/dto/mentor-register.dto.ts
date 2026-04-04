import { 
  IsEmail, 
  IsString, 
  MinLength, 
  IsOptional, 
  IsIn, 
  IsArray, 
  IsUrl, 
  IsNotEmpty 
} from 'class-validator';
import { Role } from '../generated/prisma-client';

export class MentorRegisterDto {
  // --- AUTHENTICATION INFO ---
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsIn([Role.MENTOR], { message: 'Role must be MENTOR for this endpoint' })
  role: Role = Role.MENTOR;

  // --- MENTOR PROFILE INFO ---
  @IsOptional()
  @IsString({ message: 'Bio must be a text string' })
  bio?: string;

  @IsUrl({}, { message: 'CV URL must be a valid web address' })
  @IsNotEmpty({ message: 'CV is required' })
  cvUrl: string;

  @IsUrl({}, { message: 'LinkedIn URL must be a valid web address' })
  @IsOptional()
  linkedinUrl?: string;

  @IsString({ message: 'Industry category is required' })
  @IsNotEmpty()
  industry: string; // e.g., "BUSINESS_ANALYTICS" or "MARKETING"

  @IsArray({ message: 'Skills must be provided as an array' })
  @IsString({ each: true, message: 'Each skill must be a string' })
  @IsNotEmpty({ message: 'At least one skill is required' })
  skills: string[]; // e.g., ["SQL", "Figma", "Agile"]
}