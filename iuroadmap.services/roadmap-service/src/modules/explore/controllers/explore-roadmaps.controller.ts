import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../../../common/api-paginated-response.decorator';
import { ExploreRoadmapsService } from '../services/explore-roadmaps.service';
import { ExploreCurriculumCardResponse, ExploreRoadmapFilterRequest, ExploreRoadmapPreviewResponse } from '../dto/explore-roadmap';

/** Public: guests can browse curricula without signing in (FR-LRN.01.4). */
@ApiTags('Explore Roadmaps')
@Controller({ path: 'explore/roadmaps', version: '1' })
export class ExploreRoadmapsController {
  constructor(private readonly exploreService: ExploreRoadmapsService) {}

  @Get()
  @ApiOperation({ summary: 'Published curricula filtered by department, major and cohort year' })
  @ApiPaginatedResponse(ExploreCurriculumCardResponse)
  async list(@Query() filter: ExploreRoadmapFilterRequest) {
    return this.exploreService.list(filter);
  }

  @Get('years')
  @ApiOperation({ summary: 'Cohort years that have a published curriculum' })
  @ApiResponse({ status: 200, type: [Number] })
  async years(): Promise<number[]> {
    return this.exploreService.years();
  }

  @Get(':majorSlug')
  @ApiOperation({ summary: 'Read-only semester canvas of a major (latest year when cohortYear is empty)' })
  @ApiParam({ name: 'majorSlug', type: String })
  @ApiQuery({ name: 'cohortYear', required: false, type: Number })
  @ApiResponse({ status: 200, type: ExploreRoadmapPreviewResponse })
  async preview(@Param('majorSlug') majorSlug: string, @Query('cohortYear') cohortYear?: string): Promise<ExploreRoadmapPreviewResponse> {
    return this.exploreService.preview(majorSlug, cohortYear ? Number(cohortYear) : undefined);
  }
}
