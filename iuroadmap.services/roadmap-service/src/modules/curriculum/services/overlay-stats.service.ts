import { Injectable } from '@nestjs/common';
import { summarizeOverlay } from '@iuroadmap/shared';
import { PrismaService } from '../../../prisma/prisma.service';
import { DeltaOriginEnum, RoadmapNodeKindEnum } from '../../../common/enums';
import { OverlayStatsResponse } from '../dto/overlay-stats';
import { CurriculumVersionsService } from './curriculum-versions.service';
import { VersionStructureService } from './version-structure.service';

const LIST_LIMIT = 20;

/**
 * Overlay statistics of a curriculum (FR-RDM.07.5, design §7): the overlay stores only what
 * learners changed, so counting its rows tells the department which courses do not fit.
 */
@Injectable()
export class OverlayStatsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly versions: CurriculumVersionsService,
    private readonly structures: VersionStructureService,
  ) {}

  async getStats(versionId: number): Promise<OverlayStatsResponse> {
    await this.versions.load(versionId);
    const structure = await this.structures.getStructure(versionId);
    const onVersion = { studentRoadmap: { version_id: versionId } };

    const [learnerCount, rows, termLearners] = await Promise.all([
      this.prisma.sTUDENT_ROADMAPS.count({ where: { version_id: versionId } }),
      this.prisma.sTUDENT_NODE_DELTAS.findMany({
        where: onVersion,
        select: { student_roadmap_id: true, node_key: true, origin: true, term_key: true, course_id: true },
      }),
      this.prisma.sTUDENT_TERM_DELTAS.findMany({
        where: { ...onVersion, origin: DeltaOriginEnum.CUSTOM },
        select: { student_roadmap_id: true },
        distinct: ['student_roadmap_id'],
      }),
    ]);

    const stats = summarizeOverlay(
      structure.nodes.map((n) => ({ nodeKey: n.nodeKey, termKey: n.termKey, kind: n.kind, courseId: n.courseId })),
      rows.map((r) => ({
        studentRoadmapId: r.student_roadmap_id,
        nodeKey: r.node_key,
        origin: r.origin,
        termKey: r.term_key,
        courseId: r.course_id,
      })),
      LIST_LIMIT,
    );

    const courseIds = [
      ...stats.movedCourses.map((m) => m.courseId),
      ...stats.addedCourses.map((a) => a.courseId),
      ...stats.slotChoices.flatMap((s) => s.choices.map((c) => c.courseId)),
    ];
    const courses = await this.structures.getCourseBriefs(courseIds);
    const nodeByKey = new Map(structure.nodes.map((n) => [n.nodeKey, n]));
    const baseTermKeys = new Set(structure.terms.map((t) => t.termKey));

    return {
      versionId,
      learnerCount,
      terms: structure.terms.map((t) => ({ termKey: t.termKey, kind: t.kind, semesterNo: t.semesterNo ?? undefined })),
      movedCourses: stats.movedCourses.map((m) => {
        const node = nodeByKey.get(m.nodeKey);
        return {
          nodeKey: m.nodeKey,
          course: m.courseId !== null ? courses.get(m.courseId) : undefined,
          slotLabel: node?.kind === RoadmapNodeKindEnum.ELECTIVE_SLOT ? node.slotLabel ?? undefined : undefined,
          fromTermKey: m.fromTermKey,
          learnerCount: m.learnerCount,
          targets: m.targets.map((t) => ({ termKey: t.termKey, isCustomTerm: !baseTermKeys.has(t.termKey), learnerCount: t.learnerCount })),
        };
      }),
      addedCourses: stats.addedCourses
        .filter((a) => courses.has(a.courseId))
        .map((a) => ({ course: courses.get(a.courseId)!, learnerCount: a.learnerCount })),
      slotChoices: stats.slotChoices.map((s) => ({
        nodeKey: s.nodeKey,
        slotLabel: nodeByKey.get(s.nodeKey)?.slotLabel ?? '',
        choices: s.choices.filter((c) => courses.has(c.courseId)).map((c) => ({ course: courses.get(c.courseId)!, learnerCount: c.learnerCount })),
      })),
      customCourseLearners: stats.customCourseLearners,
      insertedTermLearners: termLearners.length,
    };
  }
}
