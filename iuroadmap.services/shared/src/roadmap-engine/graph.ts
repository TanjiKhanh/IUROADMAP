/**
 * Returns one directed cycle as a list of node keys that starts and ends with the
 * same key (e.g. ['A', 'B', 'C', 'A']), or null when the graph is a DAG (BR-RM-01).
 * Edges whose endpoints are not in `nodeKeys` are ignored.
 */
export function findCycle(
  nodeKeys: Iterable<string>,
  edges: ReadonlyArray<{ source: string; target: string }>,
): string[] | null {
  const nodes = new Set(nodeKeys);
  const adjacency = new Map<string, string[]>();
  for (const key of nodes) adjacency.set(key, []);
  for (const e of edges) {
    if (!nodes.has(e.source) || !nodes.has(e.target)) continue;
    adjacency.get(e.source)!.push(e.target);
  }

  const WHITE = 0;
  const GREY = 1;
  const BLACK = 2;
  const color = new Map<string, number>();
  const parent = new Map<string, string>();
  for (const key of nodes) color.set(key, WHITE);

  for (const start of nodes) {
    if (color.get(start) !== WHITE) continue;
    const stack: Array<{ key: string; next: number }> = [{ key: start, next: 0 }];
    color.set(start, GREY);

    while (stack.length) {
      const frame = stack[stack.length - 1];
      const children = adjacency.get(frame.key)!;
      if (frame.next >= children.length) {
        color.set(frame.key, BLACK);
        stack.pop();
        continue;
      }
      const child = children[frame.next++];
      const state = color.get(child);
      if (state === GREY) {
        const cycle = [child];
        let cursor = frame.key;
        while (cursor !== child) {
          cycle.push(cursor);
          cursor = parent.get(cursor)!;
        }
        cycle.push(child);
        return cycle.reverse();
      }
      if (state === WHITE) {
        parent.set(child, frame.key);
        color.set(child, GREY);
        stack.push({ key: child, next: 0 });
      }
    }
  }
  return null;
}

/** True when adding `source → target` to the graph would create a cycle. */
export function wouldCreateCycle(
  nodeKeys: Iterable<string>,
  edges: ReadonlyArray<{ source: string; target: string }>,
  source: string,
  target: string,
): boolean {
  if (source === target) return true;
  return findCycle(nodeKeys, [...edges, { source, target }]) !== null;
}
