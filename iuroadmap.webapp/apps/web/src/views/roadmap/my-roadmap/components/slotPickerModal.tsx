import { useState } from 'react';
import type { MergedNodeResponse } from '@iuroadmap/api-gen';
import { UiEmpty, UiModal, UiRadio, UiRadioGroup, UiSpace, UiText } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import type { CatalogDragPayload } from '../../../../components/semester-canvas';

export interface SlotPickerModalProps {
  slot: MergedNodeResponse | null;
  /** Courses of the elective pool (the nodes of the ELECTIVE_POOL column) */
  poolNodes: ReadonlyArray<MergedNodeResponse>;
  onPick: (course: CatalogDragPayload) => void;
  onCancel: () => void;
}

export function toPayload(node: MergedNodeResponse): CatalogDragPayload | null {
  const c = node.course;
  if (!c) return null;
  return {
    courseId: c.id,
    code: c.code,
    name: c.name,
    theoryCredits: c.theoryCredits,
    labCredits: c.labCredits,
    fillColor: c.fillColor,
    borderColor: c.borderColor,
    categoryCode: c.categoryCode,
    gradingMode: c.gradingMode,
    countsTowardGpa: c.countsTowardGpa,
    countsTowardCredits: c.countsTowardCredits,
  };
}

/** Fill an elective slot with a course of its group (FR-LRN.04.5). */
export function SlotPickerModal({ slot, poolNodes, onPick, onCancel }: SlotPickerModalProps) {
  const { t } = useTranslation();
  const [courseId, setCourseId] = useState<number>();
  const group = slot?.slot?.electiveGroup;
  const choices = poolNodes.filter((n) => n.course && (!group || n.electiveGroup === group));

  return (
    <UiModal
      open={Boolean(slot)}
      title={t('learner.slot.pickTitle', { label: slot?.slot?.label ?? '' })}
      okText={t('learner.slot.pick')}
      cancelText={t('config.common.cancel')}
      okButtonProps={{ disabled: !courseId }}
      onCancel={onCancel}
      onOk={() => {
        const node = choices.find((n) => n.course?.id === courseId);
        const payload = node ? toPayload(node) : null;
        if (payload) onPick(payload);
        setCourseId(undefined);
      }}
    >
      {group ? <UiText type="secondary">{t('learner.slot.group', { group })}</UiText> : null}
      {choices.length ? (
        <UiRadioGroup value={courseId} onChange={(e) => setCourseId(e.target.value)} style={{ marginTop: 12, width: '100%' }}>
          <UiSpace direction="vertical">
            {choices.map((n) => (
              <UiRadio key={n.nodeKey} value={n.course!.id}>
                <strong>{n.course!.code}</strong> {n.course!.name} ({n.course!.theoryCredits},{n.course!.labCredits})
              </UiRadio>
            ))}
          </UiSpace>
        </UiRadioGroup>
      ) : (
        <UiEmpty image={UiEmpty.PRESENTED_IMAGE_SIMPLE} description={t('learner.slot.noChoice')} />
      )}
    </UiModal>
  );
}
