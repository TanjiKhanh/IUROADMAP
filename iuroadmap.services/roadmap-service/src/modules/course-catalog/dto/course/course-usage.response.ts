import { ApiProperty } from '@nestjs/swagger';
import { RoadmapVersionStatusEnum } from '../../../../common/enums';

/** One curriculum (major + cohort year) that contains a course. */
export class CourseUsageResponse {
  @ApiProperty({ example: 3 })
  versionId!: number;

  @ApiProperty({ example: 1 })
  majorId!: number;

  @ApiProperty({ example: 'Computer Science' })
  majorName!: string;

  @ApiProperty({ example: 'computer-science' })
  majorSlug!: string;

  @ApiProperty({ example: 2023 })
  cohortYear!: number;

  @ApiProperty({ enum: RoadmapVersionStatusEnum, enumName: 'RoadmapVersionStatus' })
  status!: RoadmapVersionStatusEnum;
}
