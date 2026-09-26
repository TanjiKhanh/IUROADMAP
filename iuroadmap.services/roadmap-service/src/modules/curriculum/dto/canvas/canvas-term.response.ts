import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TermKindEnum } from '../../../../common/enums';

export class CanvasTermResponse {
  @ApiProperty({ format: 'uuid' })
  termKey!: string;

  @ApiProperty({ enum: TermKindEnum, enumName: 'TermKind' })
  kind!: TermKindEnum;

  @ApiPropertyOptional({ example: 4 })
  semesterNo?: number;

  @ApiProperty({ example: 3 })
  orderIndex!: number;

  @ApiProperty({ description: 'x in "Semester n (x+y)": credits of concrete courses', example: 16 })
  courseCredits!: number;

  @ApiProperty({ description: 'y in "Semester n (x+y)": credits of elective slots', example: 3 })
  slotCredits!: number;
}
