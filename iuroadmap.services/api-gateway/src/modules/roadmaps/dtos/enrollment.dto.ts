// services/api-gateway/src/modules/roadmaps/dtos/enrollment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EnrollRoadmapRequestDto {
  @ApiProperty({ description: 'Roadmap slug to enroll in', example: 'computer-science' })
  @IsString()
  slug: string;
}

export class EnrollmentSummaryDto {
  @ApiProperty({ description: 'Enrollment ID', example: 1 })
  id: number;                    

  @ApiProperty({ description: 'User ID', example: 101 })
  userId: number;

  @ApiProperty({ description: 'Roadmap ID', example: 1 })
  roadmapId: number;

  @ApiProperty({ description: 'Roadmap slug', example: 'computer-science' })
  slug: string;

  @ApiProperty({ description: 'Roadmap name', example: 'Computer Science Roadmap' })
  name: string;

  @ApiProperty({ description: 'Total credits required', example: 120 })
  total_credits_required: number;

  @ApiProperty({ description: 'Completion percentage', example: 25.5 })
  completion_percentage: number;

  @ApiProperty({ description: 'Total credits earned', example: 30 })
  total_credits_earned: number;

  @ApiProperty({ description: 'Enrollment date', example: '2026-07-08T00:00:00.000Z' })
  enrollmentDate: string;
}