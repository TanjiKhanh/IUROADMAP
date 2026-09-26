import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LecturerRoleEnum, TermInYearEnum } from '../../../../common/enums';

export class CourseOfferingLecturerResponse {
  @ApiProperty({ example: 3 })
  lecturerId!: number;

  @ApiProperty({ example: 'Nguyen Van A' })
  fullName!: string;

  @ApiPropertyOptional({ example: 'TS' })
  title?: string;

  @ApiProperty({ enum: LecturerRoleEnum, enumName: 'LecturerRole' })
  role!: LecturerRoleEnum;

  @ApiPropertyOptional({ enum: TermInYearEnum, enumName: 'TermInYear', description: 'Empty = whole year' })
  termInYear?: TermInYearEnum;
}
