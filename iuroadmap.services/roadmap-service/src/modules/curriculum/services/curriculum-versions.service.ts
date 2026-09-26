import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AppConstant, ErrorCodes } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors, handlePrismaError } from '../../../common/api-errors';
import { RoadmapVersionStatusEnum, TermKindEnum } from '../../../common/enums';
import {
  CurriculumValidationResponse,
  CurriculumVersionCreateRequest,
  CurriculumVersionResponse,
  CurriculumVersionUpdateRequest,
} from '../dto/curriculum-version';
import { VersionStructureService } from './version-structure.service';

const ENTITY = 'Curriculum';
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const INCLUDE = {
  roadmap: { select: { id: true, name: true, slug: true } },
  _count: { select: { studentRoadmaps: true, nodes: true } },
} as const;

/**
 * Curriculum-by-year lifecycle (FL-RDM-04, design §5):
 * T1 create draft · T2 publish · T3 archive · T4 unarchive · T5 discard draft ·
 * T6 auto-archive the previous PUBLISHED issue of the same year when a new one is published.
 */
@Injectable()
export class CurriculumVersionsService {
  private readonly logger = new Logger(CurriculumVersionsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly structures: VersionStructureService,
  ) {}

  async list(roadmapId: number): Promise<CurriculumVersionResponse[]> {
    await this.ensureMajor(roadmapId);
    const rows = await this.prisma.rOADMAP_VERSIONS.findMany({
      where: { roadmap_id: roadmapId },
      include: INCLUDE,
      orderBy: [{ cohort_year: 'desc' }, { revision_no: { sort: 'desc', nulls: 'first' } }],
    });
    return rows.map((r) => this.toResponse(r));
  }

  async getById(id: number): Promise<CurriculumVersionResponse> {
    return this.toResponse(await this.load(id));
  }

  /** T1 — one DRAFT per (major, year) (BR-RM-07); copy keeps every key (BR-RM-13). */
  async create(roadmapId: number, dto: CurriculumVersionCreateRequest): Promise<CurriculumVersionResponse> {
    await this.ensureMajor(roadmapId);
    const draft = await this.prisma.rOADMAP_VERSIONS.findFirst({
      where: { roadmap_id: roadmapId, cohort_year: dto.cohortYear, status: RoadmapVersionStatusEnum.DRAFT },
      select: { id: true },
    });
    if (draft) {
      throw ApiErrors.conflict(ErrorCodes.ROADMAP_DRAFT_EXISTS, `A draft already exists for ${dto.cohortYear}`, {
        draftId: draft.id,
      });
    }

    const source = dto.fromVersionId ? await this.structures.getStructure(dto.fromVersionId) : null;
    if (dto.fromVersionId) {
      const from = await this.prisma.rOADMAP_VERSIONS.findUnique({ where: { id: dto.fromVersionId }, select: { roadmap_id: true } });
      if (!from || from.roadmap_id !== roadmapId) throw ApiErrors.notFound(`Source curriculum ${dto.fromVersionId} not found in this major`);
    }

    try {
      const created = await this.prisma.$transaction(async (tx) => {
        const version = await tx.rOADMAP_VERSIONS.create({
          data: {
            roadmap_id: roadmapId,
            cohort_year: dto.cohortYear,
            total_credits: dto.totalCredits,
            decision_ref: dto.decisionRef,
            status: RoadmapVersionStatusEnum.DRAFT,
          },
        });

        const terms = source
          ? source.terms.map((t) => ({ term_key: t.termKey, order_index: t.orderIndex, kind: t.kind, semester_no: t.semesterNo }))
          : this.blankTerms();
        const createdTerms = await tx.rOADMAP_TERMS.createManyAndReturn({
          data: terms.map((t) => ({ ...t, version_id: version.id })),
        });

        if (source) {
          const termId = new Map(createdTerms.map((t) => [t.term_key, t.id]));
          const createdNodes = await tx.rOADMAP_NODES.createManyAndReturn({
            data: source.nodes.map((n) => ({
              version_id: version.id,
              node_key: n.nodeKey,
              term_id: termId.get(n.termKey)!,
              row_index: n.rowIndex,
              kind: n.kind,
              course_id: n.courseId,
              slot_label: n.slotLabel,
              slot_theory_credits: n.slotTheoryCredits,
              slot_lab_credits: n.slotLabCredits,
              elective_group: n.electiveGroup,
              choice_group: n.choiceGroup,
              condition: n.condition,
            })),
          });
          const nodeId = new Map(createdNodes.map((n) => [n.node_key, n.id]));
          if (source.edges.length) {
            await tx.rOADMAP_EDGES.createMany({
              data: source.edges.map((e) => ({
                version_id: version.id,
                edge_key: e.edgeKey,
                source_node_id: nodeId.get(e.sourceKey)!,
                target_node_id: nodeId.get(e.targetKey)!,
                type: e.type,
              })),
            });
          }
        }
        return version;
      });
      return this.getById(created.id);
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'create');
    }
  }

  async update(id: number, dto: CurriculumVersionUpdateRequest): Promise<CurriculumVersionResponse> {
    await this.assertDraft(id);
    try {
      await this.prisma.rOADMAP_VERSIONS.update({
        where: { id },
        data: { total_credits: dto.totalCredits, decision_ref: dto.decisionRef },
      });
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'update', id);
    }
    return this.getById(id);
  }

  async validate(id: number): Promise<CurriculumValidationResponse> {
    const version = await this.load(id);
    const structure = await this.structures.getStructure(id);
    const courses = await this.structures.getCourseBriefs(structure.nodes.map((n) => n.courseId));
    return this.structures.validate(structure, courses, version.total_credits);
  }

  /** T2 (+T6) — errors block; warnings need acknowledgeWarnings (BR-RM-09, BR-RM-15). */
  async publish(id: number, acknowledgeWarnings: boolean, userId?: string | null): Promise<CurriculumVersionResponse> {
    const version = await this.assertDraft(id);
    const issues = await this.validate(id);
    if (issues.errors.length) {
      throw ApiErrors.badRequest(ErrorCodes.PUBLISH_VALIDATION_FAILED, 'The curriculum has errors', { issues });
    }
    if (issues.warnings.length && !acknowledgeWarnings) {
      throw ApiErrors.badRequest(ErrorCodes.PUBLISH_WARNINGS_NOT_ACKNOWLEDGED, 'Warnings must be acknowledged', { issues });
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.rOADMAP_VERSIONS.updateMany({
        where: { roadmap_id: version.roadmap_id, cohort_year: version.cohort_year, status: RoadmapVersionStatusEnum.PUBLISHED },
        data: { status: RoadmapVersionStatusEnum.ARCHIVED },
      });
      const latest = await tx.rOADMAP_VERSIONS.aggregate({
        where: { roadmap_id: version.roadmap_id, cohort_year: version.cohort_year },
        _max: { revision_no: true },
      });
      await tx.rOADMAP_VERSIONS.update({
        where: { id },
        data: {
          status: RoadmapVersionStatusEnum.PUBLISHED,
          revision_no: (latest._max.revision_no ?? 0) + 1,
          published_at: new Date(),
          published_by: userId && UUID_PATTERN.test(userId) ? userId : null,
        },
      });
    });
    this.structures.evict(id);
    return this.getById(id);
  }

  /** T3 */
  async archive(id: number): Promise<CurriculumVersionResponse> {
    const version = await this.load(id);
    if (version.status !== RoadmapVersionStatusEnum.PUBLISHED) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_TRANSITION, 'Only a PUBLISHED curriculum can be archived', {
        currentStatus: version.status,
      });
    }
    await this.prisma.rOADMAP_VERSIONS.update({ where: { id }, data: { status: RoadmapVersionStatusEnum.ARCHIVED } });
    return this.getById(id);
  }

  /** T4 — only when the year has no other PUBLISHED issue (BR-RM-15). */
  async unarchive(id: number): Promise<CurriculumVersionResponse> {
    const version = await this.load(id);
    if (version.status !== RoadmapVersionStatusEnum.ARCHIVED) {
      throw ApiErrors.badRequest(ErrorCodes.INVALID_TRANSITION, 'Only an ARCHIVED curriculum can be unarchived', {
        currentStatus: version.status,
      });
    }
    const published = await this.prisma.rOADMAP_VERSIONS.findFirst({
      where: { roadmap_id: version.roadmap_id, cohort_year: version.cohort_year, status: RoadmapVersionStatusEnum.PUBLISHED },
      select: { id: true },
    });
    if (published) {
      throw ApiErrors.conflict(ErrorCodes.CURRICULUM_YEAR_ALREADY_PUBLISHED, `${version.cohort_year} already has a published curriculum`, {
        publishedId: published.id,
      });
    }
    await this.prisma.rOADMAP_VERSIONS.update({ where: { id }, data: { status: RoadmapVersionStatusEnum.PUBLISHED } });
    return this.getById(id);
  }

  /** T5 — only drafts can be deleted (BR-RM-11). */
  async delete(id: number): Promise<void> {
    await this.assertDraft(id);
    try {
      await this.prisma.rOADMAP_VERSIONS.delete({ where: { id } });
    } catch (error) {
      handlePrismaError(this.logger, error, ENTITY, 'delete', id);
    }
  }

  async assertDraft(id: number) {
    const version = await this.load(id);
    if (version.status !== RoadmapVersionStatusEnum.DRAFT) {
      throw ApiErrors.conflict(ErrorCodes.ROADMAP_VERSION_IMMUTABLE, 'Only a DRAFT curriculum can be changed', {
        currentStatus: version.status,
      });
    }
    return version;
  }

  async load(id: number) {
    const version = await this.prisma.rOADMAP_VERSIONS.findUnique({ where: { id }, include: INCLUDE });
    if (!version) throw ApiErrors.notFound(`${ENTITY} with id ${id} not found`);
    return version;
  }

  toResponse(r: any): CurriculumVersionResponse {
    const isDraft = r.status === RoadmapVersionStatusEnum.DRAFT;
    return {
      id: r.id,
      roadmapId: r.roadmap_id,
      majorName: r.roadmap?.name ?? '',
      majorSlug: r.roadmap?.slug ?? '',
      cohortYear: r.cohort_year,
      revisionNo: r.revision_no ?? undefined,
      totalCredits: r.total_credits,
      decisionRef: r.decision_ref ?? undefined,
      status: r.status,
      revision: r.revision,
      publishedAt: r.published_at ? r.published_at.toISOString() : undefined,
      learnerCount: r._count?.studentRoadmaps ?? 0,
      nodeCount: r._count?.nodes ?? 0,
      canDelete: isDraft,
      canUpdate: isDraft,
      createdAt: r.created_at.toISOString(),
    };
  }

  private blankTerms() {
    const terms: Array<{ term_key: string; order_index: number; kind: TermKindEnum; semester_no: number | null }> = [];
    for (let s = 1; s <= AppConstant.Roadmap.DefaultSemesterCount; s++) {
      terms.push({ term_key: randomUUID(), order_index: s - 1, kind: TermKindEnum.REGULAR, semester_no: s });
    }
    terms.push({
      term_key: randomUUID(),
      order_index: AppConstant.Roadmap.DefaultSemesterCount,
      kind: TermKindEnum.ELECTIVE_POOL,
      semester_no: null,
    });
    return terms;
  }

  private async ensureMajor(roadmapId: number): Promise<void> {
    const found = await this.prisma.mAJOR_ROADMAPS.findUnique({ where: { id: roadmapId }, select: { id: true } });
    if (!found) throw ApiErrors.notFound(`Major with id ${roadmapId} not found`);
  }
}
