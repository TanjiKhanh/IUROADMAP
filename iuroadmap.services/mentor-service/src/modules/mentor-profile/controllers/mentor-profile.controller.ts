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
import { MentorProfileService } from '../services/mentor-profile.service';
import { UpdateMentorProfileDto } from '../dto/update-mentor-profile.dto';
import { MentorProfileResponseDto } from '../dto/mentor-profile-response.dto';
import { JwtGuard } from '@iuroadmap/shared';
import { RoleGuard } from '@iuroadmap/shared';
import { CurrentUser } from '@iuroadmap/shared';
import { UserRole } from '@iuroadmap/shared';
import { Roles } from '@iuroadmap/shared';

/**
 * MentorProfileController
 * 
 * Routes:
 * - GET /mentor-profiles -> list all profiles (paginated)
 * - GET /mentor-profiles/me -> get mentor profile
 * - PUT /mentor-profiles/me -> update profile (auth + ownership)
 * - DELETE /mentor-profiles/:id -> delete profile (admin)
 */
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Mentor - Profile')
@ApiBearerAuth()
@Controller('mentor-profiles')
export class MentorProfileController {
  constructor(private readonly service: MentorProfileService) {}

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  @ApiOperation({ summary: 'List all mentor profiles (Admin only)' })
  @ApiQuery({ name: 'skip', required: false, example: '0', description: 'Number of records to skip' })
  @ApiQuery({ name: 'take', required: false, example: '10', description: 'Number of records to take' })
  @ApiResponse({ status: 200, description: 'List of mentor profiles retrieved successfully', type: [MentorProfileResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Admin role required)' })
  async listProfiles(@Query('skip') skip = '0', @Query('take') take = '10') {
    return this.service.listProfiles(Number(skip), Number(take));
  }

  @Get('me')
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(UserRole.MENTOR)
  @ApiOperation({ summary: 'Get current logged-in mentor profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully', type: MentorProfileResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  async getMyProfile(@CurrentUser() user: any) {
    return this.service.getProfile(user.userId);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(UserRole.MENTOR)
  @HttpCode(HttpStatus.OK)
  @Put('me')
  @ApiOperation({ summary: 'Update current logged-in mentor profile' })
  @ApiBody({ type: UpdateMentorProfileDto })
  @ApiResponse({ status: 200, description: 'Profile updated successfully', type: MentorProfileResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request / Validation Error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfile(
    @Body() dto: UpdateMentorProfileDto,
    @CurrentUser() user: any,
  ) {
    return this.service.updateProfile(user.userId, dto);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a mentor profile by user ID (Admin only)' })
  @ApiParam({ name: 'id', type: String, description: 'User ID of the mentor' })
  @ApiResponse({ status: 204, description: 'Profile deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Admin role required)' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  async deleteProfile(@Param('id') userId: string) {
    await this.service.deleteProfile(Number(userId));
  }
}
