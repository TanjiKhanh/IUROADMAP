import { Controller, Get } from '@nestjs/common';

// Gateway Health Endpoint (No Auth)
@Controller()
export class HealthController {
  @Get('health')
  getHealth() {
    return { status: 'ok', service: 'api-gateway' };
  }
}
