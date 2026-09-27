import { useMemo } from 'react';
import { MarkerType, type Edge, type Node } from 'reactflow';
import { RoadmapCanvas } from '@iuroadmap/core';
import { layoutRows } from '../lib/dropOrder';
import { laneHeight, laneX, nodeX, rowY } from '../lib/toPixel';
import { RELATION_COLORS, type RelationEdgeData } from '../edges/RelationEdge';
import { PHANTOM_WIDTH, type PhantomLaneNodeData } from '../nodes/PhantomLaneNode';
import type { BranchFrameNodeData } from '../nodes/BranchFrameNode';
import type { CourseNodeData } from '../nodes/CourseNode';
import type { LaneNodeData } from '../nodes/LaneNode';
import type { CanvasEdgeView, CanvasMode, CanvasNodeView, CanvasTermView } from '../types';

export const GHOST_NODE_ID = '__ghost__';
const PHANTOM_NODE_ID = '__phantom__';
const MIN_ROWS = 6;
/** Branch frame margins around the course boxes (px) */
const FRAME_PAD = 8;
const FRAME_TOP = 14;
const FRAME_BOTTOM = 4;

export interface LayoutPreview {
  /** Node being dragged (existing) or GHOST_NODE_ID for a catalog course */
  key: string;
  termKey: string;
  order: number;
  /** Ghost view for a catalog course */
  ghost?: CanvasNodeView;
}

export interface CanvasLayoutInput {
  terms: ReadonlyArray<CanvasTermView>;
  nodes: ReadonlyArray<CanvasNodeView>;
  edges: ReadonlyArray<CanvasEdgeView>;
  mode: CanvasMode;
  /** Where the dragged node would land: the column reflows around it */
  preview?: LayoutPreview | null;
  /** Free position of the node under the pointer */
  dragPosition?: { key: string; x: number; y: number } | null;
  /** Gap hovered by the dragged node → faint "＋ New term" column */
  phantomX?: number | null;
  phantomLabel: string;
  coreqLabel: string;
  selectedNodeKey?: string | null;
  selectedEdgeKey?: string | null;
  canDragNode?: (node: CanvasNodeView) => boolean;
  onHeaderClick?: (termKey: string) => void;
  headerActions?: LaneNodeData['headerActions'];
}

/** terms + nodes (logical positions) → React Flow nodes/edges in pixels (design §4.1). */
export function useCanvasLayout(input: CanvasLayoutInput) {
  const {
    terms,
    nodes,
    edges,
    mode,
    preview,
    dragPosition,
    phantomX,
    phantomLabel,
    coreqLabel,
    selectedNodeKey,
    selectedEdgeKey,
    canDragNode,
    onHeaderClick,
    headerActions,
  } = input;

  return useMemo(() => {
    const laneIndex = new Map(terms.map((t, i) => [t.key, i]));
    const visible = nodes.filter((n) => laneIndex.has(n.termKey));

    // Column content with the preview applied: the dragged node takes its would-be place.
    const placed = visible.map((n) => (preview && preview.key === n.key ? { ...n, termKey: preview.termKey, order: preview.order } : n));
    if (preview?.ghost && laneIndex.has(preview.termKey)) {
      placed.push({ ...preview.ghost, key: GHOST_NODE_ID, termKey: preview.termKey, order: preview.order });
    }
    const rows = layoutRows(placed);

    let maxRow = -1;
    for (const r of rows.values()) maxRow = Math.max(maxRow, r);
    const height = laneHeight(Math.max(MIN_ROWS, maxRow + 1 + RoadmapCanvas.EXTRA_ROWS));

    const flowNodes: Node[] = terms.map((term, i) => ({
      id: `lane:${term.key}`,
      type: 'lane',
      position: { x: laneX(i), y: 0 },
      draggable: false,
      selectable: false,
      connectable: false,
      focusable: false,
      zIndex: -1,
      data: {
        term,
        height,
        active: preview ? preview.termKey === term.key : false,
        onHeaderClick,
        headerActions,
      } satisfies LaneNodeData,
    }));

    const connectable = mode !== 'readOnly';
    for (const n of placed) {
      const index = laneIndex.get(n.termKey)!;
      const isGhost = n.key === GHOST_NODE_ID;
      const dragged = dragPosition && dragPosition.key === n.key;
      flowNodes.push({
        id: n.key,
        type: 'course',
        position: dragged ? { x: dragPosition.x, y: dragPosition.y } : { x: nodeX(index), y: rowY(rows.get(n.key) ?? 0) },
        draggable: !isGhost && mode !== 'readOnly' && (canDragNode ? canDragNode(n) : true),
        selectable: !isGhost,
        connectable: !isGhost && connectable,
        selected: n.key === selectedNodeKey,
        zIndex: dragged ? 10 : 1,
        className: dragged ? undefined : 'semester-canvas-node--settle',
        data: { view: n, connectable: !isGhost && connectable, ghost: isGhost } satisfies CourseNodeData,
      });
    }

    // Conditional branches: one dashed frame per (column, branch) around its rows (FR-RDM.07.4).
    const frames = new Map<string, { termKey: string; branch: NonNullable<CanvasNodeView['branch']>; min: number; max: number }>();
    for (const n of placed) {
      if (!n.branch || n.key === GHOST_NODE_ID || (dragPosition && dragPosition.key === n.key)) continue;
      const row = rows.get(n.key) ?? 0;
      const id = `${n.termKey}|${n.branch.key}`;
      const frame = frames.get(id);
      if (frame) {
        frame.min = Math.min(frame.min, row);
        frame.max = Math.max(frame.max, row);
      } else frames.set(id, { termKey: n.termKey, branch: n.branch, min: row, max: row });
    }
    for (const [id, frame] of frames) {
      const index = laneIndex.get(frame.termKey)!;
      flowNodes.push({
        id: `branch:${id}`,
        type: 'branch',
        position: { x: nodeX(index) - FRAME_PAD, y: rowY(frame.min) - FRAME_TOP },
        draggable: false,
        selectable: false,
        connectable: false,
        focusable: false,
        zIndex: 0,
        data: {
          label: frame.branch.label,
          active: frame.branch.active,
          width: RoadmapCanvas.NODE_WIDTH + FRAME_PAD * 2,
          height: (frame.max - frame.min) * RoadmapCanvas.ROW_HEIGHT + RoadmapCanvas.NODE_HEIGHT + FRAME_TOP + FRAME_BOTTOM,
        } satisfies BranchFrameNodeData,
      });
    }

    if (phantomX !== null && phantomX !== undefined) {
      flowNodes.push({
        id: PHANTOM_NODE_ID,
        type: 'phantom',
        position: { x: phantomX - PHANTOM_WIDTH / 2, y: 0 },
        draggable: false,
        selectable: false,
        connectable: false,
        zIndex: 5,
        data: { label: phantomLabel, height } satisfies PhantomLaneNodeData,
      });
    }

    const rendered = new Set(visible.map((n) => n.key));
    const flowEdges: Edge[] = edges
      .filter((e) => rendered.has(e.source) && rendered.has(e.target))
      .map((e) => {
        const color = e.hasIssue ? RELATION_COLORS.issue : e.isCustom ? RELATION_COLORS.custom : RELATION_COLORS.base;
        return {
          id: e.key,
          source: e.source,
          target: e.target,
          type: 'relation',
          selected: e.key === selectedEdgeKey,
          markerEnd: { type: MarkerType.ArrowClosed, color, width: 16, height: 16 },
          data: { type: e.type, isCustom: e.isCustom, hasIssue: e.hasIssue, coreqLabel } satisfies RelationEdgeData,
        };
      });

    return { flowNodes, flowEdges, laneIndex, height, rows };
  }, [
    terms,
    nodes,
    edges,
    mode,
    preview,
    dragPosition,
    phantomX,
    phantomLabel,
    coreqLabel,
    selectedNodeKey,
    selectedEdgeKey,
    canDragNode,
    onHeaderClick,
    headerActions,
  ]);
}
