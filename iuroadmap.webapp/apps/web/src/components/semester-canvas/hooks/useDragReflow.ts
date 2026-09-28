import { useCallback, useMemo, useRef, useState } from 'react';
import type { Node } from 'reactflow';
import { RoadmapCanvas } from '@iuroadmap/core';
import { computeDropOrder, layoutRows, type ColumnItem } from '../lib/dropOrder';
import { hitTest } from '../lib/toPixel';
import type { LayoutPreview } from './useCanvasLayout';
import type { CanvasHit, CanvasMove, CanvasNodeView, CanvasTermView } from '../types';

export interface DragReflowOptions {
  terms: ReadonlyArray<CanvasTermView>;
  nodes: ReadonlyArray<CanvasNodeView>;
  /** Dropping on the border between two columns creates a new term (learner) */
  allowNewTermOnGap: boolean;
  /** A curriculum node is an anchor when rebalancing (learner overlay, design §4.2) */
  isBaseNode?: (node: CanvasNodeView) => boolean;
  onMoveNode?: (move: CanvasMove) => void;
  onDropInGap?: (nodeKey: string, afterTermKey: string | null) => void;
}

interface DragState {
  key: string;
  x: number;
  y: number;
  hit: CanvasHit | null;
}

/** Resolve the order of `key` dropped at `hit.slot` of a column (the node itself excluded). */
export function resolveColumnDrop(
  nodes: ReadonlyArray<CanvasNodeView>,
  termKey: string,
  slot: number,
  key: string,
  isBaseNode?: (node: CanvasNodeView) => boolean,
) {
  const items: ColumnItem[] = nodes
    .filter((n) => n.termKey === termKey && n.key !== key)
    .map((n) => ({ key: n.key, order: n.order, isBase: isBaseNode ? isBaseNode(n) : true }));
  return computeDropOrder(items, slot);
}

/**
 * onNodeDrag / onNodeDragStop handling (design §4.2): while dragging, the target column makes
 * room for the node; dropping inserts it, dropping on a gap asks for a new term.
 */
export function useDragReflow({ terms, nodes, allowNewTermOnGap, isBaseNode, onMoveNode, onDropInGap }: DragReflowOptions) {
  const [drag, setDrag] = useState<DragState | null>(null);
  const nodesRef = useRef(nodes);
  nodesRef.current = nodes;

  const hitFor = useCallback(
    (position: { x: number; y: number }) =>
      hitTest(
        position.x + RoadmapCanvas.NODE_WIDTH / 2,
        position.y + RoadmapCanvas.NODE_HEIGHT / 2,
        terms,
        allowNewTermOnGap,
      ),
    [terms, allowNewTermOnGap],
  );

  const onNodeDragStart = useCallback((_: unknown, node: Node) => {
    setDrag({ key: node.id, x: node.position.x, y: node.position.y, hit: null });
  }, []);

  const onNodeDrag = useCallback(
    (_: unknown, node: Node) => {
      setDrag({ key: node.id, x: node.position.x, y: node.position.y, hit: hitFor(node.position) });
    },
    [hitFor],
  );

  const onNodeDragStop = useCallback(
    (_: unknown, node: Node) => {
      const hit = hitFor(node.position);
      setDrag(null);
      const current = nodesRef.current.find((n) => n.key === node.id);
      if (!hit || !current) return;

      if (hit.kind === 'gap') {
        onDropInGap?.(node.id, hit.afterTermKey);
        return;
      }
      // Dropped back on its own row: nothing to record.
      if (hit.termKey === current.termKey && layoutRows(nodesRef.current).get(current.key) === hit.slot) return;

      const { order, rebalanced } = resolveColumnDrop(nodesRef.current, hit.termKey, hit.slot, node.id, isBaseNode);
      onMoveNode?.({ nodeKey: node.id, termKey: hit.termKey, order, rebalanced });
    },
    [hitFor, isBaseNode, onDropInGap, onMoveNode],
  );

  const preview = useMemo<LayoutPreview | null>(() => {
    if (!drag?.hit || drag.hit.kind !== 'lane') return null;
    const { order } = resolveColumnDrop(nodes, drag.hit.termKey, drag.hit.slot, drag.key, isBaseNode);
    return { key: drag.key, termKey: drag.hit.termKey, order };
  }, [drag, nodes, isBaseNode]);

  return {
    dragPosition: drag ? { key: drag.key, x: drag.x, y: drag.y } : null,
    preview,
    phantomX: drag?.hit?.kind === 'gap' ? drag.hit.x : null,
    onNodeDragStart,
    onNodeDrag,
    onNodeDragStop,
  };
}
