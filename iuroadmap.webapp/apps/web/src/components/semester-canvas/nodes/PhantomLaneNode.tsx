import { memo } from 'react';
import type { NodeProps } from 'reactflow';
import { RoadmapCanvas } from '@iuroadmap/core';

export interface PhantomLaneNodeData {
  label: string;
  height: number;
}

export const PHANTOM_WIDTH = 64;

/** Faint "＋ New term" column shown while a node hovers the gap between two columns. */
function PhantomLaneNodeInner({ data }: NodeProps<PhantomLaneNodeData>) {
  return (
    <div
      style={{
        width: PHANTOM_WIDTH,
        height: data.height,
        borderRadius: 8,
        border: '2px dashed #3b82f6',
        background: 'rgba(59, 130, 246, 0.12)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: RoadmapCanvas.HEADER_HEIGHT / 3,
        color: '#1d4ed8',
        fontWeight: 700,
        fontSize: 12,
        textAlign: 'center',
        pointerEvents: 'none',
      }}
    >
      {data.label}
    </div>
  );
}

export const PhantomLaneNode = memo(PhantomLaneNodeInner);
