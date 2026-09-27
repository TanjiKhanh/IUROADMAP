import { memo } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from 'reactflow';
import type { CanvasRelationType } from '../types';

export interface RelationEdgeData {
  type: CanvasRelationType;
  isCustom?: boolean;
  hasIssue?: boolean;
  coreqLabel: string;
}

export const RELATION_COLORS = {
  base: '#475569',
  custom: '#7c3aed',
  issue: '#dc2626',
  selected: '#2563eb',
};

/**
 * The three relation styles of the curriculum legend (design §4.4):
 * PREREQUISITE solid + arrow, PREVIOUS dashed + arrow, COREQUISITE solid without arrow + "co-req".
 */
function RelationEdgeInner({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, markerEnd, selected }: EdgeProps<RelationEdgeData>) {
  const [path, labelX, labelY] = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const color = selected
    ? RELATION_COLORS.selected
    : data?.hasIssue
      ? RELATION_COLORS.issue
      : data?.isCustom
        ? RELATION_COLORS.custom
        : RELATION_COLORS.base;

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={data?.type === 'COREQUISITE' ? undefined : markerEnd}
        interactionWidth={16}
        style={{
          stroke: color,
          strokeWidth: selected || data?.hasIssue ? 2.5 : 1.6,
          strokeDasharray: data?.type === 'PREVIOUS' ? '6 4' : undefined,
        }}
      />
      {data?.type === 'COREQUISITE' ? (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              fontSize: 10,
              fontWeight: 600,
              padding: '0 4px',
              borderRadius: 4,
              background: '#fff',
              color,
              border: `1px solid ${color}`,
              pointerEvents: 'none',
            }}
          >
            {data.coreqLabel}
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
}

export const RelationEdge = memo(RelationEdgeInner);
