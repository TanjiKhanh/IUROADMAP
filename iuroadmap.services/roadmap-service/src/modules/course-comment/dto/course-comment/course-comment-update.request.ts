import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EntityConstant } from '@iuroadmap/shared';

export class CourseCommentUpdateRequest {
  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  id!: number;

  @ApiProperty({ maxLength: EntityConstant.CourseCommentContent })
  @IsString()
  @IsNotEmpty()
  @MaxLength(EntityConstant.CourseCommentContent)
  content!: string;
}
