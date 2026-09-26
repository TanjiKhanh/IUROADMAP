import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TermKindEnum } from '../../../../common/enums';

/** One column. Its position in `terms[]` becomes order_index. */
export class CanvasTermRequest {
  @ApiProperty({ description: 'Stable key (uuid v4), kept across curricula', format: 'uuid' })
  @IsUUID('4')
  termKey!: string;

  @ApiProperty({ enum: TermKindEnum, enumName: 'TermKind' })
  @IsEnum(TermKindEnum)
  kind!: TermKindEnum;

  @ApiPropertyOptional({ description: 'REGULAR only: Semester n', example: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  semesterNo?: number;
}
