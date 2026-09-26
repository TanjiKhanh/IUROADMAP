import { BaseStructure, DeltaState, emptyDeltaState } from '../../src/modules/student-roadmap/lib/overlay-types';

/**
 * s1: A(course 1), B(course 2)   s2: C(course 3), SLOT (Elective, group G, 3+1)
 * pool: P1(course 10, G), P2(course 11, G)            relation A → C (prerequisite)
 */
export function baseStructure(): BaseStructure {
  return {
    terms: [
      { termKey: 's1', orderIndex: 0, kind: 'REGULAR', semesterNo: 1 },
      { termKey: 's2', orderIndex: 1, kind: 'REGULAR', semesterNo: 2 },
      { termKey: 'pool', orderIndex: 2, kind: 'ELECTIVE_POOL', semesterNo: null },
    ],
    nodes: [
      node('A', 's1', 0, 1),
      node('B', 's1', 1, 2),
      node('C', 's2', 0, 3),
      {
        nodeKey: 'SLOT',
        termKey: 's2',
        rowIndex: 1,
        kind: 'ELECTIVE_SLOT',
        courseId: null,
        slotLabel: 'Elective',
        slotTheoryCredits: 3,
        slotLabCredits: 1,
        electiveGroup: 'G',
      },
      { ...node('P1', 'pool', 0, 10), electiveGroup: 'G' },
      { ...node('P2', 'pool', 1, 11), electiveGroup: 'G' },
    ],
    edges: [{ edgeKey: 'e1', sourceKey: 'A', targetKey: 'C', type: 'PREREQUISITE' }],
  };
}

function node(nodeKey: string, termKey: string, rowIndex: number, courseId: number) {
  return {
    nodeKey,
    termKey,
    rowIndex,
    kind: 'COURSE' as const,
    courseId,
    slotLabel: null,
    slotTheoryCredits: null,
    slotLabCredits: null,
    electiveGroup: null,
  };
}

export function noDeltas(): DeltaState {
  return emptyDeltaState();
}

export const COURSE_IDS = new Set([1, 2, 3, 4, 10, 11, 99]);
