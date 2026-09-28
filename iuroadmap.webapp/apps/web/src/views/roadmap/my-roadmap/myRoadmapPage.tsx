import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  useStudentRoadmapsControllerChanges,
  useStudentRoadmapsControllerGet,
  useStudentRoadmapsControllerReactivate,
  useStudentRoadmapsControllerReset,
  type MergedNodeResponse,
  type RelationType,
  type RoadmapChangeOpRequest,
  type StudentRoadmapResponse,
} from '@iuroadmap/api-gen';
import { ErrorCodes } from '@iuroadmap/shared/constants';
import { RoutePaths } from '@iuroadmap/core';
import {
  UiAlert,
  UiBadge,
  UiButton,
  UiCard,
  UiCloseIcon,
  UiPageHeader,
  UiPopover,
  UiResult,
  UiSkeleton,
  UiSpace,
  UiTabs,
  UiTag,
  UiTooltip,
  uiConfirm,
  useToast,
} from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import { useCourseCategories } from '../../../hooks/useMasterDataOptions';
import { apiErrorCode, apiErrorMessage, unwrapData } from '../../../api/apiResult';
import {
  CatalogSidebar,
  CategoryLegend,
  EdgeTypePopover,
  RelationLegend,
  SemesterCanvas,
  type CanvasMove,
  type CanvasNodeView,
  type CanvasTermView,
  type CatalogDragPayload,
  type CatalogDropTarget,
} from '../../../components/semester-canvas';
import { docOf, useRoadmapEditor } from '../hooks/useRoadmapEditor';
import { buildLearnerCanvasViews, computeHints, learnerTermTitle } from '../lib/learnerCanvasViews';
import { SummaryBar } from './components/summaryBar';
import { HintsPanel } from './components/hintsPanel';
import { SelectionPanel } from './components/selectionPanel';
import { SlotPickerModal } from './components/slotPickerModal';
import { CustomCourseModal } from './components/customCourseModal';
import { TermYearModal, type TermYearValue } from './components/termYearModal';
import { TermResultsDrawer } from './components/termResultsDrawer';
import { UpgradePreviewDialog } from './components/upgradePreviewDialog';

const CANVAS_HEIGHT = 'calc(100vh - 330px)';
// Below the md breakpoint the panels stack, so the canvas no longer shares the row with them.
const MOBILE_CANVAS_HEIGHT = '70vh';
const MOBILE_CATALOG_HEIGHT = '40vh';

/**
 * My Roadmap (FL-LRN-04/05/06): the learner's own plan = curriculum + overlay. View mode shows the
 * plan and results; edit mode lets the learner move / add courses, insert terms and relate courses.
 * Everything is local until "Save", which sends one batch (design §6.4). Relations never block.
 */
export function MyRoadmapPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const queryClient = useQueryClient();
  const { id = '' } = useParams<{ id: string }>();
  const roadmapId = Number(id);

  const { data: raw, isLoading, isError, refetch } = useStudentRoadmapsControllerGet(roadmapId, { query: { enabled: roadmapId > 0, gcTime: 0 } });
  const { mutateAsync: sendChanges, isPending: saving } = useStudentRoadmapsControllerChanges();
  const { mutateAsync: resetRoadmap } = useStudentRoadmapsControllerReset();
  const { mutateAsync: reactivate } = useStudentRoadmapsControllerReactivate();
  const { categories } = useCourseCategories();
  const editor = useRoadmapEditor();
  const { isMobile } = useBreakpoint();

  const [roadmap, setRoadmap] = useState<StudentRoadmapResponse>();
  const [editing, setEditing] = useState(false);
  const [conflict, setConflict] = useState(false);
  const [error, setError] = useState<string>();
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const [selectedEdgeKey, setSelectedEdgeKey] = useState<string | null>(null);
  const [pendingEdge, setPendingEdge] = useState<{ source: string; target: string } | null>(null);
  const [resultsTermKey, setResultsTermKey] = useState<string | null>(null);
  const [yearTermKey, setYearTermKey] = useState<string | null>(null);
  const [slotNode, setSlotNode] = useState<MergedNodeResponse | null>(null);
  const [customOpen, setCustomOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  /** Hints / selection panel opened by the learner; a selection also shows it */
  const [panelOpen, setPanelOpen] = useState(false);

  const { load } = editor;
  const applyRoadmap = useCallback(
    (next: StudentRoadmapResponse) => {
      setRoadmap(next);
      load(docOf(next));
      setConflict(false);
    },
    [load],
  );

  useEffect(() => {
    const next = unwrapData<StudentRoadmapResponse>(raw);
    if (next) applyRoadmap(next);
  }, [raw, applyRoadmap]);

  const { doc } = editor;
  const hints = useMemo(() => computeHints(doc, roadmap?.summary.totalCredits ?? 0), [doc, roadmap?.summary.totalCredits]);
  const views = useMemo(() => buildLearnerCanvasViews(doc, hints, t, !editor.dirty), [doc, hints, t, editor.dirty]);
  const nodeByKey = useMemo(() => new Map(doc.nodes.map((n) => [n.nodeKey, n])), [doc.nodes]);
  const labelOf = useCallback(
    (key: string) => {
      const n = nodeByKey.get(key);
      return n?.course?.code ?? n?.customCourse?.code ?? n?.slot?.label ?? '?';
    },
    [nodeByKey],
  );
  const plannedCourseIds = useMemo(() => new Set(doc.nodes.flatMap((n) => (n.course ? [n.course.id] : []))), [doc.nodes]);
  const poolKeys = useMemo(() => new Set(doc.terms.filter((term) => term.kind === 'ELECTIVE_POOL').map((term) => term.termKey)), [doc.terms]);
  const firstTermKey = doc.terms.find((term) => term.kind !== 'ELECTIVE_POOL')?.termKey;
  const newTermLabel = useCallback(
    () => t('learner.term.newLabel', { n: doc.terms.filter((term) => term.origin === 'CUSTOM').length + 1 }),
    [doc.terms, t],
  );

  const save = useCallback(
    async (extra: RoadmapChangeOpRequest[] = []) => {
      if (!roadmap) return;
      const ops = [...editor.compacted, ...extra];
      if (!ops.length) return;
      setError(undefined);
      try {
        const next = unwrapData<StudentRoadmapResponse>(await sendChanges({ id: roadmap.id, data: { revision: roadmap.revision, ops } }));
        if (next) applyRoadmap(next);
        toast.success(t('learner.myRoadmap.saved'));
        queryClient.invalidateQueries();
      } catch (err: unknown) {
        if (apiErrorCode(err) === ErrorCodes.REVISION_CONFLICT) setConflict(true);
        else setError(apiErrorMessage(err, t, t('config.common.saveFailed')));
      }
    },
    [roadmap, editor.compacted, sendChanges, applyRoadmap, toast, t, queryClient],
  );

  // Ctrl+S / Ctrl+Z / Ctrl+Y while editing; warn before closing the tab with unsaved changes.
  useEffect(() => {
    if (!editing) return;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      const mod = event.ctrlKey || event.metaKey;
      if (mod && event.key.toLowerCase() === 's') {
        event.preventDefault();
        void save();
      } else if (mod && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        if (event.shiftKey) editor.redo();
        else editor.undo();
      } else if (mod && event.key.toLowerCase() === 'y') {
        event.preventDefault();
        editor.redo();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editing, save, editor]);

  useEffect(() => {
    if (!editor.dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [editor.dirty]);

  const isBaseNode = useCallback((n: CanvasNodeView) => !n.isCustom && !n.isModified, []);

  const onMoveNode = (move: CanvasMove) => {
    const node = nodeByKey.get(move.nodeKey);
    if (poolKeys.has(move.termKey) && node?.result) {
      toast.warning(t('errors.NODE_HAS_RESULT'));
      return;
    }
    editor.moveNode(move);
  };

  const onDropCatalogCourse = (course: CatalogDragPayload, target: CatalogDropTarget) => {
    if (plannedCourseIds.has(course.courseId)) {
      toast.warning(t('errors.DUPLICATE_COURSE_IN_PLAN'));
      return;
    }
    const nodeKey =
      target.kind === 'lane' ? editor.addCourse(course, target.termKey, target.order) : editor.addCourseInNewTerm(course, target.afterTermKey, newTermLabel());
    setSelectedNodeKey(nodeKey);
  };

  const onConnect = (source: string, target: string) => {
    const exists = doc.edges.some((e) => (e.sourceKey === source && e.targetKey === target) || (e.sourceKey === target && e.targetKey === source));
    if (exists) toast.warning(t('roadmap.relation.blocked.duplicate'));
    else setPendingEdge({ source, target });
  };

  const openResults = (termKey: string) => {
    if (editor.dirty) {
      toast.warning(t('learner.myRoadmap.saveBeforeResults'));
      return;
    }
    setResultsTermKey(termKey);
  };

  const headerActions = useCallback(
    (view: CanvasTermView) => {
      if (!editing || view.kind === 'ELECTIVE_POOL') return null;
      const index = doc.terms.findIndex((term) => term.termKey === view.key);
      const term = doc.terms[index];
      const isCustom = term?.origin === 'CUSTOM';
      const next = doc.terms[index + 1];
      return (
        <UiPopover
          trigger="click"
          placement="bottom"
          content={
            <UiSpace direction="vertical" size={4}>
              <UiButton size="small" type="text" onClick={() => setYearTermKey(view.key)}>
                {isCustom ? t('learner.term.editLabelYear') : t('learner.term.setYear')}
              </UiButton>
              <UiButton size="small" type="text" onClick={() => editor.addTerm('REGULAR', view.key, newTermLabel())}>
                {t('learner.term.insertAfter')}
              </UiButton>
              <UiButton size="small" type="text" onClick={() => editor.addTerm('SUMMER', view.key, t('roadmap.term.summer'))}>
                {t('learner.term.insertSummerAfter')}
              </UiButton>
              {isCustom ? (
                <>
                  <UiButton size="small" type="text" disabled={index === 0} onClick={() => editor.moveTerm(view.key, index >= 2 ? doc.terms[index - 2].termKey : null)}>
                    {t('roadmap.canvas.moveLeft')}
                  </UiButton>
                  <UiButton size="small" type="text" disabled={!next || next.kind === 'ELECTIVE_POOL'} onClick={() => next && editor.moveTerm(view.key, next.termKey)}>
                    {t('roadmap.canvas.moveRight')}
                  </UiButton>
                  <UiButton
                    size="small"
                    type="text"
                    danger
                    onClick={() => {
                      if (doc.nodes.some((n) => n.termKey === view.key)) toast.warning(t('errors.TERM_NOT_EMPTY'));
                      else editor.removeTerm(view.key);
                    }}
                  >
                    {t('roadmap.canvas.removeTerm')}
                  </UiButton>
                </>
              ) : null}
            </UiSpace>
          }
        >
          <UiButton size="small" type="text" className="nodrag nopan" aria-label={t('config.common.actions')} data-testid={`lane-menu-${view.key}`}>
            ⋯
          </UiButton>
        </UiPopover>
      );
    },
    [editing, doc.terms, doc.nodes, editor, t, toast, newTermLabel],
  );

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 12 }} />;
  if (isError || !roadmap) return <UiResult status="404" title={t('learner.myRoadmap.notFound')} />;

  const selectedNode = selectedNodeKey ? nodeByKey.get(selectedNodeKey) : undefined;
  const selectedEdge = doc.edges.find((e) => e.edgeKey === selectedEdgeKey);
  const resultsTerm = doc.terms.find((term) => term.termKey === resultsTermKey);
  const dropped = roadmap.status === 'DROPPED';
  // Hidden by default so the canvas gets the full width
  const panelVisible = panelOpen || Boolean(selectedNode || selectedEdge);

  const closePanel = () => {
    setPanelOpen(false);
    setSelectedNodeKey(null);
    setSelectedEdgeKey(null);
  };

  const stopEditing = () => {
    if (editor.dirty) {
      uiConfirm(t('learner.myRoadmap.discardTitle'), t('learner.myRoadmap.discardContent'), () => {
        load(docOf(roadmap));
        setEditing(false);
      });
    } else setEditing(false);
  };

  return (
    <div>
      {toastContextHolder}
      <UiPageHeader
        title={
          <UiSpace wrap>
            {roadmap.majorName}
            <UiTag color="blue">K{roadmap.version.cohortYear}</UiTag>
            {editor.dirty ? <UiTag color="gold">{t('roadmap.canvas.unsaved')}</UiTag> : null}
          </UiSpace>
        }
        action={
          <UiSpace wrap>
            <UiButton onClick={() => navigate(RoutePaths.web.roadmap.myRoadmaps)}>{t('common.back')}</UiButton>
            {editing ? (
              <>
                <UiButton disabled={!editor.canUndo} onClick={editor.undo}>
                  {t('roadmap.canvas.undo')}
                </UiButton>
                <UiButton disabled={!editor.canRedo} onClick={editor.redo}>
                  {t('roadmap.canvas.redo')}
                </UiButton>
                <UiButton onClick={stopEditing}>{editor.dirty ? t('learner.myRoadmap.discard') : t('learner.myRoadmap.done')}</UiButton>
                <UiTooltip title="Ctrl+S">
                  <UiButton type="primary" loading={saving} disabled={!editor.dirty} onClick={() => save()} data-testid="roadmap-save">
                    {t('config.common.save')}
                  </UiButton>
                </UiTooltip>
              </>
            ) : (
              <>
                <UiButton onClick={() => setUpgradeOpen(true)}>{t('learner.upgrade.change')}</UiButton>
                <UiButton
                  onClick={() =>
                    uiConfirm(t('learner.myRoadmap.resetAll'), t('learner.myRoadmap.resetAllConfirm'), async () => {
                      try {
                        const next = unwrapData<StudentRoadmapResponse>(await resetRoadmap({ id: roadmap.id, data: { revision: roadmap.revision, scope: 'ALL' } }));
                        if (next) applyRoadmap(next);
                      } catch (err: unknown) {
                        setError(apiErrorMessage(err, t, t('config.common.saveFailed')));
                      }
                    })
                  }
                >
                  {t('learner.myRoadmap.resetAll')}
                </UiButton>
                <UiButton type="primary" disabled={dropped} onClick={() => setEditing(true)} data-testid="roadmap-edit">
                  {t('learner.myRoadmap.edit')}
                </UiButton>
              </>
            )}
          </UiSpace>
        }
      />

      <SummaryBar summary={roadmap.summary} />

      {dropped ? (
        <UiAlert
          type="warning"
          showIcon
          message={t('learner.myRoadmap.droppedBanner')}
          action={
            <UiButton
              size="small"
              onClick={async () => {
                try {
                  await reactivate({ id: roadmap.id });
                  refetch();
                } catch (err: unknown) {
                  setError(apiErrorMessage(err, t, t('config.common.saveFailed')));
                }
              }}
            >
              {t('learner.myRoadmaps.reactivate')}
            </UiButton>
          }
          style={{ marginBottom: 12 }}
        />
      ) : null}
      {roadmap.newerVersionId ? (
        <UiAlert
          type="info"
          showIcon
          message={t('learner.myRoadmap.newerBanner', { year: roadmap.version.cohortYear })}
          action={
            <UiButton size="small" type="primary" onClick={() => setUpgradeOpen(true)}>
              {t('learner.upgrade.update')}
            </UiButton>
          }
          style={{ marginBottom: 12 }}
        />
      ) : null}
      {conflict ? (
        <UiAlert
          type="error"
          showIcon
          message={t('errors.REVISION_CONFLICT')}
          action={
            <UiButton size="small" onClick={() => refetch()}>
              {t('roadmap.canvas.reload')}
            </UiButton>
          }
          style={{ marginBottom: 12 }}
        />
      ) : null}
      {error ? <UiAlert type="error" showIcon closable message={error} onClose={() => setError(undefined)} style={{ marginBottom: 12 }} /> : null}
      {editing ? <UiAlert type="info" showIcon message={t('learner.myRoadmap.editHint')} style={{ marginBottom: 12 }} /> : null}

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12, alignItems: 'stretch' }}>
        {editing ? (
          <div style={{ width: isMobile ? '100%' : 230, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <CatalogSidebar
              source="explore"
              usedCourseIds={plannedCourseIds}
              height={isMobile ? MOBILE_CATALOG_HEIGHT : `calc(${CANVAS_HEIGHT} - 40px)`}
              onAdd={(course) => {
                if (!firstTermKey) return;
                onDropCatalogCourse(course, { kind: 'lane', termKey: firstTermKey, order: -0.5, rebalanced: new Map() });
              }}
            />
            <UiButton size="small" onClick={() => setCustomOpen(true)}>
              {t('learner.custom.add')}
            </UiButton>
          </div>
        ) : null}

        <div style={{ flex: 1, minWidth: 0 }}>
          <SemesterCanvas
            mode={editing ? 'learner' : 'readOnly'}
            terms={views.terms}
            nodes={views.nodes}
            edges={views.edges}
            height={isMobile ? MOBILE_CANVAS_HEIGHT : CANVAS_HEIGHT}
            allowNewTermOnGap
            isBaseNode={isBaseNode}
            selectedNodeKey={selectedNodeKey}
            selectedEdgeKey={selectedEdgeKey}
            onMoveNode={onMoveNode}
            onDropInGap={(nodeKey, afterTermKey) => editor.moveNodeToNewTerm(nodeKey, afterTermKey, newTermLabel())}
            onDropCatalogCourse={onDropCatalogCourse}
            onConnect={editing ? onConnect : undefined}
            onNodeClick={(key) => {
              setSelectedEdgeKey(null);
              setSelectedNodeKey(key);
            }}
            onEdgeClick={(key) => {
              setSelectedNodeKey(null);
              setSelectedEdgeKey(key);
            }}
            onPaneClick={() => {
              setSelectedNodeKey(null);
              setSelectedEdgeKey(null);
            }}
            onHeaderClick={openResults}
            headerActions={headerActions}
            overlay={
              panelVisible ? null : (
                <UiBadge count={hints.length} size="small">
                  <UiButton size="small" onClick={() => setPanelOpen(true)} data-testid="roadmap-panel-open">
                    {t('learner.hints.title')}
                  </UiButton>
                </UiBadge>
              )
            }
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 8 }}>
            <CategoryLegend items={categories} />
            <RelationLegend showCustom />
          </div>
        </div>

        {panelVisible ? (
          <div style={{ width: isMobile ? '100%' : 290, flexShrink: 0 }}>
            <UiCard size="small" style={{ height: '100%' }}>
              <UiTabs
                size="small"
                tabBarExtraContent={
                  <UiTooltip title={t('learner.myRoadmap.hidePanel')}>
                    <UiButton
                      size="small"
                      type="text"
                      icon={<UiCloseIcon />}
                      aria-label={t('learner.myRoadmap.hidePanel')}
                      onClick={closePanel}
                      data-testid="roadmap-panel-close"
                    />
                  </UiTooltip>
                }
                activeKey={selectedNode || selectedEdge ? 'selection' : 'hints'}
                onChange={(key) => {
                  if (key === 'hints') {
                    setPanelOpen(true);
                    setSelectedNodeKey(null);
                    setSelectedEdgeKey(null);
                  }
                }}
                items={[
                  {
                    key: 'hints',
                    label: `${t('learner.hints.title')} (${hints.length})`,
                    children: (
                      <HintsPanel
                        hints={hints}
                        labelOf={labelOf}
                        onSelect={(hint) => {
                          if (hint.edgeKeys[0]) setSelectedEdgeKey(hint.edgeKeys[0]);
                          else if (hint.nodeKeys[0]) setSelectedNodeKey(hint.nodeKeys[0]);
                        }}
                      />
                    ),
                  },
                  {
                    key: 'selection',
                    label: t('roadmap.canvas.selection'),
                    disabled: !selectedNode && !selectedEdge,
                    children: (
                      <SelectionPanel
                        node={selectedNode}
                        edge={selectedEdge}
                        editing={editing}
                        labelOf={labelOf}
                        onRemoveNode={(key) => {
                          editor.removeNode(key);
                          setSelectedNodeKey(null);
                        }}
                        onResetNode={(key) => save([{ op: 'RESET_NODE', nodeKey: key }])}
                        onPickSlot={setSlotNode}
                        onClearSlot={editor.clearSlot}
                        onRemoveEdge={(key) => {
                          editor.removeEdge(key);
                          setSelectedEdgeKey(null);
                        }}
                        onOpenResults={openResults}
                      />
                    ),
                  },
                ]}
              />
            </UiCard>
          </div>
        ) : null}
      </div>

      <EdgeTypePopover
        open={Boolean(pendingEdge)}
        title={pendingEdge ? `${labelOf(pendingEdge.source)} → ${labelOf(pendingEdge.target)}` : ''}
        onCancel={() => setPendingEdge(null)}
        onConfirm={(type: RelationType) => {
          if (pendingEdge) setSelectedEdgeKey(editor.addEdge(pendingEdge.source, pendingEdge.target, type));
          setPendingEdge(null);
        }}
      />
      <SlotPickerModal
        slot={slotNode}
        poolNodes={doc.nodes.filter((n) => poolKeys.has(n.termKey))}
        onCancel={() => setSlotNode(null)}
        onPick={(course) => {
          if (slotNode) editor.fillSlot(slotNode.nodeKey, course);
          setSlotNode(null);
        }}
      />
      <CustomCourseModal
        open={customOpen}
        onCancel={() => setCustomOpen(false)}
        onSave={(course) => {
          if (firstTermKey) setSelectedNodeKey(editor.addCustomCourse(course, firstTermKey, -0.5));
          setCustomOpen(false);
        }}
      />
      <TermYearModal
        term={doc.terms.find((term) => term.termKey === yearTermKey) ?? null}
        onCancel={() => setYearTermKey(null)}
        onSave={(value: TermYearValue) => {
          if (yearTermKey) {
            const term = doc.terms.find((x) => x.termKey === yearTermKey);
            editor.updateTerm(yearTermKey, {
              label: term?.origin === 'CUSTOM' ? value.label : undefined,
              academicYear: value.academicYear,
              termInYear: value.termInYear,
            });
          }
          setYearTermKey(null);
        }}
      />
      <TermResultsDrawer
        roadmapId={roadmap.id}
        termKey={resultsTermKey}
        title={resultsTerm ? t('learner.results.title', { term: learnerTermTitle(t, resultsTerm) }) : ''}
        onClose={() => setResultsTermKey(null)}
        onSaved={() => {
          toast.success(t('learner.results.saved'));
          refetch();
        }}
      />
      <UpgradePreviewDialog
        open={upgradeOpen}
        roadmap={roadmap}
        initialTargetVersionId={roadmap.newerVersionId}
        onClose={() => setUpgradeOpen(false)}
        onUpgraded={(next) => {
          setUpgradeOpen(false);
          applyRoadmap(next);
          toast.success(t('learner.upgrade.done'));
          queryClient.invalidateQueries();
        }}
      />
    </div>
  );
}
