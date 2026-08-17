import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, MaxLength,  Min  } from 'class-validator';

export class MajorResponseDto {
  @ApiProperty({ description: 'Major ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Major slug', example: 'software-engineering' })
  slug: string;

  @ApiProperty({ description: 'Major name', example: 'Software Engineering' })
  name: string;
  
  @ApiPropertyOptional({ description: 'Major description', example: 'Comprehensive SE roadmap' })
  description?: string;

  @ApiProperty({ description: 'Total credits required', example: 130 })
  totalCreditsRequired: number;

  @ApiProperty({ description: 'Total courses included', example: 42 })
  totalCourses: number;
}


export class UpdateMajorMetaPayload {
  @ApiPropertyOptional({ description: 'Major name', example: 'Software Engineering' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({ description: 'Major description', example: 'Updated curriculum description' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @ApiPropertyOptional({ description: 'Total credits required', example: 130 })
  @IsOptional()
  @Min(100)
  totalCreditsRequired?: number;
}