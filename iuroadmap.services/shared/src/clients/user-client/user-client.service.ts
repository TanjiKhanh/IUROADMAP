import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UserClientService {
  private readonly logger = new Logger(UserClientService.name);
  
  private readonly baseUrl = process.env.USER_SERVICE_URL || 'http://localhost:4000';

  async enrollUser(slug: string, token: string) {
    const url = `${this.baseUrl}/roadmaps/enroll`; // Matches your Postman: {{base_url}}/user/enroll
    
    try {
      this.logger.log(`🔄 Auto-enrolling user in: ${slug}`);
      
      const response = await axios.post(
        url,
        { slug }, // Body
        {
          headers: { Authorization: `Bearer ${token}` } // 🟢 Pass the JWT we just generated
        }
      );
      
      this.logger.log(`✅ Enrollment successful: ${slug}`);
      return response.data;
    } catch (error: any) {
      // Log but don't crash registration if enrollment fails
      this.logger.error(`❌ Auto-enrollment failed for ${slug}`, error.message);
      // Optional: throw error if you want registration to fail when enrollment fails
    }
  }
}