import { layoutColumn, orderForSlot, rebalanceColumn, type OrderedItem } from '@iuroadmap/shared/roadmap-engine';

export interface ColumnItem extends OrderedItem {
  /** Curriculum node: its order is an anchor that rebalancing never changes */
  isBase: boolean;
}

/**
 * Order for a node dropped at `slot` of a column (design §4.2). When two neighbours are too
 * close (the midpoint is below 1e-6), the learner-placed nodes of the column are spread out
 * first; the new orders of those nodes are returned in `rebalanced`.
 */
export function computeDropOrder(items: ReadonlyArray<ColumnItem>, slot: number): { order: number; rebalanced: Map<string, number> } {
  const direct = orderForSlot(items, slot);
  if (direct !== null) return { order: direct, rebalanced: new Map() };

  const rebalanced = rebalanceColumn(items);
  const spread = items.map((i) => ({ ...i, order: rebalanced.get(i.key) ?? i.order }));
  const order = orderForSlot(spread, slot);
  // Still no room (only curriculum anchors around the slot): fall back to just above the occupant.
  return { order: order ?? slot - 0.5, rebalanced };
}

/** key → visual row for every node of every column. */
export function layoutRows(nodes: ReadonlyArray<{ key: string; termKey: string; order: number }>): Map<string, number> {
  const byTerm = new Map<string, OrderedItem[]>();
  for (const n of nodes) {
    const list = byTerm.get(n.termKey) ?? [];
    list.push({ key: n.key, order: n.order });
    byTerm.set(n.termKey, list);
  }
  const rows = new Map<string, number>();
  for (const items of byTerm.values()) {
    for (const [key, row] of layoutColumn(items)) rows.set(key, row);
  }
  return rows;
}
