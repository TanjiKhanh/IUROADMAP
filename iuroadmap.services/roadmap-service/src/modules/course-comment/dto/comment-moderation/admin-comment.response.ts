import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommentStatusEnum } from '../../../../common/enums';
import { CommentReportResponse } from './comment-report.response';

export class AdminCommentResponse {
  @ApiProperty({ example: 5 })
  id!: number;

  @ApiProperty({ example: 12 })
  courseId!: number;

  @ApiProperty({ example: 'IT082IU' })
  courseCode!: string;

  @ApiProperty({ example: 'Internship' })
  courseName!: string;

  @ApiPropertyOptional()
  parentId?: number;

  @ApiPropertyOptional({ description: 'Root comment text when this is a reply (context)' })
  parentContent?: string;

  @ApiProperty({ format: 'uuid' })
  userId!: string;

  @ApiPropertyOptional()
  authorDisplayName?: string;

  @ApiProperty()
  content!: string;

  @ApiProperty({ enum: CommentStatusEnum, enumName: 'CommentStatus' })
  status!: CommentStatusEnum;

  @ApiProperty({ example: 3 })
  pendingReportCount!: number;

  @ApiProperty({ type: [CommentReportResponse] })
  reports!: CommentReportResponse[];

  @ApiPropertyOptional()
  moderationReason?: string;

  @ApiPropertyOptional()
  moderatedAt?: string;

  @ApiProperty()
  createdAt!: string;
}
