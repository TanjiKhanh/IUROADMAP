import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DropdownItemDto } from '@iuroadmap/shared';
import { AdminOnly } from '../../../common/auth.decorators';
import { ApiPaginatedResponse } from '../../../common/api-paginated-response.decorator';
import { SuccessResponse } from '../../../common/success.response';
import { LecturersService } from '../services/lecturers.service';
import { LecturerCreateRequest, LecturerFilterRequest, LecturerResponse, LecturerUpdateRequest } from '../dto/lecturer';

@ApiTags('Lecturers')
@Controller({ path: 'lecturers', version: '1' })
export class LecturersController {
  constructor(private readonly lecturersService: LecturersService) {}

  @Post('create')
  @AdminOnly()
  @ApiOperation({ summary: 'Create a lecturer (master data, shared with FL-LR)' })
  @ApiResponse({ status: 201, type: LecturerResponse })
  async create(@Body() dto: LecturerCreateRequest): Promise<LecturerResponse> {
    return this.lecturersService.create(dto);
  }

  @Post('update')
  @AdminOnly()
  @ApiOperation({ summary: 'Update a lecturer' })
  @ApiResponse({ status: 200, type: LecturerResponse })
  async update(@Body() dto: LecturerUpdateRequest): Promise<LecturerResponse> {
    const { id, ...data } = dto;
    return this.lecturersService.update(id, data);
  }

  @Get('getById/:id')
  @AdminOnly()
  @ApiOperation({ summary: 'Get a lecturer by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: LecturerResponse })
  async getById(@Param('id', ParseIntPipe) id: number): Promise<LecturerResponse> {
    return this.lecturersService.findById(id);
  }

  @Get('GetByIndex')
  @AdminOnly()
  @ApiOperation({ summary: 'Paginated list of lecturers' })
  @ApiPaginatedResponse(LecturerResponse)
  async getByIndex(@Query() filter: LecturerFilterRequest) {
    return this.lecturersService.findAll(filter);
  }

  @Get('ForDropdown')
  @ApiOperation({ summary: 'Lecturers for dropdowns (public: Course Explorer filter)' })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'departmentId', required: false, type: Number })
  @ApiQuery({ name: 'academicYear', required: false, type: Number, description: 'Only lecturers teaching a published offering that year' })
  @ApiResponse({ status: 200, type: [DropdownItemDto] })
  async forDropdown(
    @Query('keyword') keyword?: string,
    @Query('limit') limit?: number,
    @Query('departmentId') departmentId?: number,
    @Query('academicYear') academicYear?: number,
  ): Promise<DropdownItemDto[]> {
    return this.lecturersService.getDropdownList(
      keyword,
      Number(limit) || 50,
      departmentId ? Number(departmentId) : undefined,
      academicYear ? Number(academicYear) : undefined,
    );
  }

  @Post('delete/:id')
  @AdminOnly()
  @ApiOperation({ summary: 'Delete a lecturer (blocked while assigned to an offering)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: SuccessResponse })
  @ApiResponse({ status: 409, description: 'LECTURER_IN_USE' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<SuccessResponse> {
    await this.lecturersService.delete(id);
    return { success: true };
  }
}
