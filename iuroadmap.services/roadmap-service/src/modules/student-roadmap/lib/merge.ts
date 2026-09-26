import { orderTerms } from '@iuroadmap/shared';
import { BaseStructure, DeltaState, MergedEdge, MergedNode, MergedRoadmap, MergedTerm } from './overlay-types';

/**
 * base ⊕ overlay (design §6.3). Pure and O(|base| + |overlay|).
 * - Custom terms are spliced in through their `after_term_key` chain.
 * - A base node delta moves the node and/or fills an elective slot.
 * - A pool course chosen for an elective slot is not drawn in the pool (FR-LRN.04.5).
 * - Edges of the curriculum always stay; custom edges whose endpoint is gone are dropped.
 */
export function mergeRoadmap(base: BaseStructure, deltas: DeltaState): MergedRoadmap {
  const customTerms = [...deltas.terms.values()].filter((t) => t.origin === 'CUSTOM');
  const orderedKeys = orderTerms(
    base.terms.map((t) => ({ key: t.termKey, orderIndex: t.orderIndex })),
    customTerms.map((t) => ({ key: t.termKey, afterKey: t.afterTermKey })),
  );
  const baseTermByKey = new Map(base.terms.map((t) => [t.termKey, t]));
  const terms: MergedTerm[] = orderedKeys.map((key, position) => {
    const delta = deltas.terms.get(key);
    const baseTerm = baseTermByKey.get(key);
    if (baseTerm) {
      return {
        termKey: key,
        origin: 'BASE',
        kind: baseTerm.kind,
        semesterNo: baseTerm.semesterNo,
        customLabel: null,
        academicYear: delta?.academicYear ?? null,
        termInYear: delta?.termInYear ?? null,
        position,
      };
    }
    return {
      termKey: key,
      origin: 'CUSTOM',
      kind: delta!.kind ?? 'REGULAR',
      semesterNo: null,
      customLabel: delta!.customLabel,
      academicYear: delta!.academicYear,
      termInYear: delta!.termInYear,
      position,
    };
  });
  const termKeys = new Set(terms.map((t) => t.termKey));

  const nodes = new Map<string, MergedNode>();
  for (const n of base.nodes) {
    nodes.set(n.nodeKey, {
      nodeKey: n.nodeKey,
      origin: 'BASE',
      isModified: false,
      kind: n.kind,
      termKey: n.termKey,
      order: n.rowIndex,
      courseId: n.courseId,
      custom: null,
      slot:
        n.kind === 'ELECTIVE_SLOT'
          ? {
              label: n.slotLabel ?? '',
              theoryCredits: n.slotTheoryCredits ?? 0,
              labCredits: n.slotLabCredits ?? 0,
              electiveGroup: n.electiveGroup,
            }
          : null,
      electiveGroup: n.electiveGroup,
    });
  }

  const orphanNodeKeys: string[] = [];
  for (const d of deltas.nodes.values()) {
    if (d.origin === 'CUSTOM') {
      nodes.set(d.nodeKey, {
        nodeKey: d.nodeKey,
        origin: 'CUSTOM',
        isModified: false,
        kind: 'COURSE',
        termKey: d.termKey && termKeys.has(d.termKey) ? d.termKey : firstRegularTerm(terms),
        order: d.rowOrder ?? 0,
        courseId: d.courseId,
        custom:
          d.courseId === null
            ? {
                code: d.customCode ?? '',
                name: d.customName ?? '',
                theoryCredits: d.customTheoryCredits ?? 0,
                labCredits: d.customLabCredits ?? 0,
              }
            : null,
        slot: null,
        electiveGroup: null,
      });
      continue;
    }
    const node = nodes.get(d.nodeKey);
    if (!node) {
      orphanNodeKeys.push(d.nodeKey);
      continue;
    }
    node.isModified = true;
    if (d.termKey && termKeys.has(d.termKey)) node.termKey = d.termKey;
    if (d.rowOrder !== null && d.rowOrder !== undefined) node.order = d.rowOrder;
    if (node.kind === 'ELECTIVE_SLOT' && d.courseId !== null) node.courseId = d.courseId;
  }

  // Pool courses already chosen for a slot are not drawn twice.
  const poolTerms = new Set(terms.filter((t) => t.kind === 'ELECTIVE_POOL').map((t) => t.termKey));
  const filledCourseIds = new Set(
    [...nodes.values()].filter((n) => n.kind === 'ELECTIVE_SLOT' && n.courseId !== null).map((n) => n.courseId),
  );
  for (const n of [...nodes.values()]) {
    if (n.origin === 'BASE' && n.kind === 'COURSE' && poolTerms.has(n.termKey) && filledCourseIds.has(n.courseId)) {
      nodes.delete(n.nodeKey);
    }
  }

  const edges: MergedEdge[] = [
    ...base.edges.map((e) => ({ ...e, origin: 'BASE' as const })),
    ...[...deltas.edges.values()].map((e) => ({ ...e, origin: 'CUSTOM' as const })),
  ].filter((e) => nodes.has(e.sourceKey) && nodes.has(e.targetKey));

  return { terms, nodes: [...nodes.values()], edges, orphanNodeKeys };
}

function firstRegularTerm(terms: MergedTerm[]): string {
  return (terms.find((t) => t.kind === 'REGULAR') ?? terms[0])?.termKey ?? '';
}

/** Credits of a merged node (theory + lab of its course, custom course or unfilled slot). */
export function nodeCredits(node: MergedNode, courseCredits: (courseId: number) => number | undefined): number {
  if (node.courseId !== null) return courseCredits(node.courseId) ?? 0;
  if (node.custom) return node.custom.theoryCredits + node.custom.labCredits;
  if (node.slot) return node.slot.theoryCredits + node.slot.labCredits;
  return 0;
}
