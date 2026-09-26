import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminOnly } from '../../../common/auth.decorators';
import { ApiPaginatedResponse } from '../../../common/api-paginated-response.decorator';
import { SuccessResponse } from '../../../common/success.response';
import { CourseCategoriesService } from '../services/course-categories.service';
import {
  CourseCategoryCreateRequest,
  CourseCategoryFilterRequest,
  CourseCategoryResponse,
  CourseCategoryUpdateRequest,
} from '../dto/course-category';

@ApiTags('Course Categories')
@Controller({ path: 'course-categories', version: '1' })
export class CourseCategoriesController {
  constructor(private readonly categoriesService: CourseCategoriesService) {}

  @Post('create')
  @AdminOnly()
  @ApiOperation({ summary: 'Create a course category (node color)' })
  @ApiResponse({ status: 201, type: CourseCategoryResponse })
  async create(@Body() dto: CourseCategoryCreateRequest): Promise<CourseCategoryResponse> {
    return this.categoriesService.create(dto);
  }

  @Post('update')
  @AdminOnly()
  @ApiOperation({ summary: 'Update a course category' })
  @ApiResponse({ status: 200, type: CourseCategoryResponse })
  async update(@Body() dto: CourseCategoryUpdateRequest): Promise<CourseCategoryResponse> {
    const { id, ...data } = dto;
    return this.categoriesService.update(id, data);
  }

  @Get('getById/:id')
  @AdminOnly()
  @ApiOperation({ summary: 'Get a course category by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CourseCategoryResponse })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<CourseCategoryResponse> {
    return this.categoriesService.findById(id);
  }

  @Get('GetByIndex')
  @AdminOnly()
  @ApiOperation({ summary: 'Paginated list of course categories' })
  @ApiPaginatedResponse(CourseCategoryResponse)
  async getByIndex(@Query() filter: CourseCategoryFilterRequest) {
    return this.categoriesService.findAll(filter);
  }

  @Get('GetAll')
  @ApiOperation({ summary: 'All categories with colors, ordered for the legend (public)' })
  @ApiResponse({ status: 200, type: [CourseCategoryResponse] })
  async getAll(): Promise<CourseCategoryResponse[]> {
    return this.categoriesService.findAllForLegend();
  }

  @Post('delete/:id')
  @AdminOnly()
  @ApiOperation({ summary: 'Delete a course category (blocked while courses use it)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: SuccessResponse })
  @ApiResponse({ status: 409, description: 'CATEGORY_IN_USE' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<SuccessResponse> {
    await this.categoriesService.delete(id);
    return { success: true };
  }
}
