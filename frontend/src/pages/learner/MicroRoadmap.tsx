import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Edge,
  Node,
  Position,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Bot, FolderKanban, AudioWaveform, CircleStar    } from 'lucide-react';
import {
  MicroRoadmapResponse,
  MicroTopicNode,
  roadmapService,
} from '../../services/roadmap.service';
import MicroRoadmapNodeCard from '../../components/roadmap/MicroRoadmapNodeCard';
import RoadmapToolbar from '../../components/roadmap/RoadmapToolbar';
import MicroTopicPanel from '../../components/roadmap/MicroTopicPanel';
import '../../styles/MicroRoadMap.css';

export default function MicroRoadmap() {
  const { id, courseNodeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const stateData =
    (location.state as { roadmapTitle?: string; courseTitle?: string; courseCredits?: number } | null) || null;

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [microRoadmap, setMicroRoadmap] = useState<MicroRoadmapResponse | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<MicroTopicNode | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPanMode, setIsPanMode] = useState(true);
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
  const [courseCredits, setCourseCredits] = useState<number>(stateData?.courseCredits || 0);

  const mapToFlow = useCallback((data: MicroRoadmapResponse) => {
    const spreadX = 430;
    const spreadY = 260;

    const flowNodes: Node[] = data.topics.map((topic, index) => {
      const fallbackX = 110 + (index % 3) * spreadX;
      const fallbackY = 80 + Math.floor(index / 3) * spreadY;

      const baseX = topic.coords?.x ?? fallbackX;
      const baseY = topic.coords?.y ?? fallbackY;

      return {
        id: String(topic.id),
        position: {
          x: baseX * 1.35 + (index % 2) * 28,
          y: baseY * 1.2,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        data: {
          label: <MicroRoadmapNodeCard topic={topic} index={index} />,
        },
        style: {
          width: 230,
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          padding: 0,
        },
      };
    });

    const nodeIdSet = new Set(flowNodes.map((node) => node.id));
    const edgeStyle = { stroke: '#7f9bc2', strokeWidth: 1.9, strokeDasharray: '4 4' };

    const mappedEdges = (data.edges || [])
      .map((edge, idx) => ({
        id: `micro-edge-${edge.id}-${idx}`,
        source: String(edge.from),
        target: String(edge.to),
        type: 'step' as const,
        animated: false,
        style: edgeStyle,
      }))
      .filter((edge) => nodeIdSet.has(edge.source) && nodeIdSet.has(edge.target) && edge.source !== edge.target);

    const reversedMappedEdges = (data.edges || [])
      .map((edge, idx) => ({
        id: `micro-edge-rev-${edge.id}-${idx}`,
        source: String(edge.to),
        target: String(edge.from),
        type: 'step' as const,
        animated: false,
        style: edgeStyle,
      }))
      .filter((edge) => nodeIdSet.has(edge.source) && nodeIdSet.has(edge.target) && edge.source !== edge.target);

    let flowEdges: Edge[] = mappedEdges;

    // Some payloads return reversed from/to values; auto-correct when detected.
    if (flowEdges.length === 0 && reversedMappedEdges.length > 0) {
      flowEdges = reversedMappedEdges;
    }

    // If API has no valid edges, create simple row connectors so the roadmap remains readable.
    if (flowEdges.length === 0 && data.topics.length > 1) {
      const generatedEdges: Edge[] = [];
      for (let index = 0; index < data.topics.length - 1; index += 1) {
        const topic = data.topics[index];
        const nextTopic = data.topics[index + 1];

        generatedEdges.push({
          id: `micro-edge-auto-${topic.id}-${nextTopic.id}`,
          source: String(topic.id),
          target: String(nextTopic.id),
          type: 'step',
          animated: false,
          style: edgeStyle,
        });
      }

      flowEdges = generatedEdges;
    }

    return { flowNodes, flowEdges };
  }, []);

  const loadMicroRoadmap = useCallback(async () => {
    if (!courseNodeId) return;

    try {
      setLoading(true);
      setError(null);

      const data = await roadmapService.getMicroRoadmap(Number(courseNodeId));

      if (!data || !Array.isArray(data.topics)) {
        setError('Micro roadmap data is invalid.');
        setMicroRoadmap(null);
        setNodes([]);
        setEdges([]);
        return;
      }

      setMicroRoadmap(data);

      const { flowNodes, flowEdges } = mapToFlow(data);
      setNodes(flowNodes);
      setEdges(flowEdges);

      if (data.topics.length > 0) {
        setSelectedTopic(data.topics[0]);
        setIsPanelOpen(true);
      } else {
        setSelectedTopic(null);
        setIsPanelOpen(false);
      }
    } catch (err) {
      console.error('Failed to load micro roadmap:', err);
      setError('Failed to load micro roadmap.');
    } finally {
      setLoading(false);
    }
  }, [courseNodeId, mapToFlow, setEdges, setNodes]);

  const topicById = useMemo(() => {
    const map = new Map<string, MicroTopicNode>();
    (microRoadmap?.topics || []).forEach((topic) => {
      map.set(String(topic.id), topic);
    });
    return map;
  }, [microRoadmap]);

  const continueTopicCount = useMemo(() => {
    if (!microRoadmap || !selectedTopic) return 0;

    // Count remaining modules after the selected one.
    const index = microRoadmap.topics.findIndex((topic) => topic.id === selectedTopic.id);
    if (index === -1) return 0;

    return Math.max(0, microRoadmap.topics.length - index - 1);
  }, [microRoadmap, selectedTopic]);

  useEffect(() => {
    loadMicroRoadmap();
  }, [loadMicroRoadmap]);

  useEffect(() => {
    if (!id || !courseNodeId) return;

    let isMounted = true;

    const syncCompletionFromMacro = async () => {
      try {
        const data = await roadmapService.getUserRoadmapDetail(Number(id));
        const matchedNode = data.nodes.find((node) => node.id === Number(courseNodeId));
        const currentStatus = matchedNode?.status;

        if (matchedNode?.credits) {
          setCourseCredits(matchedNode.credits);
        }

        if (currentStatus === 'AVAILABLE') {
          await roadmapService.updateCourseStatus(Number(id), Number(courseNodeId), {
            status: 'IN_PROGRESS',
            creditsEarned: 0,
          });
        }

        if (isMounted) {
          setIsCourseCompleted(currentStatus === 'COMPLETED');
        }
      } catch {
        if (isMounted) {
          setIsCourseCompleted(false);
        }
      }
    };

    syncCompletionFromMacro();

    return () => {
      isMounted = false;
    };
  }, [id, courseNodeId]);

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const topic = topicById.get(String(node.id));
      if (!topic) return;
      setSelectedTopic(topic);
      setIsPanelOpen(true);
    },
    [topicById]
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

  const handleReload = useCallback(() => {
    loadMicroRoadmap();
  }, [loadMicroRoadmap]);

  const handleBackToRoadmap = useCallback(() => {
    navigate(`/dashboard/roadmap/${id}`, {
      state: { roadmapTitle: stateData?.roadmapTitle },
    });
  }, [id, navigate, stateData?.roadmapTitle]);

  const handleMarkAsComplete = useCallback(async () => {
    if (!id || !courseNodeId || markingComplete || isCourseCompleted) return;

    try {
      setMarkingComplete(true);
      await roadmapService.updateCourseStatus(Number(id), Number(courseNodeId), {
        status: 'COMPLETED',
        creditsEarned: courseCredits || 0,
      });
      setIsCourseCompleted(true);
    } catch (markError) {
      console.error('Failed to mark course as complete', markError);
      alert('Failed to mark this course as complete. Please try again.');
    } finally {
      setMarkingComplete(false);
    }
  }, [id, courseNodeId, markingComplete, isCourseCompleted, courseCredits]);

  if (loading) {
    return (
      <div className="micro-loading-shell" aria-label="Loading micro roadmap">
        <div className="micro-loading-panel" />
        <div className="micro-loading-canvas">
          <div className="micro-loading-toolbar" />
          <div className="micro-loading-card card-1" />
          <div className="micro-loading-card card-2" />
          <div className="micro-loading-card card-3" />
        </div>
      </div>
    );
  }

  if (error) return <div className="error-screen">{error}</div>;
  if (!microRoadmap) return <div className="error-screen">Micro roadmap not found.</div>;

  const isEmpty = microRoadmap.topics.length === 0;
  const headerTitle = stateData?.courseTitle || 'MicroRoadmap: Detailed node for Macro';

  return (
    <div className="micro-roadmap-page">
      <header className="micro-roadmap-header">
        <div className="micro-header-top">
          <div className="micro-header-left">
            <button onClick={handleBackToRoadmap} className="btn-back">
              ← Back to Roadmap
            </button>
            <h1>{headerTitle}</h1>
            <p>Description: {selectedTopic?.description}</p>
          </div>

          <div className="micro-header-right" role="tablist" aria-label="Micro roadmap section tabs">
            <button type="button" className="micro-header-tab active" aria-selected="true">
              <AudioWaveform  size={15} />
              <span>Roadmap</span>
            </button>
            <button type="button" className="micro-header-tab" aria-selected="false">
              <FolderKanban size={15} />
              <span>Projects</span>
            </button>
            <button type="button" className="micro-header-tab" aria-selected="false">
              <Bot size={15} />
              <span>AI Chat</span>
            </button>
          </div>
        </div>
      </header>

      <section className="micro-roadmap-content">
        <MicroTopicPanel
          topic={selectedTopic}
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          continueTopicCount={continueTopicCount}
        />

        <div className={`micro-roadmap-canvas ${isPanelOpen ? 'with-panel' : ''}`}>
          <RoadmapToolbar
            isPanMode={isPanMode}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetView={handleResetView}
            onTogglePanMode={() => setIsPanMode((prev) => !prev)}
          />

          {isEmpty ? (
            <div className="micro-empty-state">
              <h2>No Topics Yet</h2>
              <p>This micro roadmap has no topics right now. Try reloading or check data setup.</p>
              <button type="button" onClick={handleReload}>Reload MicroRoadmap</button>
            </div>
          ) : (
            <>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={onNodeClick}
                onInit={setFlowInstance}
                fitView
                minZoom={0.35}
                maxZoom={1.8}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable
                panOnDrag={isPanMode}
                selectionOnDrag={!isPanMode}
                proOptions={{ hideAttribution: true }}
              >
                <Background color="#d2d9e6" gap={20} size={1} />
              </ReactFlow>
            </>
          )}
        </div>

        <div className={`micro-complete-action-wrap ${isPanelOpen ? 'with-panel' : ''}`}>
          <button
            type="button"
            className={`micro-complete-btn ${isCourseCompleted ? 'done' : ''}`}
            onClick={handleMarkAsComplete}
            disabled={markingComplete || isCourseCompleted}
          >
            {isCourseCompleted
              ? 'Course Completed'
              : markingComplete
                ? 'Saving...'
                : 'Mark as Complete'}
            <CircleStar size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}