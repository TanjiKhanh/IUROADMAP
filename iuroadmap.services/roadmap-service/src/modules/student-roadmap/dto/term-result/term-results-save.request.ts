import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TermResultItemRequest } from './term-result-item.request';

export class TermResultsSaveRequest {
  @ApiProperty({ example: 7 })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  revision!: number;

  @ApiProperty({ type: [TermResultItemRequest] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TermResultItemRequest)
  items!: TermResultItemRequest[];
}
