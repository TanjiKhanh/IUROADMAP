import { ApiProperty } from '@nestjs/swagger';

export class CourseOfferingCopyYearResponse {
  @ApiProperty({ description: 'Offerings created as DRAFT', example: 40 })
  created!: number;

  @ApiProperty({ description: 'Courses that already had an offering in the target year', example: 2 })
  skipped!: number;
}
