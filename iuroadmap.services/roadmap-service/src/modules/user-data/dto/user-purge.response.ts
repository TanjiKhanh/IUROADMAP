import { ApiProperty } from '@nestjs/swagger';

export class UserPurgeResponse {
  @ApiProperty({ description: 'Student roadmaps deleted (overlay and results cascade)' })
  deletedRoadmaps!: number;

  @ApiProperty({ description: 'Comments kept but anonymized' })
  anonymizedComments!: number;
}
