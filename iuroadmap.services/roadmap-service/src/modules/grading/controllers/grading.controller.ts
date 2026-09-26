import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminOnly } from '../../../common/auth.decorators';
import { GradingService } from '../services/grading.service';
import { GradeScaleResponse, GradeScaleSaveRequest } from '../dto/grade-scale';
import { AcademicClassificationResponse, AcademicClassificationSaveRequest } from '../dto/academic-classification';
import { GradingConfigResponse } from '../dto/grading-config/grading-config.response';

@ApiTags('Grading')
@Controller({ version: '1' })
export class GradingController {
  constructor(private readonly gradingService: GradingService) {}

  @Get('admin/grade-scales/GetAll')
  @AdminOnly()
  @ApiOperation({ summary: 'Grade scale bands (100 scale → letter → 4 scale)' })
  @ApiResponse({ status: 200, type: [GradeScaleResponse] })
  async getGradeScales(): Promise<GradeScaleResponse[]> {
    return this.gradingService.getGradeScales();
  }

  @Post('admin/grade-scales/save')
  @AdminOnly()
  @ApiOperation({ summary: 'Replace the grade scale (bands must cover 0..100); applies retroactively' })
  @ApiResponse({ status: 200, type: [GradeScaleResponse] })
  @ApiResponse({ status: 400, description: 'INVALID_GRADE_SCALE' })
  async saveGradeScales(@Body() dto: GradeScaleSaveRequest): Promise<GradeScaleResponse[]> {
    return this.gradingService.saveGradeScales(dto);
  }

  @Get('admin/academic-classifications/GetAll')
  @AdminOnly()
  @ApiOperation({ summary: 'Academic classification bands (GPA 100)' })
  @ApiResponse({ status: 200, type: [AcademicClassificationResponse] })
  async getClassifications(): Promise<AcademicClassificationResponse[]> {
    return this.gradingService.getClassifications();
  }

  @Post('admin/academic-classifications/save')
  @AdminOnly()
  @ApiOperation({ summary: 'Replace the academic classification bands (must cover GPA 0..100)' })
  @ApiResponse({ status: 200, type: [AcademicClassificationResponse] })
  @ApiResponse({ status: 400, description: 'INVALID_GRADE_SCALE' })
  async saveClassifications(@Body() dto: AcademicClassificationSaveRequest): Promise<AcademicClassificationResponse[]> {
    return this.gradingService.saveClassifications(dto);
  }

  @Get('explore/grading-config')
  @ApiOperation({ summary: 'Grade scale and classifications (public, for the results drawer)' })
  @ApiResponse({ status: 200, type: GradingConfigResponse })
  async getConfig(): Promise<GradingConfigResponse> {
    return this.gradingService.getConfig();
  }
}
