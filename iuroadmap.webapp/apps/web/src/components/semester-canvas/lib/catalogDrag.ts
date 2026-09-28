import type { CatalogDragPayload } from '../types';

/**
 * The HTML5 drag payload cannot be read during `dragover`, only on `drop`. The catalog sidebar
 * keeps the dragged course here so the canvas can draw a ghost node while hovering.
 */
let current: CatalogDragPayload | null = null;

export function setCatalogDragPayload(payload: CatalogDragPayload | null): void {
  current = payload;
}

export function getCatalogDragPayload(): CatalogDragPayload | null {
  return current;
}
