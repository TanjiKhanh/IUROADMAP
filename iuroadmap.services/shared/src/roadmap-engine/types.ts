/**
 * Pure types shared by roadmap-service (NestJS) and the web app.
 * This folder must never import NestJS, Prisma or any runtime dependency.
 */

export type RoadmapTermKind = 'REGULAR' | 'SUMMER' | 'ELECTIVE_POOL';
export type RoadmapNodeKind = 'COURSE' | 'ELECTIVE_SLOT';
export type RoadmapRelationType = 'PREREQUISITE' | 'PREVIOUS' | 'COREQUISITE';
export type CourseGradingMode = 'SCORE' | 'PASS_FAIL';
export type AcademicTermInYear = 'SEMESTER_1' | 'SEMESTER_2' | 'SUMMER';

export interface EngineTerm {
  key: string;
  kind: RoadmapTermKind;
}

export interface EngineNode {
  key: string;
  termKey: string;
}

export interface EngineEdge {
  key: string;
  source: string;
  target: string;
  type: RoadmapRelationType;
}
