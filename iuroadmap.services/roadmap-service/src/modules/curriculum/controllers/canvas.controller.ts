import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminOnly } from '../../../common/auth.decorators';
import { CanvasService } from '../services/canvas.service';
import { CanvasResponse, CanvasSaveRequest } from '../dto/canvas';

@ApiTags('Admin Canvas')
@Controller({ path: 'admin/roadmap-versions', version: '1' })
export class CanvasController {
  constructor(private readonly canvasService: CanvasService) {}

  @Get(':id/canvas')
  @AdminOnly()
  @ApiOperation({ summary: 'Semester canvas of a curriculum (terms, nodes, relations, issues)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CanvasResponse })
  async getCanvas(@Param('id', ParseIntPipe) id: number): Promise<CanvasResponse> {
    return this.canvasService.getCanvas(id);
  }

  @Post(':id/canvas/save')
  @AdminOnly()
  @ApiOperation({ summary: 'Save the full canvas of a DRAFT (matched by key, one transaction)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CanvasResponse })
  @ApiResponse({ status: 400, description: 'CYCLE_DETECTED / INVALID_INPUT' })
  @ApiResponse({ status: 409, description: 'REVISION_CONFLICT / ROADMAP_VERSION_IMMUTABLE / DUPLICATE_COURSE_IN_PLAN' })
  async save(@Param('id', ParseIntPipe) id: number, @Body() dto: CanvasSaveRequest): Promise<CanvasResponse> {
    return this.canvasService.save(id, dto);
  }
}
