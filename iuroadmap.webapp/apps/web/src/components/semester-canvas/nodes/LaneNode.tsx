import { memo } from 'react';
import type { NodeProps } from 'reactflow';
import { RoadmapCanvas } from '@iuroadmap/core';
import { LaneHeader } from '../LaneHeader';
import type { CanvasTermView } from '../types';

export interface LaneNodeData {
  term: CanvasTermView;
  height: number;
  /** Drop target highlight while a node is dragged over the column */
  active: boolean;
  onHeaderClick?: (termKey: string) => void;
  headerActions?: (term: CanvasTermView) => React.ReactNode;
}

const LANE_BG: Record<CanvasTermView['kind'], string> = {
  REGULAR: 'rgba(241, 245, 249, 0.75)',
  SUMMER: 'rgba(254, 249, 195, 0.55)',
  ELECTIVE_POOL: 'rgba(237, 233, 254, 0.55)',
};

/** Column background (React Flow has no background layer, design §4.2): not draggable, zIndex −1. */
function LaneNodeInner({ data }: NodeProps<LaneNodeData>) {
  const { term, height, active, onHeaderClick, headerActions } = data;
  return (
    <div
      style={{
        width: RoadmapCanvas.LANE_WIDTH - RoadmapCanvas.LANE_GAP,
        marginLeft: RoadmapCanvas.LANE_GAP / 2,
        height,
        boxSizing: 'border-box',
        borderRadius: 8,
        background: active ? 'rgba(191, 219, 254, 0.6)' : LANE_BG[term.kind],
        border: `1px ${term.isCustom ? 'dashed' : 'solid'} ${active ? '#60a5fa' : '#e2e8f0'}`,
        transition: 'background 120ms ease',
      }}
    >
      <LaneHeader term={term} onClick={onHeaderClick} actions={headerActions?.(term)} />
    </div>
  );
}

export const LaneNode = memo(LaneNodeInner);
