import React, { useState, useEffect } from 'react';

interface NodeData {
  title: string;
  status: string;
  summary?: string;
  contentMd?: string; 
}

interface NodeEditorDrawerProps {
  isOpen: boolean;
  node: any | null; 
  onClose: () => void;
  onSave: (nodeId: string, data: NodeData) => void;
}

export default function NodeEditorDrawer({ isOpen, node, onClose, onSave }: NodeEditorDrawerProps) {
  const [formData, setFormData] = useState<NodeData>({
    title: '',
    status: 'AVAILABLE',
    summary: '',
    contentMd: ''
  });

  // Load node data into form when node changes
  useEffect(() => {
    if (node) {
      setFormData({
        title: node.data.label || '', // ReactFlow default nodes use 'label', custom use 'title'
        status: node.data.status || 'AVAILABLE',
        summary: node.data.summary || '',
        contentMd: node.data.contentMd || ''
      });
    }
  }, [node]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (node) {
      onSave(node.id, formData);
      onClose();
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? 0 : '-450px', // Slide in/out
        width: '400px',
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
        transition: 'right 0.3s ease-in-out',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid #e2e8f0'
      }}
    >
      {/* Header */}
      <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
        <h3 style={{ margin: 0 }}>Edit Node Details</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#64748b' }}>✕</button>
      </div>

      {/* Form Content */}
      <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
        
        {/* Title */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Node Title</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
        </div>

        {/* Status */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Default Status</label>
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white' }}
          >
            <option value="LOCKED">Locked</option>
            <option value="AVAILABLE">Available</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Verified / Completed</option>
            <option value="SKIPPED">Skipped</option>
          </select>
        </div>

        {/* Summary (Short description on card) */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Summary (Card View)</label>
          <textarea 
            name="summary" 
            rows={3}
            value={formData.summary} 
            onChange={handleChange}
            placeholder="Short description shown on the card..."
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontFamily: 'inherit' }}
          />
        </div>

        {/* Full Content (Markdown for Drawer) */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>Detailed Content (Markdown)</label>
          <textarea 
            name="contentMd" 
            rows={12}
            value={formData.contentMd} 
            onChange={handleChange}
            placeholder="# Learning Resources\n\n- [Link 1](https://example.com)\n- Resource 2"
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontFamily: 'monospace' }}
          />
        </div>

      </div>

      {/* Footer Actions */}
      <div style={{ padding: '20px', borderTop: '1px solid #e2e8f0', background: 'white' }}>
        <button 
          onClick={handleSave} 
          style={{ width: '100%', padding: '12px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}