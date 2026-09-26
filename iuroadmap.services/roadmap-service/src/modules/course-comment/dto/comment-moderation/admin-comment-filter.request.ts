import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PaginationRequest } from '@iuroadmap/shared';
import { CommentStatusEnum } from '../../../../common/enums';

/** Moderation queue (FR-RDM.10.1). `keyword` matches the content or the course code. */
export class AdminCommentFilterRequest extends PaginationRequest {
  @ApiPropertyOptional({ enum: CommentStatusEnum, enumName: 'CommentStatus' })
  @IsEnum(CommentStatusEnum)
  @IsOptional()
  status?: CommentStatusEnum;

  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  courseId?: number;

  @ApiPropertyOptional({ description: 'Only comments with pending reports' })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === 'true' ? true : value === 'false' ? false : value))
  hasPendingReports?: boolean;

  @ApiPropertyOptional({ description: 'All comments of one user (FR-RDM.10.6)', format: 'uuid' })
  @IsUUID()
  @IsOptional()
  userId?: string;
}
