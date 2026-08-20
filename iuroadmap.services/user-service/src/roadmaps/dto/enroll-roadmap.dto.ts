import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsArray, Min } from 'class-validator';

export class EnrollRoadmapDto {
  @ApiProperty({ description: 'User ID', example: 1 })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'Roadmap ID to enroll in', example: 101 })
  @IsInt()
  @IsNotEmpty()
  roadmapId: number;

  @ApiProperty({ description: 'Total credits required for roadmap completion', example: 130 })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  totalCreditsRequired: number;

  @ApiProperty({ description: 'List of all course node IDs included in this roadmap', example: [1, 2, 3] })
  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  courseNodeIds: number[];
}

export class EnrollRoadmapResponseDto {
  @ApiProperty({ description: 'Enrollment ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'User ID', example: 1 })
  user_id: number;

  @ApiProperty({ description: 'Roadmap ID', example: 101 })
  roadmap_id: number;

  @ApiProperty({ description: 'Enrollment status', example: 'IN_PROGRESS' })
  enrollment_status: string;

  @ApiProperty({ description: 'Completion percentage', example: 0.0 })
  completion_percentage: number;

  @ApiProperty({ description: 'Total credits earned so far', example: 0 })
  total_credits_earned: number;

  @ApiProperty({ description: 'Total credits required for roadmap', example: 130 })
  total_credits_required: number;

  @ApiProperty({ description: 'Creation timestamp', example: '2026-07-11T00:00:00.000Z' })
  created_at: string;

  @ApiProperty({ description: 'Update timestamp', example: '2026-07-11T00:00:00.000Z' })
  updated_at: string;
}