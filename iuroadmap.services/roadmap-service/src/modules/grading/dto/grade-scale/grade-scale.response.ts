import { ApiProperty } from '@nestjs/swagger';

export class GradeScaleResponse {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'A+' })
  letter!: string;

  @ApiProperty({ example: 90 })
  minScore!: number;

  @ApiProperty({ example: 100 })
  maxScore!: number;

  @ApiProperty({ example: 4.0 })
  gradePoint!: number;

  @ApiProperty({ example: true })
  isPassing!: boolean;
}
