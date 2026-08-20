import { Controller, Get } from '@nestjs/common';
import { Public } from './decorators/public.decorator';

@Controller()
export class HealthController {
  @Public()
  @Get('health')
  getHealth() {
    return { status: 'ok', service: 'auth-service' };
  }
}
