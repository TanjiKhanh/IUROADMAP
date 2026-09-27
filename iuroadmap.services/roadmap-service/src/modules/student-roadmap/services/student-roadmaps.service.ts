import { Injectable, Logger } from '@nestjs/common';
import { AppConstant, ErrorCodes } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors, handlePrismaError } from '../../../common/api-errors';
import { RoadmapVersionStatusEnum, StudentRoadmapStatusEnum } from '../../../common/enums';
import { VersionStructureService } from '../../curriculum/services/version-structure.service';
import { ChangeOp, applyOps } from '../lib/apply-ops';
import { cloneDeltaState } from '../lib/overlay-types';
import { StudentRoadmapCloneRequest, StudentRoadmapResponse, StudentRoadmapSummaryResponse } from '../dto/student-roadmap';
import { RoadmapChangesRequest, RoadmapResetRequest, RoadmapResetScope } from '../dto/roadmap-change';
import { MergedViewService, STUDENT_ROADMAP_INCLUDE } from './merged-view.service';
import { OverlayRepository, toHttpError } from './overlay.repository';

/** Student roadmap lifecycle and structure changes (FL-LRN-02/03/04/09). */
@Injectable()
export class StudentRoadmapsService {
  private readonly logger = new Logger(StudentRoadmapsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly views: MergedViewService,
    private readonly overlay: OverlayRepository,
    private readonly structures: VersionStructureService,
  ) {}

  /** Clone = one row, no copy of nodes, edges or progress (BR-LRN-06). */
  async clone(userId: string, dto: StudentRoadmapCloneRequest): Promise<StudentRoadmapSummaryResponse> {
    const version = await this.prisma.rOADMAP_VERSIONS.findUnique({ where: { id: dto.versionId }, select: { roadmap_id: true, status: true } });
    if (!version || version.roadmap_id !== dto.roadmapId || version.status !== RoadmapVersionStatusEnum.PUBLISHED) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_INPUT, 'The curriculum is not a published curriculum of this major');
    }
    const existing = await this.prisma.sTUDENT_ROADMAPS.findUnique({
      where: { user_id_roadmap_id: { user_id: userId, roadmap_id: dto.roadmapId } },
      select: { id: true, status: true },
    });
    if (existing) {
      throw ApiErrors.conflict(ErrorCodes.ALREADY_CLONED, 'You already have a roadmap for this major', {
        studentRoadmapId: existing.id,
        status: existing.status,
      });
    }
    try {
      const record = await this.prisma.sTUDENT_ROADMAPS.create({
        data: { user_id: userId, roadmap_id: dto.roadmapId, version_id: dto.versionId },
        include: STUDENT_ROADMAP_INCLUDE,
      });
      return this.views.toSummary(await this.views.compute(record));
    } catch (error) {
      handlePrismaError(this.logger, error, 'Student roadmap', 'clone');
    }
  }

  async my(userId: string, includeDropped = false): Promise<StudentRoadmapSummaryResponse[]> {
    const records = await this.prisma.sTUDENT_ROADMAPS.findMany({
      where: { user_id: userId, ...(includeDropped ? {} : { status: { not: StudentRoadmapStatusEnum.DROPPED } }) },
      include: STUDENT_ROADMAP_INCLUDE,
      orderBy: { updated_at: 'desc' },
    });
    return Promise.all(records.map(async (r) => this.views.toSummary(await this.views.compute(r))));
  }

  async get(userId: string, id: number): Promise<StudentRoadmapResponse> {
    return this.views.getView(id, userId);
  }

  /** One batch in one transaction (design §6.4): lock → apply → normalize → check → write. */
  async applyChanges(userId: string, id: number, dto: RoadmapChangesRequest): Promise<StudentRoadmapResponse> {
    const record = await this.views.loadOwned(id, userId);
    const structure = await this.structures.getStructure(record.version_id);
    const base = this.overlay.toBase(structure);
    const courseIds = [
      ...new Set(dto.ops.map((o) => o.courseId).filter((c): c is number => typeof c === 'number')),
    ];
    const known = courseIds.length
      ? new Set((await this.prisma.cOURSES.findMany({ where: { id: { in: courseIds } }, select: { id: true } })).map((c) => c.id))
      : new Set<number>();

    try {
      await this.prisma.$transaction(async (tx) => {
        await this.overlay.bumpRevision(tx, id, dto.revision);
        const before = await this.overlay.loadDeltas(id, tx);
        const results = await this.overlay.loadResults(id, tx);
        const after = applyOps(
          {
            base,
            resultNodeKeys: new Set(results.keys()),
            knownCourseIds: known,
            maxTermCount: AppConstant.Roadmap.MaxTermCount,
          },
          before,
          dto.ops.map((o) => ({ ...o }) as ChangeOp),
        );
        await this.overlay.persist(tx, id, before, after);
      });
    } catch (error) {
      throw toHttpError(error);
    }
    return this.views.getView(id, userId);
  }

  /** Reset one curriculum node, or all structural changes; results stay (FR-LRN.04.11). */
  async reset(userId: string, id: number, dto: RoadmapResetRequest): Promise<StudentRoadmapResponse> {
    if (dto.scope === RoadmapResetScope.NODE) {
      if (!dto.nodeKey) throw ApiErrors.badRequest(ErrorCodes.INVALID_INPUT, 'nodeKey is required when scope = NODE');
      return this.applyChanges(userId, id, { revision: dto.revision, ops: [{ op: 'RESET_NODE', nodeKey: dto.nodeKey } as any] });
    }

    await this.views.loadOwned(id, userId);
    await this.prisma.$transaction(async (tx) => {
      await this.overlay.bumpRevision(tx, id, dto.revision);
      const before = await this.overlay.loadDeltas(id, tx);
      const results = await this.overlay.loadResults(id, tx);
      const gradedCustom = [...before.nodes.values()].filter((n) => n.origin === 'CUSTOM' && results.has(n.nodeKey));
      if (gradedCustom.length) {
        throw ApiErrors.conflict(ErrorCodes.NODE_HAS_RESULT, 'Some courses you added already have results', {
          nodeKeys: gradedCustom.map((n) => n.nodeKey),
        });
      }
      const slotsWithResults = [...before.nodes.values()].filter((n) => n.origin === 'BASE' && n.courseId !== null && results.has(n.nodeKey));
      const after = cloneDeltaState(before);
      after.edges.clear();
      for (const [key, n] of after.nodes) {
        if (slotsWithResults.some((s) => s.nodeKey === key)) {
          n.termKey = null;
          n.rowOrder = null;
        } else {
          after.nodes.delete(key);
        }
      }
      // Custom terms go; graded slots that sat in one fall back to their curriculum term.
      for (const [key, t] of after.terms) if (t.origin === 'CUSTOM') after.terms.delete(key);
      await this.overlay.persist(tx, id, before, after);
    });
    return this.views.getView(id, userId);
  }

  async setStatus(userId: string, id: number, status: StudentRoadmapStatusEnum): Promise<StudentRoadmapSummaryResponse> {
    const record = await this.views.loadOwned(id, userId);
    const updated = await this.prisma.sTUDENT_ROADMAPS.update({
      where: { id: record.id },
      data: { status },
      include: STUDENT_ROADMAP_INCLUDE,
    });
    return this.views.toSummary(await this.views.compute(updated));
  }

  /** Hard delete (FR-LRN.09.3): overlay and results are removed with the roadmap. */
  async delete(userId: string, id: number): Promise<void> {
    const record = await this.views.loadOwned(id, userId);
    await this.prisma.sTUDENT_ROADMAPS.delete({ where: { id: record.id } });
  }
}
