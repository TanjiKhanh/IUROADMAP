import {
  Body,
  Controller,
  Get,
  NotFoundException,
  NotImplementedException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@iuroadmap/shared';
import { JwtGuard } from '@iuroadmap/shared';
import { RoleGuard } from '@iuroadmap/shared';
import { AdminServiceClient } from '../clients/admin-service.client';
import { MajorResponseDto, UpdateMajorMetaPayload } from '../dtos/major.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';


@ApiTags('Admin-Majors')
@ApiBearerAuth()
@Controller({
  path: 'admin/majors',
  version: '1',
})
@UseGuards(JwtGuard, RoleGuard)
export class MajorsController {
  constructor(private readonly adminClient: AdminServiceClient) {}

  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'List all major roadmaps (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of major roadmaps retrieved successfully', type: [MajorResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden (Admin required)' })
  async listMajors(): Promise<MajorResponseDto[]> {
    return this.adminClient.getAllMajorRoadmaps();
  }

  @Get(':slug')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get a major roadmap by slug (Admin only)' })
  @ApiParam({ name: 'slug', type: String, description: 'Major slug' })
  @ApiResponse({ status: 200, description: 'Major roadmap retrieved successfully', type: MajorResponseDto })
  @ApiResponse({ status: 404, description: 'Major with slug not found' })
  async getMajorBySlug(@Param('slug') slug: string): Promise<MajorResponseDto> {
    const majors = await this.adminClient.getAllMajorRoadmaps();
    const found = majors.find((major) => major.slug === slug);

    if (!found) {
      throw new NotFoundException(`Major with slug ${slug} not found`);
    }

    return found;
  }

  @Patch(':slug')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update major metadata by slug (Admin only)' })
  @ApiParam({ name: 'slug', type: String, description: 'Major slug' })
  @ApiBody({ type: UpdateMajorMetaPayload })
  @ApiResponse({ status: 200, description: 'Major metadata updated successfully' })
  async updateMajor(
    @Param('slug') _slug: string,
    @Body() _payload: UpdateMajorMetaPayload,
  ): Promise<any> {
    return this.adminClient.updateMajorMeta(_slug, _payload);
  }
}
