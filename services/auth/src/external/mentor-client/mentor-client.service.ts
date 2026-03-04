import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MentorClientService {
  private readonly logger = new Logger(MentorClientService.name);
  
  private readonly baseUrl = process.env.MENTOR_SERVICE_URL || 'http://localhost:4001';

  async createMentorProfile(mentorId: number, profileData: any) {
    try {
      const response = await axios.post(`${this.baseUrl}/internal/mentor-profiles`, 
      {
        userId: mentorId,       // Send the ID in the body
        profileData: profileData
      }, 
      {
        headers: {
          'x-api-key': process.env.MENTOR_SERVICE_API_KEY, 
        },
      });  
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to create mentor profile: ${error.message}`);
      throw error;
    }
  }
}