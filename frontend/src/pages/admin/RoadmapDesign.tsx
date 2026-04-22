import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, { 
  addEdge, 
  Background, 
  Controls, 
  Connection, 
  Edge, 
  Node, 
  useNodesState, 
  useEdgesState,
  MiniMap,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useParams, useNavigate } from 'react-router-dom';
import { adminService } from '../../services/admin.service';
import Header from '../../components/layouts/Header';
import NodeEditorDrawer from '../../components/roadmap/NodeEditorDrawer'; // 👈 Import the Drawer

export default function RoadmapDesigner() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  const [roadmapTitle, setRoadmapTitle] = useState('');
  const [roadmapId, setRoadmapId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // 🟢 Drawer State
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // =========================================================
  // 1. FETCH & TRANSFORM
  // =========================================================
  useEffect(() => {
    const loadRoadmap = async () => {
      if (!slug) return;
      try {
        const data = await adminService.getRoadmapBySlug(slug);
        setRoadmapTitle(data.title);
        setRoadmapId(data.id!);

        // Transform Nodes (Include hidden metadata for the drawer)
        const flowNodes: Node[] = (data.nodes || []).map((dbNode: any) => ({
          id: dbNode.nodeKey, 
          position: dbNode.coords || { x: 0, y: 0 },
          type: 'default', // Using Standard Nodes per your request
          data: { 
            label: dbNode.title,      // Displayed on canvas
            title: dbNode.title,      // Stored for drawer
            summary: dbNode.summary,  // Stored for drawer
            contentMd: dbNode.contentMd // Stored for drawer
          } 
        }));

        const flowEdges: Edge[] = (data.edges || []).map((dbEdge: any) => ({
          id: `e-${dbEdge.sourceKey}-${dbEdge.targetKey}`,
          source: dbEdge.sourceKey,
          target: dbEdge.targetKey,
          type: 'smoothstep', 
          markerEnd: { type: MarkerType.ArrowClosed }, 
        }));

        if (flowNodes.length === 0) {
          setNodes([{ id: 'start', position: { x: 250, y: 50 }, data: { label: 'Start Topic', title: 'Start Topic' } }]);
        } else {
          setNodes(flowNodes);
          setEdges(flowEdges);
        }

      } catch (err) {
        console.error("Failed to load roadmap", err);
      }
    };
    loadRoadmap();
  }, [slug, setNodes, setEdges]);

  // =========================================================
  // 2. HANDLERS
  // =========================================================
  
  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({ ...params, type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } }, eds));
  }, [setEdges]);

  // 🟢 Double Click -> Open Drawer
  const onNodeDoubleClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setIsDrawerOpen(true);
  };

  // 🟢 Handle Save FROM Drawer
  const onNodeDrawerSave = (nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            data: {
              ...n.data,
              label: newData.title,       // Update visual label
              title: newData.title,       // Update data title
              summary: newData.summary,
              contentMd: newData.contentMd
            }
          };
        }
        return n;
      })
    );
  };

  const addNode = () => {
    const id = `node-${Math.floor(Math.random() * 10000)}`;
    const newNode: Node = {
      id,
      position: { x: Math.random() * 400 + 50, y: Math.random() * 400 + 50 },
      data: { label: 'New Topic', title: 'New Topic', status: 'AVAILABLE' }, 
    };
    setNodes((nds) => nds.concat(newNode));
  };

  // =========================================================
  // 3. SAVE TO DB
  // =========================================================
  const handleSave = async () => {
    if (!roadmapId) return;
    setSaving(true);
    try {
      // Map ReactFlow nodes back to DB format
      const nodesToSave = nodes.map((n) => ({
        nodeKey: n.id,
        title: n.data.title || n.data.label, // Fallback to label
        coords: n.position,
        isRequired: true,
        // 🟢 Save the extra metadata
        summary: n.data.summary,
        contentMd: n.data.contentMd,
      }));
      

      const edgesToSave = edges.map((e) => ({
        sourceKey: e.source,
        targetKey: e.target
      }));

      await adminService.updateRoadmap(roadmapId, {
        nodes: nodesToSave,
        edges: edgesToSave
      } as any);

      alert('✅ Roadmap layout saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save roadmap');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '0 20px', background: 'white', borderBottom: '1px solid #eee' }}>
        <Header 
          title={`Designing: ${roadmapTitle}`} 
          subtitle="Double-click a node to edit details (Summary, Content)."
        />
        <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
          <button onClick={addNode} className="btn-primary" style={{ width: 'auto', padding: '8px 16px' }}>
            + Add Topic Node
          </button>
          <button onClick={handleSave} className="btn-primary" style={{ width: 'auto', padding: '8px 16px', background: '#10b981' }}>
            {saving ? 'Saving...' : '💾 Save Layout'}
          </button>
          <button onClick={() => navigate('/admin/roadmaps')} style={{ padding: '8px 16px', border: '1px solid #ddd', background: 'white', borderRadius: '6px', cursor: 'pointer' }}>
            Back to List
          </button>
        </div>
      </div>

      <div style={{ flex: 1, background: '#f8f9fa' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick} // 👈 Triggers Drawer
          fitView
        >
          <Background color="#ccc" gap={20} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      {/* 🟢 Render the Editor Drawer */}
      <NodeEditorDrawer 
        isOpen={isDrawerOpen}
        node={selectedNode}
        onClose={() => setIsDrawerOpen(false)}
        onSave={onNodeDrawerSave}
      />
    </div>
  );
}