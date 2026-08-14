import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AdminClientService {
  // Matches docker-compose service name
  private readonly baseUrl = process.env.ADMIN_SERVICE_URL || 'http://admin-service:4100';

  async getDepartment(departmentSlug: String) {
    try {
      const response = await axios.get(`${this.baseUrl}/public/departments/${departmentSlug}`);
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to fetch department', error.response?.status || 500);
    }
  }
}