import { ApiProperty } from '@nestjs/swagger';

/** Badge on the admin menu (FR-RDM.10.1). */
export class FlaggedCountResponse {
  @ApiProperty({ example: 4 })
  flagged!: number;
}
