import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@iuroadmap/shared';
import { AdminOnly } from '../../../common/auth.decorators';
import { ApiPaginatedResponse } from '../../../common/api-paginated-response.decorator';
import { CommentModerationService } from '../services/comment-moderation.service';
import { AdminCommentFilterRequest, AdminCommentResponse, CommentHideRequest, FlaggedCountResponse } from '../dto/comment-moderation';

@ApiTags('Admin Course Comments')
@Controller({ path: 'admin/course-comments', version: '1' })
export class AdminCourseCommentsController {
  constructor(private readonly moderation: CommentModerationService) {}

  @Get('GetByIndex')
  @AdminOnly()
  @ApiOperation({ summary: 'Moderation queue (most reported first)' })
  @ApiPaginatedResponse(AdminCommentResponse)
  async list(@Query() filter: AdminCommentFilterRequest) {
    return this.moderation.list(filter);
  }

  @Get('flagged-count')
  @AdminOnly()
  @ApiOperation({ summary: 'Number of FLAGGED comments (menu badge)' })
  @ApiResponse({ status: 200, type: FlaggedCountResponse })
  async flaggedCount(): Promise<FlaggedCountResponse> {
    return this.moderation.flaggedCount();
  }

  @Get('getById/:id')
  @AdminOnly()
  @ApiOperation({ summary: 'A comment with its context and reports' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: AdminCommentResponse })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<AdminCommentResponse> {
    return this.moderation.getById(id);
  }

  @Post(':id/hide')
  @AdminOnly()
  @ApiOperation({ summary: 'Hide a comment (reason required)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: AdminCommentResponse })
  @ApiResponse({ status: 400, description: 'MODERATION_REASON_REQUIRED' })
  async hide(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CommentHideRequest,
    @CurrentUser('userId') adminId: string,
  ): Promise<AdminCommentResponse> {
    return this.moderation.hide(id, dto.reason, String(adminId));
  }

  @Post(':id/dismiss-reports')
  @AdminOnly()
  @ApiOperation({ summary: 'Keep the comment and dismiss its pending reports' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: AdminCommentResponse })
  async dismiss(@Param('id', ParseIntPipe) id: number, @CurrentUser('userId') adminId: string): Promise<AdminCommentResponse> {
    return this.moderation.dismissReports(id, String(adminId));
  }

  @Post(':id/restore')
  @AdminOnly()
  @ApiOperation({ summary: 'Restore a hidden comment' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: AdminCommentResponse })
  async restore(@Param('id', ParseIntPipe) id: number, @CurrentUser('userId') adminId: string): Promise<AdminCommentResponse> {
    return this.moderation.restore(id, String(adminId));
  }
}
