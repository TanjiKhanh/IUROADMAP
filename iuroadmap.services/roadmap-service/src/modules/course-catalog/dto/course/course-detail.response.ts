import { ApiProperty } from '@nestjs/swagger';
import { CourseResponse } from './course.response';
import { CourseUsageResponse } from './course-usage.response';

export class CourseDetailResponse extends CourseResponse {
  @ApiProperty({ type: [CourseUsageResponse], description: 'Curricula that use this course' })
  usedIn!: CourseUsageResponse[];

  @ApiProperty({ description: 'Academic years that have an offering', type: [Number], example: [2024, 2025] })
  offeringYears!: number[];
}
