/**
 * Order of nodes inside one column (design §4.2).
 *
 * - Curriculum nodes carry an integer `order` (= ROADMAP_NODES.row_index).
 * - Nodes moved or added by a learner carry a real `order` (= STUDENT_NODE_DELTAS.row_order).
 *
 * The displayed row is derived, never stored:
 *   visualRow[i] = max(ceil(order[i]), visualRow[i - 1] + 1)
 * so an inserted node pushes the nodes below it down only until the nearest empty row.
 */

export interface OrderedItem {
  key: string;
  order: number;
}

export interface RebalanceItem extends OrderedItem {
  /** Curriculum node: its order is an anchor and never changes */
  isBase: boolean;
}

/** Decimal places kept for row_order (mirrors AppConstant.Roadmap.RowOrderScale). */
export const ROW_ORDER_SCALE = 6;
/** Smallest allowed gap between two orders (mirrors AppConstant.Roadmap.RowOrderEpsilon). */
export const ROW_ORDER_EPSILON = 1e-6;

export function roundOrder(value: number): number {
  const factor = 10 ** ROW_ORDER_SCALE;
  return Math.round(value * factor) / factor;
}

function sortItems<T extends OrderedItem>(items: ReadonlyArray<T>): T[] {
  return [...items].sort((a, b) => a.order - b.order || a.key.localeCompare(b.key));
}

/** key → visual row (0-based) for every item of one column. */
export function layoutColumn(items: ReadonlyArray<OrderedItem>): Map<string, number> {
  const rows = new Map<string, number>();
  let previous = -1;
  for (const item of sortItems(items)) {
    const row = Math.max(Math.ceil(item.order), previous + 1, 0);
    rows.set(item.key, row);
    previous = row;
  }
  return rows;
}

/**
 * The order to give a node dropped at `slot` (a visual row) of a column that already
 * holds `items` (the dragged node excluded).
 * - Empty slot → the slot itself (an integer keeps rows aligned across columns).
 * - Occupied slot → insert before the occupant: midpoint with the node above it,
 *   or occupant − 1 when it is the first node.
 * Returns null when there is no room left between the two neighbours (call rebalanceColumn).
 */
export function orderForSlot(items: ReadonlyArray<OrderedItem>, slot: number): number | null {
  const target = Math.max(0, Math.floor(slot));
  const rows = layoutColumn(items);
  const sorted = sortItems(items);
  const index = sorted.findIndex((i) => rows.get(i.key) === target);
  if (index < 0) return target;

  const next = sorted[index];
  const prev = index > 0 ? sorted[index - 1] : undefined;
  if (!prev) return roundOrder(next.order - 1);

  const mid = roundOrder((prev.order + next.order) / 2);
  if (mid - prev.order < ROW_ORDER_EPSILON || next.order - mid < ROW_ORDER_EPSILON) return null;
  return mid;
}

/**
 * Spreads learner-placed items evenly between the curriculum anchors around them.
 * Only non-base items get a new order; the returned map contains changed items only.
 */
export function rebalanceColumn(items: ReadonlyArray<RebalanceItem>): Map<string, number> {
  const sorted = sortItems(items);
  const changed = new Map<string, number>();

  let groupStart = 0;
  while (groupStart < sorted.length) {
    if (sorted[groupStart].isBase) {
      groupStart++;
      continue;
    }
    let groupEnd = groupStart;
    while (groupEnd < sorted.length && !sorted[groupEnd].isBase) groupEnd++;

    const group = sorted.slice(groupStart, groupEnd);
    const lower = groupStart > 0 ? sorted[groupStart - 1].order : undefined;
    const upper = groupEnd < sorted.length ? sorted[groupEnd].order : undefined;
    const count = group.length;

    let low: number;
    let high: number;
    if (lower !== undefined && upper !== undefined) {
      low = lower;
      high = upper;
    } else if (lower !== undefined) {
      low = lower;
      high = lower + count + 1;
    } else if (upper !== undefined) {
      low = upper - count - 1;
      high = upper;
    } else {
      low = -1;
      high = count;
    }

    group.forEach((item, i) => {
      const next = roundOrder(low + ((high - low) * (i + 1)) / (count + 1));
      if (next !== item.order) changed.set(item.key, next);
    });
    groupStart = groupEnd;
  }
  return changed;
}
