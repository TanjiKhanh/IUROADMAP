import { memo, useEffect, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlowProvider,
  useNodesState,
  type Edge,
  type Node,
  type NodeProps,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { TopicEdgeResponse, TopicResponse } from '@iuroadmap/api-gen';

const GRID_X = 240;
const GRID_Y = 120;
const COLUMNS = 4;

interface TopicNodeData {
  topic: TopicResponse;
  editable: boolean;
}

function TopicNodeInner({ data, selected }: NodeProps<TopicNodeData>) {
  const { topic, editable } = data;
  return (
    <div
      style={{
        width: 200,
        padding: '8px 10px',
        borderRadius: 8,
        background: '#fff',
        border: `2px solid ${selected ? '#2563eb' : '#94a3b8'}`,
        boxShadow: selected ? '0 0 0 3px rgba(37,99,235,.2)' : undefined,
      }}
    >
      <Handle type="target" position={Position.Left} isConnectable={editable} style={{ opacity: editable ? 1 : 0 }} />
      <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{topic.title}</div>
      <div style={{ fontSize: 11, color: '#64748b' }}>
        {topic.slug}
        {topic.estimatedHours ? ` · ${topic.estimatedHours}h` : ''}
      </div>
      <Handle type="source" position={Position.Right} isConnectable={editable} style={{ opacity: editable ? 1 : 0 }} />
    </div>
  );
}

const nodeTypes = { topic: memo(TopicNodeInner) };

/** Topics without saved coordinates are laid out on a grid. */
function positionOf(topic: TopicResponse, index: number) {
  if (topic.coords) return { x: topic.coords.x, y: topic.coords.y };
  return { x: (index % COLUMNS) * GRID_X, y: Math.floor(index / COLUMNS) * GRID_Y };
}

export interface TopicGraphProps {
  topics: TopicResponse[];
  edges: TopicEdgeResponse[];
  editable?: boolean;
  height?: number | string;
  selectedTopicId?: number | null;
  onMoveTopic?: (topicId: number, x: number, y: number) => void;
  onConnect?: (sourceTopicId: number, targetTopicId: number) => void;
  onTopicClick?: (topic: TopicResponse) => void;
  onEdgeClick?: (edgeId: number) => void;
}

function TopicGraphInner({ topics, edges, editable = false, height = 520, selectedTopicId, onMoveTopic, onConnect, onTopicClick, onEdgeClick }: TopicGraphProps) {
  const initial = useMemo<Node<TopicNodeData>[]>(
    () =>
      topics.map((topic, index) => ({
        id: String(topic.id),
        type: 'topic',
        position: positionOf(topic, index),
        data: { topic, editable },
        selected: topic.id === selectedTopicId,
      })),
    [topics, editable, selectedTopicId],
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(initial);
  useEffect(() => setNodes(initial), [initial, setNodes]);

  const flowEdges = useMemo<Edge[]>(
    () =>
      edges.map((e) => ({
        id: String(e.id),
        source: String(e.sourceTopicId),
        target: String(e.targetTopicId),
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed },
      })),
    [edges],
  );

  return (
    <div style={{ height, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8 }} data-testid="topic-graph">
      <ReactFlow
        nodes={nodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        nodesDraggable={editable}
        nodesConnectable={editable}
        deleteKeyCode={null}
        fitView
        fitViewOptions={{ maxZoom: 1 }}
        onNodeDragStop={(_, node) => onMoveTopic?.(Number(node.id), Math.round(node.position.x), Math.round(node.position.y))}
        onConnect={(c) => c.source && c.target && c.source !== c.target && onConnect?.(Number(c.source), Number(c.target))}
        onNodeClick={(_, node) => onTopicClick?.((node.data as TopicNodeData).topic)}
        onEdgeClick={(_, edge) => onEdgeClick?.(Number(edge.id))}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={24} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

/** Topic graph of a course offering (micro roadmap, FL-RDM-08 / FL-LRN-08). */
export function TopicGraph(props: TopicGraphProps) {
  return (
    <ReactFlowProvider>
      <TopicGraphInner {...props} />
    </ReactFlowProvider>
  );
}
