import React, { useCallback, useEffect, useMemo, useState } from 'react';
import '../../styles/MajorRoadmapDesign.css';
import { useNavigate, useParams } from 'react-router-dom';
import ReactFlow, {
	Background,
	Controls,
	Edge,
	Handle,
	MarkerType,
	MiniMap,
	Node,
	NodeProps,
	Position,
	useEdgesState,
	useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Header from '../../components/layouts/Header';
import {
	adminService,
	AdminRoadmapGraph,
	Major,
} from '../../services/admin.service';

type RoadmapNodeData = {
	nodeId: number;
	slug: string;
	title: string;
	credits: number;
	description: string;
};

type RoadmapEdgeData = {
	edgeId: number;
	courseNodeId: number;
	prerequisiteNodeId: number;
};

type EditorMode = 'create' | 'edit' | null;

type NodeFormState = {
	slug: string;
	name: string;
	credits: string;
	description: string;
	prerequisiteIds: number[];
};

const EMPTY_FORM: NodeFormState = {
	slug: '',
	name: '',
	credits: '0',
	description: '',
	prerequisiteIds: [],
};

const GRAPH_FALLBACK_X = 260;
const GRAPH_FALLBACK_Y = 150;

const slugify = (text: string) =>
	text
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');

const CourseNodeCard = ({ data, selected }: NodeProps<RoadmapNodeData>) => {
	return (
		<div
			style={{
				minWidth: 220,
				maxWidth: 220,
				padding: 10,
				background: selected ? '#eff6ff' : '#ffffff',
				border: selected ? '2px solid #2563eb' : '1px solid #cbd5e1',
				borderRadius: 10,
				boxShadow: selected
					? '0 10px 24px rgba(37, 99, 235, 0.18)'
					: '0 4px 12px rgba(15, 23, 42, 0.08)',
			}}
		>
			<Handle type="target" position={Position.Left} style={{ background: '#475569' }} />
			<div style={{ fontWeight: 700, color: '#0f172a', fontSize: 13, marginBottom: 4 }}>
				{data.title}
			</div>
			<div style={{ color: '#475569', fontSize: 11, marginBottom: 8 }}>{data.slug}</div>
			<div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
				<span
					style={{
						padding: '2px 8px',
						borderRadius: 999,
						background: '#dbeafe',
						color: '#1d4ed8',
						fontWeight: 600,
					}}
				>
					{data.credits} credits
				</span>
				<span style={{ color: '#64748b' }}>ID: {data.nodeId}</span>
			</div>
			<Handle type="source" position={Position.Right} style={{ background: '#475569' }} />
		</div>
	);
};

const toFlow = (graph: AdminRoadmapGraph) => {
	const flowNodes: Node<RoadmapNodeData>[] = graph.nodes.map((node, index) => {
		const hasValidCoords =
			Number.isFinite(node.coords?.x) && Number.isFinite(node.coords?.y);

		return {
			id: String(node.id),
			type: 'courseNode',
			position: hasValidCoords
				? { x: Number(node.coords?.x), y: Number(node.coords?.y) }
				: {
						x: (index % 4) * GRAPH_FALLBACK_X,
						y: Math.floor(index / 4) * GRAPH_FALLBACK_Y,
					},
			data: {
				nodeId: node.id,
				slug: node.slug,
				title: node.name,
				credits: node.credits,
				description: node.description || '',
			},
		};
	});

	// Backend stores edges as course -> prerequisite. Reverse direction in UI for readable flow.
	const flowEdges: Edge<RoadmapEdgeData>[] = graph.edges.map((edge) => ({
		id: `e-${edge.id}`,
		source: String(edge.to),
		target: String(edge.from),
		type: 'smoothstep',
		markerEnd: { type: MarkerType.ArrowClosed },
		data: {
			edgeId: edge.id,
			courseNodeId: edge.from,
			prerequisiteNodeId: edge.to,
		},
		style: {
			stroke: '#64748b',
			strokeWidth: 1.5,
			strokeDasharray: '4 4',
		},
	}));

	return { flowNodes, flowEdges };
};

export default function MajorRoadmapDesign() {
	const { slug } = useParams();
	const navigate = useNavigate();

	const [major, setMajor] = useState<Major | null>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const [nodes, setNodes, onNodesChange] = useNodesState<RoadmapNodeData>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState<RoadmapEdgeData>([]);

	const [editorMode, setEditorMode] = useState<EditorMode>(null);
	const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
	const [form, setForm] = useState<NodeFormState>(EMPTY_FORM);
	const [searchTerm, setSearchTerm] = useState('');

	const nodeTypes = useMemo(() => ({ courseNode: CourseNodeCard }), []);

	const resolveMajor = useCallback(async (): Promise<Major> => {
		if (!slug) {
			throw new Error('Missing major slug in route.');
		}

		try {
			return await adminService.getAdminMajorBySlug(slug);
		} catch {
			const allMajors = await adminService.getAdminMajors();
			const fallback = allMajors.find((item) => item.slug === slug);

			if (!fallback) {
				throw new Error(`Major with slug "${slug}" not found.`);
			}

			return fallback;
		}
	}, [slug]);

	const loadGraph = useCallback(async () => {
		try {
			setLoading(true);

			const majorMeta = await resolveMajor();
			setMajor(majorMeta);

			const graph = await adminService.getAdminRoadmapGraph(majorMeta.id);
			const { flowNodes, flowEdges } = toFlow(graph);

			setNodes(flowNodes);
			setEdges(flowEdges);

			if (selectedNodeId && !flowNodes.some((node) => node.id === selectedNodeId)) {
				setSelectedNodeId(null);
				setEditorMode(null);
				setForm(EMPTY_FORM);
			}
		} catch (err) {
			console.error('Failed to load major roadmap graph', err);
			alert('Failed to load major roadmap graph.');
		} finally {
			setLoading(false);
		}
	}, [resolveMajor, setEdges, setNodes, selectedNodeId]);

	useEffect(() => {
		loadGraph();
	}, [loadGraph]);

	const getCurrentPrerequisiteIds = useCallback(
		(courseNodeId: number) => {
			return edges
				.filter((edge) => edge.data?.courseNodeId === courseNodeId)
				.map((edge) => edge.data?.prerequisiteNodeId)
				.filter((value): value is number => Number.isFinite(value));
		},
		[edges],
	);

	const openCreatePanel = () => {
		setEditorMode('create');
		setSelectedNodeId(null);
		setForm(EMPTY_FORM);
	};

	const closePanel = () => {
		setEditorMode(null);
		setSelectedNodeId(null);
		setForm(EMPTY_FORM);
	};

	const onNodeClick = useCallback(
		(_event: React.MouseEvent, node: Node<RoadmapNodeData>) => {
			const nodeId = Number(node.id);

			setEditorMode('edit');
			setSelectedNodeId(node.id);
			setForm({
				slug: node.data.slug,
				name: node.data.title,
				credits: String(node.data.credits),
				description: node.data.description || '',
				prerequisiteIds: getCurrentPrerequisiteIds(nodeId),
			});
		},
		[getCurrentPrerequisiteIds],
	);

	const onNodeDragStop = useCallback(
		(_event: React.MouseEvent, node: Node<RoadmapNodeData>) => {
			// No-op: handled by React Flow state
		},
		[],
	);

	const availablePrerequisiteOptions = useMemo(() => {
		const currentId = selectedNodeId ? Number(selectedNodeId) : null;
		return nodes
			.filter((node) => Number(node.id) !== currentId)
			.filter((node) => {
				if (!searchTerm.trim()) return true;
				const haystack = `${node.data.title} ${node.data.slug}`.toLowerCase();
				return haystack.includes(searchTerm.toLowerCase());
			})
			.map((node) => ({ id: Number(node.id), name: node.data.title, slug: node.data.slug }));
	}, [nodes, selectedNodeId, searchTerm]);

	const handleFieldChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = event.target;
		setForm((prev) => {
			if (name === 'name' && editorMode === 'create') {
				const autoSlug = slugify(value);
				const shouldAutoSlug = prev.slug.trim() === '' || prev.slug === slugify(prev.name);
				if (shouldAutoSlug) {
					return { ...prev, name: value, slug: autoSlug };
				}
			}

			return { ...prev, [name]: value };
		});
	};

	const handlePrerequisitesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const nextIds = Array.from(event.target.selectedOptions)
			.map((option) => Number(option.value))
			.filter((id) => Number.isFinite(id));

		setForm((prev) => ({ ...prev, prerequisiteIds: nextIds }));
	};

	const createNode = async () => {
		if (!major) return;

		const credits = Number(form.credits);
		if (!form.slug.trim() || !form.name.trim() || !Number.isFinite(credits) || credits < 0) {
			alert('Please provide valid slug, name, and credits.');
			return;
		}

		setSaving(true);
		try {
			const fallbackX = 120 + (nodes.length % 4) * GRAPH_FALLBACK_X;
			const fallbackY = 120 + Math.floor(nodes.length / 4) * GRAPH_FALLBACK_Y;

			const created = await adminService.createAdminCourseNode(major.id, {
				slug: form.slug.trim(),
				name: form.name.trim(),
				credits,
				description: form.description.trim() || undefined,
				coords: { x: fallbackX, y: fallbackY },
			});

			for (const prerequisiteId of form.prerequisiteIds) {
				if (prerequisiteId === created.id) continue;

				await adminService.createAdminPrerequisite(major.id, {
					course_node_id: created.id,
					prerequisite_node_id: prerequisiteId,
				});
			}

			closePanel();
			await loadGraph();
		} catch (err: any) {
			console.error('Failed to create course node', err);
			alert(err.response?.data?.message || 'Failed to create node.');
		} finally {
			setSaving(false);
		}
	};

	const updateNode = async () => {
		if (!major || !selectedNodeId) return;

		const courseNodeId = Number(selectedNodeId);
		const credits = Number(form.credits);

		if (!form.slug.trim() || !form.name.trim() || !Number.isFinite(credits) || credits < 0) {
			alert('Please provide valid slug, name, and credits.');
			return;
		}

		setSaving(true);
		try {
			await adminService.updateAdminCourseNode(major.id, courseNodeId, {
				slug: form.slug.trim(),
				name: form.name.trim(),
				credits,
				description: form.description.trim() || undefined,
			});

			const currentPrerequisiteIds = getCurrentPrerequisiteIds(courseNodeId);
			const added = form.prerequisiteIds.filter((id) => !currentPrerequisiteIds.includes(id));
			const removed = currentPrerequisiteIds.filter((id) => !form.prerequisiteIds.includes(id));

			for (const prerequisiteId of added) {
				await adminService.createAdminPrerequisite(major.id, {
					course_node_id: courseNodeId,
					prerequisite_node_id: prerequisiteId,
				});
			}

			for (const prerequisiteId of removed) {
				const edgeToDelete = edges.find(
					(edge) =>
						edge.data?.courseNodeId === courseNodeId &&
						edge.data?.prerequisiteNodeId === prerequisiteId,
				);

				if (edgeToDelete?.data?.edgeId) {
					await adminService.deleteAdminPrerequisite(major.id, edgeToDelete.data.edgeId);
				}
			}

			closePanel();
			await loadGraph();
		} catch (err: any) {
			console.error('Failed to update course node', err);
			alert(err.response?.data?.message || 'Failed to update node.');
		} finally {
			setSaving(false);
		}
	};

	const deleteNode = async () => {
		if (!major || !selectedNodeId) return;

		const confirmed = window.confirm('Delete this node and all related prerequisite edges?');
		if (!confirmed) return;

		setSaving(true);
		try {
			await adminService.deleteAdminCourseNode(major.id, Number(selectedNodeId));
			closePanel();
			await loadGraph();
		} catch (err: any) {
			console.error('Failed to delete course node', err);
			alert(err.response?.data?.message || 'Failed to delete node.');
		} finally {
			setSaving(false);
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (editorMode === 'create') {
			await createNode();
			return;
		}
		await updateNode();
	};

	if (loading) {
		return <div style={{ padding: 24 }}>Loading major roadmap...</div>;
	}

	const totalNodes = nodes.length;
	const totalEdges = edges.length;

	// Save Layout handler
	const handleSaveLayout = async () => {
		if (!major) return;
		setSaving(true);
		try {
			// Batch update all node coordinates
			await Promise.all(
				nodes.map((node) =>
					adminService.updateAdminCourseNode(major.id, Number(node.id), {
						coords: { x: node.position.x, y: node.position.y },
					})
				)
			);
			alert('Layout saved!');
		} catch (err) {
			console.error('Failed to save layout', err);
			alert('Failed to save layout.');
		} finally {
			setSaving(false);
		}
	};

	return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc', overflow: 'hidden' }}>
            
            {/* --- HEADER AREA --- */}
            <div className="roadmap-header-container">
                <div className="roadmap-top-row">
                    <Header
                        title={major ? `Major Roadmap: ${major.name}` : 'Major Roadmap Designer'}
                        subtitle="Left-click a node to edit. Drag nodes to reposition and auto-save coordinates."
                    />
                    <div className="roadmap-metrics">
                        Nodes: {totalNodes} <span style={{ color: '#cbd5e1', margin: '0 12px' }}>|</span> Prerequisites: {totalEdges}
                    </div>
                </div>
                
                <div className="roadmap-header-bar">
                    <div className="header-actions-left">
                        <button type="button" className="btn-primary" onClick={openCreatePanel}>
                            + Create Course Node
                        </button>
                        <button
                            type="button"
                            className="btn-save"
                            onClick={handleSaveLayout}
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : 'Save Layout'}
                        </button>
                    </div>
                    
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => navigate('/admin/roadmaps')}
                    >
                        ← Back to List
                    </button>
                </div>
            </div>

            {/* --- GRAPH CANVAS --- */}
            <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onNodeClick={onNodeClick}
                        onNodeDragStop={onNodeDragStop}
                        onPaneClick={closePanel}
                        fitView
                    >
                        <Background gap={20} color="#cbd5e1" />
                        <Controls />
                        <MiniMap />
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
                            No course nodes yet. Click + Create Course Node to start.
                        </div>
                    )}
                </div>
            </div>

            {/* --- NEW: Backdrop Overlay (Click to close) --- */}
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
                    transition: 'opacity 0.3s ease, visibility 0.3s ease'
                }}
            />

            {/* --- NEW: Slide-Over Side Panel --- */}
            <aside
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: 380,
                    background: '#ffffff',
                    padding: '24px 20px',
                    overflowY: 'auto',
                    boxShadow: '-8px 0 30px rgba(15, 23, 42, 0.15)',
                    zIndex: 100, // Very high z-index to cover the header
                    transform: editorMode ? 'translateX(0)' : 'translateX(100%)', // Slides it in and out
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth physical animation
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f172a' }}>
                        {editorMode === 'create' ? 'Create Node' : 'Edit Node'}
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
                            borderRadius: '6px',
                            fontWeight: 600
                        }}
                    >
                        Close
                    </button>
                </div>
                
                <p style={{ marginBottom: 20, fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
                    Provide details for this course. Ensure the slug is unique and the credits match university requirements.
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
                        <label htmlFor="name" style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
                            Course Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleFieldChange}
                            required
                            style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8 }}
                        />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label htmlFor="credits" style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
                            Credits
                        </label>
                        <input
                            id="credits"
                            name="credits"
                            type="number"
                            min={0}
                            value={form.credits}
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
                            rows={4}
                            style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, resize: 'vertical' }}
                        />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <label
                            htmlFor="prerequisites"
                            style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}
                        >
                            Prerequisites
                        </label>
                        <input
                            type="text"
                            placeholder="Search prerequisite by name..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            style={{
                                width: '100%',
                                marginBottom: 8,
                                padding: '10px 12px',
                                border: '1px solid #cbd5e1',
                                borderRadius: 8,
                            }}
                        />
                        <select
                            id="prerequisites"
                            multiple
                            value={form.prerequisiteIds.map(String)}
                            onChange={handlePrerequisitesChange}
                            style={{ width: '100%', minHeight: 140, padding: 8, border: '1px solid #cbd5e1', borderRadius: 8 }}
                        >
                            {availablePrerequisiteOptions.map((option) => (
                                <option key={option.id} value={option.id} style={{ padding: '6px', cursor: 'pointer' }}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                        <div style={{ marginTop: 6, fontSize: 11, color: '#64748b' }}>
                            Use Ctrl/Cmd + click to select multiple prerequisites.
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px 0' }} disabled={saving}>
                        {saving ? 'Saving...' : editorMode === 'create' ? 'Create Node' : 'Save Changes'}
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
                            borderRadius: '8px',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                        onClick={deleteNode}
                        disabled={saving}
                    >
                        Delete Node
                    </button>
                )}
            </aside>
        </div>
	);
}
