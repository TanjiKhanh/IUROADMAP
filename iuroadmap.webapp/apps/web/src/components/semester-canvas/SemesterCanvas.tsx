import { useCallback, useMemo, useState, type DragEvent, type ReactNode } from 'react';
import ReactFlow, { Controls, Panel, ReactFlowProvider, useReactFlow, type Connection, type Node } from 'reactflow';
import 'reactflow/dist/style.css';
import './semesterCanvas.css';
import { useTranslation } from '../../hooks/useTranslation';
import { CourseNode } from './nodes/CourseNode';
import { LaneNode } from './nodes/LaneNode';
import { PhantomLaneNode } from './nodes/PhantomLaneNode';
import { BranchFrameNode } from './nodes/BranchFrameNode';
import { RelationEdge } from './edges/RelationEdge';
import { GHOST_NODE_ID, useCanvasLayout, type LayoutPreview } from './hooks/useCanvasLayout';
import { resolveColumnDrop, useDragReflow } from './hooks/useDragReflow';
import { hitTest } from './lib/toPixel';
import { getCatalogDragPayload } from './lib/catalogDrag';
import {
  CATALOG_DRAG_MIME,
  type CanvasEdgeView,
  type CanvasMode,
  type CanvasMove,
  type CanvasNodeView,
  type CanvasTermView,
  type CatalogDragPayload,
} from './types';

const nodeTypes = { lane: LaneNode, course: CourseNode, phantom: PhantomLaneNode, branch: BranchFrameNode };
const edgeTypes = { relation: RelationEdge };

/**
 * React Flow auto-pans while a node is dragged within 35px of the pane edge. The left shift keeps
 * the border before the first column (a new term before semester 1) outside that zone, so a drop
 * there does not slide the viewport under the pointer.
 */
const DEFAULT_VIEWPORT = { x: 40, y: 0, zoom: 0.9 };

export type CatalogDropTarget =
  | { kind: 'lane'; termKey: string; order: number; rebalanced: Map<string, number> }
  | { kind: 'gap'; afterTermKey: string | null };

export interface SemesterCanvasProps {
  mode: CanvasMode;
  terms: CanvasTermView[];
  nodes: CanvasNodeView[];
  edges: CanvasEdgeView[];
  height?: number | string;
  selectedNodeKey?: string | null;
  selectedEdgeKey?: string | null;
  /** Default: every node can be dragged (except in readOnly mode) */
  canDragNode?: (node: CanvasNodeView) => boolean;
  /** Curriculum nodes are anchors when learner orders are rebalanced */
  isBaseNode?: (node: CanvasNodeView) => boolean;
  /** Dropping between two columns asks for a new term (learner) */
  allowNewTermOnGap?: boolean;
  onMoveNode?: (move: CanvasMove) => void;
  onDropInGap?: (nodeKey: string, afterTermKey: string | null) => void;
  /** A course dragged from the catalog sidebar was dropped */
  onDropCatalogCourse?: (course: CatalogDragPayload, target: CatalogDropTarget) => void;
  /** Handle dragged from A (right side) to B (left side) */
  onConnect?: (sourceKey: string, targetKey: string) => void;
  onNodeClick?: (nodeKey: string) => void;
  onEdgeClick?: (edgeKey: string) => void;
  onPaneClick?: () => void;
  /** Column title click (learner: term results) */
  onHeaderClick?: (termKey: string) => void;
  headerActions?: (term: CanvasTermView) => ReactNode;
  /** Controls floating over the top-right corner of the canvas */
  overlay?: ReactNode;
}

function SemesterCanvasInner(props: SemesterCanvasProps) {
  const {
    mode,
    terms,
    nodes,
    edges,
    height = 640,
    selectedNodeKey,
    selectedEdgeKey,
    canDragNode,
    isBaseNode,
    allowNewTermOnGap = false,
    onMoveNode,
    onDropInGap,
    onDropCatalogCourse,
    onConnect,
    onNodeClick,
    onEdgeClick,
    onPaneClick,
    onHeaderClick,
    headerActions,
    overlay,
  } = props;
  const { t } = useTranslation();
  const flow = useReactFlow();
  const editable = mode !== 'readOnly';

  const drag = useDragReflow({ terms, nodes, allowNewTermOnGap, isBaseNode, onMoveNode, onDropInGap });

  // Catalog course hovering the canvas (HTML5 drag and drop).
  const [external, setExternal] = useState<{ preview: LayoutPreview | null; phantomX: number | null } | null>(null);

  const externalHit = useCallback(
    (event: DragEvent) => {
      const point = flow.screenToFlowPosition({ x: event.clientX, y: event.clientY });
      return hitTest(point.x, point.y, terms, allowNewTermOnGap);
    },
    [flow, terms, allowNewTermOnGap],
  );

  const onDragOver = useCallback(
    (event: DragEvent) => {
      if (!editable || !onDropCatalogCourse || !event.dataTransfer.types.includes(CATALOG_DRAG_MIME)) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
      const hit = externalHit(event);
      const course = getCatalogDragPayload();
      if (!hit) return setExternal(null);
      if (hit.kind === 'gap') return setExternal({ preview: null, phantomX: hit.x });
      const { order } = resolveColumnDrop(nodes, hit.termKey, hit.slot, GHOST_NODE_ID, isBaseNode);
      const ghost: CanvasNodeView | undefined = course
        ? {
            key: GHOST_NODE_ID,
            termKey: hit.termKey,
            order,
            kind: 'COURSE',
            code: course.code,
            name: course.name,
            theoryCredits: course.theoryCredits,
            labCredits: course.labCredits,
            fillColor: course.fillColor,
            borderColor: course.borderColor,
          }
        : undefined;
      setExternal({ preview: { key: GHOST_NODE_ID, termKey: hit.termKey, order, ghost }, phantomX: null });
    },
    [editable, onDropCatalogCourse, externalHit, nodes, isBaseNode],
  );

  const onDragLeave = useCallback((event: DragEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget as globalThis.Node | null)) setExternal(null);
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      setExternal(null);
      const raw = event.dataTransfer.getData(CATALOG_DRAG_MIME);
      if (!raw || !onDropCatalogCourse) return;
      event.preventDefault();
      const course = JSON.parse(raw) as CatalogDragPayload;
      const hit = externalHit(event);
      if (!hit) return;
      if (hit.kind === 'gap') {
        onDropCatalogCourse(course, { kind: 'gap', afterTermKey: hit.afterTermKey });
        return;
      }
      const { order, rebalanced } = resolveColumnDrop(nodes, hit.termKey, hit.slot, GHOST_NODE_ID, isBaseNode);
      onDropCatalogCourse(course, { kind: 'lane', termKey: hit.termKey, order, rebalanced });
    },
    [onDropCatalogCourse, externalHit, nodes, isBaseNode],
  );

  const { flowNodes, flowEdges } = useCanvasLayout({
    terms,
    nodes,
    edges,
    mode,
    preview: drag.preview ?? external?.preview ?? null,
    dragPosition: drag.dragPosition,
    phantomX: drag.phantomX ?? external?.phantomX ?? null,
    phantomLabel: t('roadmap.canvas.newTerm'),
    coreqLabel: t('roadmap.relation.coreqShort'),
    selectedNodeKey,
    selectedEdgeKey,
    canDragNode,
    onHeaderClick,
    headerActions,
  });

  const handleConnect = useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target && connection.source !== connection.target) {
        onConnect?.(connection.source, connection.target);
      }
    },
    [onConnect],
  );

  const handleNodeClick = useCallback(
    (_: unknown, node: Node) => {
      if (node.type === 'course' && node.id !== GHOST_NODE_ID) onNodeClick?.(node.id);
      // Column backgrounds cover most of the pane: clicking one clears the selection like the pane
      else if (node.type === 'lane') onPaneClick?.();
    },
    [onNodeClick, onPaneClick],
  );

  const className = useMemo(
    () =>
      ['semester-canvas', mode === 'readOnly' ? 'semester-canvas--readonly' : '', external ? 'semester-canvas--drop-target' : '']
        .filter(Boolean)
        .join(' '),
    [mode, external],
  );

  return (
    <div
      className={className}
      style={{ height, width: '100%', background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0' }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      data-testid="semester-canvas"
    >
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesDraggable={editable}
        nodesConnectable={editable && Boolean(onConnect)}
        elementsSelectable
        selectNodesOnDrag={false}
        multiSelectionKeyCode={null}
        selectionKeyCode={null}
        deleteKeyCode={null}
        zoomOnDoubleClick={false}
        panOnScroll
        minZoom={0.3}
        maxZoom={1.5}
        defaultViewport={DEFAULT_VIEWPORT}
        onNodeDragStart={drag.onNodeDragStart}
        onNodeDrag={drag.onNodeDrag}
        onNodeDragStop={drag.onNodeDragStop}
        onConnect={handleConnect}
        onNodeClick={handleNodeClick}
        onEdgeClick={(_, edge) => onEdgeClick?.(edge.id)}
        onPaneClick={() => onPaneClick?.()}
        proOptions={{ hideAttribution: true }}
      >
        <Controls showInteractive={false} />
        {overlay ? <Panel position="top-right">{overlay}</Panel> : null}
      </ReactFlow>
    </div>
  );
}

/**
 * Semester canvas shared by the admin curriculum editor, the curriculum preview and My Roadmap
 * (design §4). Positions are logical (term + order); pixels come from `@iuroadmap/core` RoadmapCanvas.
 */
export function SemesterCanvas(props: SemesterCanvasProps) {
  return (
    <ReactFlowProvider>
      <SemesterCanvasInner {...props} />
    </ReactFlowProvider>
  );
}
