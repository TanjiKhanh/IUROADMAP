import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, IsUrl, Max, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AppConstant, EntityConstant } from '@iuroadmap/shared';
import { CourseOfferingLecturerRequest } from './course-offering-lecturer.request';

/** Offerings stay editable after publishing (FR-RDM.08.1). Send null to clear a field. */
export class CourseOfferingUpdateRequest {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  id!: number;

  @ApiPropertyOptional({ description: 'Markdown notes for students (registration, deadlines, drop procedure…)', maxLength: EntityConstant.DescriptionVeryLong, nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.DescriptionVeryLong)
  studentGuide?: string | null;

  @ApiPropertyOptional({ description: 'Syllabus link (http/https)', maxLength: EntityConstant.FilePath, nullable: true })
  @IsUrl({ protocols: ['http', 'https'], require_protocol: true })
  @IsOptional()
  @MaxLength(EntityConstant.FilePath)
  syllabusUrl?: string | null;

  @ApiPropertyOptional({ description: 'Default weight of the process score (%)', nullable: true })
  @IsInt()
  @Min(0)
  @Max(AppConstant.Roadmap.WeightTotal)
  @IsOptional()
  @Type(() => Number)
  weightProcess?: number | null;

  @ApiPropertyOptional({ description: 'Default weight of the midterm (%)', nullable: true })
  @IsInt()
  @Min(0)
  @Max(AppConstant.Roadmap.WeightTotal)
  @IsOptional()
  @Type(() => Number)
  weightMidterm?: number | null;

  @ApiPropertyOptional({ description: 'Default weight of the final exam (%)', nullable: true })
  @IsInt()
  @Min(0)
  @Max(AppConstant.Roadmap.WeightTotal)
  @IsOptional()
  @Type(() => Number)
  weightFinal?: number | null;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  hasProject?: boolean;

  @ApiPropertyOptional({ maxLength: EntityConstant.DescriptionLong, nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.DescriptionLong)
  projectDescription?: string | null;

  @ApiPropertyOptional({ type: [CourseOfferingLecturerRequest], description: 'Replaces the whole lecturer list when sent' })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CourseOfferingLecturerRequest)
  lecturers?: CourseOfferingLecturerRequest[];
}
