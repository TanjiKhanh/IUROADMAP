import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

// Services
import {
  roadmapService,
  UserRoadmapProgressDetail,
  UserRoadmapDetailNode,
  UserRoadmapEdge,
  MicroRoadmapResponse,
  MacroCourseStatus,
} from '../../services/roadmap.service';

// Components
import RoadmapNode, { RoadmapNodeData } from '../../components/roadmap/RoadmapNode';
import RoadmapDrawer from '../../components/roadmap/RoadmapDrawer';
import '../../styles/roadmapDetail.css';

type RoadmapFlowNodeData = RoadmapNodeData & {
  courseNodeId: number;
  slug: string;
  credits: number;
};

type DrawerDetail = {
  courseNodeId: number;
  nodeKey: string;
  title: string;
  summary: string;
  contentMd: string;
  status: MacroCourseStatus;
};

type ContextMenuState = {
  x: number;
  y: number;
  courseNodeId: number;
};

const VALID_STATUSES: MacroCourseStatus[] = ['AVAILABLE', 'IN_PROGRESS', 'COMPLETED'];

const normalizeStatus = (status: string): MacroCourseStatus => {
  if (VALID_STATUSES.includes(status as MacroCourseStatus)) {
    return status as MacroCourseStatus;
  }
  return 'AVAILABLE';
};

const buildMicroMarkdown = (micro: MicroRoadmapResponse): string => {
  const topics = Array.isArray(micro.topics) ? [...micro.topics] : [];
  if (topics.length === 0) {
    return '### No micro topics yet for this course.';
  }

  topics.sort((a, b) => a.id - b.id);
  const lines = topics.map((topic, index) => {
    const desc = topic.description ? ` - ${topic.description}` : '';
    return `${index + 1}. **${topic.title}**${desc}`;
  });

  return ['### Micro roadmap topics', '', ...lines].join('\n');
};

const calculateMacroMetrics = (flowNodes: Node<RoadmapFlowNodeData>[]) => {
  const totalNodes = flowNodes.length;
  const completedNodes = flowNodes.filter((node) => node.data.status === 'COMPLETED').length;
  const earnedCredits = flowNodes.reduce((sum, node) => {
    if (node.data.status === 'COMPLETED') return sum + (node.data.credits || 0);
    return sum;
  }, 0);

  return {
    totalNodes,
    completedNodes,
    earnedCredits,
    progress: totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0,
  };
};

const buildMacroLayout = (nodes: UserRoadmapDetailNode[], edges: UserRoadmapEdge[]) => {
  const fallbackXGap = 240;
  const fallbackYGap = 130;

  const flowNodes: Node<RoadmapFlowNodeData>[] = nodes.map((node, index) => {
    const x = node.coords?.x;
    const y = node.coords?.y;
    const hasValidCoords = Number.isFinite(x) && Number.isFinite(y);

    return {
      id: String(node.id),
      position: hasValidCoords
        ? { x: Number(x), y: Number(y) }
        : {
            x: (index % 4) * fallbackXGap,
            y: Math.floor(index / 4) * fallbackYGap,
          },
      type: 'roadmapNode',
      data: {
        courseNodeId: node.id,
        title: node.name,
        status: normalizeStatus(node.status),
        summary: `${node.slug} · ${node.credits} Credits`,
        slug: node.slug,
        credits: node.credits,
      },
      selectable: true,
    };
  });

  const flowEdges: Edge[] = edges.map((edge) => ({
    id: `e-${edge.id}`,
    source: String(edge.to),
    target: String(edge.from),
    type: 'smoothstep',
    label: 'prerequisites',
    labelStyle: {
      fill: '#64748b',
      fontSize: 10,
      fontWeight: 500,
      textTransform: 'lowercase',
    },
    labelBgPadding: [4, 2],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: '#f8fafc', fillOpacity: 0.95 },
    style: {
      stroke: '#94a3b8',
      strokeWidth: 1.5,
      strokeDasharray: '4 4',
    },
  }));

  return { flowNodes, flowEdges };
};

export default function RoadmapDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // React Flow State
  const [nodes, setNodes, onNodesChange] = useNodesState<RoadmapFlowNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Roadmap Data State
  const [roadmap, setRoadmap] = useState<UserRoadmapProgressDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Drawer State
  const [selectedNodeDetail, setSelectedNodeDetail] = useState<DrawerDetail | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  const nodeTypes = useMemo(() => ({ roadmapNode: RoadmapNode }), []);
  const routeTitle = (location.state as { roadmapTitle?: string } | null)?.roadmapTitle || 'Enrollment View';

  const loadRoadmap = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await roadmapService.getUserRoadmapDetail(Number(id));

      if (!data || !Array.isArray(data.nodes)) {
        console.error('Invalid roadmap data received:', data);
        setRoadmap(null);
        return;
      }

      setRoadmap(data);

      const { flowNodes, flowEdges } = buildMacroLayout(data.nodes, data.edges || []);
      setNodes(flowNodes);
      setEdges(flowEdges);
    } catch (err) {
      console.error('Failed to load roadmap', err);
      setRoadmap(null);
    } finally {
      setLoading(false);
    }
  }, [id, setNodes, setEdges]);

  useEffect(() => {
    loadRoadmap();
  }, [loadRoadmap]);

  useEffect(() => {
    if (!contextMenu) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setContextMenu(null);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [contextMenu]);

  const updateCourseStatus = useCallback(async (courseNodeId: number, nextStatus: MacroCourseStatus) => {
    if (!id || !roadmap) return;

    const nodeId = String(courseNodeId);
    const targetNode = nodes.find((node) => node.id === nodeId);
    const nodeCredits = targetNode?.data?.credits || 0;
    const creditsEarned = nextStatus === 'COMPLETED' ? nodeCredits : 0;
    const previousNodes = nodes;
    const nextNodes = previousNodes.map((node) => {
      if (node.id !== nodeId) return node;
      return {
        ...node,
        data: {
          ...node.data,
          status: nextStatus,
        },
      };
    });

    setNodes(nextNodes);

    const nextMetrics = calculateMacroMetrics(nextNodes);
    setRoadmap((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        completion_percentage: nextMetrics.progress,
        total_credits_earned: nextMetrics.earnedCredits,
      };
    });

    setSelectedNodeDetail((prev) => {
      if (!prev || prev.courseNodeId !== courseNodeId) return prev;
      return { ...prev, status: nextStatus };
    });

    try {
      await roadmapService.updateCourseStatus(Number(id), courseNodeId, {
        status: nextStatus,
        creditsEarned,
      });
    } catch (err) {
      console.error('Failed to update status', err);

      setNodes(previousNodes);
      const rollbackMetrics = calculateMacroMetrics(previousNodes);
      setRoadmap((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          completion_percentage: rollbackMetrics.progress,
          total_credits_earned: rollbackMetrics.earnedCredits,
        };
      });

      alert('Failed to update course status. Please try again.');
    }
  }, [id, roadmap, nodes, setNodes]);

  const onNodeClick = useCallback(async (_event: React.MouseEvent, node: Node<RoadmapFlowNodeData>) => {
    setContextMenu(null);
    setDrawerOpen(true);
    setDrawerLoading(true);
    setSelectedNodeDetail(null);

    const courseNodeId = Number(node.id);
    const status = normalizeStatus(String(node.data?.status || 'AVAILABLE'));
    const summary = `${node.data?.slug || ''} · ${node.data?.credits || 0} Credits`;

    try {
      const microRoadmap = await roadmapService.getMicroRoadmap(courseNodeId);

      setSelectedNodeDetail({
        courseNodeId,
        nodeKey: String(courseNodeId),
        title: node.data.title,
        summary,
        status,
        contentMd: buildMicroMarkdown(microRoadmap),
      });
    } catch (err) {
      console.error('Failed to load micro roadmap', err);

      setSelectedNodeDetail({
        courseNodeId,
        nodeKey: String(courseNodeId),
        title: node.data.title,
        summary,
        status,
        contentMd: '### No micro topics available right now.',
      });
    } finally {
      setDrawerLoading(false);
    }
  }, []);

  const onNodeContextMenu = useCallback((event: React.MouseEvent, node: Node<RoadmapFlowNodeData>) => {
    event.preventDefault();
    event.stopPropagation();

    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      courseNodeId: Number(node.id),
    });
  }, []);

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedNodeDetail) return;
    await updateCourseStatus(selectedNodeDetail.courseNodeId, normalizeStatus(newStatus));
  };

  const handleContextAction = useCallback(async (status: MacroCourseStatus) => {
    if (!contextMenu) return;
    const nodeId = contextMenu.courseNodeId;
    setContextMenu(null);
    await updateCourseStatus(nodeId, status);
  }, [contextMenu, updateCourseStatus]);

  if (loading) return <div className="loading-screen">Loading Roadmap...</div>;
  if (!roadmap) return <div className="error-screen">Roadmap not found</div>;

  const progress = roadmap.completion_percentage || 0;
  const progressRingStyle = {
    background: `conic-gradient(#228be6 ${progress * 3.6}deg, #dbeafe 0deg)`,
  };

  return (
    <div className="roadmap-page">
      <div className="roadmap-header">
        <h1 className="roadmap-title">{routeTitle}</h1>
      

        <div className="roadmap-header-row">
          

          <div className="roadmap-metrics">
            <div className="metric-card">
              <span className="metric-label">Total Credits</span>
              <strong className="metric-value">
                {roadmap.total_credits_earned}/{roadmap.total_credits_required}
              </strong>
            </div>
            <div className="metric-card metric-progress">
              <span className="metric-label">Overall Progress</span>
              <strong className="metric-value">{progress}%</strong>
              <span className="progress-ring" style={progressRingStyle}>
                <span className="progress-ring-center" />
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard/my-courses')}
            className="btn-back"
          >
            ← Back to List
          </button>
        </div>
      </div>

      <div className="roadmap-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onNodeContextMenu={onNodeContextMenu}
          onPaneClick={() => setContextMenu(null)}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          nodesDraggable={false}
          nodesConnectable={false}
          panOnDrag
          panOnScroll
          zoomOnScroll
          zoomOnPinch
          zoomOnDoubleClick
          minZoom={0.35}
          maxZoom={2}
        >
          <Background color="#cbd5e1" gap={24} size={1} />
          <Controls position="bottom-left" showInteractive />
          <MiniMap
            nodeStrokeWidth={3}
            nodeColor={(n) => {
              const status = n.data?.status;
              if (status === 'COMPLETED') return '#16a34a';
              if (status === 'IN_PROGRESS') return '#f59e0b';
              return '#3b82f6';
            }}
          />
        </ReactFlow>

        <div className="roadmap-legend">
          <span><i className="dot completed" /> Completed</span>
          <span><i className="dot in-progress" /> In Progress</span>
          <span><i className="dot available" /> Available</span>
        </div>

        {contextMenu && (
          <div
            className="roadmap-context-menu"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" onClick={() => handleContextAction('COMPLETED')}>
              Mark as complete
            </button>
            <button type="button" onClick={() => handleContextAction('IN_PROGRESS')}>
              Mark in progress
            </button>
            <button type="button" onClick={() => handleContextAction('AVAILABLE')}>
              Reset to available
            </button>
          </div>
        )}
      </div>

      <RoadmapDrawer
        isOpen={drawerOpen}
        loading={drawerLoading}
        nodeDetail={selectedNodeDetail}
        onClose={() => setDrawerOpen(false)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}