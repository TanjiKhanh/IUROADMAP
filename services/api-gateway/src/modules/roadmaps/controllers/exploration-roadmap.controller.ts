// services/api-gateway/src/modules/roadmaps/controllers/explore-roadmaps.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ExploreMajorsService } from '../services/explore-majors.service';
import { ExploreMajorsResponseDto } from '../dtos';

@Controller('api/v1/explore')
export class ExploreRoadmapsController {
  constructor(private readonly exploreMajorsService: ExploreMajorsService) {}

  // GET /api/v1/explore/majors
  @Get('majors')
  async getMajors(
    @Query('departmentSlug') departmentSlug?: string,
  ): Promise<ExploreMajorsResponseDto> {
    return this.exploreMajorsService.getExploreMajorsData(departmentSlug);
  }
}