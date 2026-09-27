import { ApiProperty } from '@nestjs/swagger';

export class ExploreMajorRefResponse {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Data Science' })
  name!: string;

  @ApiProperty({ example: 'data-science' })
  slug!: string;
}
