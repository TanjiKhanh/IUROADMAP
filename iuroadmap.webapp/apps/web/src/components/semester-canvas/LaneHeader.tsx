import type { ReactNode } from 'react';
import { RoadmapCanvas } from '@iuroadmap/core';
import { UiTooltip } from '../../uikit';
import type { CanvasTermView } from './types';

/** "(16+3)": concrete courses + elective slots; "(16)" without slots; nothing for the pool (design §4.3). */
export function formatTermCredits(term: Pick<CanvasTermView, 'kind' | 'courseCredits' | 'slotCredits'>): string {
  if (term.kind === 'ELECTIVE_POOL') return '';
  return term.slotCredits > 0 ? `(${term.courseCredits}+${term.slotCredits})` : `(${term.courseCredits})`;
}

export interface LaneHeaderProps {
  term: CanvasTermView;
  /** Learner: open the term results (FL-LRN-06) */
  onClick?: (termKey: string) => void;
  actions?: ReactNode;
}

export function LaneHeader({ term, onClick, actions }: LaneHeaderProps) {
  const credits = formatTermCredits(term);
  const clickable = Boolean(onClick) && term.kind !== 'ELECTIVE_POOL';

  const content = (
    <div
      className="nodrag nopan"
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      data-testid={`lane-header-${term.key}`}
      onClick={clickable ? () => onClick!(term.key) : undefined}
      onKeyDown={clickable ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick!(term.key) : undefined}
      style={{
        height: RoadmapCanvas.HEADER_HEIGHT,
        boxSizing: 'border-box',
        padding: '6px 8px',
        borderBottom: '1px solid #e2e8f0',
        cursor: clickable ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a', lineHeight: '18px' }}>
        {term.title} {credits ? <span style={{ fontWeight: 500, color: '#475569' }}>{credits}</span> : null}
      </div>
      {term.subtitle ? <div style={{ fontSize: 11, color: '#64748b', lineHeight: '15px' }}>{term.subtitle}</div> : null}
      {term.footnote ? <div style={{ fontSize: 11, color: '#1d4ed8', lineHeight: '15px', fontWeight: 600 }}>{term.footnote}</div> : null}
      {actions ? (
        // The menu (and its popover, a React portal) must not trigger the header click.
        <div style={{ position: 'absolute', top: 2, right: 2 }} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
          {actions}
        </div>
      ) : null}
    </div>
  );

  return term.tooltip ? <UiTooltip title={term.tooltip}>{content}</UiTooltip> : content;
}
