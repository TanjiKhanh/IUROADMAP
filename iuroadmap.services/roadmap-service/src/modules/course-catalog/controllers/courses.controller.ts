import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminOnly, Authenticated } from '../../../common/auth.decorators';
import { ApiPaginatedResponse } from '../../../common/api-paginated-response.decorator';
import { SuccessResponse } from '../../../common/success.response';
import { CoursesService } from '../services/courses.service';
import {
  CourseCreateRequest,
  CourseDetailResponse,
  CourseBriefResponse,
  CourseFilterRequest,
  CourseResponse,
  CourseUpdateRequest,
} from '../dto/course';

@ApiTags('Courses')
@Controller({ path: 'courses', version: '1' })
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('create')
  @AdminOnly()
  @ApiOperation({ summary: 'Create a course in the shared catalog' })
  @ApiResponse({ status: 201, type: CourseResponse })
  @ApiResponse({ status: 409, description: 'Course code already exists' })
  async create(@Body() dto: CourseCreateRequest): Promise<CourseResponse> {
    return this.coursesService.create(dto);
  }

  @Post('update')
  @AdminOnly()
  @ApiOperation({ summary: 'Update a course' })
  @ApiResponse({ status: 200, type: CourseResponse })
  @ApiResponse({ status: 409, description: 'COURSE_HAS_RESULTS when changing the grading mode' })
  async update(@Body() dto: CourseUpdateRequest): Promise<CourseResponse> {
    const { id, ...data } = dto;
    return this.coursesService.update(id, data);
  }

  @Get('getById/:id')
  @AdminOnly()
  @ApiOperation({ summary: 'Get a course with the curricula that use it' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CourseDetailResponse })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<CourseDetailResponse> {
    return this.coursesService.findById(id);
  }

  @Get('GetByIndex')
  @AdminOnly()
  @ApiOperation({ summary: 'Paginated list of courses (filter by keyword, category, major, grading mode)' })
  @ApiPaginatedResponse(CourseResponse)
  async getByIndex(@Query() filter: CourseFilterRequest) {
    return this.coursesService.findAll(filter);
  }

  @Get('ForDropdown')
  @Authenticated()
  @ApiOperation({ summary: 'Courses for the canvas sidebar and the learner course picker' })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiResponse({ status: 200, type: [CourseBriefResponse] })
  async forDropdown(
    @Query('keyword') keyword?: string,
    @Query('limit') limit?: number,
    @Query('categoryId') categoryId?: number,
  ): Promise<CourseBriefResponse[]> {
    return this.coursesService.getDropdownList(keyword, Number(limit) || 50, categoryId ? Number(categoryId) : undefined);
  }

  @Post('delete/:id')
  @AdminOnly()
  @ApiOperation({ summary: 'Delete a course (blocked while referenced)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: SuccessResponse })
  @ApiResponse({ status: 409, description: 'COURSE_IN_USE with the curricula that use it' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<SuccessResponse> {
    await this.coursesService.delete(id);
    return { success: true };
  }
}
