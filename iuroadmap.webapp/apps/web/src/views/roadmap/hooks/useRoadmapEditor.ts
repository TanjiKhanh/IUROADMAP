import { useCallback, useMemo, useReducer } from 'react';
import type {
  CourseBriefResponse,
  MergedEdgeResponse,
  MergedNodeResponse,
  MergedTermResponse,
  RelationType,
  RoadmapChangeOpRequest,
  StudentRoadmapResponse,
  TermInYear,
} from '@iuroadmap/api-gen';
import type { CanvasMove, CatalogDragPayload } from '../../../components/semester-canvas';
import { newKey } from '../../../utils/newKey';
import { compactOps } from '../lib/compactOps';

/**
 * Local editing of My Roadmap (design §6.4, §6.6): every action changes a local copy of the merged
 * view right away (optimistic) and is queued as a change op; "Save" sends one compacted batch with
 * the loaded `revision`. Undo / redo restore both the view and the queue.
 */

export interface LearnerDoc {
  terms: MergedTermResponse[];
  nodes: MergedNodeResponse[];
  edges: MergedEdgeResponse[];
}

interface Snapshot {
  doc: LearnerDoc;
  ops: RoadmapChangeOpRequest[];
}

interface History {
  past: Snapshot[];
  present: Snapshot;
  future: Snapshot[];
}

type Action = { type: 'load'; doc: LearnerDoc } | { type: 'apply'; next: Snapshot } | { type: 'undo' } | { type: 'redo' };

const HISTORY_LIMIT = 100;
const EMPTY: Snapshot = { doc: { terms: [], nodes: [], edges: [] }, ops: [] };

function reducer(history: History, action: Action): History {
  switch (action.type) {
    case 'load':
      return { past: [], present: { doc: action.doc, ops: [] }, future: [] };
    case 'apply':
      return { past: [...history.past, history.present].slice(-HISTORY_LIMIT), present: action.next, future: [] };
    case 'undo': {
      const previous = history.past[history.past.length - 1];
      return previous ? { past: history.past.slice(0, -1), present: previous, future: [history.present, ...history.future] } : history;
    }
    case 'redo': {
      const next = history.future[0];
      return next ? { past: [...history.past, history.present], present: next, future: history.future.slice(1) } : history;
    }
  }
}

export function docOf(roadmap: StudentRoadmapResponse): LearnerDoc {
  return { terms: roadmap.terms, nodes: roadmap.nodes, edges: roadmap.edges };
}

function withPositions(terms: MergedTermResponse[]): MergedTermResponse[] {
  return terms.map((t, position) => (t.position === position ? t : { ...t, position }));
}

function briefOf(course: CatalogDragPayload): CourseBriefResponse {
  return {
    id: course.courseId,
    code: course.code,
    name: course.name,
    theoryCredits: course.theoryCredits,
    labCredits: course.labCredits,
    fillColor: course.fillColor,
    borderColor: course.borderColor,
    categoryCode: course.categoryCode ?? '',
    gradingMode: course.gradingMode ?? 'SCORE',
    countsTowardGpa: course.countsTowardGpa ?? true,
    countsTowardCredits: course.countsTowardCredits ?? true,
  };
}

/** Column credits "(x+y)" recomputed after a local change (same rule as the server, design §4.3). */
function recountCredits(doc: LearnerDoc): LearnerDoc {
  const terms = doc.terms.map((term) => {
    if (term.kind === 'ELECTIVE_POOL') return term.courseCredits === 0 && term.slotCredits === 0 ? term : { ...term, courseCredits: 0, slotCredits: 0 };
    let courseCredits = 0;
    let slotCredits = 0;
    for (const n of doc.nodes) {
      if (n.termKey !== term.termKey || !n.countsTowardCredits) continue;
      if (n.canHaveResult) courseCredits += n.credits;
      else slotCredits += n.credits;
    }
    return term.courseCredits === courseCredits && term.slotCredits === slotCredits ? term : { ...term, courseCredits, slotCredits };
  });
  return { ...doc, terms };
}

/** Applies one op to the local view (what the server will do, minus derived GPA). */
function applyLocal(doc: LearnerDoc, op: RoadmapChangeOpRequest, course?: CatalogDragPayload): LearnerDoc {
  switch (op.op) {
    case 'MOVE_NODE':
      return {
        ...doc,
        nodes: doc.nodes.map((n) =>
          n.nodeKey === op.nodeKey ? { ...n, termKey: op.termKey!, order: op.rowOrder!, isModified: n.origin === 'BASE' ? true : n.isModified } : n,
        ),
      };
    case 'ADD_NODE': {
      const brief = course ? briefOf(course) : undefined;
      const credits = brief ? brief.theoryCredits + brief.labCredits : (op.customTheoryCredits ?? 0) + (op.customLabCredits ?? 0);
      const node: MergedNodeResponse = {
        nodeKey: op.nodeKey!,
        origin: 'CUSTOM',
        isModified: false,
        kind: 'COURSE',
        termKey: op.termKey!,
        order: op.rowOrder ?? 0,
        visualRow: 0,
        course: brief,
        customCourse: brief
          ? undefined
          : { code: op.customCode ?? '', name: op.customName ?? '', theoryCredits: op.customTheoryCredits ?? 0, labCredits: op.customLabCredits ?? 0 },
        credits,
        gradingMode: brief?.gradingMode ?? 'SCORE',
        countsTowardGpa: brief?.countsTowardGpa ?? true,
        countsTowardCredits: brief?.countsTowardCredits ?? true,
        canHaveResult: true,
        state: 'PLANNED',
      };
      return { ...doc, nodes: [...doc.nodes, node] };
    }
    case 'REMOVE_NODE':
      return {
        ...doc,
        nodes: doc.nodes.filter((n) => n.nodeKey !== op.nodeKey),
        edges: doc.edges.filter((e) => e.sourceKey !== op.nodeKey && e.targetKey !== op.nodeKey),
      };
    case 'FILL_SLOT': {
      const brief = course ? briefOf(course) : undefined;
      const poolKeys = new Set(doc.terms.filter((t) => t.kind === 'ELECTIVE_POOL').map((t) => t.termKey));
      return {
        ...doc,
        // the chosen pool course is no longer drawn in the pool (FR-LRN.04.5)
        nodes: doc.nodes
          .filter((n) => !(brief && n.origin === 'BASE' && poolKeys.has(n.termKey) && n.course?.id === brief.id))
          .map((n) =>
            n.nodeKey === op.nodeKey && brief
              ? {
                  ...n,
                  course: brief,
                  credits: brief.theoryCredits + brief.labCredits,
                  gradingMode: brief.gradingMode,
                  countsTowardGpa: brief.countsTowardGpa,
                  countsTowardCredits: brief.countsTowardCredits,
                  canHaveResult: true,
                  isModified: true,
                }
              : n,
          ),
      };
    }
    case 'CLEAR_SLOT':
      return {
        ...doc,
        nodes: doc.nodes.map((n) =>
          n.nodeKey === op.nodeKey && n.slot
            ? { ...n, course: undefined, credits: n.slot.theoryCredits + n.slot.labCredits, canHaveResult: false, countsTowardCredits: true }
            : n,
        ),
      };
    case 'ADD_EDGE':
      return {
        ...doc,
        edges: [...doc.edges, { edgeKey: op.edgeKey!, origin: 'CUSTOM', sourceKey: op.sourceKey!, targetKey: op.targetKey!, type: op.relationType! }],
      };
    case 'REMOVE_EDGE':
      return { ...doc, edges: doc.edges.filter((e) => e.edgeKey !== op.edgeKey) };
    case 'ADD_TERM': {
      const term: MergedTermResponse = {
        termKey: op.termKey!,
        origin: 'CUSTOM',
        kind: op.kind ?? 'REGULAR',
        position: 0,
        customLabel: op.label,
        academicYear: op.academicYear ?? undefined,
        termInYear: op.termInYear ?? undefined,
        resolvedAcademicYear: op.academicYear ?? undefined,
        academicYearEstimated: false,
        courseCredits: 0,
        slotCredits: 0,
      };
      const terms = [...doc.terms];
      const index = op.afterTermKey ? terms.findIndex((t) => t.termKey === op.afterTermKey) + 1 : 0;
      terms.splice(index, 0, term);
      return { ...doc, terms: withPositions(terms) };
    }
    case 'MOVE_TERM': {
      const moving = doc.terms.find((t) => t.termKey === op.termKey);
      if (!moving) return doc;
      const terms = doc.terms.filter((t) => t.termKey !== op.termKey);
      const index = op.afterTermKey ? terms.findIndex((t) => t.termKey === op.afterTermKey) + 1 : 0;
      terms.splice(index, 0, moving);
      return { ...doc, terms: withPositions(terms) };
    }
    case 'UPDATE_TERM':
      return {
        ...doc,
        terms: doc.terms.map((t) => {
          if (t.termKey !== op.termKey) return t;
          const next = { ...t };
          if (op.label !== undefined) next.customLabel = op.label;
          if (op.academicYear !== undefined) {
            next.academicYear = op.academicYear ?? undefined;
            next.resolvedAcademicYear = op.academicYear ?? t.resolvedAcademicYear;
            next.academicYearEstimated = op.academicYear === null ? t.academicYearEstimated : false;
          }
          if (op.termInYear !== undefined) next.termInYear = op.termInYear ?? undefined;
          return next;
        }),
      };
    case 'REMOVE_TERM':
      return { ...doc, terms: withPositions(doc.terms.filter((t) => t.termKey !== op.termKey)) };
    default:
      return doc;
  }
}

export function useRoadmapEditor() {
  const [history, dispatch] = useReducer(reducer, { past: [], present: EMPTY, future: [] });
  const { doc, ops } = history.present;

  const apply = useCallback(
    (items: Array<{ op: RoadmapChangeOpRequest; course?: CatalogDragPayload }>) => {
      let next = doc;
      for (const item of items) next = applyLocal(next, item.op, item.course);
      dispatch({ type: 'apply', next: { doc: recountCredits(next), ops: [...ops, ...items.map((i) => i.op)] } });
    },
    [doc, ops],
  );

  const actions = useMemo(
    () => ({
      moveNode(move: CanvasMove) {
        const items = [...move.rebalanced].map(([nodeKey, rowOrder]) => ({
          op: { op: 'MOVE_NODE' as const, nodeKey, termKey: move.termKey, rowOrder },
        }));
        items.push({ op: { op: 'MOVE_NODE', nodeKey: move.nodeKey, termKey: move.termKey, rowOrder: move.order } });
        apply(items);
      },

      /** Drop on the gap between two columns: new term + move (design §4.2). */
      moveNodeToNewTerm(nodeKey: string, afterTermKey: string | null, label: string) {
        const termKey = newKey();
        apply([
          { op: { op: 'ADD_TERM', termKey, kind: 'REGULAR', afterTermKey, label } },
          { op: { op: 'MOVE_NODE', nodeKey, termKey, rowOrder: 0 } },
        ]);
        return termKey;
      },

      addCourse(course: CatalogDragPayload, termKey: string, rowOrder: number) {
        const nodeKey = newKey();
        apply([{ op: { op: 'ADD_NODE', nodeKey, termKey, rowOrder, courseId: course.courseId }, course }]);
        return nodeKey;
      },

      addCourseInNewTerm(course: CatalogDragPayload, afterTermKey: string | null, label: string) {
        const termKey = newKey();
        const nodeKey = newKey();
        apply([
          { op: { op: 'ADD_TERM', termKey, kind: 'REGULAR', afterTermKey, label } },
          { op: { op: 'ADD_NODE', nodeKey, termKey, rowOrder: 0, courseId: course.courseId }, course },
        ]);
        return nodeKey;
      },

      addCustomCourse(input: { code: string; name: string; theoryCredits: number; labCredits: number }, termKey: string, rowOrder: number) {
        const nodeKey = newKey();
        apply([
          {
            op: {
              op: 'ADD_NODE',
              nodeKey,
              termKey,
              rowOrder,
              customCode: input.code,
              customName: input.name,
              customTheoryCredits: input.theoryCredits,
              customLabCredits: input.labCredits,
            },
          },
        ]);
        return nodeKey;
      },

      removeNode(nodeKey: string) {
        apply([{ op: { op: 'REMOVE_NODE', nodeKey } }]);
      },

      fillSlot(nodeKey: string, course: CatalogDragPayload) {
        apply([{ op: { op: 'FILL_SLOT', nodeKey, courseId: course.courseId }, course }]);
      },

      clearSlot(nodeKey: string) {
        apply([{ op: { op: 'CLEAR_SLOT', nodeKey } }]);
      },

      addEdge(sourceKey: string, targetKey: string, relationType: RelationType) {
        const edgeKey = newKey();
        apply([{ op: { op: 'ADD_EDGE', edgeKey, sourceKey, targetKey, relationType } }]);
        return edgeKey;
      },

      removeEdge(edgeKey: string) {
        apply([{ op: { op: 'REMOVE_EDGE', edgeKey } }]);
      },

      addTerm(kind: 'REGULAR' | 'SUMMER', afterTermKey: string | null, label: string) {
        const termKey = newKey();
        apply([{ op: { op: 'ADD_TERM', termKey, kind, afterTermKey, label } }]);
        return termKey;
      },

      moveTerm(termKey: string, afterTermKey: string | null) {
        apply([{ op: { op: 'MOVE_TERM', termKey, afterTermKey } }]);
      },

      updateTerm(termKey: string, patch: { label?: string; academicYear?: number | null; termInYear?: TermInYear | null }) {
        apply([{ op: { op: 'UPDATE_TERM', termKey, ...patch } }]);
      },

      removeTerm(termKey: string) {
        apply([{ op: { op: 'REMOVE_TERM', termKey } }]);
      },
    }),
    [apply],
  );

  return {
    doc,
    /** Raw queue (for tests / debugging) */
    ops,
    /** Batch to send: compacted final state (design §6.6) */
    compacted: useMemo(() => compactOps(ops), [ops]),
    dirty: ops.length > 0,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    undo: useCallback(() => dispatch({ type: 'undo' }), []),
    redo: useCallback(() => dispatch({ type: 'redo' }), []),
    load: useCallback((next: LearnerDoc) => dispatch({ type: 'load', doc: next }), []),
    ...actions,
  };
}
