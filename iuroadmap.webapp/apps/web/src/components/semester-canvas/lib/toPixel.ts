import { RoadmapCanvas } from '@iuroadmap/core';
import type { CanvasHit, CanvasTermView } from '../types';

const { LANE_WIDTH, NODE_WIDTH, NODE_HEIGHT, ROW_HEIGHT, HEADER_HEIGHT, CANVAS_PADDING, GAP_HIT_WIDTH } = RoadmapCanvas;

/** Space between the header and the first row. */
const TOP_GAP = 12;

/** Left edge of a column. */
export function laneX(laneIndex: number): number {
  return CANVAS_PADDING + laneIndex * LANE_WIDTH;
}

/** Nodes are always centred in their column (R2). */
export function nodeX(laneIndex: number): number {
  return laneX(laneIndex) + (LANE_WIDTH - NODE_WIDTH) / 2;
}

export function rowY(visualRow: number): number {
  return HEADER_HEIGHT + TOP_GAP + visualRow * ROW_HEIGHT;
}

export function laneHeight(rowCount: number): number {
  return HEADER_HEIGHT + TOP_GAP + rowCount * ROW_HEIGHT;
}

/** Row under a vertical position (y of the node centre or of the pointer). */
export function slotAt(y: number): number {
  return Math.max(0, Math.round((y - HEADER_HEIGHT - TOP_GAP - NODE_HEIGHT / 2) / ROW_HEIGHT));
}

/**
 * Resolves what is under a point of the flow: a column (with the row) or, when `allowGap`,
 * the border between two columns, which creates a new term on drop (design §4.2).
 */
export function hitTest(x: number, y: number, terms: ReadonlyArray<CanvasTermView>, allowGap: boolean): CanvasHit | null {
  if (!terms.length) return null;
  const rel = x - CANVAS_PADDING;
  const half = GAP_HIT_WIDTH / 2;

  if (allowGap) {
    // border k sits between column k-1 and column k (k = 0 … terms.length)
    const border = Math.round(rel / LANE_WIDTH);
    if (border >= 0 && border <= terms.length && Math.abs(rel - border * LANE_WIDTH) <= half) {
      // new terms never go after the elective pool
      const afterIndex = border - 1;
      const after = afterIndex >= 0 ? terms[afterIndex] : null;
      if (!(after && after.kind === 'ELECTIVE_POOL')) {
        return { kind: 'gap', afterTermKey: after ? after.key : null, x: laneX(border) };
      }
    }
  }

  const laneIndex = Math.min(terms.length - 1, Math.max(0, Math.floor(rel / LANE_WIDTH)));
  return { kind: 'lane', termKey: terms[laneIndex].key, laneIndex, slot: slotAt(y) };
}
