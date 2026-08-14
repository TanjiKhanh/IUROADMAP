import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MentorClientService {
  private readonly logger = new Logger(MentorClientService.name);
  
  private readonly baseUrl = process.env.MENTOR_SERVICE_URL || 'http://localhost:4001';

  async createMentorProfile(mentorId: number, profileData: any) {
    try {
      // ✅ Wrap fields in profileData object as expected by controller
      const response = await axios.post(`${this.baseUrl}/internal/mentor-profiles`, 
      {
        userId: mentorId,
        profileData: {
          bio: profileData.bio,
          cvUrl: profileData.cvUrl,
          linkedinUrl: profileData.linkedinUrl,
          industry: profileData.industry,
          skills: profileData.skills,
        }
      }, 
      {
        headers: {
          'x-api-key': process.env.MENTOR_SERVICE_API_KEY, 
        },
      });  
      // Unwrap response from ResponseInterceptor format { success: true, data: {...} }
      return response.data?.data ?? response.data;
    } catch (error: any) {
      this.logger.error(`Failed to create mentor profile: ${error.message}`);
      throw error;
    }
  }
}