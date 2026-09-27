import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

/** Move the roadmap to another PUBLISHED curriculum of the same major (FL-LRN-07). */
export class UpgradeRequest {
  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  targetVersionId!: number;

  @ApiProperty({ example: 7 })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  revision!: number;
}
