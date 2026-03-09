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
import { CreateMentorProfileDto } from '../dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from '../dto/update-mentor-profile.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt.auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CurrentUser } from '../../../common/decorators/user.decorator';
import { UserRole } from '../../../common/enums/roles.enum';
import { Roles } from '../../../common/decorators/roles.decorator';

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

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async listProfiles(@Query('skip') skip = '0', @Query('take') take = '10') {
    return this.service.listProfiles(Number(skip), Number(take));
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MENTOR)
  async getMyProfile(@CurrentUser() user: any) {
    return this.service.getProfile(user.userId);
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MENTOR)
  @HttpCode(HttpStatus.OK)
  @Put('me')
  async updateProfile(
    @Body() dto: UpdateMentorProfileDto,
    @CurrentUser() user: any,
  ) {
    return this.service.updateProfile(user.userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')  
  async deleteProfile(@Param('id') userId: string) {
    await this.service.deleteProfile(Number(userId));
  }

  
}