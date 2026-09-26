import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DeltaOriginEnum, GradingModeEnum, NodeStateEnum, RoadmapNodeKindEnum } from '../../../../common/enums';
import { CourseBriefResponse } from '../../../course-catalog/dto/course/course-brief.response';
import { CustomCourseResponse } from './custom-course.response';
import { ElectiveSlotResponse } from './elective-slot.response';
import { CourseResultResponse } from './course-result.response';

export class MergedNodeResponse {
  @ApiProperty({ format: 'uuid' })
  nodeKey!: string;

  @ApiProperty({ enum: DeltaOriginEnum, enumName: 'DeltaOrigin' })
  origin!: DeltaOriginEnum;

  @ApiProperty({ description: 'Curriculum node moved or slot filled by the learner ("Đã chỉnh" badge)' })
  isModified!: boolean;

  @ApiProperty({ enum: RoadmapNodeKindEnum, enumName: 'RoadmapNodeKind' })
  kind!: RoadmapNodeKindEnum;

  @ApiProperty({ format: 'uuid' })
  termKey!: string;

  @ApiProperty({ description: 'Order inside the column (row_index or row_order)', example: 1.5 })
  order!: number;

  @ApiProperty({ description: 'Displayed row (derived, design §4.2)', example: 2 })
  visualRow!: number;

  @ApiPropertyOptional({ type: CourseBriefResponse, description: 'Catalog course (also the course chosen for a slot)' })
  course?: CourseBriefResponse;

  @ApiPropertyOptional({ type: CustomCourseResponse })
  customCourse?: CustomCourseResponse;

  @ApiPropertyOptional({ type: ElectiveSlotResponse })
  slot?: ElectiveSlotResponse;

  @ApiPropertyOptional({ description: 'Elective group of a pool course' })
  electiveGroup?: string;

  @ApiProperty({ example: 4 })
  credits!: number;

  @ApiProperty({ enum: GradingModeEnum, enumName: 'GradingMode' })
  gradingMode!: GradingModeEnum;

  @ApiProperty()
  countsTowardGpa!: boolean;

  @ApiProperty()
  countsTowardCredits!: boolean;

  @ApiProperty({ description: 'False for an unfilled elective slot' })
  canHaveResult!: boolean;

  @ApiProperty({ enum: NodeStateEnum, enumName: 'NodeState' })
  state!: NodeStateEnum;

  @ApiPropertyOptional({ type: CourseResultResponse })
  result?: CourseResultResponse;
}
