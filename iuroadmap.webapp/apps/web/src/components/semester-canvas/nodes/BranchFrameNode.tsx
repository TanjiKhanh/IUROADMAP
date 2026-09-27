import { memo } from 'react';
import type { NodeProps } from 'reactflow';

export interface BranchFrameNodeData {
  label: string;
  width: number;
  height: number;
  /** true = the branch applies to the learner, false = it does not, null/undefined = unknown */
  active?: boolean | null;
}

/** Dashed frame around the courses of one conditional branch, e.g. "GPA ≥ 70" (FR-RDM.07.4). */
function BranchFrameNodeInner({ data }: NodeProps<BranchFrameNodeData>) {
  const color = data.active === true ? '#16a34a' : data.active === false ? '#94a3b8' : '#b45309';
  return (
    <div
      style={{
        width: data.width,
        height: data.height,
        border: `2px dashed ${color}`,
        borderRadius: 10,
        position: 'relative',
        pointerEvents: 'none',
        background: data.active === true ? 'rgba(22, 163, 74, 0.05)' : 'transparent',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: -10,
          left: 8,
          padding: '0 6px',
          fontSize: 10,
          fontWeight: 700,
          lineHeight: '16px',
          color,
          background: '#fff',
          border: `1px solid ${color}`,
          borderRadius: 8,
          whiteSpace: 'nowrap',
        }}
      >
        {data.label}
      </span>
    </div>
  );
}

export const BranchFrameNode = memo(BranchFrameNodeInner);
