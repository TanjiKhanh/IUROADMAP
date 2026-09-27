import { Controller, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { InternalApiKeyGuard } from '../../../common/internal-api-key.guard';
import { UserPurgeResponse } from '../dto/user-purge.response';
import { UserDataService } from '../services/user-data.service';

/**
 * Internal endpoints for other services (not in the gateway, not in the FE Swagger).
 * Called by auth when a user is hard-deleted (BR-CFG-05).
 */
@ApiExcludeController()
@Controller({ path: 'internal/users', version: '1' })
@UseGuards(InternalApiKeyGuard)
export class InternalUsersController {
  constructor(private readonly userData: UserDataService) {}

  @Post(':userId/purge')
  async purge(@Param('userId', new ParseUUIDPipe()) userId: string): Promise<UserPurgeResponse> {
    return this.userData.purge(userId);
  }
}
