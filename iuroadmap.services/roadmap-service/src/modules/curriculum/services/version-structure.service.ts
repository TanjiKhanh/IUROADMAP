import { Injectable } from '@nestjs/common';
import { AppConstant, CurriculumNodeInput, CurriculumValidationResult, validateCurriculum } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors } from '../../../common/api-errors';
import { RelationTypeEnum, RoadmapNodeKindEnum, RoadmapVersionStatusEnum, TermKindEnum } from '../../../common/enums';
import { CourseBriefResponse } from '../../course-catalog/dto/course/course-brief.response';
import { COURSE_BRIEF_INCLUDE, toCourseBrief } from '../../course-catalog/services/course-brief.mapper';

export interface StructureTerm {
  id: number;
  termKey: string;
  orderIndex: number;
  kind: TermKindEnum;
  semesterNo: number | null;
}

export interface StructureNode {
  id: number;
  nodeKey: string;
  termKey: string;
  rowIndex: number;
  kind: RoadmapNodeKindEnum;
  courseId: number | null;
  slotLabel: string | null;
  slotTheoryCredits: number | null;
  slotLabCredits: number | null;
  electiveGroup: string | null;
  choiceGroup: string | null;
  condition: string | null;
}

export interface StructureEdge {
  edgeKey: string;
  sourceKey: string;
  targetKey: string;
  type: RelationTypeEnum;
}

export interface VersionStructure {
  versionId: number;
  /** Terms sorted by order_index */
  terms: StructureTerm[];
  nodes: StructureNode[];
  edges: StructureEdge[];
}

/**
 * Loads the structure (terms, nodes, edges) of a curriculum. PUBLISHED / ARCHIVED curricula are
 * immutable, so their structure is cached for the lifetime of the process (design §5, §6.3).
 * Course details are NOT cached: names and colors can still be edited in the catalog.
 */
@Injectable()
export class VersionStructureService {
  private readonly cache = new Map<number, VersionStructure>();

  constructor(private readonly prisma: PrismaService) {}

  async getStructure(versionId: number): Promise<VersionStructure> {
    const cached = this.cache.get(versionId);
    if (cached) return cached;

    const version = await this.prisma.rOADMAP_VERSIONS.findUnique({
      where: { id: versionId },
      select: {
        id: true,
        status: true,
        terms: { orderBy: { order_index: 'asc' } },
        nodes: true,
        edges: { include: { sourceNode: { select: { node_key: true } }, targetNode: { select: { node_key: true } } } },
      },
    });
    if (!version) throw ApiErrors.notFound(`Curriculum with id ${versionId} not found`);

    const termKeyById = new Map(version.terms.map((t) => [t.id, t.term_key]));
    const structure: VersionStructure = {
      versionId: version.id,
      terms: version.terms.map((t) => ({
        id: t.id,
        termKey: t.term_key,
        orderIndex: t.order_index,
        kind: t.kind as TermKindEnum,
        semesterNo: t.semester_no,
      })),
      nodes: version.nodes.map((n) => ({
        id: n.id,
        nodeKey: n.node_key,
        termKey: termKeyById.get(n.term_id)!,
        rowIndex: n.row_index,
        kind: n.kind as RoadmapNodeKindEnum,
        courseId: n.course_id,
        slotLabel: n.slot_label,
        slotTheoryCredits: n.slot_theory_credits,
        slotLabCredits: n.slot_lab_credits,
        electiveGroup: n.elective_group,
        choiceGroup: n.choice_group,
        condition: n.condition,
      })),
      edges: version.edges.map((e) => ({
        edgeKey: e.edge_key,
        sourceKey: e.sourceNode.node_key,
        targetKey: e.targetNode.node_key,
        type: e.type as RelationTypeEnum,
      })),
    };

    if (version.status !== RoadmapVersionStatusEnum.DRAFT) this.cache.set(versionId, structure);
    return structure;
  }

  /** Drop a cached structure (only needed for drafts that get published, which are never cached). */
  evict(versionId: number): void {
    this.cache.delete(versionId);
  }

  async getCourseBriefs(courseIds: Iterable<number | null | undefined>): Promise<Map<number, CourseBriefResponse>> {
    const ids = [...new Set([...courseIds].filter((id): id is number => typeof id === 'number'))];
    if (!ids.length) return new Map();
    const courses = await this.prisma.cOURSES.findMany({ where: { id: { in: ids } }, include: COURSE_BRIEF_INCLUDE });
    return new Map(courses.map((c) => [c.id, toCourseBrief(c)]));
  }

  /** Runs the shared publish validator on a structure (FR-RDM.04.4). */
  validate(
    structure: Pick<VersionStructure, 'terms' | 'nodes' | 'edges'>,
    courses: Map<number, CourseBriefResponse>,
    totalCredits: number,
  ): CurriculumValidationResult {
    return validateCurriculum({
      terms: structure.terms.map((t) => ({ key: t.termKey, kind: t.kind })),
      nodes: structure.nodes.map((n) => this.toValidationNode(n, courses)),
      edges: structure.edges.map((e) => ({ key: e.edgeKey, source: e.sourceKey, target: e.targetKey, type: e.type })),
      totalCredits,
      maxCreditsPerTerm: AppConstant.Roadmap.MaxCreditsPerTerm,
    });
  }

  toValidationNode(n: StructureNode, courses: Map<number, CourseBriefResponse>): CurriculumNodeInput {
    if (n.kind === RoadmapNodeKindEnum.ELECTIVE_SLOT) {
      const credits = (n.slotTheoryCredits ?? 0) + (n.slotLabCredits ?? 0);
      return { key: n.nodeKey, termKey: n.termKey, kind: n.kind, credits: credits > 0 ? credits : null };
    }
    const course = n.courseId ? courses.get(n.courseId) : undefined;
    return {
      key: n.nodeKey,
      termKey: n.termKey,
      kind: n.kind,
      courseId: course ? course.id : null,
      credits: course ? course.theoryCredits + course.labCredits : null,
      countsTowardCredits: course?.countsTowardCredits ?? true,
    };
  }
}
