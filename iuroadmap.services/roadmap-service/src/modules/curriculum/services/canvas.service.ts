import { Injectable, Logger } from '@nestjs/common';
import { ErrorCodes, findCycle, termCreditSummary } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors, handlePrismaError } from '../../../common/api-errors';
import { RoadmapNodeKindEnum, TermKindEnum } from '../../../common/enums';
import { CourseBriefResponse } from '../../course-catalog/dto/course/course-brief.response';
import { CanvasEdgeResponse, CanvasNodeResponse, CanvasResponse, CanvasSaveRequest, CanvasTermResponse } from '../dto/canvas';
import { CurriculumVersionsService } from './curriculum-versions.service';
import { StructureNode, VersionStructure, VersionStructureService } from './version-structure.service';

export interface CanvasView {
  terms: CanvasTermResponse[];
  nodes: CanvasNodeResponse[];
  edges: CanvasEdgeResponse[];
}

/** Semester canvas of a curriculum (FL-RDM-05/06/07). */
@Injectable()
export class CanvasService {
  private readonly logger = new Logger(CanvasService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly versions: CurriculumVersionsService,
    private readonly structures: VersionStructureService,
  ) {}

  async getCanvas(versionId: number): Promise<CanvasResponse> {
    const version = await this.versions.load(versionId);
    const structure = await this.structures.getStructure(versionId);
    const courses = await this.structures.getCourseBriefs(structure.nodes.map((n) => n.courseId));
    return {
      version: this.versions.toResponse(version),
      ...this.buildView(structure, courses),
      issues: this.structures.validate(structure, courses, version.total_credits),
    };
  }

  /** Read-only view used by the canvas and by the Explore preview. */
  buildView(structure: Pick<VersionStructure, 'terms' | 'nodes' | 'edges'>, courses: Map<number, CourseBriefResponse>): CanvasView {
    const terms = structure.terms.map((t) => {
      const inTerm = structure.nodes.filter((n) => n.termKey === t.termKey).map((n) => this.structures.toValidationNode(n, courses));
      const { courseCredits, slotCredits } = termCreditSummary({ key: t.termKey, kind: t.kind }, inTerm);
      return {
        termKey: t.termKey,
        kind: t.kind,
        semesterNo: t.semesterNo ?? undefined,
        orderIndex: t.orderIndex,
        courseCredits,
        slotCredits,
      };
    });
    const nodes = structure.nodes.map((n) => this.toNodeResponse(n, courses));
    return { terms, nodes, edges: structure.edges.map((e) => ({ ...e })) };
  }

  /**
   * Saves the full canvas of a DRAFT in one transaction (FR-RDM.05.8). Keys are kept, so
   * deleting and re-creating rows is safe: nothing references a draft's row ids.
   */
  async save(versionId: number, dto: CanvasSaveRequest): Promise<CanvasResponse> {
    const version = await this.versions.assertDraft(versionId);
    if (version.revision !== dto.revision) {
      throw ApiErrors.conflict(ErrorCodes.REVISION_CONFLICT, 'The canvas was changed elsewhere', {
        currentRevision: version.revision,
      });
    }
    await this.assertValidPayload(dto);

    try {
      await this.prisma.$transaction(async (tx) => {
        const updated = await tx.rOADMAP_VERSIONS.updateMany({
          where: { id: versionId, revision: dto.revision },
          data: { revision: { increment: 1 } },
        });
        if (updated.count !== 1) {
          throw ApiErrors.conflict(ErrorCodes.REVISION_CONFLICT, 'The canvas was changed elsewhere');
        }
        await tx.rOADMAP_EDGES.deleteMany({ where: { version_id: versionId } });
        await tx.rOADMAP_NODES.deleteMany({ where: { version_id: versionId } });
        await tx.rOADMAP_TERMS.deleteMany({ where: { version_id: versionId } });

        const terms = await tx.rOADMAP_TERMS.createManyAndReturn({
          data: dto.terms.map((t, i) => ({
            version_id: versionId,
            term_key: t.termKey,
            order_index: i,
            kind: t.kind,
            semester_no: t.kind === TermKindEnum.REGULAR ? t.semesterNo ?? null : null,
          })),
        });
        const termId = new Map(terms.map((t) => [t.term_key, t.id]));

        const nodes = dto.nodes.length
          ? await tx.rOADMAP_NODES.createManyAndReturn({
              data: dto.nodes.map((n) => {
                const isSlot = n.kind === RoadmapNodeKindEnum.ELECTIVE_SLOT;
                return {
                  version_id: versionId,
                  node_key: n.nodeKey,
                  term_id: termId.get(n.termKey)!,
                  row_index: n.rowIndex,
                  kind: n.kind,
                  course_id: isSlot ? null : n.courseId,
                  slot_label: isSlot ? n.slotLabel : null,
                  slot_theory_credits: isSlot ? n.slotTheoryCredits ?? 0 : null,
                  slot_lab_credits: isSlot ? n.slotLabCredits ?? 0 : null,
                  elective_group: n.electiveGroup || null,
                  choice_group: n.choiceGroup || null,
                  condition: n.condition || null,
                };
              }),
            })
          : [];
        const nodeId = new Map(nodes.map((n) => [n.node_key, n.id]));

        if (dto.edges.length) {
          await tx.rOADMAP_EDGES.createMany({
            data: dto.edges.map((e) => ({
              version_id: versionId,
              edge_key: e.edgeKey,
              source_node_id: nodeId.get(e.sourceKey)!,
              target_node_id: nodeId.get(e.targetKey)!,
              type: e.type,
            })),
          });
        }
      });
    } catch (error) {
      handlePrismaError(this.logger, error, 'Canvas', 'save', versionId);
    }
    return this.getCanvas(versionId);
  }

  /** Integrity checks that cannot wait for publish (BR-RM-01, BR-RM-10, BR-RM-12). */
  private async assertValidPayload(dto: CanvasSaveRequest): Promise<void> {
    const invalid = (message: string, extra?: Record<string, unknown>) =>
      ApiErrors.badRequest(ErrorCodes.INVALID_INPUT, message, extra);

    const termKeys = new Set<string>();
    for (const t of dto.terms) {
      if (termKeys.has(t.termKey)) throw invalid('Duplicate term key', { termKey: t.termKey });
      termKeys.add(t.termKey);
    }

    const nodeKeys = new Set<string>();
    const cells = new Set<string>();
    const courseIds = new Map<number, string>();
    for (const n of dto.nodes) {
      if (nodeKeys.has(n.nodeKey)) throw invalid('Duplicate node key', { nodeKey: n.nodeKey });
      nodeKeys.add(n.nodeKey);
      if (!termKeys.has(n.termKey)) throw invalid('Node references an unknown term', { nodeKey: n.nodeKey });
      const cell = `${n.termKey}:${n.rowIndex}`;
      if (cells.has(cell)) throw invalid('Two nodes share the same cell', { nodeKey: n.nodeKey, rowIndex: n.rowIndex });
      cells.add(cell);
      if (n.kind === RoadmapNodeKindEnum.COURSE) {
        if (!n.courseId) throw invalid('A COURSE node needs a course', { nodeKey: n.nodeKey });
        if (courseIds.has(n.courseId)) {
          throw ApiErrors.conflict(ErrorCodes.DUPLICATE_COURSE_IN_PLAN, 'A course can appear only once in a curriculum', {
            nodeKeys: [courseIds.get(n.courseId), n.nodeKey],
          });
        }
        courseIds.set(n.courseId, n.nodeKey);
      } else if (!n.slotLabel) {
        throw invalid('An ELECTIVE_SLOT node needs a label', { nodeKey: n.nodeKey });
      }
    }
    if (courseIds.size) {
      const found = await this.prisma.cOURSES.count({ where: { id: { in: [...courseIds.keys()] } } });
      if (found !== courseIds.size) throw invalid('Some courses do not exist');
    }

    const edgeKeys = new Set<string>();
    const pairs = new Set<string>();
    for (const e of dto.edges) {
      if (edgeKeys.has(e.edgeKey)) throw invalid('Duplicate edge key', { edgeKey: e.edgeKey });
      edgeKeys.add(e.edgeKey);
      if (!nodeKeys.has(e.sourceKey) || !nodeKeys.has(e.targetKey)) throw invalid('Edge references an unknown node', { edgeKey: e.edgeKey });
      if (e.sourceKey === e.targetKey) throw invalid('A course cannot relate to itself', { edgeKey: e.edgeKey });
      const pair = [e.sourceKey, e.targetKey].sort().join('|');
      if (pairs.has(pair)) {
        throw ApiErrors.conflict(ErrorCodes.DUPLICATE_EDGE, 'Two courses can have at most one relation', { edgeKey: e.edgeKey });
      }
      pairs.add(pair);
    }

    const cycle = findCycle(nodeKeys, dto.edges.map((e) => ({ source: e.sourceKey, target: e.targetKey })));
    if (cycle) throw ApiErrors.badRequest(ErrorCodes.CYCLE_DETECTED, 'Relations form a cycle', { cycle });
  }

  private toNodeResponse(n: StructureNode, courses: Map<number, CourseBriefResponse>): CanvasNodeResponse {
    return {
      nodeKey: n.nodeKey,
      termKey: n.termKey,
      rowIndex: n.rowIndex,
      kind: n.kind,
      course: n.courseId ? courses.get(n.courseId) : undefined,
      slotLabel: n.slotLabel ?? undefined,
      slotTheoryCredits: n.slotTheoryCredits ?? undefined,
      slotLabCredits: n.slotLabCredits ?? undefined,
      electiveGroup: n.electiveGroup ?? undefined,
      choiceGroup: n.choiceGroup ?? undefined,
      condition: n.condition ?? undefined,
    };
  }
}
