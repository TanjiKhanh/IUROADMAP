import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DropdownItemDto } from '@iuroadmap/shared';
import { AdminOnly } from '../../../common/auth.decorators';
import { ApiPaginatedResponse } from '../../../common/api-paginated-response.decorator';
import { SuccessResponse } from '../../../common/success.response';
import { MajorsService } from '../services/majors.service';
import { MajorCreateRequest, MajorFilterRequest, MajorResponse, MajorUpdateRequest } from '../dto/major';

@ApiTags('Majors')
@Controller({ path: 'majors', version: '1' })
export class MajorsController {
  constructor(private readonly majorsService: MajorsService) {}

  @Post('create')
  @AdminOnly()
  @ApiOperation({ summary: 'Create a major' })
  @ApiResponse({ status: 201, type: MajorResponse })
  async create(@Body() dto: MajorCreateRequest): Promise<MajorResponse> {
    return this.majorsService.create(dto);
  }

  @Post('update')
  @AdminOnly()
  @ApiOperation({ summary: 'Update a major' })
  @ApiResponse({ status: 200, type: MajorResponse })
  async update(@Body() dto: MajorUpdateRequest): Promise<MajorResponse> {
    const { id, ...data } = dto;
    return this.majorsService.update(id, data);
  }

  @Get('getById/:id')
  @AdminOnly()
  @ApiOperation({ summary: 'Get a major by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: MajorResponse })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<MajorResponse> {
    return this.majorsService.findById(id);
  }

  @Get('GetByIndex')
  @AdminOnly()
  @ApiOperation({ summary: 'Paginated list of majors' })
  @ApiPaginatedResponse(MajorResponse)
  async getByIndex(@Query() filter: MajorFilterRequest) {
    return this.majorsService.findAll(filter);
  }

  @Get('ForDropdown')
  @ApiOperation({ summary: 'Majors for dropdowns (public: used by Explore filters)' })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'departmentId', required: false, type: Number })
  @ApiResponse({ status: 200, type: [DropdownItemDto] })
  async forDropdown(
    @Query('keyword') keyword?: string,
    @Query('limit') limit?: number,
    @Query('departmentId') departmentId?: number,
  ): Promise<DropdownItemDto[]> {
    return this.majorsService.getDropdownList(keyword, Number(limit) || 50, departmentId ? Number(departmentId) : undefined);
  }

  @Post('delete/:id')
  @AdminOnly()
  @ApiOperation({ summary: 'Delete a major (blocked once a curriculum has been published)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: SuccessResponse })
  @ApiResponse({ status: 409, description: 'MAJOR_HAS_PUBLISHED_CURRICULUM' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<SuccessResponse> {
    await this.majorsService.delete(id);
    return { success: true };
  }
}
