import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommentStatusEnum } from '../../../../common/enums';

export class CourseCommentResponse {
  @ApiProperty({ example: 5 })
  id!: number;

  @ApiProperty({ example: 12 })
  courseId!: number;

  @ApiPropertyOptional({ description: 'Root comment id when this is a reply' })
  parentId?: number;

  @ApiPropertyOptional({ description: 'Empty when the author account was deleted (show the i18n "deleted user" label)' })
  authorDisplayName?: string;

  @ApiPropertyOptional({ description: 'Cohort of the author for a major that contains the course', example: 2023 })
  authorCohortYear?: number;

  @ApiProperty({ description: 'The caller wrote this comment' })
  isMine!: boolean;

  @ApiPropertyOptional({ description: 'Academic year the author took the course', example: 2025 })
  academicYear?: number;

  @ApiPropertyOptional({ description: 'Empty for a deleted comment kept as a placeholder for its replies' })
  content?: string;

  @ApiProperty({ enum: CommentStatusEnum, enumName: 'CommentStatus' })
  status!: CommentStatusEnum;

  @ApiPropertyOptional({ description: 'Shown to the author only when the comment was hidden' })
  moderationReason?: string;

  @ApiProperty()
  isEdited!: boolean;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty({ type: () => [CourseCommentResponse], description: 'Replies (root comments only)' })
  replies!: CourseCommentResponse[];
}
