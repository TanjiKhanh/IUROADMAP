import { Link } from 'react-router-dom';
import type { MergedEdgeResponse, MergedNodeResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiButton, UiDescriptions, UiSpace, UiTag, UiText } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { branchLabel } from '../../../../components/semester-canvas';

export interface SelectionPanelProps {
  node?: MergedNodeResponse;
  edge?: MergedEdgeResponse;
  editing: boolean;
  labelOf: (nodeKey: string) => string;
  onRemoveNode: (nodeKey: string) => void;
  onResetNode: (nodeKey: string) => void;
  onPickSlot: (node: MergedNodeResponse) => void;
  onClearSlot: (nodeKey: string) => void;
  onRemoveEdge: (edgeKey: string) => void;
  onOpenResults: (termKey: string) => void;
}

const STATE_COLORS = { PLANNED: 'default', IN_PROGRESS: 'blue', PASSED: 'green', FAILED: 'red' } as const;

/**
 * Selected course / relation on My Roadmap. The learner can only remove what they added and can
 * reset a curriculum course to its place (BR-LRN-08, D6/D7).
 */
export function SelectionPanel({
  node,
  edge,
  editing,
  labelOf,
  onRemoveNode,
  onResetNode,
  onPickSlot,
  onClearSlot,
  onRemoveEdge,
  onOpenResults,
}: SelectionPanelProps) {
  const { t } = useTranslation();

  if (edge) {
    return (
      <div data-testid="edge-panel">
        <UiText strong>
          {labelOf(edge.sourceKey)} → {labelOf(edge.targetKey)}
        </UiText>
        <div style={{ margin: '8px 0' }}>
          <UiTag>{t(`roadmap.relation.${edge.type}`)}</UiTag>
          {edge.origin === 'CUSTOM' ? <UiTag color="purple">{t('roadmap.relation.custom')}</UiTag> : null}
        </div>
        {editing && edge.origin === 'CUSTOM' ? (
          <UiButton size="small" danger onClick={() => onRemoveEdge(edge.edgeKey)}>
            {t('config.common.delete')}
          </UiButton>
        ) : edge.origin === 'BASE' ? (
          <UiText type="secondary" style={{ fontSize: 12 }}>
            {t('learner.selection.baseEdgeHint')}
          </UiText>
        ) : null}
      </div>
    );
  }

  if (!node) return null;
  const course = node.course;
  const code = course?.code ?? node.customCourse?.code ?? node.slot?.label ?? '';
  const name = course?.name ?? node.customCourse?.name ?? '';
  const isSlot = node.kind === 'ELECTIVE_SLOT';

  return (
    <div data-testid="node-panel">
      <UiText strong>
        {code} {name ? `— ${name}` : ''}
      </UiText>
      <div style={{ margin: '8px 0' }}>
        <UiTag color={STATE_COLORS[node.state]}>{t(`learner.state.${node.state}`)}</UiTag>
        {node.origin === 'CUSTOM' ? <UiTag color="purple">{t('learner.selection.custom')}</UiTag> : null}
        {node.isModified ? <UiTag color="gold">{t('learner.selection.modified')}</UiTag> : null}
        {isSlot ? <UiTag>{t('roadmap.slot.title')}</UiTag> : null}
      </div>
      {node.choiceGroup && node.condition ? (
        <div style={{ marginBottom: 8 }} data-testid="branch-status">
          <UiTag color={node.branchActive === true ? 'green' : node.branchActive === false ? 'default' : 'gold'}>
            {branchLabel(t, node.condition)}
          </UiTag>
          <UiText type="secondary" style={{ fontSize: 12 }}>
            {node.branchActive === true
              ? t('learner.selection.branchApplies')
              : node.branchActive === false
                ? t('learner.selection.branchNotApplies')
                : t('learner.selection.branchUnknown')}
          </UiText>
        </div>
      ) : null}
      <UiDescriptions
        column={1}
        size="small"
        items={[
          { key: 'credits', label: t('config.course.credits'), children: node.credits },
          ...(node.result?.letter
            ? [{ key: 'grade', label: t('learner.results.letter'), children: `${node.result.letter}${node.result.totalScore !== undefined ? ` (${node.result.totalScore})` : ''}` }]
            : []),
        ]}
      />
      <UiSpace wrap style={{ marginTop: 8 }}>
        {course ? (
          <Link to={RoutePaths.web.roadmap.courseDetail.replace(':courseId', String(course.id))}>
            <UiButton size="small">{t('learner.selection.coursePage')}</UiButton>
          </Link>
        ) : null}
        {node.canHaveResult && !editing ? (
          <UiButton size="small" onClick={() => onOpenResults(node.termKey)}>
            {t('learner.selection.enterResult')}
          </UiButton>
        ) : null}
        {editing && isSlot ? (
          <>
            <UiButton size="small" type="primary" onClick={() => onPickSlot(node)}>
              {course ? t('learner.slot.change') : t('learner.slot.pick')}
            </UiButton>
            {course && !node.result ? (
              <UiButton size="small" onClick={() => onClearSlot(node.nodeKey)}>
                {t('learner.slot.clear')}
              </UiButton>
            ) : null}
          </>
        ) : null}
        {editing && node.origin === 'BASE' && node.isModified ? (
          <UiButton size="small" onClick={() => onResetNode(node.nodeKey)}>
            {t('learner.selection.reset')}
          </UiButton>
        ) : null}
        {editing && node.origin === 'CUSTOM' ? (
          <UiButton size="small" danger disabled={Boolean(node.result)} onClick={() => onRemoveNode(node.nodeKey)}>
            {t('config.common.delete')}
          </UiButton>
        ) : null}
      </UiSpace>
      {editing && node.origin === 'BASE' && !isSlot ? (
        <UiText type="secondary" style={{ display: 'block', fontSize: 12, marginTop: 8 }}>
          {t('learner.selection.baseNodeHint')}
        </UiText>
      ) : null}
    </div>
  );
}
