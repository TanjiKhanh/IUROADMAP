import { Injectable } from '@nestjs/common';
import { ErrorCodes } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors } from '../../../common/api-errors';
import { RoadmapVersionStatusEnum } from '../../../common/enums';
import { VersionStructureService } from '../../curriculum/services/version-structure.service';
import { RebaseResult, rebaseOverlay } from '../lib/rebase';
import { StudentRoadmapResponse } from '../dto/student-roadmap';
import { UpgradePreviewItemResponse, UpgradePreviewResponse, UpgradeRequest } from '../dto/rebase';
import { MergedViewService } from './merged-view.service';
import { OverlayRepository } from './overlay.repository';

/** Move a roadmap to a newer issue of its year, or to another year (FL-LRN-07). Never automatic. */
@Injectable()
export class RebaseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly views: MergedViewService,
    private readonly overlay: OverlayRepository,
    private readonly structures: VersionStructureService,
  ) {}

  async preview(userId: string, id: number, targetVersionId: number): Promise<UpgradePreviewResponse> {
    const record = await this.views.loadOwned(id, userId);
    const target = await this.loadTarget(record, targetVersionId);
    const { result } = await this.compute(record, target.id);
    const courses = await this.structures.getCourseBriefs([
      ...result.preview.remapped.map((r) => r.courseId),
      ...result.preview.dropped.map((r) => r.courseId),
      ...result.preview.convertedToCustom.map((r) => r.courseId),
    ]);
    const item = (nodeKey: string, courseId: number | null, newNodeKey?: string): UpgradePreviewItemResponse => {
      const course = courseId !== null ? courses.get(courseId) : undefined;
      return { nodeKey, newNodeKey, courseCode: course?.code, courseName: course?.name };
    };
    return {
      targetVersion: {
        id: target.id,
        cohortYear: target.cohort_year,
        revisionNo: target.revision_no ?? undefined,
        totalCredits: target.total_credits,
        status: target.status as RoadmapVersionStatusEnum,
      },
      keptCount: result.preview.kept.length,
      remapped: result.preview.remapped.map((r) => item(r.nodeKey, r.courseId, r.newNodeKey)),
      dropped: result.preview.dropped.map((r) => item(r.nodeKey, r.courseId)),
      convertedToCustom: result.preview.convertedToCustom.map((r) => item(r.nodeKey, r.courseId)),
      droppedTermCount: result.preview.droppedTerms.length,
      droppedEdgeCount: result.preview.droppedEdges.length,
    };
  }

  /** Confirm: one transaction; results follow their node and are never deleted (BR-LRN-11). */
  async upgrade(userId: string, id: number, dto: UpgradeRequest): Promise<StudentRoadmapResponse> {
    const record = await this.views.loadOwned(id, userId);
    const target = await this.loadTarget(record, dto.targetVersionId);

    await this.prisma.$transaction(async (tx) => {
      await this.overlay.bumpRevision(tx, id, dto.revision);
      const before = await this.overlay.loadDeltas(id, tx);
      const { result } = await this.compute(record, target.id, before);
      await this.overlay.persist(tx, id, before, result.state);
      for (const [oldKey, newKey] of result.resultKeyMap) {
        await tx.sTUDENT_COURSE_RESULTS.updateMany({
          where: { student_roadmap_id: id, node_key: oldKey },
          data: { node_key: newKey },
        });
      }
      await tx.sTUDENT_ROADMAPS.update({ where: { id }, data: { version_id: target.id } });
    });
    return this.views.getView(id, userId);
  }

  private async compute(record: any, targetVersionId: number, deltas?: Awaited<ReturnType<OverlayRepository['loadDeltas']>>) {
    const [oldStructure, newStructure] = await Promise.all([
      this.structures.getStructure(record.version_id),
      this.structures.getStructure(targetVersionId),
    ]);
    const current = deltas ?? (await this.overlay.loadDeltas(record.id));
    const results = await this.overlay.loadResults(record.id);
    const result: RebaseResult = rebaseOverlay(
      this.overlay.toBase(oldStructure),
      this.overlay.toBase(newStructure),
      current,
      new Set(results.keys()),
    );
    return { result };
  }

  private async loadTarget(record: any, targetVersionId: number) {
    const target = await this.prisma.rOADMAP_VERSIONS.findUnique({ where: { id: targetVersionId } });
    if (!target || target.roadmap_id !== record.roadmap_id || target.status !== RoadmapVersionStatusEnum.PUBLISHED) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_INPUT, 'The target must be a published curriculum of the same major');
    }
    if (target.id === record.version_id) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_INPUT, 'The roadmap already uses this curriculum');
    }
    return target;
  }
}
