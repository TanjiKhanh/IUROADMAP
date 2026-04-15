import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export interface RoadmapNodeData {
  title: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'AVAILABLE' ;
  summary?: string;
}

const RoadmapNode = ({ data, selected }: NodeProps<RoadmapNodeData>) => {
  const getStatusConfig = (status: RoadmapNodeData['status']) => {
    switch (status) {
      case 'COMPLETED':
        return {
          styleClass: 'node-completed',
          icon: '✓',
          badgeText: 'COMPLETED',
          handleColor: '#16a34a',
        };
      case 'IN_PROGRESS':
        return {
          styleClass: 'node-in-progress',
          icon: '◔',
          badgeText: 'IN PROGRESS',
          handleColor: '#f59e0b',
        };
      
      default: 
        return {
          styleClass: 'node-available',
          icon: '•',
          badgeText: 'AVAILABLE',
          handleColor: '#3b82f6',
        };
    }
  };

  const config = getStatusConfig(data.status || 'AVAILABLE');

  return (
    <div className={`roadmap-node-card ${config.styleClass} ${selected ? 'selected' : ''}`}>
      <Handle 
        type="target" 
        position={Position.Left} 
        className="node-handle"
        style={{ borderColor: config.handleColor, background: '#ffffff' }}
      />

      <div className="node-status-row">
        <span className="node-status-label">{config.badgeText}</span>
        <span className="node-status-icon" aria-hidden="true">{config.icon}</span>
      </div>

      <h3 className="node-title">{data.title}</h3>
      <p className="node-meta">{data.summary || 'No code information'}</p>

      <Handle 
        type="source" 
        position={Position.Right} 
        className="node-handle"
        style={{ borderColor: config.handleColor, background: '#ffffff' }}
      />
    </div>
  );
};

export default memo(RoadmapNode);