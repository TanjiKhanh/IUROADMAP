import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CourseResultStatusEnum } from '../../../../common/enums';

export class CourseResultResponse {
  @ApiProperty({ enum: CourseResultStatusEnum, enumName: 'CourseResultStatus' })
  status!: CourseResultStatusEnum;

  @ApiPropertyOptional({ example: 30 })
  weightProcess?: number;

  @ApiPropertyOptional({ example: 30 })
  weightMidterm?: number;

  @ApiPropertyOptional({ example: 40 })
  weightFinal?: number;

  @ApiPropertyOptional({ example: 95 })
  scoreProcess?: number;

  @ApiPropertyOptional({ example: 58 })
  scoreMidterm?: number;

  @ApiPropertyOptional({ example: 70 })
  scoreFinal?: number;

  @ApiPropertyOptional({ description: 'Total on the 100 scale (SCORE courses)', example: 74 })
  totalScore?: number;

  @ApiPropertyOptional({ description: 'PASS_FAIL courses: true = P, false = F' })
  isPassed?: boolean;

  @ApiPropertyOptional()
  note?: string;

  @ApiPropertyOptional({ description: 'Derived letter (or P/F)', example: 'B+' })
  letter?: string;

  @ApiPropertyOptional({ description: 'Derived grade point (4 scale)', example: 3.0 })
  gradePoint?: number;
}
