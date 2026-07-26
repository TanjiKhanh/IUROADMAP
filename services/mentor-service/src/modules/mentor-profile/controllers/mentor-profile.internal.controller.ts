import { Controller, Post, Body, Headers, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { MentorProfileService } from '../services/mentor-profile.service';
import { CreateMentorProfileDto } from '../dto/create-mentor-profile.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiBody } from '@nestjs/swagger';

@ApiTags('Mentor - Internal')
@Controller('internal/mentor-profiles')
export class MentorProfileInternalController {
  constructor(private readonly service: MentorProfileService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Internal creation of a mentor profile (called by Auth service upon registration)' })
  @ApiHeader({ name: 'x-api-key', required: true, description: 'Internal service communication API key' })
  @ApiBody({ schema: { type: 'object', properties: { userId: { type: 'number' }, profileData: { type: 'object' } } } })
  @ApiResponse({ status: 201, description: 'Mentor profile created successfully internally' })
  @ApiResponse({ status: 401, description: 'Invalid Internal API Key' })
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