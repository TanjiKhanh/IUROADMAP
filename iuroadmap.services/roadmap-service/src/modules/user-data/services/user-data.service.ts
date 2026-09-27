import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserPurgeResponse } from '../dto/user-purge.response';

/**
 * Data of a user deleted in auth (roadmap-schema § Xoá user): roadmaps are deleted, comments stay
 * so reply threads keep their context, but lose the author name ("Deleted user" in the UI).
 */
@Injectable()
export class UserDataService {
  private readonly logger = new Logger(UserDataService.name);

  constructor(private readonly prisma: PrismaService) {}

  async purge(userId: string): Promise<UserPurgeResponse> {
    const [roadmaps, comments] = await this.prisma.$transaction([
      this.prisma.sTUDENT_ROADMAPS.deleteMany({ where: { user_id: userId } }),
      this.prisma.cOURSE_COMMENTS.updateMany({ where: { user_id: userId }, data: { author_display_name: null } }),
    ]);
    this.logger.log(`Purged user ${userId}: ${roadmaps.count} roadmaps, ${comments.count} comments anonymized`);
    return { deletedRoadmaps: roadmaps.count, anonymizedComments: comments.count };
  }
}
