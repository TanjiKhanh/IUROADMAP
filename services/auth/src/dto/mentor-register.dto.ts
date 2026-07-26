import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'The email address of the mentor',
    example: 'mentor@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    description: 'The account password (minimum 6 characters)',
    example: 'password123',
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    description: 'Full name of the mentor',
    example: 'Dr. Jane Smith',
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: [Role.MENTOR],
    example: Role.MENTOR,
  })
  @IsIn([Role.MENTOR], { message: 'Role must be MENTOR for this endpoint' })
  role: Role = Role.MENTOR;

  // --- MENTOR PROFILE INFO ---
  @ApiPropertyOptional({
    description: 'A brief biography or summary of experience',
    example: 'Senior Data Scientist with 10+ years in Fintech.',
  })
  @IsOptional()
  @IsString({ message: 'Bio must be a text string' })
  bio?: string;

  @ApiProperty({
    description: 'URL to the mentor CV/Resume',
    example: 'https://example.com/cv/janesmith.pdf',
  })
  @IsUrl({}, { message: 'CV URL must be a valid web address' })
  @IsNotEmpty({ message: 'CV is required' })
  cvUrl: string;

  @ApiPropertyOptional({
    description: 'LinkedIn profile URL',
    example: 'https://linkedin.com/in/janesmith',
  })
  @IsUrl({}, { message: 'LinkedIn URL must be a valid web address' })
  @IsOptional()
  linkedinUrl?: string;

  @ApiProperty({
    description: 'Industry category',
    example: 'BUSINESS_ANALYTICS',
  })
  @IsString({ message: 'Industry category is required' })
  @IsNotEmpty()
  industry: string; // e.g., "BUSINESS_ANALYTICS" or "MARKETING"

  @ApiProperty({
    description: 'Array of skill tags',
    example: ['SQL', 'Python', 'Machine Learning'],
    type: [String],
  })
  @IsArray({ message: 'Skills must be provided as an array' })
  @IsString({ each: true, message: 'Each skill must be a string' })
  @IsNotEmpty({ message: 'At least one skill is required' })
  skills: string[]; // e.g., ["SQL", "Figma", "Agile"]
}