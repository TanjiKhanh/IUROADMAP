import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminOnly } from '../../../common/auth.decorators';
import { ApiPaginatedResponse } from '../../../common/api-paginated-response.decorator';
import { SuccessResponse } from '../../../common/success.response';
import { OfferingStatusEnum } from '../../../common/enums';
import { CourseOfferingsService } from '../services/course-offerings.service';
import {
  CourseOfferingCopyYearRequest,
  CourseOfferingCopyYearResponse,
  CourseOfferingCreateRequest,
  CourseOfferingFilterRequest,
  CourseOfferingResponse,
  CourseOfferingUpdateRequest,
} from '../dto/course-offering';

@ApiTags('Admin Course Offerings')
@Controller({ path: 'admin/course-offerings', version: '1' })
export class CourseOfferingsController {
  constructor(private readonly offeringsService: CourseOfferingsService) {}

  @Post('create')
  @AdminOnly()
  @ApiOperation({ summary: 'Open a course for an academic year (blank or copied from another year)' })
  @ApiResponse({ status: 201, type: CourseOfferingResponse })
  @ApiResponse({ status: 409, description: 'COURSE_OFFERING_EXISTS' })
  async create(@Body() dto: CourseOfferingCreateRequest): Promise<CourseOfferingResponse> {
    return this.offeringsService.create(dto);
  }

  @Post('update')
  @AdminOnly()
  @ApiOperation({ summary: 'Update notes, syllabus, weights, project and lecturers' })
  @ApiResponse({ status: 200, type: CourseOfferingResponse })
  @ApiResponse({ status: 400, description: 'INVALID_WEIGHTS' })
  async update(@Body() dto: CourseOfferingUpdateRequest): Promise<CourseOfferingResponse> {
    const { id, ...data } = dto;
    return this.offeringsService.update(id, data);
  }

  @Get('getById/:id')
  @AdminOnly()
  @ApiOperation({ summary: 'Get a course offering' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CourseOfferingResponse })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<CourseOfferingResponse> {
    return this.offeringsService.findById(id);
  }

  @Get('GetByIndex')
  @AdminOnly()
  @ApiOperation({ summary: 'Paginated list of offerings (filter by course, year, lecturer, status)' })
  @ApiPaginatedResponse(CourseOfferingResponse)
  async getByIndex(@Query() filter: CourseOfferingFilterRequest) {
    return this.offeringsService.findAll(filter);
  }

  @Post(':id/publish')
  @AdminOnly()
  @ApiOperation({ summary: 'Make the offering visible to students' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CourseOfferingResponse })
  async publish(@Param('id', ParseIntPipe) id: number): Promise<CourseOfferingResponse> {
    return this.offeringsService.setStatus(id, OfferingStatusEnum.PUBLISHED);
  }

  @Post(':id/unpublish')
  @AdminOnly()
  @ApiOperation({ summary: 'Hide the offering again (back to DRAFT)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CourseOfferingResponse })
  async unpublish(@Param('id', ParseIntPipe) id: number): Promise<CourseOfferingResponse> {
    return this.offeringsService.setStatus(id, OfferingStatusEnum.DRAFT);
  }

  @Post('copy-year')
  @AdminOnly()
  @ApiOperation({ summary: 'Copy every PUBLISHED offering of a year to another year as DRAFT' })
  @ApiResponse({ status: 200, type: CourseOfferingCopyYearResponse })
  async copyYear(@Body() dto: CourseOfferingCopyYearRequest): Promise<CourseOfferingCopyYearResponse> {
    return this.offeringsService.copyYear(dto.fromYear, dto.toYear);
  }

  @Post('delete/:id')
  @AdminOnly()
  @ApiOperation({ summary: 'Delete a DRAFT offering' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: SuccessResponse })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<SuccessResponse> {
    await this.offeringsService.delete(id);
    return { success: true };
  }
}
