import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IActionDelete, IActionUpdate } from '@iuroadmap/shared';
import { OfferingStatusEnum } from '../../../../common/enums';
import { CourseBriefResponse } from '../../../course-catalog/dto/course/course-brief.response';
import { CourseOfferingLecturerResponse } from './course-offering-lecturer.response';

export class CourseOfferingResponse implements IActionDelete, IActionUpdate {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ type: CourseBriefResponse })
  course!: CourseBriefResponse;

  @ApiProperty({ description: '2025 = 2025-2026', example: 2025 })
  academicYear!: number;

  @ApiProperty({ enum: OfferingStatusEnum, enumName: 'OfferingStatus' })
  status!: OfferingStatusEnum;

  @ApiPropertyOptional({ description: 'Markdown' })
  studentGuide?: string;

  @ApiPropertyOptional()
  syllabusUrl?: string;

  @ApiPropertyOptional()
  weightProcess?: number;

  @ApiPropertyOptional()
  weightMidterm?: number;

  @ApiPropertyOptional()
  weightFinal?: number;

  @ApiProperty()
  hasProject!: boolean;

  @ApiPropertyOptional()
  projectDescription?: string;

  @ApiProperty({ type: [CourseOfferingLecturerResponse] })
  lecturers!: CourseOfferingLecturerResponse[];

  @ApiProperty({ example: 12 })
  topicCount!: number;

  @ApiPropertyOptional({ description: 'Offering this one was copied from' })
  copiedFromId?: number;

  @ApiProperty({ description: 'Only a DRAFT offering can be deleted' })
  canDelete!: boolean;

  @ApiProperty()
  canUpdate!: boolean;

  @ApiProperty()
  updatedAt!: string;
}
