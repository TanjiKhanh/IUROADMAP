import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ description: 'Response status', example: 'error' })
  status!: 'error';

  @ApiProperty({ description: 'Error code', example: 'VALIDATION_ERROR' })
  code!: string;

  @ApiProperty({ description: 'Error message', example: 'Invalid request payload' })
  message!: string;

  @ApiProperty({ description: 'Error timestamp', example: '2026-07-11T00:00:00.000Z' })
  timestamp!: Date;

  @ApiProperty({ description: 'Request path where error occurred', example: '/api/v1/roadmaps' })
  path!: string;
}
