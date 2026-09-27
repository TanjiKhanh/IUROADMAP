import { ApiProperty } from '@nestjs/swagger';

export class AcademicClassificationResponse {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'roadmap.classification.veryGood' })
  labelKey!: string;

  @ApiProperty({ example: 80 })
  minGpa100!: number;

  @ApiProperty({ example: 90 })
  maxGpa100!: number;
}
