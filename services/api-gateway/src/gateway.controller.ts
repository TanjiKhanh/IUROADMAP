import { Controller, Get, Post, Body, Headers, Inject, HttpException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './common/guards/jwt.guard';

@Controller()
export class GatewayController {
  constructor(
    @Inject('AUTH_CLIENT') private readonly authClient: any,
    @Inject('ADMIN_CLIENT') private readonly adminClient: any,
  ) {}

  @Get('health')
  getHealth() {
    return { status: 'ok', service: 'api-gateway' };
  }

  @Post('auth/login')
  async proxyLogin(@Body() payload: any) {
    // simply forward to auth client
    return this.authClient.login(payload);
  }

  @Get('admin/info')
  @UseGuards(JwtAuthGuard)
  async getAdminInfo(@Headers('authorization') auth: string) {
    try {
      return await this.adminClient.getInfo({ headers: { authorization: auth } });
    } catch (err) {
      throw new HttpException('Admin service error', 502);
    }
  }
}
