import { Injectable } from '@nestjs/common';
import {
  ClassificationBand,
  ErrorCodes,
  GradeBand,
  validateClassificationBands,
  validateGradeBands,
} from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors } from '../../../common/api-errors';
import { GradeScaleResponse, GradeScaleSaveRequest } from '../dto/grade-scale';
import { AcademicClassificationResponse, AcademicClassificationSaveRequest } from '../dto/academic-classification';
import { GradingConfigResponse } from '../dto/grading-config/grading-config.response';

/**
 * Grade scale and academic classification (FL-RDM-09). Letters, points and classifications are
 * always derived at read time, so saving a new scale applies retroactively (FR-RDM.09.4).
 */
@Injectable()
export class GradingService {
  constructor(private readonly prisma: PrismaService) {}

  async getGradeScales(): Promise<GradeScaleResponse[]> {
    const rows = await this.prisma.gRADE_SCALES.findMany({ orderBy: { min_score: 'desc' } });
    return rows.map((r) => ({
      id: r.id,
      letter: r.letter,
      minScore: r.min_score,
      maxScore: r.max_score,
      gradePoint: Number(r.grade_point),
      isPassing: r.is_passing,
    }));
  }

  async getClassifications(): Promise<AcademicClassificationResponse[]> {
    const rows = await this.prisma.aCADEMIC_CLASSIFICATIONS.findMany({ orderBy: { min_gpa100: 'desc' } });
    return rows.map((r) => ({
      id: r.id,
      labelKey: r.label_key,
      minGpa100: Number(r.min_gpa100),
      maxGpa100: Number(r.max_gpa100),
    }));
  }

  async getConfig(): Promise<GradingConfigResponse> {
    const [gradeScales, classifications] = await Promise.all([this.getGradeScales(), this.getClassifications()]);
    return { gradeScales, classifications };
  }

  /** Engine-friendly bands for GPA and state computation. */
  async getBands(): Promise<{ grades: GradeBand[]; classifications: ClassificationBand[] }> {
    const { gradeScales, classifications } = await this.getConfig();
    return {
      grades: gradeScales.map(({ letter, minScore, maxScore, gradePoint, isPassing }) => ({
        letter,
        minScore,
        maxScore,
        gradePoint,
        isPassing,
      })),
      classifications: classifications.map(({ labelKey, minGpa100, maxGpa100 }) => ({ labelKey, minGpa100, maxGpa100 })),
    };
  }

  async saveGradeScales(dto: GradeScaleSaveRequest): Promise<GradeScaleResponse[]> {
    const letters = dto.items.map((i) => i.letter);
    if (new Set(letters).size !== letters.length) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_GRADE_SCALE, 'Letters must be unique');
    }
    const problems = validateGradeBands(dto.items);
    if (problems.length) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_GRADE_SCALE, 'Grade bands must cover 0..100 with no gap or overlap', {
        problems,
      });
    }
    await this.prisma.$transaction([
      this.prisma.gRADE_SCALES.deleteMany({}),
      this.prisma.gRADE_SCALES.createMany({
        data: dto.items.map((i) => ({
          letter: i.letter,
          min_score: i.minScore,
          max_score: i.maxScore,
          grade_point: i.gradePoint,
          is_passing: i.isPassing,
        })),
      }),
    ]);
    return this.getGradeScales();
  }

  async saveClassifications(dto: AcademicClassificationSaveRequest): Promise<AcademicClassificationResponse[]> {
    const keys = dto.items.map((i) => i.labelKey);
    if (new Set(keys).size !== keys.length) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_GRADE_SCALE, 'Label keys must be unique');
    }
    const problems = validateClassificationBands(dto.items);
    if (problems.length) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_GRADE_SCALE, 'Classifications must cover GPA 0..100 with no gap or overlap', {
        problems,
      });
    }
    await this.prisma.$transaction([
      this.prisma.aCADEMIC_CLASSIFICATIONS.deleteMany({}),
      this.prisma.aCADEMIC_CLASSIFICATIONS.createMany({
        data: dto.items.map((i) => ({ label_key: i.labelKey, min_gpa100: i.minGpa100, max_gpa100: i.maxGpa100 })),
      }),
    ]);
    return this.getClassifications();
  }
}
