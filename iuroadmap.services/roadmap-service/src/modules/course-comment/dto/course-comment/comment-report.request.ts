import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { EntityConstant } from '@iuroadmap/shared';
import { CommentReportReasonEnum } from '../../../../common/enums';

export class CommentReportRequest {
  @ApiProperty({ enum: CommentReportReasonEnum, enumName: 'CommentReportReason' })
  @IsEnum(CommentReportReasonEnum)
  reason!: CommentReportReasonEnum;

  @ApiPropertyOptional({ description: 'Required when reason = OTHER', maxLength: EntityConstant.ShortNote })
  @IsString()
  @IsOptional()
  @MaxLength(EntityConstant.ShortNote)
  note?: string;
}
