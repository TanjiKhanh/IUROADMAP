import { Injectable } from '@nestjs/common';
import { ErrorCodes } from '@iuroadmap/shared';
import { Prisma } from '../../../generated/prisma-client';
import { PrismaService } from '../../../prisma/prisma.service';
import { ApiErrors } from '../../../common/api-errors';
import { VersionStructure } from '../../curriculum/services/version-structure.service';
import { OpError } from '../lib/op-error';
import { ResultRow } from '../lib/derive';
import { BaseStructure, DeltaState, EdgeDelta, NodeDelta, TermDelta, emptyDeltaState } from '../lib/overlay-types';

type Tx = Prisma.TransactionClient | PrismaService;

/** Reads and writes the learner overlay tables (STUDENT_*_DELTAS, STUDENT_COURSE_RESULTS). */
@Injectable()
export class OverlayRepository {
  constructor(private readonly prisma: PrismaService) {}

  toBase(structure: VersionStructure): BaseStructure {
    return {
      terms: structure.terms.map((t) => ({ termKey: t.termKey, orderIndex: t.orderIndex, kind: t.kind, semesterNo: t.semesterNo })),
      nodes: structure.nodes.map((n) => ({
        nodeKey: n.nodeKey,
        termKey: n.termKey,
        rowIndex: n.rowIndex,
        kind: n.kind,
        courseId: n.courseId,
        slotLabel: n.slotLabel,
        slotTheoryCredits: n.slotTheoryCredits,
        slotLabCredits: n.slotLabCredits,
        electiveGroup: n.electiveGroup,
      })),
      edges: structure.edges.map((e) => ({ ...e })),
    };
  }

  async loadDeltas(studentRoadmapId: number, tx: Tx = this.prisma): Promise<DeltaState> {
    const [terms, nodes, edges] = await Promise.all([
      tx.sTUDENT_TERM_DELTAS.findMany({ where: { student_roadmap_id: studentRoadmapId } }),
      tx.sTUDENT_NODE_DELTAS.findMany({ where: { student_roadmap_id: studentRoadmapId } }),
      tx.sTUDENT_EDGE_DELTAS.findMany({ where: { student_roadmap_id: studentRoadmapId } }),
    ]);
    const state = emptyDeltaState();
    for (const t of terms) {
      state.terms.set(t.term_key, {
        termKey: t.term_key,
        origin: t.origin,
        kind: (t.kind as TermDelta['kind']) ?? null,
        afterTermKey: t.after_term_key,
        customLabel: t.custom_label,
        academicYear: t.academic_year,
        termInYear: t.term_in_year,
      });
    }
    for (const n of nodes) {
      state.nodes.set(n.node_key, {
        nodeKey: n.node_key,
        origin: n.origin,
        termKey: n.term_key,
        rowOrder: n.row_order === null ? null : Number(n.row_order),
        courseId: n.course_id,
        customCode: n.custom_code,
        customName: n.custom_name,
        customTheoryCredits: n.custom_theory_credits,
        customLabCredits: n.custom_lab_credits,
      });
    }
    for (const e of edges) {
      state.edges.set(e.edge_key, { edgeKey: e.edge_key, sourceKey: e.source_node_key, targetKey: e.target_node_key, type: e.type });
    }
    return state;
  }

  async loadResults(studentRoadmapId: number, tx: Tx = this.prisma): Promise<Map<string, ResultRow>> {
    const rows = await tx.sTUDENT_COURSE_RESULTS.findMany({ where: { student_roadmap_id: studentRoadmapId } });
    return new Map(
      rows.map((r) => [
        r.node_key,
        {
          nodeKey: r.node_key,
          status: r.status,
          weightProcess: r.weight_process,
          weightMidterm: r.weight_midterm,
          weightFinal: r.weight_final,
          scoreProcess: r.score_process === null ? null : Number(r.score_process),
          scoreMidterm: r.score_midterm === null ? null : Number(r.score_midterm),
          scoreFinal: r.score_final === null ? null : Number(r.score_final),
          totalScore: r.total_score,
          isPassed: r.is_passed,
          note: r.note,
        },
      ]),
    );
  }

  /**
   * Writes only what changed between two states. Changed rows are deleted and re-created, which
   * avoids transient conflicts on the custom-term chain index (student_term_deltas_one_after).
   */
  async persist(tx: Tx, studentRoadmapId: number, before: DeltaState, after: DeltaState): Promise<void> {
    const termDiff = diff(before.terms, after.terms, sameTerm);
    const nodeDiff = diff(before.nodes, after.nodes, sameNode);
    const edgeDiff = diff(before.edges, after.edges, sameEdge);

    if (edgeDiff.remove.length) {
      await tx.sTUDENT_EDGE_DELTAS.deleteMany({ where: { student_roadmap_id: studentRoadmapId, edge_key: { in: edgeDiff.remove } } });
    }
    if (nodeDiff.remove.length) {
      await tx.sTUDENT_NODE_DELTAS.deleteMany({ where: { student_roadmap_id: studentRoadmapId, node_key: { in: nodeDiff.remove } } });
    }
    if (termDiff.remove.length) {
      await tx.sTUDENT_TERM_DELTAS.deleteMany({ where: { student_roadmap_id: studentRoadmapId, term_key: { in: termDiff.remove } } });
    }
    if (termDiff.write.length) {
      await tx.sTUDENT_TERM_DELTAS.createMany({
        data: termDiff.write.map((t) => ({
          student_roadmap_id: studentRoadmapId,
          term_key: t.termKey,
          origin: t.origin,
          kind: t.kind,
          after_term_key: t.afterTermKey,
          custom_label: t.customLabel,
          academic_year: t.academicYear,
          term_in_year: t.termInYear,
        })),
      });
    }
    if (nodeDiff.write.length) {
      await tx.sTUDENT_NODE_DELTAS.createMany({
        data: nodeDiff.write.map((n) => ({
          student_roadmap_id: studentRoadmapId,
          node_key: n.nodeKey,
          origin: n.origin,
          term_key: n.termKey,
          row_order: n.rowOrder,
          course_id: n.courseId,
          custom_code: n.customCode,
          custom_name: n.customName,
          custom_theory_credits: n.customTheoryCredits,
          custom_lab_credits: n.customLabCredits,
        })),
      });
    }
    if (edgeDiff.write.length) {
      await tx.sTUDENT_EDGE_DELTAS.createMany({
        data: edgeDiff.write.map((e) => ({
          student_roadmap_id: studentRoadmapId,
          edge_key: e.edgeKey,
          source_node_key: e.sourceKey,
          target_node_key: e.targetKey,
          type: e.type,
        })),
      });
    }
  }

  /**
   * Optimistic lock (design §6.4): bumps the revision only if it still equals `expected`.
   * Run it first inside the transaction so concurrent batches serialize on the row.
   */
  async bumpRevision(tx: Tx, studentRoadmapId: number, expected: number): Promise<void> {
    const updated = await tx.sTUDENT_ROADMAPS.updateMany({
      where: { id: studentRoadmapId, revision: expected },
      data: { revision: { increment: 1 } },
    });
    if (updated.count !== 1) {
      const current = await tx.sTUDENT_ROADMAPS.findUnique({ where: { id: studentRoadmapId }, select: { revision: true } });
      throw ApiErrors.conflict(ErrorCodes.REVISION_CONFLICT, 'The roadmap was changed elsewhere', { currentRevision: current?.revision });
    }
  }
}

/** Maps a pure-logic error to the matching HTTP error. */
export function toHttpError(error: unknown): unknown {
  if (!(error instanceof OpError)) return error;
  if (error.status === 404) return ApiErrors.notFound(error.message);
  if (error.status === 409) return ApiErrors.conflict(error.code, error.message, error.extra);
  return ApiErrors.badRequest(error.code, error.message, error.extra);
}

function diff<T>(before: Map<string, T>, after: Map<string, T>, same: (a: T, b: T) => boolean) {
  const remove: string[] = [];
  const write: T[] = [];
  for (const [key, value] of before) {
    const next = after.get(key);
    if (!next) remove.push(key);
    else if (!same(value, next)) {
      remove.push(key);
      write.push(next);
    }
  }
  for (const [key, value] of after) if (!before.has(key)) write.push(value);
  return { remove, write };
}

const sameTerm = (a: TermDelta, b: TermDelta) =>
  a.origin === b.origin &&
  a.kind === b.kind &&
  a.afterTermKey === b.afterTermKey &&
  a.customLabel === b.customLabel &&
  a.academicYear === b.academicYear &&
  a.termInYear === b.termInYear;

const sameNode = (a: NodeDelta, b: NodeDelta) =>
  a.origin === b.origin &&
  a.termKey === b.termKey &&
  a.rowOrder === b.rowOrder &&
  a.courseId === b.courseId &&
  a.customCode === b.customCode &&
  a.customName === b.customName &&
  a.customTheoryCredits === b.customTheoryCredits &&
  a.customLabCredits === b.customLabCredits;

const sameEdge = (a: EdgeDelta, b: EdgeDelta) =>
  a.sourceKey === b.sourceKey && a.targetKey === b.targetKey && a.type === b.type;
