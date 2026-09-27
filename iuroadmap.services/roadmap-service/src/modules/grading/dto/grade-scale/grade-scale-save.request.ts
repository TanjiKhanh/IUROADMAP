import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GradeScaleItemRequest } from './grade-scale-item.request';

/** Replaces the whole scale; bands must cover 0..100 with no gap and no overlap (BR-RM-14). */
export class GradeScaleSaveRequest {
  @ApiProperty({ type: [GradeScaleItemRequest] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => GradeScaleItemRequest)
  items!: GradeScaleItemRequest[];
}
