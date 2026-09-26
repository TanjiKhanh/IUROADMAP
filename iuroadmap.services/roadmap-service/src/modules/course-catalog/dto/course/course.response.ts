import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IActionDelete, IActionUpdate } from '@iuroadmap/shared';
import { GradingModeEnum } from '../../../../common/enums';

export class CourseResponse implements IActionDelete, IActionUpdate {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'IT089IU' })
  code!: string;

  @ApiProperty({ example: 'Computer Architecture' })
  name!: string;

  @ApiProperty({ example: 3 })
  theoryCredits!: number;

  @ApiProperty({ example: 1 })
  labCredits!: number;

  @ApiProperty({ description: 'theoryCredits + labCredits', example: 4 })
  credits!: number;

  @ApiProperty({ example: 1 })
  categoryId!: number;

  @ApiProperty({ example: 'MAJOR' })
  categoryCode!: string;

  @ApiProperty({ example: 'Major' })
  categoryName!: string;

  @ApiProperty({ example: '#BDD7EE' })
  fillColor!: string;

  @ApiProperty({ example: '#2F5597' })
  borderColor!: string;

  @ApiProperty({ enum: GradingModeEnum, enumName: 'GradingMode' })
  gradingMode!: GradingModeEnum;

  @ApiProperty()
  countsTowardGpa!: boolean;

  @ApiProperty()
  countsTowardCredits!: boolean;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  canDelete!: boolean;

  @ApiProperty()
  canUpdate!: boolean;
}
