import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Edge,
  MiniMap,
  Node,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  MacroCourseStatus,
  roadmapService,
  UserRoadmapDetailNode,
  UserRoadmapEdge,
  UserRoadmapProgressDetail,
} from '../../services/roadmap.service';
import { userService } from '../../services/user.service';
import RoadmapNode, { RoadmapNodeData } from '../../components/roadmap/RoadmapNode';
import RoadmapToolbar from '../../components/roadmap/RoadmapToolbar';
import '../../styles/roadmapDetail.css';

type RoadmapFlowNodeData = RoadmapNodeData & {
  courseNodeId: number;
  slug: string;
  credits: number;
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

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

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
  const fallbackXGap = 285;
  const fallbackYGap = 155;

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
      fill: '#7a8ca6',
      fontSize: 9,
      fontWeight: 600,
      textTransform: 'lowercase',
    },
    labelBgPadding: [2, 1],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: 'transparent', fillOpacity: 0 },
    style: {
      stroke: '#9db0cb',
      strokeWidth: 1.5,
      strokeDasharray: '4 4',
    },
  }));

  return { flowNodes, flowEdges };
};

export default function MacroRoadmap() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [nodes, setNodes, onNodesChange] = useNodesState<RoadmapFlowNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [roadmap, setRoadmap] = useState<UserRoadmapProgressDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [resolvedRoadmapTitle, setResolvedRoadmapTitle] = useState<string>('');

  const [isPanMode, setIsPanMode] = useState(true);
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance | null>(null);

  const nodeTypes = useMemo(() => ({ roadmapNode: RoadmapNode }), []);
  const routeTitleFromState = (location.state as { roadmapTitle?: string } | null)?.roadmapTitle || '';
  const previewModeFromState = Boolean((location.state as { previewMode?: boolean } | null)?.previewMode);
  const isPreviewMode = previewModeFromState || Boolean(slug);
  const routeTitle = routeTitleFromState || resolvedRoadmapTitle || 'Course Roadmap';
  const routeSubtitle =
    (location.state as { roadmapDescription?: string } | null)?.roadmapDescription ||
    'Track your courses, prerequisites, and completion progress.';

  const loadRoadmap = useCallback(async () => {
    if (!id && !slug) return;

    try {
      setLoading(true);

      if (isPreviewMode && slug) {
        try {
          const previewData = await roadmapService.getPreviewRoadmapBySlug(slug);

          setRoadmap(previewData);
          const { flowNodes, flowEdges } = buildMacroLayout(previewData.nodes, previewData.edges || []);
          setNodes(flowNodes);
          setEdges(flowEdges);
          return;
        } catch {
          // Fallback: if admin preview endpoint is unavailable for student role,
          // load enrolled roadmap data by matching slug/title and keep UI in preview mode.
          const summariesResponse: any = await userService.getMyRoadmaps();
          const summaries: any[] = Array.isArray(summariesResponse)
            ? summariesResponse
            : Array.isArray(summariesResponse?.data)
              ? summariesResponse.data
              : [];

          const matched = summaries.find((item) => {
            const itemSlug = String(item?.slug || '').toLowerCase();
            const itemTitleSlug = slugify(String(item?.title || ''));
            const targetSlug = String(slug || '').toLowerCase();
            return itemSlug === targetSlug || itemTitleSlug === targetSlug;
          });

          if (!matched?.id) {
            setRoadmap(null);
            return;
          }

          if (!routeTitleFromState && matched.title) {
            setResolvedRoadmapTitle(matched.title);
          }

          const enrolledData = await roadmapService.getUserRoadmapDetail(Number(matched.id));
          if (!enrolledData || !Array.isArray(enrolledData.nodes)) {
            setRoadmap(null);
            return;
          }

          setRoadmap(enrolledData);
          const { flowNodes, flowEdges } = buildMacroLayout(enrolledData.nodes, enrolledData.edges || []);
          setNodes(flowNodes);
          setEdges(flowEdges);
          return;
        }
      }

      const data = await roadmapService.getUserRoadmapDetail(Number(id));

      if (!data || !Array.isArray(data.nodes)) {
        console.error('Invalid roadmap data received:', data);
        setRoadmap(null);
        return;
      }

      setRoadmap(data);

      if (!routeTitleFromState) {
        try {
          const summariesResponse: any = await userService.getMyRoadmaps();
          const summaries: any[] = Array.isArray(summariesResponse)
            ? summariesResponse
            : Array.isArray(summariesResponse?.data)
              ? summariesResponse.data
              : [];
          const matched = summaries.find((item) => item.id === Number(id));
          if (matched?.title) {
            setResolvedRoadmapTitle(matched.title);
          }
        } catch {
          setResolvedRoadmapTitle('');
        }
      }

      const { flowNodes, flowEdges } = buildMacroLayout(data.nodes, data.edges || []);
      setNodes(flowNodes);
      setEdges(flowEdges);
    } catch (err) {
      console.error('Failed to load roadmap', err);
      setRoadmap(null);
    } finally {
      setLoading(false);
    }
  }, [id, isPreviewMode, routeTitleFromState, setEdges, setNodes, slug]);

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

  const updateCourseStatus = useCallback(
    async (courseNodeId: number, nextStatus: MacroCourseStatus) => {
      if (isPreviewMode || !id || !roadmap) return;

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
    },
    [id, isPreviewMode, nodes, roadmap, setNodes]
  );

  const onNodeClick = useCallback(
    async (_event: React.MouseEvent, node: Node<RoadmapFlowNodeData>) => {
      setContextMenu(null);
      if (!id && !isPreviewMode) return;

      if (isPreviewMode) {
        alert('Preview mode: enroll this major to access micro roadmap and track progress.');
        return;
      }

      const courseNodeId = Number(node.id);

      // Navigate to micro roadmap without auto-status checking
      navigate(`/dashboard/roadmap/${id}/micro/${courseNodeId}`, {
        state: {
          roadmapTitle: routeTitle,
          courseTitle: node.data.title,
          courseCredits: node.data.credits,
        },
      });
    },
    [id, isPreviewMode, navigate, routeTitle]
  );

  const onNodeContextMenu = useCallback((event: React.MouseEvent, node: Node<RoadmapFlowNodeData>) => {
    event.preventDefault();
    event.stopPropagation();

    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      courseNodeId: Number(node.id),
    });
  }, []);

  const handleContextAction = useCallback(
    async (status: MacroCourseStatus) => {
      if (!contextMenu) return;
      const nodeId = contextMenu.courseNodeId;
      setContextMenu(null);
      await updateCourseStatus(nodeId, status);
    },
    [contextMenu, updateCourseStatus]
  );

  const handleZoomIn = useCallback(() => {
    flowInstance?.zoomIn({ duration: 180 });
  }, [flowInstance]);

  const handleZoomOut = useCallback(() => {
    flowInstance?.zoomOut({ duration: 180 });
  }, [flowInstance]);

  const handleResetView = useCallback(() => {
    flowInstance?.fitView({ padding: 0.2, duration: 250 });
  }, [flowInstance]);

  if (loading) return <div className="loading-screen">Loading Roadmap...</div>;
  if (!roadmap) return <div className="error-screen">Roadmap not found</div>;

  const progress = roadmap.completion_percentage || 0;
  const progressRingStyle = {
    background: `conic-gradient(#228be6 ${progress * 3.6}deg, #dbeafe 0deg)`,
  };

  return (
    <div className="roadmap-page">
      <div className="roadmap-header">
        <div className="roadmap-header-main">
          <div className="roadmap-title-block">
            <button
              onClick={() => navigate(isPreviewMode ? '/dashboard/explore' : '/dashboard/my-courses')}
              className="btn-back roadmap-back-link"
            >
              ← Back to List
            </button>
            <p className="roadmap-overline">ENROLLMENT VIEW</p>
            <h1 className="roadmap-title">{routeTitle}</h1>
            <p className="roadmap-subtitle">{routeSubtitle}</p>
          </div>

          <div className="roadmap-metrics">
            <div className="metric-card">
              <span className="metric-label">Total Credits</span>
              <strong className="metric-value">
                {roadmap.total_credits_earned}/{roadmap.total_credits_required}
              </strong>
            </div>
            <div className="metric-divider" aria-hidden="true" />
            <div className="metric-card metric-progress">
              <span className="metric-label">Overall Progress</span>
              <strong className="metric-value">{progress}%</strong>
              <span className="progress-ring" style={progressRingStyle}>
                <span className="progress-ring-center" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="roadmap-canvas">
        <RoadmapToolbar
          isPanMode={isPanMode}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetView={handleResetView}
          onTogglePanMode={() => setIsPanMode((prev) => !prev)}
          className="roadmap-toolbar--macro"
        />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onNodeContextMenu={isPreviewMode ? undefined : onNodeContextMenu}
          onPaneClick={() => setContextMenu(null)}
          onInit={setFlowInstance}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.16 }}
          nodesDraggable={false}
          nodesConnectable={false}
          panOnDrag={isPanMode}
          selectionOnDrag={!isPanMode}
          panOnScroll
          zoomOnScroll
          zoomOnPinch
          zoomOnDoubleClick
          minZoom={0.35}
          maxZoom={2}
        >
          <Background color="#cbd5e1" gap={24} size={1} />
          <MiniMap
            position="bottom-right"
            pannable
            zoomable
            style={{
              width: 180,
              height: 110,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            
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
          <span>
            <i className="dot completed" /> Completed
          </span>
          <span>
            <i className="dot in-progress" /> In Progress
          </span>
          <span>
            <i className="dot available" /> Available
          </span>
        </div>

        {!isPreviewMode && contextMenu && (
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
    </div>
  );
}
