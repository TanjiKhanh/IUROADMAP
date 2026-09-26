import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

/** Free position of a topic on the micro canvas (topics are not laid out by semester). */
export class TopicCoordsRequest {
  @ApiProperty({ example: 150 })
  @IsNumber()
  @Type(() => Number)
  x!: number;

  @ApiProperty({ example: 250 })
  @IsNumber()
  @Type(() => Number)
  y!: number;
}
