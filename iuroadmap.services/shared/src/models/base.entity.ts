import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: '2026-07-04T12:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-07-04T12:00:00.000Z' })
  updatedAt!: Date;
}
