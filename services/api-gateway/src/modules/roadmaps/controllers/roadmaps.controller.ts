import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { RoadmapsService } from '../services/roadmaps.service';
import { MacroRoadmapResponseDto } from '../dtos';
import { JwtGuard } from '../../../common/guards/jwt.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@Controller('api/v1/roadmaps')
export class RoadmapsController {
  constructor(private readonly roadmapsService: RoadmapsService) {}

  @UseGuards(JwtGuard)
  @Roles('STUDENT') 
  @Get(':userRoadmapId')
  async getMacroRoadmap(
    @Param('userRoadmapId', ParseIntPipe) userRoadmapId: number,
    @Req() req: Request,
  ): Promise<MacroRoadmapResponseDto> {
    const user = (req as any).user;
    return this.roadmapsService.getMacroRoadmap({ userRoadmapId, user });
  }
}