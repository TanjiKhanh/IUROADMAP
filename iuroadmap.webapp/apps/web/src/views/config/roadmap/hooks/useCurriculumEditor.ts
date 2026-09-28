import { useCallback, useMemo, useReducer } from 'react';
import type {
  CanvasResponse,
  CanvasSaveRequest,
  CourseBriefResponse,
  RelationType,
  RoadmapNodeKind,
  TermKind,
} from '@iuroadmap/api-gen';
import { wouldCreateCycle } from '@iuroadmap/shared/roadmap-engine';
import { layoutRows, type CanvasMove } from '../../../../components/semester-canvas';
import { newKey } from '../../../../utils/newKey';

/**
 * Local state of the admin curriculum canvas (FL-RDM-05/06). The admin saves the full state,
 * so every change is kept locally (with undo/redo) until "Save" (FR-RDM.05.8).
 */

export interface EditorTerm {
  termKey: string;
  kind: TermKind;
}

export interface EditorNode {
  nodeKey: string;
  termKey: string;
  /** Integer row after every change (visual row of the column) */
  order: number;
  kind: RoadmapNodeKind;
  course?: CourseBriefResponse;
  slotLabel?: string;
  slotTheoryCredits?: number;
  slotLabCredits?: number;
  electiveGroup?: string;
  choiceGroup?: string;
  condition?: string;
}

export interface EditorEdge {
  edgeKey: string;
  sourceKey: string;
  targetKey: string;
  type: RelationType;
}

export interface EditorState {
  terms: EditorTerm[];
  nodes: EditorNode[];
  edges: EditorEdge[];
}

export interface SlotInput {
  slotLabel: string;
  slotTheoryCredits: number;
  slotLabCredits: number;
  electiveGroup?: string;
}

interface History {
  past: EditorState[];
  present: EditorState;
  future: EditorState[];
  /** present differs from the last loaded / saved state */
  dirty: boolean;
}

type Action =
  | { type: 'load'; state: EditorState }
  | { type: 'change'; next: EditorState }
  | { type: 'undo' }
  | { type: 'redo' };

const HISTORY_LIMIT = 100;
const EMPTY: EditorState = { terms: [], nodes: [], edges: [] };

function reducer(history: History, action: Action): History {
  switch (action.type) {
    case 'load':
      return { past: [], present: action.state, future: [], dirty: false };
    case 'change':
      if (action.next === history.present) return history;
      return {
        past: [...history.past, history.present].slice(-HISTORY_LIMIT),
        present: action.next,
        future: [],
        dirty: true,
      };
    case 'undo': {
      const previous = history.past[history.past.length - 1];
      if (!previous) return history;
      return { past: history.past.slice(0, -1), present: previous, future: [history.present, ...history.future], dirty: true };
    }
    case 'redo': {
      const next = history.future[0];
      if (!next) return history;
      return { past: [...history.past, history.present], present: next, future: history.future.slice(1), dirty: true };
    }
  }
}

/** Admin rows are always integers: the visual row of the column (design §4.2). */
function normalizeRows(nodes: EditorNode[]): EditorNode[] {
  const rows = layoutRows(nodes.map((n) => ({ key: n.nodeKey, termKey: n.termKey, order: n.order })));
  return nodes.map((n) => {
    const row = rows.get(n.nodeKey) ?? 0;
    return row === n.order ? n : { ...n, order: row };
  });
}

/** Keeps the elective pool as the last column. */
function insertTerm(terms: EditorTerm[], term: EditorTerm, afterTermKey: string | null): EditorTerm[] {
  const next = [...terms];
  let index = afterTermKey === null ? 0 : next.findIndex((t) => t.termKey === afterTermKey) + 1;
  const poolIndex = next.findIndex((t) => t.kind === 'ELECTIVE_POOL');
  if (poolIndex >= 0 && index > poolIndex) index = poolIndex;
  next.splice(index, 0, term);
  return next;
}

export function fromCanvas(canvas: CanvasResponse): EditorState {
  return {
    terms: canvas.terms.map((t) => ({ termKey: t.termKey, kind: t.kind })),
    nodes: canvas.nodes.map((n) => ({
      nodeKey: n.nodeKey,
      termKey: n.termKey,
      order: n.rowIndex,
      kind: n.kind,
      course: n.course,
      slotLabel: n.slotLabel,
      slotTheoryCredits: n.slotTheoryCredits,
      slotLabCredits: n.slotLabCredits,
      electiveGroup: n.electiveGroup,
      choiceGroup: n.choiceGroup,
      condition: n.condition,
    })),
    edges: canvas.edges.map((e) => ({ ...e })),
  };
}

/** REGULAR columns are numbered Semester 1..n from left to right. */
export function semesterNumbers(terms: EditorTerm[]): Map<string, number> {
  const numbers = new Map<string, number>();
  let n = 0;
  for (const t of terms) if (t.kind === 'REGULAR') numbers.set(t.termKey, ++n);
  return numbers;
}

export function toSaveRequest(state: EditorState, revision: number): CanvasSaveRequest {
  const numbers = semesterNumbers(state.terms);
  const nodes = normalizeRows(state.nodes);
  return {
    revision,
    terms: state.terms.map((t) => ({ termKey: t.termKey, kind: t.kind, semesterNo: numbers.get(t.termKey) })),
    nodes: nodes.map((n) => ({
      nodeKey: n.nodeKey,
      termKey: n.termKey,
      rowIndex: n.order,
      kind: n.kind,
      courseId: n.kind === 'COURSE' ? n.course?.id : undefined,
      slotLabel: n.kind === 'ELECTIVE_SLOT' ? n.slotLabel : undefined,
      slotTheoryCredits: n.kind === 'ELECTIVE_SLOT' ? n.slotTheoryCredits : undefined,
      slotLabCredits: n.kind === 'ELECTIVE_SLOT' ? n.slotLabCredits : undefined,
      electiveGroup: n.electiveGroup || undefined,
      choiceGroup: n.choiceGroup || undefined,
      condition: n.condition || undefined,
    })),
    edges: state.edges.map((e) => ({ edgeKey: e.edgeKey, sourceKey: e.sourceKey, targetKey: e.targetKey, type: e.type })),
  };
}

export type EdgeCheck = 'ok' | 'duplicate' | 'cycle' | 'self';

export function useCurriculumEditor() {
  const [history, dispatch] = useReducer(reducer, { past: [], present: EMPTY, future: [], dirty: false });
  const state = history.present;

  const change = useCallback((next: EditorState) => dispatch({ type: 'change', next }), []);
  const load = useCallback((next: EditorState) => dispatch({ type: 'load', state: next }), []);

  const actions = useMemo(
    () => ({
      moveNode(move: CanvasMove) {
        const nodes = state.nodes.map((n) => {
          if (n.nodeKey === move.nodeKey) return { ...n, termKey: move.termKey, order: move.order };
          const rebalanced = move.rebalanced.get(n.nodeKey);
          return rebalanced === undefined ? n : { ...n, order: rebalanced };
        });
        change({ ...state, nodes: normalizeRows(nodes) });
      },

      addCourse(course: CourseBriefResponse, termKey: string, order: number): string | null {
        if (state.nodes.some((n) => n.course?.id === course.id)) return null;
        const nodeKey = newKey();
        const node: EditorNode = { nodeKey, termKey, order, kind: 'COURSE', course };
        change({ ...state, nodes: normalizeRows([...state.nodes, node]) });
        return nodeKey;
      },

      addSlot(termKey: string, slot: SlotInput): string {
        const nodeKey = newKey();
        const bottom = Math.max(-1, ...state.nodes.filter((n) => n.termKey === termKey).map((n) => n.order)) + 1;
        const node: EditorNode = { nodeKey, termKey, order: bottom, kind: 'ELECTIVE_SLOT', ...slot };
        change({ ...state, nodes: normalizeRows([...state.nodes, node]) });
        return nodeKey;
      },

      updateNode(nodeKey: string, patch: Partial<Pick<EditorNode, 'slotLabel' | 'slotTheoryCredits' | 'slotLabCredits' | 'electiveGroup' | 'choiceGroup' | 'condition'>>) {
        change({ ...state, nodes: state.nodes.map((n) => (n.nodeKey === nodeKey ? { ...n, ...patch } : n)) });
      },

      removeNode(nodeKey: string) {
        change({
          ...state,
          nodes: normalizeRows(state.nodes.filter((n) => n.nodeKey !== nodeKey)),
          edges: state.edges.filter((e) => e.sourceKey !== nodeKey && e.targetKey !== nodeKey),
        });
      },

      /** A curriculum must stay a DAG with at most one relation per pair (BR-RM-01, BR-RM-12). */
      checkEdge(sourceKey: string, targetKey: string): EdgeCheck {
        if (sourceKey === targetKey) return 'self';
        const exists = state.edges.some(
          (e) => (e.sourceKey === sourceKey && e.targetKey === targetKey) || (e.sourceKey === targetKey && e.targetKey === sourceKey),
        );
        if (exists) return 'duplicate';
        const keys = state.nodes.map((n) => n.nodeKey);
        const edges = state.edges.map((e) => ({ source: e.sourceKey, target: e.targetKey }));
        return wouldCreateCycle(keys, edges, sourceKey, targetKey) ? 'cycle' : 'ok';
      },

      addEdge(sourceKey: string, targetKey: string, type: RelationType): string {
        const edgeKey = newKey();
        change({ ...state, edges: [...state.edges, { edgeKey, sourceKey, targetKey, type }] });
        return edgeKey;
      },

      updateEdgeType(edgeKey: string, type: RelationType) {
        change({ ...state, edges: state.edges.map((e) => (e.edgeKey === edgeKey ? { ...e, type } : e)) });
      },

      reverseEdge(edgeKey: string): boolean {
        const edge = state.edges.find((e) => e.edgeKey === edgeKey);
        if (!edge) return false;
        const others = state.edges.filter((e) => e.edgeKey !== edgeKey);
        const keys = state.nodes.map((n) => n.nodeKey);
        if (wouldCreateCycle(keys, others.map((e) => ({ source: e.sourceKey, target: e.targetKey })), edge.targetKey, edge.sourceKey)) return false;
        change({ ...state, edges: [...others, { ...edge, sourceKey: edge.targetKey, targetKey: edge.sourceKey }] });
        return true;
      },

      removeEdge(edgeKey: string) {
        change({ ...state, edges: state.edges.filter((e) => e.edgeKey !== edgeKey) });
      },

      addTerm(kind: 'REGULAR' | 'SUMMER', afterTermKey: string | null): string {
        const termKey = newKey();
        change({ ...state, terms: insertTerm(state.terms, { termKey, kind }, afterTermKey) });
        return termKey;
      },

      /** Only empty columns can be removed. */
      removeTerm(termKey: string): boolean {
        if (state.nodes.some((n) => n.termKey === termKey)) return false;
        change({ ...state, terms: state.terms.filter((t) => t.termKey !== termKey) });
        return true;
      },

      moveTerm(termKey: string, direction: -1 | 1) {
        const index = state.terms.findIndex((t) => t.termKey === termKey);
        const target = index + direction;
        if (index < 0 || target < 0 || target >= state.terms.length) return;
        if (state.terms[index].kind === 'ELECTIVE_POOL' || state.terms[target].kind === 'ELECTIVE_POOL') return;
        const terms = [...state.terms];
        [terms[index], terms[target]] = [terms[target], terms[index]];
        change({ ...state, terms });
      },
    }),
    [state, change],
  );

  return {
    state,
    dirty: history.dirty,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    undo: useCallback(() => dispatch({ type: 'undo' }), []),
    redo: useCallback(() => dispatch({ type: 'redo' }), []),
    load,
    ...actions,
  };
}
