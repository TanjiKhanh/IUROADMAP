import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
		async (_event: React.MouseEvent, node: Node<RoadmapNodeData>) => {
			if (!major) return;

			const courseNodeId = Number(node.id);
			if (!Number.isFinite(courseNodeId)) return;

			try {
				await adminService.updateAdminCourseNode(major.id, courseNodeId, {
					coords: { x: node.position.x, y: node.position.y },
				});
			} catch (err) {
				console.error('Failed to persist node coordinates', err);
				alert('Failed to save node position.');
			}
		},
		[major],
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

	return (
		<div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
			<div style={{ padding: '0 20px', borderBottom: '1px solid #e2e8f0', background: '#ffffff' }}>
				<Header
					title={major ? `Major Roadmap: ${major.name}` : 'Major Roadmap Designer'}
					subtitle="Left-click a node to edit. Drag nodes to reposition and auto-save coordinates."
				/>

				<div style={{ marginBottom: 12, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
					<button
						type="button"
						className="btn-secondary"
						onClick={() => navigate('/admin/roadmaps')}
					>
						Back to Majors
					</button>
					<button type="button" className="btn-primary" onClick={openCreatePanel}>
						+ Create Course Node
					</button>
					<div
						style={{
							display: 'flex',
							gap: 8,
							marginLeft: 'auto',
							fontSize: 12,
							color: '#334155',
						}}
					>
						<span style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: 999 }}>
							Nodes: {totalNodes}
						</span>
						<span style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: 999 }}>
							Prerequisites: {totalEdges}
						</span>
					</div>
				</div>
			</div>

			<div style={{ display: 'flex', flex: 1 }}>
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

				{editorMode && (
					<aside
						style={{
							width: 360,
							borderLeft: '1px solid #e2e8f0',
							background: '#ffffff',
							padding: 16,
							overflowY: 'auto',
						}}
					>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
							<h3 style={{ margin: 0 }}>{editorMode === 'create' ? 'Create Node' : 'Edit Node'}</h3>
							<button
								type="button"
								onClick={closePanel}
								style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16 }}
							>
								Close
							</button>
						</div>
						<p style={{ marginTop: 8, marginBottom: 14, fontSize: 12, color: '#64748b' }}>
							Select prerequisite courses by name from the list below.
						</p>

						<form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
							<div style={{ marginBottom: 12 }}>
								<label htmlFor="slug" style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
									Slug
								</label>
								<input
									id="slug"
									name="slug"
									value={form.slug}
									onChange={handleFieldChange}
									required
									style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 6 }}
								/>
							</div>

							<div style={{ marginBottom: 12 }}>
								<label htmlFor="name" style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
									Name
								</label>
								<input
									id="name"
									name="name"
									value={form.name}
									onChange={handleFieldChange}
									required
									style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 6 }}
								/>
							</div>

							<div style={{ marginBottom: 12 }}>
								<label htmlFor="credits" style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
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
									style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 6 }}
								/>
							</div>

							<div style={{ marginBottom: 12 }}>
								<label htmlFor="description" style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
									Description
								</label>
								<textarea
									id="description"
									name="description"
									value={form.description}
									onChange={handleFieldChange}
									rows={4}
									style={{ width: '100%', padding: 10, border: '1px solid #cbd5e1', borderRadius: 6 }}
								/>
							</div>

							<div style={{ marginBottom: 16 }}>
								<label
									htmlFor="prerequisites"
									style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}
								>
									Prerequisites (select by course name)
								</label>
								<input
									type="text"
									placeholder="Search prerequisite by name or slug"
									value={searchTerm}
									onChange={(event) => setSearchTerm(event.target.value)}
									style={{
										width: '100%',
										marginBottom: 8,
										padding: 8,
										border: '1px solid #cbd5e1',
										borderRadius: 6,
									}}
								/>
								<select
									id="prerequisites"
									multiple
									value={form.prerequisiteIds.map(String)}
									onChange={handlePrerequisitesChange}
									style={{ width: '100%', minHeight: 120, padding: 8, border: '1px solid #cbd5e1', borderRadius: 6 }}
								>
									{availablePrerequisiteOptions.map((option) => (
										<option key={option.id} value={option.id}>
											{option.name} ({option.slug})
										</option>
									))}
								</select>
								<div style={{ marginTop: 6, fontSize: 11, color: '#64748b' }}>
									Use Ctrl/Cmd + click to select multiple prerequisites.
								</div>
							</div>

							<button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={saving}>
								{saving ? 'Saving...' : editorMode === 'create' ? 'Create Node' : 'Save Node'}
							</button>
						</form>

						{editorMode === 'edit' && (
							<button
								type="button"
								className="btn-danger-sm"
								style={{ marginTop: 10, width: '100%' }}
								onClick={deleteNode}
								disabled={saving}
							>
								Delete Node
							</button>
						)}
					</aside>
				)}
			</div>
		</div>
	);
}
