import { Controller, Post, Body, Headers, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { MentorProfileService } from '../services/mentor-profile.service';
import { CreateMentorProfileDto } from '../dto/create-mentor-profile.dto';

@Controller('internal/mentor-profiles')
export class MentorProfileInternalController {
  constructor(private readonly service: MentorProfileService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createProfile(
    @Headers('x-api-key') apiKey: string,
    @Body() body: any,
  ) {
    // 1. Verify this request actually came from the Auth Service
    if (apiKey !== process.env.MENTOR_SERVICE_API_KEY) {
      throw new UnauthorizedException('Invalid Internal API Key');
    }

    const { userId, profileData } = body;
    
    // 2. Create the profile
    return this.service.createProfile(userId, profileData);
  }
}