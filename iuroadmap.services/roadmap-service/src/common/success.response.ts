import { ApiProperty } from '@nestjs/swagger';

/** Standard `{ success: true }` body for delete and state-change endpoints. */
export class SuccessResponse {
  @ApiProperty({ example: true })
  success!: boolean;
}
