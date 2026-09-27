import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { EntityConstant } from '@iuroadmap/shared';

export class CommentHideRequest {
  @ApiProperty({ description: 'Required reason, shown to the author', maxLength: EntityConstant.ShortNote })
  @IsString()
  @MaxLength(EntityConstant.ShortNote)
  reason!: string;
}
