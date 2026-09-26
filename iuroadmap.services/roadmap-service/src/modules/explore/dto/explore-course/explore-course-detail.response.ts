import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CourseBriefResponse } from '../../../course-catalog/dto/course/course-brief.response';
import { CourseOfferingResponse } from '../../../course-offering/dto/course-offering';

/** Course page (FR-LRN.11.4): stable info + the offering of the requested academic year. */
export class ExploreCourseDetailResponse {
  @ApiProperty({ type: CourseBriefResponse })
  course!: CourseBriefResponse;

  @ApiProperty({ example: 'Major' })
  categoryName!: string;

  @ApiPropertyOptional({ description: 'General description (stable across years)' })
  description?: string;

  @ApiProperty({ type: [Number], description: 'Academic years with a published offering', example: [2024, 2025] })
  availableYears!: number[];

  @ApiPropertyOptional({ description: 'Year asked for', example: 2026 })
  requestedYear?: number;

  @ApiPropertyOptional({ type: CourseOfferingResponse, description: 'Offering of that year, or the nearest earlier one' })
  offering?: CourseOfferingResponse;

  @ApiProperty({ example: 12 })
  commentCount!: number;
}
