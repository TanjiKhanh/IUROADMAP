import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// Gateway Health Endpoint (No Auth)
@ApiTags('Health')
@Controller({
  version: VERSION_NEUTRAL,
})
export class HealthController {
  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy and running' })
  getHealth() {
    return { status: 'ok', service: 'api-gateway' };
  }
}
