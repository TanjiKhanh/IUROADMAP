import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CourseBriefResponse } from '../../../course-catalog/dto/course/course-brief.response';
import { CourseOfferingLecturerResponse } from '../../../course-offering/dto/course-offering';
import { ExploreMajorRefResponse } from './explore-major-ref.response';

/** Card of the Course Explorer list (FR-LRN.11.3). */
export class ExploreCourseCardResponse {
  @ApiProperty({ type: CourseBriefResponse })
  course!: CourseBriefResponse;

  @ApiProperty({ example: 'Major' })
  categoryName!: string;

  @ApiProperty({ example: 4 })
  credits!: number;

  @ApiPropertyOptional({ description: 'Academic year of the offering shown on the card', example: 2025 })
  offeringYear?: number;

  @ApiProperty({ type: [CourseOfferingLecturerResponse] })
  lecturers!: CourseOfferingLecturerResponse[];

  @ApiProperty()
  hasProject!: boolean;

  @ApiProperty({ type: [ExploreMajorRefResponse], description: 'Majors whose published curricula contain the course' })
  majors!: ExploreMajorRefResponse[];

  @ApiProperty({ description: 'Visible comments', example: 12 })
  commentCount!: number;
}
