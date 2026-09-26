import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { AppConstant, EntityConstant } from '@iuroadmap/shared';

export class CourseCommentCreateRequest {
  @ApiProperty({ example: 12 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  courseId!: number;

  @ApiPropertyOptional({ description: 'Reply to this comment (one level: a reply to a reply is attached to its root)' })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  parentId?: number;

  @ApiProperty({ description: 'Plain text', maxLength: EntityConstant.CourseCommentContent })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.CourseCommentContent)
  content!: string;

  @ApiPropertyOptional({ description: 'Academic year you took the course (2025 = 2025-2026)', example: 2025 })
  @IsInt()
  @Min(AppConstant.AcademicYear.Min)
  @Max(AppConstant.AcademicYear.Max)
  @IsOptional()
  @Type(() => Number)
  academicYear?: number;
}
