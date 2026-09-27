/**
 * Overlay statistics of one curriculum (FR-RDM.07.5, design §7): which curriculum courses learners
 * move to another term, which catalog courses they add, which courses they choose for elective
 * slots. The overlay stores only differences, so every row is a learner decision.
 */

export interface OverlayNodeRow {
  studentRoadmapId: number;
  nodeKey: string;
  origin: 'BASE' | 'CUSTOM';
  /** null = not moved */
  termKey: string | null;
  courseId: number | null;
}

export interface OverlayCurriculumNode {
  nodeKey: string;
  termKey: string;
  kind: 'COURSE' | 'ELECTIVE_SLOT';
  courseId: number | null;
}

export interface MovedCourseStat {
  nodeKey: string;
  courseId: number | null;
  fromTermKey: string;
  /** Learners who moved the course */
  learnerCount: number;
  /** Target terms, most chosen first */
  targets: Array<{ termKey: string; learnerCount: number }>;
}

export interface CountedCourseStat {
  courseId: number;
  learnerCount: number;
}

export interface SlotChoiceStat {
  nodeKey: string;
  choices: CountedCourseStat[];
}

export interface OverlayStats {
  movedCourses: MovedCourseStat[];
  addedCourses: CountedCourseStat[];
  slotChoices: SlotChoiceStat[];
  /** Learners who added at least one course outside the catalog */
  customCourseLearners: number;
}

function countBy<K>(keys: Iterable<K>): Map<K, number> {
  const counts = new Map<K, number>();
  for (const key of keys) counts.set(key, (counts.get(key) ?? 0) + 1);
  return counts;
}

const byCountDesc = <T extends { learnerCount: number }>(a: T, b: T) => b.learnerCount - a.learnerCount;

/**
 * Aggregates the node deltas of every roadmap on one curriculum. Each learner counts once per
 * course (the overlay has one row per node key, BR-LRN-07). `limit` caps every list.
 */
export function summarizeOverlay(
  curriculum: ReadonlyArray<OverlayCurriculumNode>,
  rows: ReadonlyArray<OverlayNodeRow>,
  limit = 20,
): OverlayStats {
  const nodes = new Map(curriculum.map((n) => [n.nodeKey, n]));

  const moves = new Map<string, OverlayNodeRow[]>();
  const slotRows = new Map<string, OverlayNodeRow[]>();
  const added: OverlayNodeRow[] = [];
  const customLearners = new Set<number>();

  for (const row of rows) {
    if (row.origin === 'CUSTOM') {
      if (row.courseId !== null) added.push(row);
      else customLearners.add(row.studentRoadmapId);
      continue;
    }
    const base = nodes.get(row.nodeKey);
    if (!base) continue; // orphan of an older curriculum
    if (row.termKey !== null && row.termKey !== base.termKey) {
      moves.set(row.nodeKey, [...(moves.get(row.nodeKey) ?? []), row]);
    }
    if (base.kind === 'ELECTIVE_SLOT' && row.courseId !== null) {
      slotRows.set(row.nodeKey, [...(slotRows.get(row.nodeKey) ?? []), row]);
    }
  }

  const movedCourses: MovedCourseStat[] = [...moves.entries()]
    .map(([nodeKey, list]) => {
      const base = nodes.get(nodeKey)!;
      const targets = [...countBy(list.map((r) => r.termKey!))].map(([termKey, learnerCount]) => ({ termKey, learnerCount })).sort(byCountDesc);
      return { nodeKey, courseId: base.courseId, fromTermKey: base.termKey, learnerCount: list.length, targets };
    })
    .sort(byCountDesc)
    .slice(0, limit);

  const addedCourses = [...countBy(added.map((r) => r.courseId!))]
    .map(([courseId, learnerCount]) => ({ courseId, learnerCount }))
    .sort(byCountDesc)
    .slice(0, limit);

  const slotChoices = [...slotRows.entries()].map(([nodeKey, list]) => ({
    nodeKey,
    choices: [...countBy(list.map((r) => r.courseId!))]
      .map(([courseId, learnerCount]) => ({ courseId, learnerCount }))
      .sort(byCountDesc)
      .slice(0, limit),
  }));

  return { movedCourses, addedCourses, slotChoices, customCourseLearners: customLearners.size };
}
