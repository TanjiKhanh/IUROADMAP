import React from 'react';
import { MicroTopicNode } from '../../services/roadmap.service';

interface MicroRoadmapNodeCardProps {
  topic: MicroTopicNode;
  index: number;
}

export default function MicroRoadmapNodeCard({ topic, index }: MicroRoadmapNodeCardProps) {
  const objectiveCount = topic.learning_objectives
    ? topic.learning_objectives.split(/\r?\n/).filter((line) => line.trim().length > 0).length
    : 0;

  const resourceCount = topic.resources_url ? 1 : 0;

  return (
    <div className="micro-node-card" role="button" tabIndex={0}>
      <span className="micro-node-chip">MODULE {index + 1}</span>
      <h4>{topic.title}</h4>
      <p>{topic.description || 'Click to view learning objectives and resources.'}</p>
      <div className="micro-node-meta">
        <span>{objectiveCount} Objectives</span>
        <span>Resources: {resourceCount}</span>
      </div>
    </div>
  );
}
