import type { CSSProperties, ReactNode } from 'react';
import { RoadmapCanvas } from '@iuroadmap/core';
import type { CanvasNodeState } from './types';

export interface CourseNodeCardProps {
  code: string;
  name: string;
  theoryCredits: number;
  labCredits: number;
  fillColor: string;
  borderColor: string;
  /** Elective slot: bold border when filled, dashed while empty */
  slot?: { label: string; filled: boolean };
  state?: CanvasNodeState;
  letter?: string;
  isCustom?: boolean;
  isModified?: boolean;
  hasIssue?: boolean;
  hasHint?: boolean;
  noCredit?: boolean;
  selected?: boolean;
  /** Ghost shown where a dragged course will land */
  ghost?: boolean;
  /** Branch that does not apply to the learner */
  dimmed?: boolean;
  width?: number;
  style?: CSSProperties;
  title?: string;
}

const STATE_BADGE: Record<CanvasNodeState, { bg: string; fg: string } | undefined> = {
  PLANNED: undefined,
  IN_PROGRESS: { bg: '#dbeafe', fg: '#1d4ed8' },
  PASSED: { bg: '#dcfce7', fg: '#15803d' },
  FAILED: { bg: '#fee2e2', fg: '#b91c1c' },
};

function Badge({ children, bg, fg, style }: { children: ReactNode; bg: string; fg: string; style?: CSSProperties }) {
  return (
    <span
      style={{
        position: 'absolute',
        top: -8,
        fontSize: 10,
        lineHeight: '14px',
        padding: '0 5px',
        borderRadius: 7,
        background: bg,
        color: fg,
        fontWeight: 700,
        border: `1px solid ${fg}33`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/**
 * One course on the semester canvas: "IT089 (3,1)" on the category colors (design §1, D12).
 * Also used by the catalog sidebar and the category form preview.
 */
export function CourseNodeCard({
  code,
  name,
  theoryCredits,
  labCredits,
  fillColor,
  borderColor,
  slot,
  state,
  letter,
  isCustom,
  isModified,
  hasIssue,
  hasHint,
  noCredit,
  selected,
  ghost,
  dimmed,
  width = RoadmapCanvas.NODE_WIDTH,
  style,
  title,
}: CourseNodeCardProps) {
  const stateBadge = state ? STATE_BADGE[state] : undefined;
  const isEmptySlot = slot && !slot.filled;
  const outline = hasIssue ? '0 0 0 3px rgba(220, 38, 38, 0.45)' : selected ? '0 0 0 3px rgba(37, 99, 235, 0.45)' : undefined;

  return (
    <div
      title={title ?? `${code} — ${name}`}
      style={{
        position: 'relative',
        width,
        height: RoadmapCanvas.NODE_HEIGHT,
        boxSizing: 'border-box',
        background: ghost ? 'rgba(148, 163, 184, 0.15)' : isEmptySlot ? '#ffffff' : fillColor,
        border: `${slot?.filled ? 3 : 2}px ${isEmptySlot || ghost ? 'dashed' : 'solid'} ${ghost ? '#94a3b8' : borderColor}`,
        borderRadius: 6,
        boxShadow: outline,
        padding: '4px 8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: dimmed ? 0.45 : 1,
        ...style,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 12, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {isEmptySlot ? slot!.label : code}{' '}
        <span style={{ fontWeight: 500, color: '#334155' }}>
          ({theoryCredits},{labCredits})
        </span>
      </div>
      <div style={{ fontSize: 11, color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {isEmptySlot ? '…' : slot?.filled ? `${slot.label} · ${name}` : name}
      </div>

      {stateBadge && letter ? (
        <Badge bg={stateBadge.bg} fg={stateBadge.fg} style={{ right: 6 }}>
          {letter}
        </Badge>
      ) : stateBadge ? (
        <Badge bg={stateBadge.bg} fg={stateBadge.fg} style={{ right: 6 }}>
          {state === 'IN_PROGRESS' ? '…' : state === 'PASSED' ? '✓' : '✗'}
        </Badge>
      ) : null}
      {isCustom ? (
        <Badge bg="#f3e8ff" fg="#7e22ce" style={{ left: 6 }}>
          +
        </Badge>
      ) : isModified ? (
        <Badge bg="#fef3c7" fg="#b45309" style={{ left: 6 }}>
          ✎
        </Badge>
      ) : null}
      {hasHint ? (
        <Badge bg="#fff7ed" fg="#c2410c" style={{ left: isCustom || isModified ? 24 : 6 }}>
          ⚠
        </Badge>
      ) : null}
      {noCredit ? (
        <span style={{ position: 'absolute', bottom: 2, right: 6, fontSize: 9, color: '#64748b' }}>0 TC</span>
      ) : null}
    </div>
  );
}
