import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, IsJSON } from 'class-validator';
import { CourseType } from '@prisma/client'; // Ensures type safety with your DB enum

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  description?: string;
  

  @IsEnum(CourseType)
  @IsNotEmpty()
  type: CourseType;

  @IsInt()
  @IsOptional()
  departmentId?: number;

  @IsOptional()
  // @IsJSON() // Optional: strict validation if you want to ensure it's valid JSON string
  structure?: any; 
}