import type { ReactNode } from 'react';

/**
 * View model of the semester canvas (design §4). Pages map their API data (admin canvas,
 * curriculum preview, learner merged view) to these shapes; the canvas only draws and
 * reports user intent through callbacks.
 */

export type CanvasMode = 'readOnly' | 'admin' | 'learner';
export type CanvasTermKind = 'REGULAR' | 'SUMMER' | 'ELECTIVE_POOL';
export type CanvasNodeKind = 'COURSE' | 'ELECTIVE_SLOT';
export type CanvasRelationType = 'PREREQUISITE' | 'PREVIOUS' | 'COREQUISITE';
export type CanvasNodeState = 'PLANNED' | 'IN_PROGRESS' | 'PASSED' | 'FAILED';

export interface CanvasTermView {
  key: string;
  kind: CanvasTermKind;
  /** Translated column title, e.g. "Semester 4", "Summer", "IE1" */
  title: string;
  /** Second line, e.g. "HK1 2025-2026" */
  subtitle?: string;
  /** x in "(x+y)" */
  courseCredits: number;
  /** y in "(x+y)" */
  slotCredits: number;
  /** Added by the learner (can be renamed / removed) */
  isCustom?: boolean;
  /** Extra content shown in the header tooltip (e.g. term GPA) */
  tooltip?: ReactNode;
  /** Small line under the title (e.g. "GPA 85.0 · 3.45") */
  footnote?: string;
}

export interface CanvasNodeView {
  key: string;
  termKey: string;
  /** Order inside the column: integer row_index or real row_order (design §4.2) */
  order: number;
  kind: CanvasNodeKind;
  code: string;
  name: string;
  theoryCredits: number;
  labCredits: number;
  fillColor: string;
  borderColor: string;
  /** ELECTIVE_SLOT: slot label ("Elective CS1") */
  slotLabel?: string;
  /** ELECTIVE_SLOT: a course has been chosen */
  slotFilled?: boolean;
  /** Learner-added course */
  isCustom?: boolean;
  /** Curriculum course moved or slot filled by the learner */
  isModified?: boolean;
  state?: CanvasNodeState;
  /** Letter or P/F shown on the badge */
  letter?: string;
  /** Publish error on this node (admin) */
  hasIssue?: boolean;
  /** Non-blocking hint on this node (learner) */
  hasHint?: boolean;
  /** Not counted toward graduation credits (Intensive English) */
  noCredit?: boolean;
  /**
   * Conditional branch (FR-RDM.07.4): nodes with the same `key` in a column are framed together.
   * `active` (learner): true = applies to the learner's GPA, false = does not (drawn faded).
   */
  branch?: { key: string; label: string; active?: boolean | null };
}

export interface CanvasEdgeView {
  key: string;
  source: string;
  target: string;
  type: CanvasRelationType;
  /** Learner-added relation */
  isCustom?: boolean;
  /** Violates the semester order (admin error / learner hint) */
  hasIssue?: boolean;
}

/** Drop target resolved from a pointer position. */
export type CanvasHit =
  | { kind: 'lane'; termKey: string; laneIndex: number; slot: number }
  | { kind: 'gap'; afterTermKey: string | null; x: number };

export interface CanvasMove {
  nodeKey: string;
  termKey: string;
  order: number;
  /** Other nodes of the column that got a new order because there was no room left */
  rebalanced: Map<string, number>;
}

/** Payload of a course dragged from the catalog sidebar (HTML5 drag and drop). */
export interface CatalogDragPayload {
  courseId: number;
  code: string;
  name: string;
  theoryCredits: number;
  labCredits: number;
  fillColor: string;
  borderColor: string;
  categoryCode?: string;
  gradingMode?: 'SCORE' | 'PASS_FAIL';
  countsTowardGpa?: boolean;
  countsTowardCredits?: boolean;
}

export const CATALOG_DRAG_MIME = 'application/x-iuroadmap-course';
