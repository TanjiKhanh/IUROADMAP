// services/api-gateway/src/modules/roadmaps/controllers/explore-roadmaps.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ExploreMajorsService } from '../services/explore-majors.service';
import { ExploreMajorsResponseDto } from '../dtos';

@ApiTags('Explore')
@Controller({
  path: 'explore',
  version: '1',
})
export class ExploreRoadmapsController {
  constructor(private readonly exploreMajorsService: ExploreMajorsService) {}

  // GET /api/v1/explore/majors
  @Get('majors')
  @ApiOperation({ summary: 'Explore available majors grouped by department or filtered' })
  @ApiQuery({ name: 'departmentSlug', required: false, type: String, description: 'Optional department slug filter' })
  @ApiResponse({ status: 200, description: 'Exploration majors data retrieved successfully', type: ExploreMajorsResponseDto })
  async getMajors(
    @Query('departmentSlug') departmentSlug?: string,
  ): Promise<ExploreMajorsResponseDto> {
    return this.exploreMajorsService.getExploreMajorsData(departmentSlug);
  }
}