import { ApiProperty } from '@nestjs/swagger';
import { GradeScaleResponse } from '../grade-scale/grade-scale.response';
import { AcademicClassificationResponse } from '../academic-classification/academic-classification.response';

/** Public read of the grading configuration (for the results drawer live preview). */
export class GradingConfigResponse {
  @ApiProperty({ type: [GradeScaleResponse] })
  gradeScales!: GradeScaleResponse[];

  @ApiProperty({ type: [AcademicClassificationResponse] })
  classifications!: AcademicClassificationResponse[];
}
