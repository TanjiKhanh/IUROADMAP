import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@iuroadmap/shared';
import { AdminOnly } from '../../../common/auth.decorators';
import { SuccessResponse } from '../../../common/success.response';
import { CurriculumVersionsService } from '../services/curriculum-versions.service';
import {
  CurriculumValidationResponse,
  CurriculumVersionCreateRequest,
  CurriculumVersionPublishRequest,
  CurriculumVersionResponse,
  CurriculumVersionUpdateRequest,
} from '../dto/curriculum-version';

@ApiTags('Admin Curriculum')
@Controller({ version: '1' })
export class CurriculumVersionsController {
  constructor(private readonly versionsService: CurriculumVersionsService) {}

  @Get('admin/roadmaps/:roadmapId/versions')
  @AdminOnly()
  @ApiOperation({ summary: 'Curricula of a major, newest year first' })
  @ApiParam({ name: 'roadmapId', type: Number, description: 'Major ID' })
  @ApiResponse({ status: 200, type: [CurriculumVersionResponse] })
  async list(@Param('roadmapId', ParseIntPipe) roadmapId: number): Promise<CurriculumVersionResponse[]> {
    return this.versionsService.list(roadmapId);
  }

  @Post('admin/roadmaps/:roadmapId/versions/create')
  @AdminOnly()
  @ApiOperation({ summary: 'Create a DRAFT curriculum for a cohort year (blank or copied)' })
  @ApiParam({ name: 'roadmapId', type: Number, description: 'Major ID' })
  @ApiResponse({ status: 201, type: CurriculumVersionResponse })
  @ApiResponse({ status: 409, description: 'ROADMAP_DRAFT_EXISTS' })
  async create(
    @Param('roadmapId', ParseIntPipe) roadmapId: number,
    @Body() dto: CurriculumVersionCreateRequest,
  ): Promise<CurriculumVersionResponse> {
    return this.versionsService.create(roadmapId, dto);
  }

  @Get('admin/roadmap-versions/getById/:id')
  @AdminOnly()
  @ApiOperation({ summary: 'Get a curriculum by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CurriculumVersionResponse })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<CurriculumVersionResponse> {
    return this.versionsService.getById(id);
  }

  @Post('admin/roadmap-versions/:id/update')
  @AdminOnly()
  @ApiOperation({ summary: 'Update total credits / decision ref of a DRAFT' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CurriculumVersionResponse })
  @ApiResponse({ status: 409, description: 'ROADMAP_VERSION_IMMUTABLE' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CurriculumVersionUpdateRequest,
  ): Promise<CurriculumVersionResponse> {
    return this.versionsService.update(id, dto);
  }

  @Get('admin/roadmap-versions/:id/validate')
  @AdminOnly()
  @ApiOperation({ summary: 'Run the publish validator without publishing' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CurriculumValidationResponse })
  async validate(@Param('id', ParseIntPipe) id: number): Promise<CurriculumValidationResponse> {
    return this.versionsService.validate(id);
  }

  @Post('admin/roadmap-versions/:id/publish')
  @AdminOnly()
  @ApiOperation({ summary: 'Publish a DRAFT; the previous PUBLISHED issue of the same year is archived' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CurriculumVersionResponse })
  @ApiResponse({ status: 400, description: 'PUBLISH_VALIDATION_FAILED / PUBLISH_WARNINGS_NOT_ACKNOWLEDGED (with issues)' })
  async publish(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CurriculumVersionPublishRequest,
    @CurrentUser('userId') userId?: string,
  ): Promise<CurriculumVersionResponse> {
    return this.versionsService.publish(id, dto.acknowledgeWarnings ?? false, userId ? String(userId) : null);
  }

  @Post('admin/roadmap-versions/:id/archive')
  @AdminOnly()
  @ApiOperation({ summary: 'Archive a PUBLISHED curriculum (hidden from new clones)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CurriculumVersionResponse })
  async archive(@Param('id', ParseIntPipe) id: number): Promise<CurriculumVersionResponse> {
    return this.versionsService.archive(id);
  }

  @Post('admin/roadmap-versions/:id/unarchive')
  @AdminOnly()
  @ApiOperation({ summary: 'Unarchive (only when the year has no other PUBLISHED curriculum)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CurriculumVersionResponse })
  @ApiResponse({ status: 409, description: 'CURRICULUM_YEAR_ALREADY_PUBLISHED' })
  async unarchive(@Param('id', ParseIntPipe) id: number): Promise<CurriculumVersionResponse> {
    return this.versionsService.unarchive(id);
  }

  @Post('admin/roadmap-versions/delete/:id')
  @AdminOnly()
  @ApiOperation({ summary: 'Discard a DRAFT' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: SuccessResponse })
  @ApiResponse({ status: 409, description: 'ROADMAP_VERSION_IMMUTABLE' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<SuccessResponse> {
    await this.versionsService.delete(id);
    return { success: true };
  }
}
