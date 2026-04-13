// user-service/src/user-roadmaps/user-roadmaps.controller.ts
import { Body, Controller, Param, ParseIntPipe, Post, Req, UsePipes, ValidationPipe , Get } from '@nestjs/common';
import { EnrollRoadmapDto } from '../dto/enroll-roadmap.dto';
import { UserRoadmapsService } from '../services/user-roadmaps.service';

@Controller('user/roadmaps')
export class UserRoadmapsController {
  constructor(private readonly service: UserRoadmapsService) {}

  @Post('enroll')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  enroll(@Body() dto: EnrollRoadmapDto) {
    return this.service.enrollUserToRoadmap(dto);
  }


  @Get(':userRoadmapId/overview')
  async getOverview(
    @Param('userRoadmapId', ParseIntPipe) userRoadmapId: number,
    @Req() req: Request,
  ) {
    const userId = Number(req.headers['x-user-id']);
    return this.service.getUserRoadmapOverview(userRoadmapId, userId);
  }


 

}