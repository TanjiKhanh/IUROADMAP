import { ErrorCodes } from '@iuroadmap/shared';
import { mergeRoadmap } from './merge';
import { OpError } from './op-error';
import {
  BaseStructure,
  DeltaState,
  NodeDelta,
  RelationType,
  TermDelta,
  TermInYear,
  cloneDeltaState,
} from './overlay-types';

/**
 * One learner change (design §6.4). The learner can only ADD and MOVE (BR-LRN-08):
 * curriculum nodes, edges and terms are never removed; only items the learner added can be.
 */
export interface ChangeOp {
  op:
    | 'MOVE_NODE'
    | 'ADD_NODE'
    | 'REMOVE_NODE'
    | 'FILL_SLOT'
    | 'CLEAR_SLOT'
    | 'RESET_NODE'
    | 'ADD_EDGE'
    | 'REMOVE_EDGE'
    | 'ADD_TERM'
    | 'MOVE_TERM'
    | 'UPDATE_TERM'
    | 'REMOVE_TERM';
  nodeKey?: string;
  termKey?: string;
  rowOrder?: number;
  courseId?: number | null;
  customCode?: string;
  customName?: string;
  customTheoryCredits?: number;
  customLabCredits?: number;
  edgeKey?: string;
  sourceKey?: string;
  targetKey?: string;
  relationType?: RelationType;
  kind?: 'REGULAR' | 'SUMMER';
  /** ADD_TERM / MOVE_TERM: null or undefined = before the first term */
  afterTermKey?: string | null;
  /** undefined = unchanged, null = clear */
  label?: string | null;
  academicYear?: number | null;
  termInYear?: TermInYear | null;
}

export interface ApplyContext {
  base: BaseStructure;
  /** Node keys that have a STUDENT_COURSE_RESULTS row */
  resultNodeKeys: ReadonlySet<string>;
  /** Catalog course ids referenced by the ops that exist */
  knownCourseIds: ReadonlySet<number>;
  maxTermCount: number;
}

const bad = (code: string, message: string, extra?: Record<string, unknown>) => new OpError(400, code, message, extra);
const notFound = (message: string) => new OpError(404, ErrorCodes.NOT_FOUND, message);
const conflict = (code: string, message: string, extra?: Record<string, unknown>) => new OpError(409, code, message, extra);

function required<T>(value: T | undefined | null, field: string, op: string): T {
  if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
    throw bad(ErrorCodes.INVALID_OPERATION, `${op} requires ${field}`);
  }
  return value;
}

/**
 * Applies a batch of ops to the learner's delta rows, then normalizes and checks integrity.
 * Pure: returns a new state and throws OpError on the first invalid op (the batch is rejected).
 */
export function applyOps(ctx: ApplyContext, current: DeltaState, ops: ReadonlyArray<ChangeOp>): DeltaState {
  const state = cloneDeltaState(current);
  const baseNodes = new Map(ctx.base.nodes.map((n) => [n.nodeKey, n]));
  const baseTerms = new Map(ctx.base.terms.map((t) => [t.termKey, t]));
  const baseEdgeKeys = new Set(ctx.base.edges.map((e) => e.edgeKey));

  for (const op of ops) {
    const merged = mergeRoadmap(ctx.base, state);
    const mergedTermKeys = new Set(merged.terms.map((t) => t.termKey));
    const mergedNodes = new Map(merged.nodes.map((n) => [n.nodeKey, n]));

    switch (op.op) {
      case 'MOVE_NODE': {
        const nodeKey = required(op.nodeKey, 'nodeKey', op.op);
        const termKey = required(op.termKey, 'termKey', op.op);
        const rowOrder = required(op.rowOrder, 'rowOrder', op.op);
        if (!Number.isFinite(rowOrder)) throw bad(ErrorCodes.INVALID_OPERATION, 'rowOrder must be a number');
        if (!mergedNodes.has(nodeKey)) throw notFound(`Node ${nodeKey} not found`);
        if (!mergedTermKeys.has(termKey)) throw notFound(`Term ${termKey} not found`);
        const target = merged.terms.find((t) => t.termKey === termKey)!;
        if (target.kind === 'ELECTIVE_POOL' && ctx.resultNodeKeys.has(nodeKey)) {
          throw conflict(ErrorCodes.NODE_HAS_RESULT, 'A course with a result cannot move to the elective pool', { nodeKey });
        }
        const delta = state.nodes.get(nodeKey) ?? newBaseDelta(nodeKey);
        delta.termKey = termKey;
        delta.rowOrder = rowOrder;
        state.nodes.set(nodeKey, delta);
        break;
      }

      case 'ADD_NODE': {
        const nodeKey = required(op.nodeKey, 'nodeKey', op.op);
        const termKey = required(op.termKey, 'termKey', op.op);
        if (baseNodes.has(nodeKey) || state.nodes.has(nodeKey)) throw bad(ErrorCodes.INVALID_OPERATION, `Node key ${nodeKey} already used`);
        if (!mergedTermKeys.has(termKey)) throw notFound(`Term ${termKey} not found`);
        const delta: NodeDelta = { ...newBaseDelta(nodeKey), origin: 'CUSTOM', termKey, rowOrder: op.rowOrder ?? 0 };
        if (op.courseId !== undefined && op.courseId !== null) {
          if (!ctx.knownCourseIds.has(op.courseId)) throw notFound(`Course ${op.courseId} not found`);
          delta.courseId = op.courseId;
        } else {
          delta.customCode = required(op.customCode, 'customCode or courseId', op.op);
          delta.customName = required(op.customName, 'customName', op.op);
          delta.customTheoryCredits = op.customTheoryCredits ?? 0;
          delta.customLabCredits = op.customLabCredits ?? 0;
          if (delta.customTheoryCredits < 0 || delta.customLabCredits < 0 || delta.customTheoryCredits + delta.customLabCredits <= 0) {
            throw bad(ErrorCodes.INVALID_OPERATION, 'A custom course needs credits greater than 0');
          }
        }
        state.nodes.set(nodeKey, delta);
        break;
      }

      case 'REMOVE_NODE': {
        const nodeKey = required(op.nodeKey, 'nodeKey', op.op);
        if (baseNodes.has(nodeKey)) {
          throw bad(ErrorCodes.BASE_ITEM_NOT_REMOVABLE, 'Curriculum courses cannot be removed', { nodeKey });
        }
        const delta = state.nodes.get(nodeKey);
        if (!delta) throw notFound(`Node ${nodeKey} not found`);
        if (ctx.resultNodeKeys.has(nodeKey)) throw conflict(ErrorCodes.NODE_HAS_RESULT, 'The course already has a result', { nodeKey });
        state.nodes.delete(nodeKey);
        for (const [key, e] of state.edges) {
          if (e.sourceKey === nodeKey || e.targetKey === nodeKey) state.edges.delete(key);
        }
        break;
      }

      case 'FILL_SLOT': {
        const nodeKey = required(op.nodeKey, 'nodeKey', op.op);
        const courseId = required(op.courseId, 'courseId', op.op);
        const slot = baseNodes.get(nodeKey);
        if (!slot || slot.kind !== 'ELECTIVE_SLOT') throw bad(ErrorCodes.INVALID_OPERATION, 'Only an elective slot can be filled');
        if (!ctx.knownCourseIds.has(courseId)) throw notFound(`Course ${courseId} not found`);
        if (slot.electiveGroup) {
          const inGroup = ctx.base.nodes.some((n) => n.courseId === courseId && n.electiveGroup === slot.electiveGroup && n.kind === 'COURSE');
          if (!inGroup) {
            throw bad(ErrorCodes.INVALID_SLOT_COURSE, `The course is not in elective group ${slot.electiveGroup}`, {
              nodeKey,
              electiveGroup: slot.electiveGroup,
            });
          }
        }
        const delta = state.nodes.get(nodeKey) ?? newBaseDelta(nodeKey);
        delta.courseId = courseId;
        state.nodes.set(nodeKey, delta);
        break;
      }

      case 'CLEAR_SLOT': {
        const nodeKey = required(op.nodeKey, 'nodeKey', op.op);
        const slot = baseNodes.get(nodeKey);
        if (!slot || slot.kind !== 'ELECTIVE_SLOT') throw bad(ErrorCodes.INVALID_OPERATION, 'Only an elective slot can be cleared');
        if (ctx.resultNodeKeys.has(nodeKey)) throw conflict(ErrorCodes.NODE_HAS_RESULT, 'The chosen course already has a result', { nodeKey });
        const delta = state.nodes.get(nodeKey);
        if (delta) delta.courseId = null;
        break;
      }

      case 'RESET_NODE': {
        const nodeKey = required(op.nodeKey, 'nodeKey', op.op);
        if (!baseNodes.has(nodeKey)) throw bad(ErrorCodes.INVALID_OPERATION, 'Only curriculum courses can be reset');
        const delta = state.nodes.get(nodeKey);
        if (delta?.courseId !== null && delta?.courseId !== undefined && ctx.resultNodeKeys.has(nodeKey)) {
          throw conflict(ErrorCodes.NODE_HAS_RESULT, 'The chosen course already has a result', { nodeKey });
        }
        state.nodes.delete(nodeKey);
        break;
      }

      case 'ADD_EDGE': {
        const edgeKey = required(op.edgeKey, 'edgeKey', op.op);
        const sourceKey = required(op.sourceKey, 'sourceKey', op.op);
        const targetKey = required(op.targetKey, 'targetKey', op.op);
        const type = required(op.relationType, 'relationType', op.op);
        if (baseEdgeKeys.has(edgeKey) || state.edges.has(edgeKey)) throw bad(ErrorCodes.INVALID_OPERATION, `Edge key ${edgeKey} already used`);
        if (!mergedNodes.has(sourceKey) || !mergedNodes.has(targetKey)) throw notFound('Relation endpoints not found');
        if (sourceKey === targetKey) throw bad(ErrorCodes.INVALID_OPERATION, 'A course cannot relate to itself');
        const exists = merged.edges.some(
          (e) => (e.sourceKey === sourceKey && e.targetKey === targetKey) || (e.sourceKey === targetKey && e.targetKey === sourceKey),
        );
        if (exists) throw conflict(ErrorCodes.DUPLICATE_EDGE, 'The two courses already have a relation');
        state.edges.set(edgeKey, { edgeKey, sourceKey, targetKey, type });
        break;
      }

      case 'REMOVE_EDGE': {
        const edgeKey = required(op.edgeKey, 'edgeKey', op.op);
        if (baseEdgeKeys.has(edgeKey)) throw bad(ErrorCodes.BASE_ITEM_NOT_REMOVABLE, 'Curriculum relations cannot be removed', { edgeKey });
        if (!state.edges.delete(edgeKey)) throw notFound(`Relation ${edgeKey} not found`);
        break;
      }

      case 'ADD_TERM': {
        const termKey = required(op.termKey, 'termKey', op.op);
        const label = required(op.label, 'label', op.op);
        const anchor = op.afterTermKey ?? null;
        if (baseTerms.has(termKey) || state.terms.has(termKey)) throw bad(ErrorCodes.INVALID_OPERATION, `Term key ${termKey} already used`);
        if (anchor !== null && !mergedTermKeys.has(anchor)) throw notFound(`Term ${anchor} not found`);
        if (merged.terms.length + 1 > ctx.maxTermCount) {
          throw bad(ErrorCodes.TERM_LIMIT_EXCEEDED, `A roadmap has at most ${ctx.maxTermCount} terms`);
        }
        const kind = op.kind === 'SUMMER' ? 'SUMMER' : 'REGULAR';
        insertCustomTerm(state, {
          termKey,
          origin: 'CUSTOM',
          kind,
          afterTermKey: anchor,
          customLabel: label,
          academicYear: op.academicYear ?? null,
          termInYear: op.termInYear ?? null,
        });
        break;
      }

      case 'MOVE_TERM': {
        const termKey = required(op.termKey, 'termKey', op.op);
        const anchor = op.afterTermKey ?? null;
        const term = state.terms.get(termKey);
        if (baseTerms.has(termKey) || !term || term.origin !== 'CUSTOM') {
          throw bad(ErrorCodes.INVALID_OPERATION, 'Only terms you added can be moved');
        }
        if (anchor === termKey) throw bad(ErrorCodes.INVALID_OPERATION, 'A term cannot follow itself');
        if (anchor !== null && !mergedTermKeys.has(anchor)) throw notFound(`Term ${anchor} not found`);
        detachCustomTerm(state, term);
        insertCustomTerm(state, { ...term, afterTermKey: anchor });
        break;
      }

      case 'UPDATE_TERM': {
        const termKey = required(op.termKey, 'termKey', op.op);
        if (!mergedTermKeys.has(termKey)) throw notFound(`Term ${termKey} not found`);
        if (baseTerms.has(termKey)) {
          if (op.label !== undefined) throw bad(ErrorCodes.INVALID_OPERATION, 'Curriculum terms keep their label');
          const delta = state.terms.get(termKey) ?? newBaseTermDelta(termKey);
          if (op.academicYear !== undefined) delta.academicYear = op.academicYear;
          if (op.termInYear !== undefined) delta.termInYear = op.termInYear;
          state.terms.set(termKey, delta);
        } else {
          const delta = state.terms.get(termKey)!;
          if (op.label !== undefined) delta.customLabel = required(op.label, 'label', op.op);
          if (op.academicYear !== undefined) delta.academicYear = op.academicYear;
          if (op.termInYear !== undefined) delta.termInYear = op.termInYear;
        }
        break;
      }

      case 'REMOVE_TERM': {
        const termKey = required(op.termKey, 'termKey', op.op);
        const term = state.terms.get(termKey);
        if (baseTerms.has(termKey)) throw bad(ErrorCodes.BASE_ITEM_NOT_REMOVABLE, 'Curriculum terms cannot be removed', { termKey });
        if (!term) throw notFound(`Term ${termKey} not found`);
        const inside = merged.nodes.filter((n) => n.termKey === termKey).map((n) => n.nodeKey);
        if (inside.length) throw conflict(ErrorCodes.TERM_NOT_EMPTY, 'Move the courses out of the term first', { nodeKeys: inside });
        detachCustomTerm(state, term);
        state.terms.delete(termKey);
        break;
      }

      default:
        throw bad(ErrorCodes.INVALID_OPERATION, `Unknown op ${(op as ChangeOp).op}`);
    }
  }

  normalize(ctx.base, state);
  assertIntegrity(ctx, state);
  return state;
}

/** Drops overrides that equal the curriculum (BR-LRN-07) and relations left without endpoints. */
export function normalize(base: BaseStructure, state: DeltaState): void {
  const baseNodes = new Map(base.nodes.map((n) => [n.nodeKey, n]));
  for (const [key, d] of state.nodes) {
    if (d.origin !== 'BASE') continue;
    const b = baseNodes.get(key);
    if (!b) continue;
    const sameTerm = (d.termKey ?? b.termKey) === b.termKey;
    const sameRow = (d.rowOrder ?? b.rowIndex) === b.rowIndex;
    if (sameTerm && sameRow) {
      d.termKey = null;
      d.rowOrder = null;
    }
    if (d.termKey === null && d.rowOrder === null && d.courseId === null) state.nodes.delete(key);
  }
  for (const [key, t] of state.terms) {
    if (t.origin === 'BASE' && t.academicYear === null && t.termInYear === null) state.terms.delete(key);
  }
  const merged = mergeRoadmap(base, state);
  const visible = new Set(merged.nodes.map((n) => n.nodeKey));
  for (const [key, e] of state.edges) {
    if (!visible.has(e.sourceKey) || !visible.has(e.targetKey)) state.edges.delete(key);
  }
}

function assertIntegrity(ctx: ApplyContext, state: DeltaState): void {
  const merged = mergeRoadmap(ctx.base, state);
  if (merged.terms.length > ctx.maxTermCount) {
    throw bad(ErrorCodes.TERM_LIMIT_EXCEEDED, `A roadmap has at most ${ctx.maxTermCount} terms`);
  }
  const byCourse = new Map<number, string>();
  for (const n of merged.nodes) {
    if (n.courseId === null) continue;
    const other = byCourse.get(n.courseId);
    if (other) {
      throw conflict(ErrorCodes.DUPLICATE_COURSE_IN_PLAN, 'The course is already in your plan', {
        courseId: n.courseId,
        nodeKeys: [other, n.nodeKey],
      });
    }
    byCourse.set(n.courseId, n.nodeKey);
  }
}

function newBaseDelta(nodeKey: string): NodeDelta {
  return {
    nodeKey,
    origin: 'BASE',
    termKey: null,
    rowOrder: null,
    courseId: null,
    customCode: null,
    customName: null,
    customTheoryCredits: null,
    customLabCredits: null,
  };
}

function newBaseTermDelta(termKey: string): TermDelta {
  return { termKey, origin: 'BASE', kind: null, afterTermKey: null, customLabel: null, academicYear: null, termInYear: null };
}

/** Inserts a custom term after its anchor; the custom term that followed the anchor now follows it. */
function insertCustomTerm(state: DeltaState, term: TermDelta): void {
  for (const other of state.terms.values()) {
    if (other.origin === 'CUSTOM' && other.termKey !== term.termKey && other.afterTermKey === term.afterTermKey) {
      other.afterTermKey = term.termKey;
    }
  }
  state.terms.set(term.termKey, { ...term });
}

/** Removes a custom term from the chain: its follower now follows its anchor. */
function detachCustomTerm(state: DeltaState, term: TermDelta): void {
  for (const other of state.terms.values()) {
    if (other.origin === 'CUSTOM' && other.afterTermKey === term.termKey) other.afterTermKey = term.afterTermKey;
  }
}
