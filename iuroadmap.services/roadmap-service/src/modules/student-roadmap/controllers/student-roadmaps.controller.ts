import { Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@iuroadmap/shared';
import { Authenticated } from '../../../common/auth.decorators';
import { SuccessResponse } from '../../../common/success.response';
import { StudentRoadmapStatusEnum } from '../../../common/enums';
import { StudentRoadmapsService } from '../services/student-roadmaps.service';
import { TermResultsService } from '../services/term-results.service';
import { RebaseService } from '../services/rebase.service';
import { StudentRoadmapCloneRequest, StudentRoadmapResponse, StudentRoadmapSummaryResponse } from '../dto/student-roadmap';
import { RoadmapChangesRequest, RoadmapResetRequest } from '../dto/roadmap-change';
import { TermResultsResponse, TermResultsSaveRequest } from '../dto/term-result';
import { UpgradePreviewResponse, UpgradeRequest } from '../dto/rebase';

/** Learner roadmap (FL-LRN-02..09). Every endpoint checks ownership from the JWT (BR-LRN-14). */
@ApiTags('Student Roadmaps')
@Authenticated()
@Controller({ path: 'student-roadmaps', version: '1' })
export class StudentRoadmapsController {
  constructor(
    private readonly roadmaps: StudentRoadmapsService,
    private readonly results: TermResultsService,
    private readonly rebase: RebaseService,
  ) {}

  @Post('clone')
  @ApiOperation({ summary: 'Clone a published curriculum (one row, no copy)' })
  @ApiResponse({ status: 201, type: StudentRoadmapSummaryResponse })
  @ApiResponse({ status: 409, description: 'ALREADY_CLONED (with studentRoadmapId)' })
  async clone(@CurrentUser('userId') userId: string, @Body() dto: StudentRoadmapCloneRequest): Promise<StudentRoadmapSummaryResponse> {
    return this.roadmaps.clone(String(userId), dto);
  }

  @Get('my')
  @ApiOperation({ summary: 'My roadmaps with progress and GPA' })
  @ApiQuery({ name: 'includeDropped', required: false, type: Boolean })
  @ApiResponse({ status: 200, type: [StudentRoadmapSummaryResponse] })
  async my(@CurrentUser('userId') userId: string, @Query('includeDropped') includeDropped?: string): Promise<StudentRoadmapSummaryResponse[]> {
    return this.roadmaps.my(String(userId), includeDropped === 'true');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Merged view: curriculum ⊕ my changes ⊕ results' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: StudentRoadmapResponse })
  async get(@CurrentUser('userId') userId: string, @Param('id', ParseIntPipe) id: number): Promise<StudentRoadmapResponse> {
    return this.roadmaps.get(String(userId), id);
  }

  @Post(':id/changes')
  @ApiOperation({ summary: 'Apply a batch of changes (add / move only) in one transaction' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: StudentRoadmapResponse })
  @ApiResponse({ status: 400, description: 'BASE_ITEM_NOT_REMOVABLE / INVALID_OPERATION / TERM_LIMIT_EXCEEDED' })
  @ApiResponse({ status: 409, description: 'REVISION_CONFLICT / DUPLICATE_COURSE_IN_PLAN / NODE_HAS_RESULT / TERM_NOT_EMPTY' })
  async changes(
    @CurrentUser('userId') userId: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RoadmapChangesRequest,
  ): Promise<StudentRoadmapResponse> {
    return this.roadmaps.applyChanges(String(userId), id, dto);
  }

  @Post(':id/reset')
  @ApiOperation({ summary: 'Reset one curriculum node or every structural change (results are kept)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: StudentRoadmapResponse })
  async reset(
    @CurrentUser('userId') userId: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RoadmapResetRequest,
  ): Promise<StudentRoadmapResponse> {
    return this.roadmaps.reset(String(userId), id, dto);
  }

  @Post(':id/drop')
  @ApiOperation({ summary: 'Stop following the roadmap (data kept)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: StudentRoadmapSummaryResponse })
  async drop(@CurrentUser('userId') userId: string, @Param('id', ParseIntPipe) id: number): Promise<StudentRoadmapSummaryResponse> {
    return this.roadmaps.setStatus(String(userId), id, StudentRoadmapStatusEnum.DROPPED);
  }

  @Post(':id/reactivate')
  @ApiOperation({ summary: 'Follow the roadmap again' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: StudentRoadmapSummaryResponse })
  async reactivate(@CurrentUser('userId') userId: string, @Param('id', ParseIntPipe) id: number): Promise<StudentRoadmapSummaryResponse> {
    return this.roadmaps.setStatus(String(userId), id, StudentRoadmapStatusEnum.ENROLLED);
  }

  @Post('delete/:id')
  @ApiOperation({ summary: 'Delete the roadmap with its changes and results (cannot be undone)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: SuccessResponse })
  async delete(@CurrentUser('userId') userId: string, @Param('id', ParseIntPipe) id: number): Promise<SuccessResponse> {
    await this.roadmaps.delete(String(userId), id);
    return { success: true };
  }

  @Get(':id/terms/:termKey/results')
  @ApiOperation({ summary: 'Results table of a term (transcript layout)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'termKey', type: String })
  @ApiResponse({ status: 200, type: TermResultsResponse })
  async getResults(
    @CurrentUser('userId') userId: string,
    @Param('id', ParseIntPipe) id: number,
    @Param('termKey', new ParseUUIDPipe()) termKey: string,
  ): Promise<TermResultsResponse> {
    return this.results.get(String(userId), id, termKey);
  }

  @Post(':id/terms/:termKey/results/save')
  @ApiOperation({ summary: 'Save results of a term (scores, P/F, in progress)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'termKey', type: String })
  @ApiResponse({ status: 200, type: TermResultsResponse })
  @ApiResponse({ status: 400, description: 'INVALID_WEIGHTS / INVALID_SCORE / NODE_NOT_IN_TERM' })
  async saveResults(
    @CurrentUser('userId') userId: string,
    @Param('id', ParseIntPipe) id: number,
    @Param('termKey', new ParseUUIDPipe()) termKey: string,
    @Body() dto: TermResultsSaveRequest,
  ): Promise<TermResultsResponse> {
    return this.results.save(String(userId), id, termKey, dto);
  }

  @Get(':id/upgrade-preview')
  @ApiOperation({ summary: 'Dry run of moving to another published curriculum of the major' })
  @ApiParam({ name: 'id', type: Number })
  @ApiQuery({ name: 'targetVersionId', type: Number })
  @ApiResponse({ status: 200, type: UpgradePreviewResponse })
  async upgradePreview(
    @CurrentUser('userId') userId: string,
    @Param('id', ParseIntPipe) id: number,
    @Query('targetVersionId', ParseIntPipe) targetVersionId: number,
  ): Promise<UpgradePreviewResponse> {
    return this.rebase.preview(String(userId), id, targetVersionId);
  }

  @Post(':id/upgrade')
  @ApiOperation({ summary: 'Move to another published curriculum; results are never lost' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: StudentRoadmapResponse })
  async upgrade(
    @CurrentUser('userId') userId: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpgradeRequest,
  ): Promise<StudentRoadmapResponse> {
    return this.rebase.upgrade(String(userId), id, dto);
  }
}
