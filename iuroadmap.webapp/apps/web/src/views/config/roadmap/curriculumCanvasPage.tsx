import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  useCanvasControllerGetCanvas,
  useCanvasControllerSave,
  type CanvasResponse,
  type CurriculumVersionResponse,
  type RelationType,
} from '@iuroadmap/api-gen';
import { ErrorCodes } from '@iuroadmap/shared/constants';
import { RoutePaths } from '@iuroadmap/core';
import {
  UiAlert,
  UiButton,
  UiCard,
  UiPageHeader,
  UiPopover,
  UiResult,
  UiSelect,
  UiSkeleton,
  UiSpace,
  UiTag,
  UiText,
  UiTooltip,
  useToast,
} from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorCode, apiErrorMessage, unwrapData } from '../../../api/apiResult';
import { useCourseCategories } from '../../../hooks/useMasterDataOptions';
import {
  CatalogSidebar,
  CategoryLegend,
  EdgeTypePopover,
  RelationLegend,
  SemesterCanvas,
  type CanvasTermView,
  type CatalogDragPayload,
  type CatalogDropTarget,
} from '../../../components/semester-canvas';
import { VersionStatusTag } from '../major/components/versionStatusTag';
import { PublishDialog } from '../major/components/publishDialog';
import { IssuesPanel } from './components/IssuesPanel';
import { NodeInspector } from './components/NodeInspector';
import { SlotEditorModal } from './components/SlotEditorModal';
import { fromCanvas, toSaveRequest, useCurriculumEditor, type EditorNode, type SlotInput } from './hooks/useCurriculumEditor';
import { buildAdminCanvasViews, validateEditorState } from './lib/adminCanvasViews';

const CANVAS_HEIGHT = 'calc(100vh - 250px)';

function courseBriefOf(course: CatalogDragPayload) {
  return {
    id: course.courseId,
    code: course.code,
    name: course.name,
    theoryCredits: course.theoryCredits,
    labCredits: course.labCredits,
    fillColor: course.fillColor,
    borderColor: course.borderColor,
    categoryCode: course.categoryCode ?? '',
    gradingMode: course.gradingMode ?? 'SCORE',
    countsTowardGpa: course.countsTowardGpa ?? true,
    countsTowardCredits: course.countsTowardCredits ?? true,
  };
}

/**
 * Admin semester canvas of one curriculum year (FL-RDM-05/06/07): drag from the catalog,
 * drag inside or between columns (nodes make room), connect relations, save the full state,
 * then publish. Published / archived curricula open read-only (immutable, design §5).
 */
export function CurriculumCanvasPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const queryClient = useQueryClient();
  const { versionId = '' } = useParams<{ versionId: string }>();
  const id = Number(versionId);

  const { data: raw, isLoading, isError, refetch } = useCanvasControllerGetCanvas(id, { query: { enabled: id > 0, gcTime: 0 } });
  const { mutateAsync: saveCanvas, isPending: saving } = useCanvasControllerSave();
  const { categories } = useCourseCategories();
  const editor = useCurriculumEditor();

  const [version, setVersion] = useState<CurriculumVersionResponse>();
  const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
  const [selectedEdgeKey, setSelectedEdgeKey] = useState<string | null>(null);
  const [activeTermKey, setActiveTermKey] = useState<string | null>(null);
  const [pendingEdge, setPendingEdge] = useState<{ source: string; target: string } | null>(null);
  const [slotModal, setSlotModal] = useState<{ open: boolean; node?: EditorNode }>({ open: false });
  const [conflict, setConflict] = useState(false);
  const [error, setError] = useState<string>();
  const [publishing, setPublishing] = useState(false);

  const { load } = editor;
  const applyCanvas = useCallback(
    (canvas: CanvasResponse) => {
      setVersion(canvas.version);
      load(fromCanvas(canvas));
      setConflict(false);
    },
    [load],
  );

  useEffect(() => {
    const canvas = unwrapData<CanvasResponse>(raw);
    if (canvas) applyCanvas(canvas);
  }, [raw, applyCanvas]);

  const readOnly = version ? version.status !== 'DRAFT' : true;
  const { state } = editor;

  const issues = useMemo(() => validateEditorState(state, version?.totalCredits ?? 0), [state, version?.totalCredits]);
  const views = useMemo(() => buildAdminCanvasViews(state, issues.errors, t), [state, issues.errors, t]);

  const labelOf = useCallback(
    (nodeKey: string) => {
      const node = state.nodes.find((n) => n.nodeKey === nodeKey);
      return node?.course?.code ?? node?.slotLabel ?? '?';
    },
    [state.nodes],
  );
  const termLabelOf = useCallback((termKey: string) => views.terms.find((term) => term.key === termKey)?.title ?? '', [views.terms]);
  const usedCourseIds = useMemo(() => new Set(state.nodes.flatMap((n) => (n.course ? [n.course.id] : []))), [state.nodes]);
  const targetTermKey = activeTermKey && state.terms.some((term) => term.termKey === activeTermKey) ? activeTermKey : state.terms[0]?.termKey;

  const save = useCallback(async () => {
    if (!version || readOnly || !editor.dirty) return;
    setError(undefined);
    try {
      const saved = unwrapData<CanvasResponse>(await saveCanvas({ id: version.id, data: toSaveRequest(state, version.revision) }));
      if (saved) applyCanvas(saved);
      toast.success(t('roadmap.canvas.saved'));
      queryClient.invalidateQueries();
    } catch (err: unknown) {
      if (apiErrorCode(err) === ErrorCodes.REVISION_CONFLICT) setConflict(true);
      else setError(apiErrorMessage(err, t, t('config.common.saveFailed')));
    }
  }, [version, readOnly, editor.dirty, saveCanvas, state, applyCanvas, toast, t, queryClient]);

  // Keyboard: Ctrl+S save, Ctrl+Z / Ctrl+Y undo / redo, Delete removes the selection.
  useEffect(() => {
    if (readOnly) return;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
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
      } else if (event.key === 'Delete') {
        if (selectedEdgeKey) editor.removeEdge(selectedEdgeKey);
        else if (selectedNodeKey) editor.removeNode(selectedNodeKey);
        setSelectedEdgeKey(null);
        setSelectedNodeKey(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [readOnly, save, editor, selectedEdgeKey, selectedNodeKey]);

  // Warn before closing the tab with unsaved changes.
  useEffect(() => {
    if (!editor.dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [editor.dirty]);

  const onDropCatalogCourse = (course: CatalogDragPayload, target: CatalogDropTarget) => {
    if (target.kind !== 'lane') return;
    const nodeKey = editor.addCourse(courseBriefOf(course), target.termKey, target.order);
    if (nodeKey) setSelectedNodeKey(nodeKey);
    else toast.warning(t('errors.DUPLICATE_COURSE_IN_PLAN'));
  };

  const onConnect = (source: string, target: string) => {
    const check = editor.checkEdge(source, target);
    if (check === 'ok') setPendingEdge({ source, target });
    else toast.warning(t(`roadmap.relation.blocked.${check}`));
  };

  const selectedNode = state.nodes.find((n) => n.nodeKey === selectedNodeKey);
  const selectedEdge = state.edges.find((e) => e.edgeKey === selectedEdgeKey);

  const headerActions = useCallback(
    (term: CanvasTermView) =>
      readOnly ? null : (
        <UiPopover
          trigger="click"
          placement="bottom"
          content={
            <UiSpace direction="vertical" size={4}>
              {term.kind !== 'ELECTIVE_POOL' ? (
                <>
                  <UiButton size="small" type="text" onClick={() => editor.addTerm('REGULAR', term.key)}>
                    {t('roadmap.canvas.insertSemesterAfter')}
                  </UiButton>
                  <UiButton size="small" type="text" onClick={() => editor.addTerm('SUMMER', term.key)}>
                    {t('roadmap.canvas.insertSummerAfter')}
                  </UiButton>
                  <UiButton size="small" type="text" onClick={() => editor.moveTerm(term.key, -1)}>
                    {t('roadmap.canvas.moveLeft')}
                  </UiButton>
                  <UiButton size="small" type="text" onClick={() => editor.moveTerm(term.key, 1)}>
                    {t('roadmap.canvas.moveRight')}
                  </UiButton>
                </>
              ) : null}
              <UiButton
                size="small"
                type="text"
                danger
                onClick={() => {
                  if (!editor.removeTerm(term.key)) toast.warning(t('errors.TERM_NOT_EMPTY'));
                }}
              >
                {t('roadmap.canvas.removeTerm')}
              </UiButton>
            </UiSpace>
          }
        >
          <UiButton size="small" type="text" className="nodrag nopan" aria-label={t('config.common.actions')} data-testid={`lane-menu-${term.key}`}>
            ⋯
          </UiButton>
        </UiPopover>
      ),
    [readOnly, editor, t, toast],
  );

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 12 }} />;
  if (isError || !version) return <UiResult status="error" title={t('config.common.failedToLoad')} />;

  const backToMajor = () => navigate(RoutePaths.web.config.major.detail.replace(':id', String(version.roadmapId)));

  return (
    <div>
      {toastContextHolder}
      <UiPageHeader
        title={
          <UiSpace wrap>
            {t('roadmap.canvas.title', { major: version.majorName, year: version.cohortYear })}
            <VersionStatusTag status={version.status} />
            {editor.dirty ? <UiTag color="gold">{t('roadmap.canvas.unsaved')}</UiTag> : null}
          </UiSpace>
        }
        action={
          <UiSpace wrap>
            <UiButton onClick={backToMajor}>{t('config.common.back')}</UiButton>
            {!readOnly ? (
              <>
                <UiTooltip title="Ctrl+Z">
                  <UiButton disabled={!editor.canUndo} onClick={editor.undo}>
                    {t('roadmap.canvas.undo')}
                  </UiButton>
                </UiTooltip>
                <UiTooltip title="Ctrl+Y">
                  <UiButton disabled={!editor.canRedo} onClick={editor.redo}>
                    {t('roadmap.canvas.redo')}
                  </UiButton>
                </UiTooltip>
                <UiTooltip title="Ctrl+S">
                  <UiButton type="primary" loading={saving} disabled={!editor.dirty} onClick={save} data-testid="canvas-save">
                    {t('config.common.save')}
                  </UiButton>
                </UiTooltip>
                <UiTooltip title={editor.dirty ? t('roadmap.canvas.saveBeforePublish') : undefined}>
                  <UiButton disabled={editor.dirty} onClick={() => setPublishing(true)} data-testid="canvas-publish">
                    {t('config.curriculum.publish')}
                  </UiButton>
                </UiTooltip>
              </>
            ) : null}
          </UiSpace>
        }
      />

      {readOnly ? <UiAlert type="info" showIcon message={t('roadmap.canvas.readOnlyHint')} style={{ marginBottom: 12 }} /> : null}
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

      {!readOnly ? (
        <UiCard size="small" style={{ marginBottom: 12 }}>
          <UiSpace wrap>
            <UiText type="secondary">{t('roadmap.canvas.targetTerm')}</UiText>
            <UiSelect
              size="small"
              style={{ width: 180 }}
              value={targetTermKey}
              onChange={setActiveTermKey}
              options={views.terms.map((term) => ({ value: term.key, label: term.title }))}
            />
            <UiButton size="small" onClick={() => setSlotModal({ open: true })} disabled={!targetTermKey}>
              {t('roadmap.slot.add')}
            </UiButton>
            <UiButton size="small" onClick={() => editor.addTerm('REGULAR', state.terms.filter((term) => term.kind !== 'ELECTIVE_POOL').slice(-1)[0]?.termKey ?? null)}>
              {t('roadmap.canvas.addSemester')}
            </UiButton>
            <UiText type="secondary" style={{ fontSize: 12 }}>
              {t('roadmap.canvas.adminHint')}
            </UiText>
          </UiSpace>
        </UiCard>
      ) : null}

      <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
        {!readOnly ? (
          <div style={{ width: 230, flexShrink: 0 }}>
            <CatalogSidebar
              source="admin"
              usedCourseIds={usedCourseIds}
              height={CANVAS_HEIGHT}
              onAdd={(course) => {
                if (!targetTermKey) return;
                const bottom = Math.max(-1, ...state.nodes.filter((n) => n.termKey === targetTermKey).map((n) => n.order)) + 1;
                const nodeKey = editor.addCourse(courseBriefOf(course), targetTermKey, bottom);
                if (nodeKey) setSelectedNodeKey(nodeKey);
              }}
            />
          </div>
        ) : null}

        <div style={{ flex: 1, minWidth: 0 }}>
          <SemesterCanvas
            mode={readOnly ? 'readOnly' : 'admin'}
            terms={views.terms}
            nodes={views.nodes}
            edges={views.edges}
            height={CANVAS_HEIGHT}
            selectedNodeKey={selectedNodeKey}
            selectedEdgeKey={selectedEdgeKey}
            onMoveNode={editor.moveNode}
            onDropCatalogCourse={onDropCatalogCourse}
            onConnect={onConnect}
            onNodeClick={(key) => {
              setSelectedEdgeKey(null);
              setSelectedNodeKey(key);
              setActiveTermKey(state.nodes.find((n) => n.nodeKey === key)?.termKey ?? null);
            }}
            onEdgeClick={(key) => {
              setSelectedNodeKey(null);
              setSelectedEdgeKey(key);
            }}
            onPaneClick={() => {
              setSelectedNodeKey(null);
              setSelectedEdgeKey(null);
            }}
            onHeaderClick={readOnly ? undefined : setActiveTermKey}
            headerActions={headerActions}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 8 }}>
            <CategoryLegend items={categories} />
            <RelationLegend />
          </div>
        </div>

        <div style={{ width: 300, flexShrink: 0 }}>
          <UiCard size="small" title={selectedNode || selectedEdge ? t('roadmap.canvas.selection') : t('roadmap.issue.title')} style={{ height: '100%' }}>
            {selectedNode || selectedEdge ? (
              <NodeInspector
                node={selectedNode}
                edge={selectedEdge}
                labelOf={labelOf}
                readOnly={readOnly}
                onRemoveNode={(key) => {
                  editor.removeNode(key);
                  setSelectedNodeKey(null);
                }}
                onEditSlot={(node) => setSlotModal({ open: true, node })}
                onUpdateGroup={(key, electiveGroup) => editor.updateNode(key, { electiveGroup })}
                onUpdateBranch={(key, value) => editor.updateNode(key, value)}
                onChangeEdgeType={editor.updateEdgeType}
                onReverseEdge={(key) => {
                  if (!editor.reverseEdge(key)) toast.warning(t('roadmap.relation.blocked.cycle'));
                }}
                onRemoveEdge={(key) => {
                  editor.removeEdge(key);
                  setSelectedEdgeKey(null);
                }}
              />
            ) : (
              <IssuesPanel
                errors={issues.errors}
                warnings={issues.warnings}
                labelOf={labelOf}
                termLabelOf={termLabelOf}
                onSelect={(issue) => {
                  if (issue.edgeKeys[0]) setSelectedEdgeKey(issue.edgeKeys[0]);
                  else if (issue.nodeKeys[0]) setSelectedNodeKey(issue.nodeKeys[0]);
                }}
              />
            )}
          </UiCard>
        </div>
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
      <SlotEditorModal
        open={slotModal.open}
        initial={slotModal.node}
        onCancel={() => setSlotModal({ open: false })}
        onSave={(slot: SlotInput) => {
          if (slotModal.node) editor.updateNode(slotModal.node.nodeKey, slot);
          else if (targetTermKey) setSelectedNodeKey(editor.addSlot(targetTermKey, slot));
          setSlotModal({ open: false });
        }}
      />
      <PublishDialog
        version={publishing ? version : null}
        onClose={() => setPublishing(false)}
        onPublished={(published) => {
          setPublishing(false);
          setVersion(published);
          toast.success(t('config.curriculum.published'));
          queryClient.invalidateQueries();
          refetch();
        }}
      />
    </div>
  );
}
