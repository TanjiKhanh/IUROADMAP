import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ElectiveSlotResponse {
  @ApiProperty({ example: 'Elective' })
  label!: string;

  @ApiProperty({ example: 3 })
  theoryCredits!: number;

  @ApiProperty({ example: 1 })
  labCredits!: number;

  @ApiPropertyOptional({ description: 'Accepted elective group; empty = free elective', example: 'DS' })
  electiveGroup?: string;
}
