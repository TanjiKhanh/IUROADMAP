import { ApiProperty } from '@nestjs/swagger';
import { GradingModeEnum } from '../../../../common/enums';

/** Lightweight course shown on canvas nodes, the catalog sidebar and the learner course picker. */
export class CourseBriefResponse {
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

  @ApiProperty({ example: 'MAJOR' })
  categoryCode!: string;

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
}
