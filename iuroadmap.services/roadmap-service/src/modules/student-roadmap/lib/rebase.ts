import { normalize } from './apply-ops';
import { mergeRoadmap } from './merge';
import { BaseStructure, DeltaState, NodeDelta, cloneDeltaState, emptyDeltaState } from './overlay-types';

export interface RebasePreview {
  /** Overrides kept as they are (the node key exists in the target) */
  kept: string[];
  /** Node key gone, same course found at another key in the target */
  remapped: Array<{ nodeKey: string; newNodeKey: string; courseId: number }>;
  /** Override dropped: the course is no longer in the curriculum (no result to keep) */
  dropped: Array<{ nodeKey: string; courseId: number | null }>;
  /** Course left the curriculum but has a result: kept as a course the learner added */
  convertedToCustom: Array<{ nodeKey: string; courseId: number }>;
  /** Academic-year labels of terms that do not exist in the target */
  droppedTerms: string[];
  /** Learner relations whose endpoint disappeared */
  droppedEdges: string[];
}

export interface RebaseResult {
  state: DeltaState;
  /** old node key → new node key for results that must follow a remapped node */
  resultKeyMap: Map<string, string>;
  preview: RebasePreview;
}

/**
 * Moves a learner overlay from one curriculum to another (design §6.5, FL-LRN-07).
 * Keys are stable across curricula, so most rows stay as they are; a result is never lost
 * (BR-LRN-11): a graded course that left the curriculum becomes a course the learner added.
 */
export function rebaseOverlay(
  oldBase: BaseStructure,
  newBase: BaseStructure,
  current: DeltaState,
  resultNodeKeys: ReadonlySet<string>,
): RebaseResult {
  const deltas = cloneDeltaState(current);
  const state = emptyDeltaState();
  const preview: RebasePreview = { kept: [], remapped: [], dropped: [], convertedToCustom: [], droppedTerms: [], droppedEdges: [] };
  const resultKeyMap = new Map<string, string>();

  const oldNodes = new Map(oldBase.nodes.map((n) => [n.nodeKey, n]));
  const newNodes = new Map(newBase.nodes.map((n) => [n.nodeKey, n]));
  const newNodeByCourse = new Map<number, string>();
  for (const n of newBase.nodes) if (n.kind === 'COURSE' && n.courseId !== null) newNodeByCourse.set(n.courseId, n.nodeKey);
  const newTermKeys = new Set(newBase.terms.map((t) => t.termKey));
  const customTermKeys = new Set([...deltas.terms.values()].filter((t) => t.origin === 'CUSTOM').map((t) => t.termKey));
  const termExists = (key: string | null) => key !== null && (newTermKeys.has(key) || customTermKeys.has(key));
  const firstRegular =
    [...newBase.terms].sort((a, b) => a.orderIndex - b.orderIndex).find((t) => t.kind === 'REGULAR')?.termKey ??
    newBase.terms[0]?.termKey ??
    null;

  // Terms: custom terms always stay; year labels of curriculum terms stay when the term still exists.
  for (const t of deltas.terms.values()) {
    if (t.origin === 'CUSTOM' || newTermKeys.has(t.termKey)) state.terms.set(t.termKey, { ...t });
    else preview.droppedTerms.push(t.termKey);
  }

  // Curriculum nodes the learner touched (moved / slot filled) or graded.
  const baseKeys = new Set<string>();
  for (const d of deltas.nodes.values()) if (d.origin === 'BASE') baseKeys.add(d.nodeKey);
  for (const key of resultNodeKeys) if (oldNodes.has(key)) baseKeys.add(key);

  for (const key of baseKeys) {
    const delta = deltas.nodes.get(key);
    const oldNode = oldNodes.get(key);
    const course = delta?.courseId ?? oldNode?.courseId ?? null;

    if (newNodes.has(key)) {
      if (delta) {
        const kept: NodeDelta = { ...delta };
        if (kept.termKey !== null && !termExists(kept.termKey)) {
          kept.termKey = null;
          kept.rowOrder = null;
        }
        if (newNodes.get(key)!.kind !== 'ELECTIVE_SLOT') kept.courseId = null;
        state.nodes.set(key, kept);
      }
      preview.kept.push(key);
      continue;
    }

    const newKey = course !== null ? newNodeByCourse.get(course) : undefined;
    if (course !== null && newKey) {
      if (delta && delta.termKey !== null && termExists(delta.termKey)) {
        state.nodes.set(newKey, { ...delta, nodeKey: newKey, courseId: null });
      }
      if (resultNodeKeys.has(key)) resultKeyMap.set(key, newKey);
      preview.remapped.push({ nodeKey: key, newNodeKey: newKey, courseId: course });
      continue;
    }

    if (course !== null && resultNodeKeys.has(key)) {
      const termKey = termExists(delta?.termKey ?? null)
        ? delta!.termKey
        : oldNode && termExists(oldNode.termKey)
          ? oldNode.termKey
          : firstRegular;
      state.nodes.set(key, {
        nodeKey: key,
        origin: 'CUSTOM',
        termKey,
        rowOrder: delta?.rowOrder ?? oldNode?.rowIndex ?? 0,
        courseId: course,
        customCode: null,
        customName: null,
        customTheoryCredits: null,
        customLabCredits: null,
      });
      preview.convertedToCustom.push({ nodeKey: key, courseId: course });
      continue;
    }

    preview.dropped.push({ nodeKey: key, courseId: course });
  }

  // Courses the learner added.
  for (const d of deltas.nodes.values()) {
    if (d.origin !== 'CUSTOM') continue;
    const baseKey = d.courseId !== null ? newNodeByCourse.get(d.courseId) : undefined;
    if (baseKey) {
      // The target curriculum now contains the course: follow the curriculum node instead.
      if (d.termKey !== null && termExists(d.termKey) && !state.nodes.has(baseKey)) {
        state.nodes.set(baseKey, { ...d, nodeKey: baseKey, origin: 'BASE', courseId: null });
      }
      if (resultNodeKeys.has(d.nodeKey)) resultKeyMap.set(d.nodeKey, baseKey);
      preview.remapped.push({ nodeKey: d.nodeKey, newNodeKey: baseKey, courseId: d.courseId! });
      continue;
    }
    state.nodes.set(d.nodeKey, { ...d, termKey: termExists(d.termKey) ? d.termKey : firstRegular });
  }

  // Learner relations follow remapped nodes; dangling ones are dropped.
  for (const e of deltas.edges.values()) {
    state.edges.set(e.edgeKey, {
      ...e,
      sourceKey: resultKeyMap.get(e.sourceKey) ?? remappedKey(preview, e.sourceKey),
      targetKey: resultKeyMap.get(e.targetKey) ?? remappedKey(preview, e.targetKey),
    });
  }
  const visible = new Set(mergeRoadmap(newBase, state).nodes.map((n) => n.nodeKey));
  for (const [key, e] of state.edges) {
    if (!visible.has(e.sourceKey) || !visible.has(e.targetKey) || e.sourceKey === e.targetKey) {
      state.edges.delete(key);
      preview.droppedEdges.push(key);
    }
  }

  normalize(newBase, state);
  return { state, resultKeyMap, preview };
}

function remappedKey(preview: RebasePreview, key: string): string {
  return preview.remapped.find((r) => r.nodeKey === key)?.newNodeKey ?? key;
}
