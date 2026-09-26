import { Module } from '@nestjs/common';
import { CourseCommentsController } from './controllers/course-comments.controller';
import { AdminCourseCommentsController } from './controllers/admin-course-comments.controller';
import { CourseCommentsService } from './services/course-comments.service';
import { CommentModerationService } from './services/comment-moderation.service';

@Module({
  controllers: [CourseCommentsController, AdminCourseCommentsController],
  providers: [CourseCommentsService, CommentModerationService],
})
export class CourseCommentModule {}
