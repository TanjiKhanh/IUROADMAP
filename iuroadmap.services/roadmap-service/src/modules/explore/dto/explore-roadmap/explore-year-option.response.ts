import { ApiProperty } from '@nestjs/swagger';

export class ExploreYearOptionResponse {
  @ApiProperty({ example: 2023 })
  cohortYear!: number;

  @ApiProperty({ example: 3 })
  versionId!: number;
}
