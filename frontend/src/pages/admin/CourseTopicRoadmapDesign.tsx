import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeMouseHandler,
  MarkerType,
  MiniMap,
  Node,
  NodeProps,
  Position,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import '../../styles/MajorRoadmapDesign.css';
import Notification, { NotificationType } from '../../components/ui/Notification';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import Header from '../../components/layouts/Header';
import {
  adminService,
  AdminCourseTopicsGraph,
  AdminTopicEdge,
} from '../../services/admin.service';

type TopicNodeData = {
  topicId: number;
  slug: string;
  title: string;
  description: string;
  learningObjectives: string;
  resourcesUrl: string;
};

type TopicEdgeData = {
  edgeId: number;
  fromTopicId: number;
  toTopicId: number;
};

type EditorMode = 'create' | 'edit' | null;

type TopicFormState = {
  slug: string;
  title: string;
  description: string;
  learningObjectives: string;
  resourcesUrl: string;
  nextTopicIds: number[];
};

type ConfirmDialogState = {
  title: string;
  message: string;
  isDestructive?: boolean;
  onConfirm: () => Promise<void>;
};

const EMPTY_FORM: TopicFormState = {
  slug: '',
  title: '',
  description: '',
  learningObjectives: '',
  resourcesUrl: '',
  nextTopicIds: [],
};

const GRAPH_FALLBACK_X = 280;
const GRAPH_FALLBACK_Y = 180;

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const TopicNodeCard = ({ data, selected }: NodeProps<TopicNodeData>) => {
  return (
    <div
      style={{
        minWidth: 240,
        maxWidth: 240,
        padding: 10,
        background: selected ? '#eff6ff' : '#ffffff',
        border: selected ? '2px solid #2563eb' : '1px solid #cbd5e1',
        borderRadius: 10,
        boxShadow: selected
          ? '0 10px 24px rgba(37, 99, 235, 0.18)'
          : '0 4px 12px rgba(15, 23, 42, 0.08)',
      }}
    >
      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: 13, marginBottom: 4 }}>
        {data.title}
      </div>
      <div style={{ color: '#475569', fontSize: 11 }}>{data.slug}</div>
      {data.description && (
        <div
          style={{
            marginTop: 8,
            color: '#64748b',
            fontSize: 11,
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {data.description}
        </div>
      )}
    </div>
  );
};

const mapGraphToFlow = (graph: AdminCourseTopicsGraph) => {
  const flowNodes: Node<TopicNodeData>[] = graph.topics.map((topic, index) => {
    const hasCoords = Number.isFinite(topic.coords?.x) && Number.isFinite(topic.coords?.y);

    return {
      id: String(topic.id),
      type: 'topicNode',
      position: hasCoords
        ? { x: Number(topic.coords?.x), y: Number(topic.coords?.y) }
        : {
            x: 120 + (index % 4) * GRAPH_FALLBACK_X,
            y: 100 + Math.floor(index / 4) * GRAPH_FALLBACK_Y,
          },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      data: {
        topicId: topic.id,
        slug: topic.slug,
        title: topic.title,
        description: topic.description || '',
        learningObjectives: topic.learningObjectives || '',
        resourcesUrl: topic.resourcesUrl || '',
      },
    };
  });

  const flowEdges: Edge<TopicEdgeData>[] = graph.edges.map((edge) => ({
    id: `topic-edge-${edge.id}`,
    source: String(edge.fromTopicId),
    target: String(edge.toTopicId),
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed },
    data: {
      edgeId: edge.id,
      fromTopicId: edge.fromTopicId,
      toTopicId: edge.toTopicId,
    },
    style: {
      stroke: '#64748b',
      strokeWidth: 1.5,
      strokeDasharray: '4 4',
    },
  }));

  return { flowNodes, flowEdges };
};

export default function CourseTopicRoadmapDesign() {
  const { courseNodeId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [courseLabel, setCourseLabel] = useState('Course Topic Roadmap');

  const [nodes, setNodes, onNodesChange] = useNodesState<TopicNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<TopicEdgeData>([]);

  const [editorMode, setEditorMode] = useState<EditorMode>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState<TopicFormState>(EMPTY_FORM);

  const [notification, setNotification] = useState<{
    type: NotificationType;
    title: string;
    message?: string;
  } | null>(null);

  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);

  const nodeTypes = useMemo(() => ({ topicNode: TopicNodeCard }), []);

  const currentCourseNodeId = Number(courseNodeId);

  const closePanel = useCallback(() => {
    setEditorMode(null);
    setSelectedNodeId(null);
    setSearchTerm('');
    setForm(EMPTY_FORM);
  }, []);

  const loadGraph = useCallback(async () => {
    if (!Number.isFinite(currentCourseNodeId)) {
      setNotification({
        type: 'error',
        title: 'Invalid Course',
        message: 'Course node id is missing or invalid.',
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      closePanel();

      const graph = await adminService.getAdminCourseTopicsGraph(currentCourseNodeId);
      const { flowNodes, flowEdges } = mapGraphToFlow(graph);

      setNodes(flowNodes);
      setEdges(flowEdges);

      const allCourses = await adminService.getAllCourses();
      const matchedCourse = allCourses.find((course) => course.id === currentCourseNodeId);
      if (matchedCourse) {
        setCourseLabel(`${matchedCourse.name} (${matchedCourse.slug})`);
      }
    } catch (error: any) {
      setNotification({
        type: 'error',
        title: 'Load Failed',
        message: error?.response?.data?.message || 'Failed to load topic roadmap.',
      });
    } finally {
      setLoading(false);
    }
  }, [closePanel, currentCourseNodeId, setEdges, setNodes]);

  useEffect(() => {
    loadGraph();
  }, [loadGraph]);

  const getCurrentNextTopicIds = useCallback(
    (topicId: number) => {
      return edges
        .filter((edge) => edge.data?.fromTopicId === topicId)
        .map((edge) => edge.data?.toTopicId)
        .filter((value): value is number => Number.isFinite(value));
    },
    [edges],
  );

  const edgeExists = useCallback(
    (sourceTopicId: number, targetTopicId: number) =>
      edges.some(
        (edge) => Number(edge.source) === sourceTopicId && Number(edge.target) === targetTopicId,
      ),
    [edges],
  );

  const openCreatePanel = () => {
    setEditorMode('create');
    setSelectedNodeId(null);
    setSearchTerm('');
    setForm(EMPTY_FORM);
  };

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node<TopicNodeData>) => {
      const topicId = Number(node.id);
      setEditorMode('edit');
      setSelectedNodeId(node.id);
      setSearchTerm('');
      setForm({
        slug: node.data.slug,
        title: node.data.title,
        description: node.data.description || '',
        learningObjectives: node.data.learningObjectives || '',
        resourcesUrl: node.data.resourcesUrl || '',
        nextTopicIds: getCurrentNextTopicIds(topicId),
      });
    },
    [getCurrentNextTopicIds],
  );

  const createEdge = useCallback(
    async (sourceTopicId: number, targetTopicId: number) => {
      if (!Number.isFinite(currentCourseNodeId)) return;
      if (sourceTopicId === targetTopicId) return;
      if (edgeExists(sourceTopicId, targetTopicId)) return;

      const created: AdminTopicEdge = await adminService.createAdminTopicEdge(currentCourseNodeId, {
        sourceTopicId,
        targetTopicId,
      });

      setEdges((prev) =>
        addEdge(
          {
            id: `topic-edge-${created.id}`,
            source: String(created.fromTopicId),
            target: String(created.toTopicId),
            type: 'smoothstep',
            markerEnd: { type: MarkerType.ArrowClosed },
            data: {
              edgeId: created.id,
              fromTopicId: created.fromTopicId,
              toTopicId: created.toTopicId,
            },
            style: {
              stroke: '#64748b',
              strokeWidth: 1.5,
              strokeDasharray: '4 4',
            },
          },
          prev,
        ),
      );
    },
    [currentCourseNodeId, edgeExists, setEdges],
  );

  const removeEdgeById = useCallback(
    async (edgeId: number) => {
      if (!Number.isFinite(currentCourseNodeId)) return;
      await adminService.deleteAdminTopicEdge(currentCourseNodeId, edgeId);
      setEdges((prev) => prev.filter((edge) => edge.data?.edgeId !== edgeId));
    },
    [currentCourseNodeId, setEdges],
  );

  const onConnect = useCallback(
    async (connection: Connection) => {
      if (!connection.source || !connection.target || connection.source === connection.target) {
        return;
      }

      const sourceTopicId = Number(connection.source);
      const targetTopicId = Number(connection.target);

      if (!Number.isFinite(sourceTopicId) || !Number.isFinite(targetTopicId)) return;

      try {
        await createEdge(sourceTopicId, targetTopicId);
      } catch (error: any) {
        setNotification({
          type: 'error',
          title: 'Connect Failed',
          message: error?.response?.data?.message || 'Unable to create topic edge.',
        });
      }
    },
    [createEdge],
  );

  const onEdgeClick = useCallback<EdgeMouseHandler>(
    (_event, edge) => {
      const edgeId = Number(edge.data?.edgeId);
      if (!Number.isFinite(edgeId)) return;

      setConfirmDialog({
        title: 'Delete Topic Connection',
        message: 'Are you sure you want to delete this topic connection?',
        isDestructive: true,
        onConfirm: async () => {
          await removeEdgeById(edgeId);
          setConfirmDialog(null);
        },
      });
    },
    [removeEdgeById],
  );

  const onEdgesDelete = useCallback(
    async (deletedEdges: Edge<TopicEdgeData>[]) => {
      if (!Number.isFinite(currentCourseNodeId) || deletedEdges.length === 0) return;

      try {
        await Promise.all(
          deletedEdges
            .map((edge) => edge.data?.edgeId)
            .filter((edgeId): edgeId is number => Number.isFinite(edgeId))
            .map((edgeId) => adminService.deleteAdminTopicEdge(currentCourseNodeId, edgeId)),
        );
      } catch (error: any) {
        setNotification({
          type: 'error',
          title: 'Delete Failed',
          message: error?.response?.data?.message || 'Unable to delete one or more topic edges.',
        });
        await loadGraph();
      }
    },
    [currentCourseNodeId, loadGraph],
  );

  const availableConnectionTargets = useMemo(() => {
    const currentId = selectedNodeId ? Number(selectedNodeId) : null;
    return nodes
      .filter((node) => Number(node.id) !== currentId)
      .filter((node) => !form.nextTopicIds.includes(Number(node.id)))
      .filter((node) => {
        if (!searchTerm.trim()) return true;
        const haystack = `${node.data.title} ${node.data.slug}`.toLowerCase();
        return haystack.includes(searchTerm.toLowerCase());
      });
  }, [form.nextTopicIds, nodes, searchTerm, selectedNodeId]);

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => {
      if (name === 'title' && editorMode === 'create') {
        const autoSlug = slugify(value);
        const shouldAutoSlug = prev.slug.trim() === '' || prev.slug === slugify(prev.title);
        if (shouldAutoSlug) {
          return { ...prev, title: value, slug: autoSlug };
        }
      }

      return { ...prev, [name]: value };
    });
  };

  const createTopic = async () => {
    if (!Number.isFinite(currentCourseNodeId)) return;

    if (!form.slug.trim() || !form.title.trim()) {
      setNotification({
        type: 'error',
        title: 'Invalid Input',
        message: 'Please provide topic slug and title.',
      });
      return;
    }

    setSaving(true);
    try {
      const fallbackX = 120 + (nodes.length % 4) * GRAPH_FALLBACK_X;
      const fallbackY = 100 + Math.floor(nodes.length / 4) * GRAPH_FALLBACK_Y;

      const created = await adminService.createAdminTopicNode(currentCourseNodeId, {
        slug: form.slug.trim(),
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        learningObjectives: form.learningObjectives.trim() || undefined,
        resourcesUrl: form.resourcesUrl.trim() || undefined,
        coords: { x: fallbackX, y: fallbackY },
      });

      for (const nextTopicId of form.nextTopicIds) {
        if (nextTopicId === created.id) continue;
        if (!edgeExists(created.id, nextTopicId)) {
          await createEdge(created.id, nextTopicId);
        }
      }

      setNotification({
        type: 'success',
        title: 'Topic Created',
        message: `Successfully created "${form.title}".`,
      });
      closePanel();
      await loadGraph();
    } catch (error: any) {
      setNotification({
        type: 'error',
        title: 'Create Failed',
        message: error?.response?.data?.message || 'Failed to create topic node.',
      });
    } finally {
      setSaving(false);
    }
  };

  const updateTopic = async () => {
    if (!Number.isFinite(currentCourseNodeId) || !selectedNodeId) return;

    const topicId = Number(selectedNodeId);
    if (!Number.isFinite(topicId)) return;

    if (!form.slug.trim() || !form.title.trim()) {
      setNotification({
        type: 'error',
        title: 'Invalid Input',
        message: 'Please provide topic slug and title.',
      });
      return;
    }

    setSaving(true);
    try {
      await adminService.updateAdminTopicNode(currentCourseNodeId, topicId, {
        slug: form.slug.trim(),
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        learningObjectives: form.learningObjectives.trim() || undefined,
        resourcesUrl: form.resourcesUrl.trim() || undefined,
      });

      const currentNextTopicIds = getCurrentNextTopicIds(topicId);
      const toAdd = form.nextTopicIds.filter((id) => !currentNextTopicIds.includes(id));
      const toRemove = currentNextTopicIds.filter((id) => !form.nextTopicIds.includes(id));

      for (const targetTopicId of toAdd) {
        await createEdge(topicId, targetTopicId);
      }

      for (const targetTopicId of toRemove) {
        const edgeToDelete = edges.find(
          (edge) => edge.data?.fromTopicId === topicId && edge.data?.toTopicId === targetTopicId,
        );
        if (edgeToDelete?.data?.edgeId) {
          await removeEdgeById(edgeToDelete.data.edgeId);
        }
      }

      setNotification({
        type: 'success',
        title: 'Topic Updated',
        message: `Successfully updated "${form.title}".`,
      });
      closePanel();
      await loadGraph();
    } catch (error: any) {
      setNotification({
        type: 'error',
        title: 'Update Failed',
        message: error?.response?.data?.message || 'Failed to update topic node.',
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteTopic = async () => {
    if (!Number.isFinite(currentCourseNodeId) || !selectedNodeId) return;

    const topicId = Number(selectedNodeId);
    const topicName = nodes.find((node) => Number(node.id) === topicId)?.data.title || 'this topic';

    setConfirmDialog({
      title: 'Delete Topic Node',
      message: `Are you sure you want to delete "${topicName}" and all its connections? This action cannot be undone.`,
      isDestructive: true,
      onConfirm: async () => {
        setSaving(true);
        try {
          await adminService.deleteAdminTopicNode(currentCourseNodeId, topicId);
          setNotification({
            type: 'success',
            title: 'Topic Deleted',
            message: `"${topicName}" has been deleted.`,
          });
          closePanel();
          setConfirmDialog(null);
          await loadGraph();
        } catch (error: any) {
          setNotification({
            type: 'error',
            title: 'Delete Failed',
            message: error?.response?.data?.message || 'Failed to delete topic node.',
          });
          setConfirmDialog(null);
        } finally {
          setSaving(false);
        }
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editorMode === 'create') {
      await createTopic();
      return;
    }
    await updateTopic();
  };

  const handleSaveLayout = async () => {
    if (!Number.isFinite(currentCourseNodeId)) return;

    setSaving(true);
    try {
      await Promise.all(
        nodes.map((node) =>
          adminService.updateAdminTopicCoords(currentCourseNodeId, Number(node.id), {
            x: node.position.x,
            y: node.position.y,
          }),
        ),
      );

      setNotification({
        type: 'success',
        title: 'Layout Saved',
        message: `Saved coordinates for ${nodes.length} topic node(s).`,
      });
    } catch (error: any) {
      setNotification({
        type: 'error',
        title: 'Save Failed',
        message: error?.response?.data?.message || 'Failed to save topic layout.',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: 24 }}>Loading topic roadmap...</div>;
  }

  const totalNodes = nodes.length;
  const totalEdges = edges.length;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc', overflow: 'hidden' }}>
      {notification && (
        <Notification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          duration={notification.type === 'error' ? 5000 : 4000}
          onClose={() => setNotification(null)}
        />
      )}

      {confirmDialog && (
        <ConfirmDialog
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText="Delete"
          cancelText="Cancel"
          isDestructive={confirmDialog.isDestructive}
          isLoading={saving}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog(null)}
        />
      )}

      <div className="roadmap-header-container">
        <div className="roadmap-top-row">
          <Header
            title="Course Topic Roadmap Designer"
            subtitle={courseLabel}
          />
          <div className="roadmap-metrics">
            Topics: {totalNodes} <span style={{ color: '#cbd5e1', margin: '0 12px' }}>|</span> Connections: {totalEdges}
          </div>
        </div>

        <div className="roadmap-header-bar">
          <div className="header-actions-left">
            <button type="button" className="btn-primary" onClick={openCreatePanel}>
              + Create Topic Node
            </button>
            <button type="button" className="btn-save" onClick={handleSaveLayout} disabled={saving}>
              {saving ? 'Saving...' : 'Save Layout'}
            </button>
          </div>

          <button type="button" className="btn-secondary" onClick={() => navigate('/admin/courses')}>
            ← Back to Courses
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgesDelete={onEdgesDelete}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onConnect={onConnect}
            onPaneClick={closePanel}
            fitView
            minZoom={0.35}
            maxZoom={1.8}
            elementsSelectable
            nodesDraggable
            nodesConnectable
            proOptions={{ hideAttribution: true }}
          >
            <MiniMap pannable zoomable nodeStrokeColor="#2563eb" nodeColor="#dbeafe" />
            <Controls />
            <Background color="#d2d9e6" gap={20} size={1} />
          </ReactFlow>
          {nodes.length === 0 && (
            <div
              style={{
                position: 'absolute',
                top: '45%',
                left: '35%',
                background: '#ffffff',
                padding: '14px 18px',
                borderRadius: 10,
                border: '1px solid #cbd5e1',
                boxShadow: '0 8px 20px rgba(15,23,42,0.08)',
                fontSize: 13,
                color: '#334155',
              }}
            >
              No topics yet. Click + Create Topic Node to start.
            </div>
          )}
        </div>
      </div>

      <div
        onClick={closePanel}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(2px)',
          zIndex: 99,
          opacity: editorMode ? 1 : 0,
          visibility: editorMode ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
        }}
      />

      <aside
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 390,
          background: '#ffffff',
          padding: '24px 20px',
          overflowY: 'auto',
          boxShadow: '-8px 0 30px rgba(15, 23, 42, 0.15)',
          zIndex: 100,
          transform: editorMode ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>
            {editorMode === 'create' ? 'Create Topic Node' : 'Edit Topic Node'}
          </h3>
          <button
            type="button"
            onClick={closePanel}
            style={{
              background: '#f1f5f9',
              color: '#475569',
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              padding: '6px 12px',
              borderRadius: 6,
              fontWeight: 600,
            }}
          >
            Close
          </button>
        </div>

        <p style={{ marginBottom: 20, fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
          Manage topic metadata and outgoing connections to other topics in this course.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="slug" style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              value={form.slug}
              onChange={handleFieldChange}
              required
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8 }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label htmlFor="title" style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
              Topic Title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleFieldChange}
              required
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8 }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label htmlFor="description" style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleFieldChange}
              rows={3}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, resize: 'vertical' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label htmlFor="learningObjectives" style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
              Learning Objectives
            </label>
            <textarea
              id="learningObjectives"
              name="learningObjectives"
              value={form.learningObjectives}
              onChange={handleFieldChange}
              rows={3}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, resize: 'vertical' }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label htmlFor="resourcesUrl" style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
              Resource URL
            </label>
            <input
              id="resourcesUrl"
              name="resourcesUrl"
              value={form.resourcesUrl}
              onChange={handleFieldChange}
              placeholder="https://..."
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8 }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
              Next Topics
            </label>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12, minHeight: form.nextTopicIds.length > 0 ? 36 : 0 }}>
              {form.nextTopicIds.map((nextId) => {
                const nextNode = nodes.find((node) => Number(node.id) === nextId);
                return (
                  <div
                    key={nextId}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 12px',
                      background: '#dbeafe',
                      color: '#1d4ed8',
                      borderRadius: 999,
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    <span>{nextNode?.data.title || `Topic ${nextId}`}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          nextTopicIds: prev.nextTopicIds.filter((id) => id !== nextId),
                        }))
                      }
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#1d4ed8',
                        cursor: 'pointer',
                        fontSize: 16,
                        fontWeight: 'bold',
                        padding: 0,
                      }}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>

            <input
              type="text"
              placeholder="Search and add next topics..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              style={{
                width: '100%',
                marginBottom: 8,
                padding: '10px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: 8,
                fontSize: 14,
              }}
            />

            {searchTerm.trim() && (
              <div
                style={{
                  border: '1px solid #cbd5e1',
                  borderRadius: 8,
                  maxHeight: 200,
                  overflowY: 'auto',
                  background: '#ffffff',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
                }}
              >
                {availableConnectionTargets.length > 0 ? (
                  availableConnectionTargets.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setForm((prev) => ({
                          ...prev,
                          nextTopicIds: [...prev.nextTopicIds, Number(option.id)],
                        }));
                        setSearchTerm('');
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 12px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        fontSize: 13,
                        color: '#0f172a',
                        borderBottom: '1px solid #f1f5f9',
                      }}
                    >
                      <div style={{ fontWeight: 500 }}>{option.data.title}</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>{option.data.slug}</div>
                    </button>
                  ))
                ) : (
                  <div style={{ padding: '10px 12px', color: '#64748b', fontSize: 13 }}>
                    No matching topics found.
                  </div>
                )}
              </div>
            )}
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px 0' }} disabled={saving}>
            {saving ? 'Saving...' : editorMode === 'create' ? 'Create Topic' : 'Save Changes'}
          </button>
        </form>

        {editorMode === 'edit' && (
          <button
            type="button"
            style={{
              marginTop: 12,
              width: '100%',
              padding: '12px 0',
              background: '#fff',
              color: '#ef4444',
              border: '1px solid #f87171',
              borderRadius: 8,
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onClick={deleteTopic}
            disabled={saving}
          >
            Delete Topic
          </button>
        )}
      </aside>
    </div>
  );
}
