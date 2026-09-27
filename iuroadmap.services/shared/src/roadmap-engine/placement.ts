import { EngineEdge, EngineNode, EngineTerm } from './types';

export interface PlacementViolation {
  edgeKey: string;
  source: string;
  target: string;
  type: EngineEdge['type'];
  sourceOrder: number;
  targetOrder: number;
}

/**
 * Checks the semester-order constraint of every edge (BR-RM-08):
 * PREREQUISITE / PREVIOUS need order(A) < order(B), COREQUISITE needs order(A) <= order(B).
 * `orderedTerms` must already be in left-to-right order. Nodes in an ELECTIVE_POOL term,
 * or in a term that is not listed, are skipped.
 */
export function checkPlacement(
  orderedTerms: ReadonlyArray<EngineTerm>,
  nodes: ReadonlyArray<EngineNode>,
  edges: ReadonlyArray<EngineEdge>,
): PlacementViolation[] {
  const termOrder = new Map<string, number>();
  orderedTerms.forEach((t, i) => {
    if (t.kind !== 'ELECTIVE_POOL') termOrder.set(t.key, i);
  });
  const nodeOrder = new Map<string, number>();
  for (const n of nodes) {
    const order = termOrder.get(n.termKey);
    if (order !== undefined) nodeOrder.set(n.key, order);
  }

  const violations: PlacementViolation[] = [];
  for (const e of edges) {
    const a = nodeOrder.get(e.source);
    const b = nodeOrder.get(e.target);
    if (a === undefined || b === undefined) continue;
    const ok = e.type === 'COREQUISITE' ? a <= b : a < b;
    if (!ok) {
      violations.push({ edgeKey: e.key, source: e.source, target: e.target, type: e.type, sourceOrder: a, targetOrder: b });
    }
  }
  return violations;
}
