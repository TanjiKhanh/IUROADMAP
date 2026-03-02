import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MentorProfileService } from './mentor-profile.service';
import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';

/**
 * MentorProfileController
 * 
 * Routes:
 * - GET /mentor-profiles/:id -> get mentor profile
 * - GET /mentor-profiles -> list all profiles (paginated)
 * - POST /mentor-profiles -> create profile (auth required)
 * - PUT /mentor-profiles/:id -> update profile (auth + ownership)
 * - DELETE /mentor-profiles/:id -> delete profile (admin or owner)
 * - POST /mentor-profiles/:id/upsert -> upsert profile (internal)
 */
@Controller('mentor-profiles')
export class MentorProfileController {
  constructor(private readonly service: MentorProfileService) {}

  @Get()
  async listProfiles(@Query('skip') skip = '0', @Query('take') take = '10') {
    return this.service.listProfiles(Number(skip), Number(take));
  }

  @Get(':id')
  async getProfile(@Param('id') userId: string) {
    return this.service.getProfile(Number(userId));
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createProfile(@Body() dto: CreateMentorProfileDto, @CurrentUser() user: any) {
    return this.service.createProfile(user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateProfile(
    @Param('id') userId: string,
    @Body() dto: UpdateMentorProfileDto,
    @CurrentUser() user: any,
  ) {
    // Check authorization: allow if owner or admin
    const targetUserId = Number(userId);
    if (user.userId !== targetUserId && user.role !== 'ADMIN') {
      throw new Error('Unauthorized'); // or use ForbiddenException
    }
    return this.service.updateProfile(targetUserId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteProfile(@Param('id') userId: string) {
    await this.service.deleteProfile(Number(userId));
  }

  /**
   * Internal endpoint: upsert profile (called by Auth Service during registration)
   * In production, this should be protected by service-account auth or internal token
   */
  @HttpCode(HttpStatus.OK)
  @Post(':id/upsert')
  async upsertProfile(@Param('id') userId: string, @Body() dto: CreateMentorProfileDto) {
    return this.service.upsertProfile(Number(userId), dto);
  }
}