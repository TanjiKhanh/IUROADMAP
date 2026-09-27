import { RelationType } from '@iuroadmap/api-gen';
import {
  UiButton,
  UiDeleteIcon,
  UiDescriptions,
  UiEditIcon,
  UiInput,
  UiRadio,
  UiRadioGroup,
  UiSpace,
  UiTag,
  UiText,
} from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { EntityConstant } from '@iuroadmap/shared/constants';
import type { EditorEdge, EditorNode } from '../hooks/useCurriculumEditor';
import { BranchEditor } from './BranchEditor';

export interface NodeInspectorProps {
  node?: EditorNode;
  edge?: EditorEdge;
  labelOf: (nodeKey: string) => string;
  readOnly: boolean;
  onRemoveNode: (nodeKey: string) => void;
  onEditSlot: (node: EditorNode) => void;
  onUpdateGroup: (nodeKey: string, electiveGroup: string | undefined) => void;
  onUpdateBranch: (nodeKey: string, value: { choiceGroup?: string; condition?: string }) => void;
  onChangeEdgeType: (edgeKey: string, type: RelationType) => void;
  onReverseEdge: (edgeKey: string) => void;
  onRemoveEdge: (edgeKey: string) => void;
}

/** Details and actions of the selected course, slot or relation on the admin canvas. */
export function NodeInspector({
  node,
  edge,
  labelOf,
  readOnly,
  onRemoveNode,
  onEditSlot,
  onUpdateGroup,
  onUpdateBranch,
  onChangeEdgeType,
  onReverseEdge,
  onRemoveEdge,
}: NodeInspectorProps) {
  const { t } = useTranslation();

  if (edge) {
    return (
      <div data-testid="edge-inspector">
        <UiText strong>
          {labelOf(edge.sourceKey)} → {labelOf(edge.targetKey)}
        </UiText>
        <UiRadioGroup
          value={edge.type}
          disabled={readOnly}
          onChange={(e) => onChangeEdgeType(edge.edgeKey, e.target.value)}
          style={{ display: 'block', margin: '12px 0' }}
        >
          <UiSpace direction="vertical">
            {Object.values(RelationType).map((type) => (
              <UiRadio key={type} value={type}>
                {t(`roadmap.relation.${type}`)}
              </UiRadio>
            ))}
          </UiSpace>
        </UiRadioGroup>
        {!readOnly ? (
          <UiSpace>
            <UiButton size="small" onClick={() => onReverseEdge(edge.edgeKey)}>
              {t('roadmap.relation.reverse')}
            </UiButton>
            <UiButton size="small" danger icon={<UiDeleteIcon />} onClick={() => onRemoveEdge(edge.edgeKey)}>
              {t('config.common.delete')}
            </UiButton>
          </UiSpace>
        ) : null}
      </div>
    );
  }

  if (!node) return null;

  if (node.kind === 'ELECTIVE_SLOT') {
    return (
      <div data-testid="node-inspector">
        <UiTag color="purple">{t('roadmap.slot.title')}</UiTag>
        <UiDescriptions
          column={1}
          size="small"
          style={{ marginTop: 8 }}
          items={[
            { key: 'label', label: t('roadmap.slot.label'), children: node.slotLabel },
            { key: 'credits', label: t('config.course.credits'), children: `(${node.slotTheoryCredits ?? 0},${node.slotLabCredits ?? 0})` },
            { key: 'group', label: t('roadmap.slot.group'), children: node.electiveGroup || t('roadmap.canvas.freeElective') },
            {
              key: 'branch',
              label: t('roadmap.branch.title'),
              children: (
                <BranchEditor
                  choiceGroup={node.choiceGroup}
                  condition={node.condition}
                  readOnly={readOnly}
                  onChange={(value) => onUpdateBranch(node.nodeKey, value)}
                />
              ),
            },
          ]}
        />
        {!readOnly ? (
          <UiSpace style={{ marginTop: 8 }}>
            <UiButton size="small" icon={<UiEditIcon />} onClick={() => onEditSlot(node)}>
              {t('config.common.edit')}
            </UiButton>
            <UiButton size="small" danger icon={<UiDeleteIcon />} onClick={() => onRemoveNode(node.nodeKey)}>
              {t('config.common.delete')}
            </UiButton>
          </UiSpace>
        ) : null}
      </div>
    );
  }

  return (
    <div data-testid="node-inspector">
      <UiText strong>
        {node.course?.code} — {node.course?.name}
      </UiText>
      <UiDescriptions
        column={1}
        size="small"
        style={{ marginTop: 8 }}
        items={[
          {
            key: 'credits',
            label: t('config.course.credits'),
            children: `${(node.course?.theoryCredits ?? 0) + (node.course?.labCredits ?? 0)} (${node.course?.theoryCredits},${node.course?.labCredits})`,
          },
          {
            key: 'grading',
            label: t('config.course.gradingMode'),
            children: node.course ? t(`roadmap.gradingMode.${node.course.gradingMode}`) : '—',
          },
          {
            key: 'group',
            label: t('roadmap.slot.poolGroup'),
            children: readOnly ? (
              node.electiveGroup || '—'
            ) : (
              <UiInput
                size="small"
                maxLength={EntityConstant.ElectiveGroup}
                placeholder={t('roadmap.slot.poolGroupPlaceholder')}
                defaultValue={node.electiveGroup}
                key={node.nodeKey}
                onBlur={(e) => onUpdateGroup(node.nodeKey, e.target.value.trim() || undefined)}
              />
            ),
          },
          {
            key: 'branch',
            label: t('roadmap.branch.title'),
            children: (
              <BranchEditor
                choiceGroup={node.choiceGroup}
                condition={node.condition}
                readOnly={readOnly}
                onChange={(value) => onUpdateBranch(node.nodeKey, value)}
              />
            ),
          },
        ]}
      />
      {!readOnly ? (
        <UiButton size="small" danger icon={<UiDeleteIcon />} onClick={() => onRemoveNode(node.nodeKey)} style={{ marginTop: 8 }}>
          {t('roadmap.canvas.removeCourse')}
        </UiButton>
      ) : null}
    </div>
  );
}
