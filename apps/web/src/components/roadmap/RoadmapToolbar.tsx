import React from 'react';
import { Hand, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

interface RoadmapToolbarProps {
  isPanMode: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onTogglePanMode: () => void;
  className?: string;
}

export default function RoadmapToolbar({
  isPanMode,
  onZoomIn,
  onZoomOut,
  onResetView,
  onTogglePanMode,
  className,
}: RoadmapToolbarProps) {
  const toolbarClassName = ['roadmap-toolbar', 'micro-toolbar', className].filter(Boolean).join(' ');

  return (
    <div className={toolbarClassName} role="toolbar" aria-label="Roadmap tools">
      <button type="button" onClick={onZoomIn} aria-label="Zoom in">
        <ZoomIn size={16} />
      </button>
      <button type="button" onClick={onZoomOut} aria-label="Zoom out">
        <ZoomOut size={16} />
      </button>
      <button type="button" onClick={onResetView} aria-label="Reset view">
        <RefreshCw size={16} />
      </button>
      <button
        type="button"
        onClick={onTogglePanMode}
        className={isPanMode ? 'active' : ''}
        aria-label="Toggle hand move mode"
      >
        <Hand size={16} />
      </button>
    </div>
  );
}
