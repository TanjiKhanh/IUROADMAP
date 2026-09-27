import { ApiProperty } from '@nestjs/swagger';

/** A course typed by the learner that is not in the catalog (e.g. transferred credits). */
export class CustomCourseResponse {
  @ApiProperty({ example: 'TR001' })
  code!: string;

  @ApiProperty({ example: 'Transferred course' })
  name!: string;

  @ApiProperty({ example: 3 })
  theoryCredits!: number;

  @ApiProperty({ example: 0 })
  labCredits!: number;
}
