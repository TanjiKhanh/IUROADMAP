import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IActionDelete, IActionUpdate } from '@iuroadmap/shared';
import { LecturerStatusEnum } from '../../../../common/enums';

export class LecturerResponse implements IActionDelete, IActionUpdate {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Nguyen Van A' })
  fullName!: string;

  @ApiPropertyOptional({ example: 'TS' })
  title?: string;

  @ApiProperty({ example: 1 })
  departmentId!: number;

  @ApiProperty({ example: 'School of Computer Science and Engineering' })
  departmentName!: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiProperty({ enum: LecturerStatusEnum, enumName: 'LecturerStatus' })
  status!: LecturerStatusEnum;

  @ApiProperty({ description: 'Course offerings this lecturer is assigned to', example: 4 })
  offeringCount!: number;

  @ApiProperty({ description: 'False while assigned to an offering (LECTURER_IN_USE)' })
  canDelete!: boolean;

  @ApiProperty()
  canUpdate!: boolean;
}
