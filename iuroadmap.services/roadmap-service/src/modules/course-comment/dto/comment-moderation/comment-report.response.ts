import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommentReportReasonEnum, CommentReportStatusEnum } from '../../../../common/enums';

export class CommentReportResponse {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ format: 'uuid' })
  reporterId!: string;

  @ApiProperty({ enum: CommentReportReasonEnum, enumName: 'CommentReportReason' })
  reason!: CommentReportReasonEnum;

  @ApiPropertyOptional()
  note?: string;

  @ApiProperty({ enum: CommentReportStatusEnum, enumName: 'CommentReportStatus' })
  status!: CommentReportStatusEnum;

  @ApiProperty()
  createdAt!: string;
}
