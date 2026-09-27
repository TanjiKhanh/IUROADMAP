import type { RoadmapChangeOpRequest } from '@iuroadmap/api-gen';

/**
 * Folds a queue of learner changes into the final state before "Save" (design §6.6):
 * - a node moved many times keeps only its last MOVE_NODE,
 * - things added and removed in the same session disappear (with the relations that used them),
 * - repeated UPDATE_TERM / MOVE_TERM / FILL_SLOT / CLEAR_SLOT keep the final value.
 * The server still normalizes, this only keeps batches small and readable.
 */
export function compactOps(ops: ReadonlyArray<RoadmapChangeOpRequest>): RoadmapChangeOpRequest[] {
  let list = ops.map((op) => ({ ...op }));

  // 1. Nodes added then removed: drop every op about them and the relations they had.
  const addedNodes = new Set(list.filter((o) => o.op === 'ADD_NODE').map((o) => o.nodeKey));
  const deadNodes = new Set(list.filter((o) => o.op === 'REMOVE_NODE' && addedNodes.has(o.nodeKey)).map((o) => o.nodeKey));
  if (deadNodes.size) {
    const deadEdges = new Set(
      list.filter((o) => o.op === 'ADD_EDGE' && (deadNodes.has(o.sourceKey) || deadNodes.has(o.targetKey))).map((o) => o.edgeKey),
    );
    list = list.filter((o) => !(o.nodeKey && deadNodes.has(o.nodeKey)) && !(o.edgeKey && deadEdges.has(o.edgeKey)));
  }

  // 2. Relations added then removed.
  const addedEdges = new Set(list.filter((o) => o.op === 'ADD_EDGE').map((o) => o.edgeKey));
  const deadEdges = new Set(list.filter((o) => o.op === 'REMOVE_EDGE' && addedEdges.has(o.edgeKey)).map((o) => o.edgeKey));
  if (deadEdges.size) list = list.filter((o) => !(o.edgeKey && deadEdges.has(o.edgeKey)));

  // 3. A node moved many times keeps only its final move.
  const keepLast = (kind: string, keyOf: (o: RoadmapChangeOpRequest) => string | undefined) => {
    const last = new Map<string, number>();
    list.forEach((o, i) => {
      const key = keyOf(o);
      if (o.op === kind && key) last.set(key, i);
    });
    list = list.filter((o, i) => {
      const key = keyOf(o);
      return o.op !== kind || !key || last.get(key) === i;
    });
  };
  keepLast('MOVE_NODE', (o) => o.nodeKey);

  // 4. Terms added then removed: terms added after them now follow their anchor.
  const addedTerms = new Map(list.filter((o) => o.op === 'ADD_TERM').map((o) => [o.termKey!, o]));
  for (const removal of list.filter((o) => o.op === 'REMOVE_TERM' && addedTerms.has(o.termKey!))) {
    const termKey = removal.termKey!;
    const lastMove = [...list].reverse().find((o) => o.op === 'MOVE_TERM' && o.termKey === termKey);
    const anchor = (lastMove ?? addedTerms.get(termKey)!).afterTermKey ?? null;
    const stillUsed = list.some((o) => o.op !== 'ADD_TERM' && o.op !== 'REMOVE_TERM' && o.op !== 'UPDATE_TERM' && o.op !== 'MOVE_TERM' && o.termKey === termKey);
    if (stillUsed) continue;
    list = list
      .filter((o) => o.termKey !== termKey || (o.op !== 'ADD_TERM' && o.op !== 'REMOVE_TERM' && o.op !== 'UPDATE_TERM' && o.op !== 'MOVE_TERM'))
      .map((o) => ((o.op === 'ADD_TERM' || o.op === 'MOVE_TERM') && o.afterTermKey === termKey ? { ...o, afterTermKey: anchor } : o));
  }

  keepLast('MOVE_TERM', (o) => o.termKey);

  // 5. Last MOVE_TERM / slot choice per key; UPDATE_TERM merges the fields it set.
  const slotLast = new Map<string, number>();
  list.forEach((o, i) => {
    if ((o.op === 'FILL_SLOT' || o.op === 'CLEAR_SLOT') && o.nodeKey) slotLast.set(o.nodeKey, i);
  });
  list = list.filter((o, i) => !((o.op === 'FILL_SLOT' || o.op === 'CLEAR_SLOT') && o.nodeKey && slotLast.get(o.nodeKey) !== i));

  const merged = new Map<string, RoadmapChangeOpRequest>();
  for (const o of list) {
    if (o.op !== 'UPDATE_TERM' || !o.termKey) continue;
    const previous = merged.get(o.termKey);
    const next: RoadmapChangeOpRequest = { ...(previous ?? {}), op: 'UPDATE_TERM', termKey: o.termKey };
    if (o.label !== undefined) next.label = o.label;
    if (o.academicYear !== undefined) next.academicYear = o.academicYear;
    if (o.termInYear !== undefined) next.termInYear = o.termInYear;
    merged.set(o.termKey, next);
  }
  keepLast('UPDATE_TERM', (o) => o.termKey);
  list = list.map((o) => (o.op === 'UPDATE_TERM' && o.termKey ? merged.get(o.termKey)! : o));

  return list;
}
