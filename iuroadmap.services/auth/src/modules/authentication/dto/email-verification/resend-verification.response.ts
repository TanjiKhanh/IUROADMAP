import { ApiProperty } from '@nestjs/swagger';

export class ResendVerificationResponse {
  @ApiProperty({ description: 'Seconds before another code can be requested', example: 60 })
  resendAfterSeconds!: number;
}
