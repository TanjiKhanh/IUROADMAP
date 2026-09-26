/**
 * Plain types of the learner overlay (design §6). The lib/ folder is pure: no Nest, no Prisma,
 * so merge / apply-ops / rebase can be unit-tested without a database.
 */

export type Origin = 'BASE' | 'CUSTOM';
export type TermKind = 'REGULAR' | 'SUMMER' | 'ELECTIVE_POOL';
export type NodeKind = 'COURSE' | 'ELECTIVE_SLOT';
export type RelationType = 'PREREQUISITE' | 'PREVIOUS' | 'COREQUISITE';
export type TermInYear = 'SEMESTER_1' | 'SEMESTER_2' | 'SUMMER';

// ─── Curriculum (base) ────────────────────────────────────────────────────────

export interface BaseTerm {
  termKey: string;
  orderIndex: number;
  kind: TermKind;
  semesterNo: number | null;
}

export interface BaseNode {
  nodeKey: string;
  termKey: string;
  rowIndex: number;
  kind: NodeKind;
  courseId: number | null;
  slotLabel: string | null;
  slotTheoryCredits: number | null;
  slotLabCredits: number | null;
  electiveGroup: string | null;
}

export interface BaseEdge {
  edgeKey: string;
  sourceKey: string;
  targetKey: string;
  type: RelationType;
}

export interface BaseStructure {
  terms: BaseTerm[];
  nodes: BaseNode[];
  edges: BaseEdge[];
}

// ─── Overlay rows ─────────────────────────────────────────────────────────────

export interface TermDelta {
  termKey: string;
  origin: Origin;
  /** CUSTOM only */
  kind: 'REGULAR' | 'SUMMER' | null;
  /** CUSTOM only: inserted right after this term; null = before the first term */
  afterTermKey: string | null;
  /** CUSTOM only */
  customLabel: string | null;
  academicYear: number | null;
  termInYear: TermInYear | null;
}

export interface NodeDelta {
  nodeKey: string;
  origin: Origin;
  /** null = keep the base term */
  termKey: string | null;
  /** null = keep the base row */
  rowOrder: number | null;
  /** CUSTOM from the catalog, or the course chosen for a base ELECTIVE_SLOT */
  courseId: number | null;
  customCode: string | null;
  customName: string | null;
  customTheoryCredits: number | null;
  customLabCredits: number | null;
}

export interface EdgeDelta {
  edgeKey: string;
  sourceKey: string;
  targetKey: string;
  type: RelationType;
}

export interface DeltaState {
  terms: Map<string, TermDelta>;
  nodes: Map<string, NodeDelta>;
  edges: Map<string, EdgeDelta>;
}

// ─── Merged view ──────────────────────────────────────────────────────────────

export interface MergedTerm {
  termKey: string;
  origin: Origin;
  kind: TermKind;
  semesterNo: number | null;
  customLabel: string | null;
  academicYear: number | null;
  termInYear: TermInYear | null;
  /** 0-based position after custom terms are spliced in */
  position: number;
}

export interface MergedNode {
  nodeKey: string;
  origin: Origin;
  /** Base node that has a delta (moved and/or slot filled) */
  isModified: boolean;
  kind: NodeKind;
  termKey: string;
  /** Order inside the column: base row_index or learner row_order */
  order: number;
  /** Course shown on the node: base course, filled slot course or custom catalog course */
  courseId: number | null;
  /** Custom course typed by the learner (not in the catalog) */
  custom: { code: string; name: string; theoryCredits: number; labCredits: number } | null;
  /** Base elective slot definition (kept even when filled) */
  slot: { label: string; theoryCredits: number; labCredits: number; electiveGroup: string | null } | null;
  electiveGroup: string | null;
}

export interface MergedEdge {
  edgeKey: string;
  origin: Origin;
  sourceKey: string;
  targetKey: string;
  type: RelationType;
}

export interface MergedRoadmap {
  terms: MergedTerm[];
  nodes: MergedNode[];
  edges: MergedEdge[];
  /** BASE node deltas whose node no longer exists (only after a curriculum change) */
  orphanNodeKeys: string[];
}

export function emptyDeltaState(): DeltaState {
  return { terms: new Map(), nodes: new Map(), edges: new Map() };
}

export function cloneDeltaState(state: DeltaState): DeltaState {
  return {
    terms: new Map([...state.terms].map(([k, v]) => [k, { ...v }])),
    nodes: new Map([...state.nodes].map(([k, v]) => [k, { ...v }])),
    edges: new Map([...state.edges].map(([k, v]) => [k, { ...v }])),
  };
}
