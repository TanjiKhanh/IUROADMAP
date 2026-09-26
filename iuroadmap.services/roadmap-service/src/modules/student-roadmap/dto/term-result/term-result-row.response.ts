import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GradingModeEnum, NodeStateEnum } from '../../../../common/enums';
import { CourseResultResponse } from '../student-roadmap/course-result.response';

/** One row of the transcript-like table (Ảnh 2 / Ảnh 3). */
export class TermResultRowResponse {
  @ApiProperty({ format: 'uuid' })
  nodeKey!: string;

  @ApiPropertyOptional({ description: 'Catalog course id (empty for a custom course)' })
  courseId?: number;

  @ApiProperty({ example: 'IT089IU' })
  code!: string;

  @ApiProperty({ example: 'Computer Architecture' })
  name!: string;

  @ApiProperty({ example: 4 })
  credits!: number;

  @ApiProperty({ enum: GradingModeEnum, enumName: 'GradingMode' })
  gradingMode!: GradingModeEnum;

  @ApiProperty()
  countsTowardGpa!: boolean;

  @ApiProperty()
  countsTowardCredits!: boolean;

  @ApiProperty({ description: 'False for an unfilled elective slot ("Choose a course first")' })
  editable!: boolean;

  @ApiPropertyOptional({ description: 'Default weights from the offering of the term\'s academic year' })
  defaultWeightProcess?: number;

  @ApiPropertyOptional()
  defaultWeightMidterm?: number;

  @ApiPropertyOptional()
  defaultWeightFinal?: number;

  @ApiProperty({ enum: NodeStateEnum, enumName: 'NodeState' })
  state!: NodeStateEnum;

  @ApiPropertyOptional({ type: CourseResultResponse })
  result?: CourseResultResponse;
}
