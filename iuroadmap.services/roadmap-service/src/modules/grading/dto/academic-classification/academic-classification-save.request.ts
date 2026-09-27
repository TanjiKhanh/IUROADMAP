import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AcademicClassificationItemRequest } from './academic-classification-item.request';

/** Replaces all classifications; bands must cover GPA 0..100 with no gap and no overlap. */
export class AcademicClassificationSaveRequest {
  @ApiProperty({ type: [AcademicClassificationItemRequest] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AcademicClassificationItemRequest)
  items!: AcademicClassificationItemRequest[];
}
