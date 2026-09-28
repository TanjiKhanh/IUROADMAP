import { memo } from 'react';
import { Handle, Position, type NodeProps } from 'reactflow';
import { CourseNodeCard } from '../CourseNodeCard';
import type { CanvasNodeView } from '../types';

export interface CourseNodeData {
  view: CanvasNodeView;
  connectable: boolean;
  ghost?: boolean;
}

const handleStyle = { width: 8, height: 8, background: '#64748b', border: '1px solid #fff' };

/** React Flow node for a course or an elective slot. Edges go A (right side) → B (left side). */
function CourseNodeInner({ data, selected }: NodeProps<CourseNodeData>) {
  const { view, connectable, ghost } = data;
  return (
    <>
      <Handle type="target" position={Position.Left} isConnectable={connectable} style={{ ...handleStyle, opacity: connectable ? 1 : 0 }} />
      <CourseNodeCard
        code={view.code}
        name={view.name}
        theoryCredits={view.theoryCredits}
        labCredits={view.labCredits}
        fillColor={view.fillColor}
        borderColor={view.borderColor}
        slot={view.kind === 'ELECTIVE_SLOT' ? { label: view.slotLabel ?? '', filled: Boolean(view.slotFilled) } : undefined}
        state={view.state}
        letter={view.letter}
        isCustom={view.isCustom}
        isModified={view.isModified}
        hasIssue={view.hasIssue}
        hasHint={view.hasHint}
        noCredit={view.noCredit}
        selected={selected}
        ghost={ghost}
        dimmed={view.branch?.active === false}
      />
      <Handle type="source" position={Position.Right} isConnectable={connectable} style={{ ...handleStyle, opacity: connectable ? 1 : 0 }} />
    </>
  );
}

export const CourseNode = memo(CourseNodeInner);
