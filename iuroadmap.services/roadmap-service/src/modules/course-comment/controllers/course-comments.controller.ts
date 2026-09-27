import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser, IJwtPayload } from '@iuroadmap/shared';
import { Authenticated } from '../../../common/auth.decorators';
import { ApiPaginatedResponse } from '../../../common/api-paginated-response.decorator';
import { OptionalJwtGuard } from '../../../common/optional-jwt.guard';
import { SuccessResponse } from '../../../common/success.response';
import { CommentAuthor, CourseCommentsService } from '../services/course-comments.service';
import {
  CommentReportRequest,
  CourseCommentCreateRequest,
  CourseCommentFilterRequest,
  CourseCommentResponse,
  CourseCommentUpdateRequest,
} from '../dto/course-comment';

/** Course comments (FL-LRN-10). Reading is public; writing needs a signed-in user. */
@ApiTags('Course Comments')
@Controller({ version: '1' })
export class CourseCommentsController {
  constructor(private readonly commentsService: CourseCommentsService) {}

  @Get('explore/courses/:courseId/comments')
  @UseGuards(OptionalJwtGuard)
  @ApiOperation({ summary: 'Comment thread of a course (newest first; your own hidden comments are included)' })
  @ApiParam({ name: 'courseId', type: Number })
  @ApiPaginatedResponse(CourseCommentResponse)
  async thread(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Query() filter: CourseCommentFilterRequest,
    @CurrentUser('userId') userId?: string,
  ) {
    return this.commentsService.thread(courseId, filter, userId ? String(userId) : undefined);
  }

  @Post('course-comments/create')
  @Authenticated()
  @ApiOperation({ summary: 'Post a comment or a reply (one level)' })
  @ApiResponse({ status: 201, type: CourseCommentResponse })
  @ApiResponse({ status: 429, description: 'COMMENT_RATE_LIMITED (retryAfterSeconds)' })
  async create(@CurrentUser() user: IJwtPayload, @Body() dto: CourseCommentCreateRequest): Promise<CourseCommentResponse> {
    return this.commentsService.create(this.author(user), dto);
  }

  @Post('course-comments/update')
  @Authenticated()
  @ApiOperation({ summary: 'Edit my comment (only while visible)' })
  @ApiResponse({ status: 200, type: CourseCommentResponse })
  @ApiResponse({ status: 409, description: 'COMMENT_NOT_EDITABLE' })
  async update(@CurrentUser('userId') userId: string, @Body() dto: CourseCommentUpdateRequest): Promise<CourseCommentResponse> {
    return this.commentsService.update(String(userId), dto);
  }

  @Post('course-comments/delete/:id')
  @Authenticated()
  @ApiOperation({ summary: 'Delete my comment (soft delete)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: SuccessResponse })
  async delete(@CurrentUser('userId') userId: string, @Param('id', ParseIntPipe) id: number): Promise<SuccessResponse> {
    await this.commentsService.delete(String(userId), id);
    return { success: true };
  }

  @Post('course-comments/:id/report')
  @Authenticated()
  @ApiOperation({ summary: 'Report a comment (once per user)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: SuccessResponse })
  @ApiResponse({ status: 409, description: 'ALREADY_REPORTED' })
  async report(
    @CurrentUser('userId') userId: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CommentReportRequest,
  ): Promise<SuccessResponse> {
    await this.commentsService.report(String(userId), id, dto);
    return { success: true };
  }

  /** D18: name from the JWT, else the part of the email before "@". */
  private author(user: IJwtPayload): CommentAuthor {
    const userId = String(user.userId ?? user.sub);
    const name = user.name?.trim();
    return { userId, displayName: name || (user.email ?? '').split('@')[0] || userId.slice(0, 8) };
  }
}
