export interface BaseTermRef {
  key: string;
  /** ROADMAP_TERMS.order_index */
  orderIndex: number;
}

export interface CustomTermRef {
  key: string;
  /** Inserted right after this term (base or custom); null = before the first term */
  afterKey: string | null;
}

/**
 * Left-to-right order of a student's terms: curriculum terms by order_index, with the
 * learner's custom terms spliced in through their `after_term_key` chain.
 * Custom terms whose anchor no longer exists are appended at the end.
 */
export function orderTerms(
  base: ReadonlyArray<BaseTermRef>,
  custom: ReadonlyArray<CustomTermRef>,
): string[] {
  const byAnchor = new Map<string | null, CustomTermRef[]>();
  for (const c of custom) {
    const list = byAnchor.get(c.afterKey) ?? [];
    list.push(c);
    byAnchor.set(c.afterKey, list);
  }
  for (const list of byAnchor.values()) list.sort((a, b) => a.key.localeCompare(b.key));

  const result: string[] = [];
  const placed = new Set<string>();

  const appendChain = (anchor: string | null) => {
    const pending = [...(byAnchor.get(anchor) ?? [])];
    while (pending.length) {
      const next = pending.shift()!;
      if (placed.has(next.key)) continue;
      placed.add(next.key);
      result.push(next.key);
      appendChain(next.key);
    }
  };

  appendChain(null);
  for (const b of [...base].sort((x, y) => x.orderIndex - y.orderIndex)) {
    if (placed.has(b.key)) continue;
    placed.add(b.key);
    result.push(b.key);
    appendChain(b.key);
  }
  for (const c of custom) {
    if (!placed.has(c.key)) {
      placed.add(c.key);
      result.push(c.key);
    }
  }
  return result;
}
