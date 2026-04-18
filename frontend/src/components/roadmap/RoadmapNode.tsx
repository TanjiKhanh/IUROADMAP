import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { CheckCircle2, LoaderCircle } from 'lucide-react';

export interface RoadmapNodeData {
  title: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'AVAILABLE' ;
  slug?: string;
  credits?: number;
  summary?: string;
}

const RoadmapNode = ({ data, selected }: NodeProps<RoadmapNodeData>) => {
  const buildMeta = () => {
    if (data.summary) return data.summary;
    if (data.slug && typeof data.credits === 'number') {
      return `${data.slug} • ${data.credits} Credits`;
    }
    return 'No code information';
  };

  const getStatusConfig = (status: RoadmapNodeData['status']) => {
    switch (status) {
      case 'COMPLETED':
        return {
          styleClass: 'node-completed',
          icon: <CheckCircle2 size={14} />,
          badgeText: 'COMPLETED',
          handleColor: '#16a34a',
        };
      case 'IN_PROGRESS':
        return {
          styleClass: 'node-in-progress',
          icon: <LoaderCircle size={14} className="node-status-icon-spin" />,
          badgeText: 'IN-PROCESS',
          handleColor: '#f59e0b',
        };
      
      default: 
        return {
          styleClass: 'node-available',
          badgeText: 'AVAILABLE',
          handleColor: '#3c86df',
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
  <p className="node-meta">{buildMeta()}</p>

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