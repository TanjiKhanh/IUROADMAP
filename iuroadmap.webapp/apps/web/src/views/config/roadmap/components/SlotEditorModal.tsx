import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdminCanvasZod } from '@iuroadmap/api-gen';
import { UiCol, UiForm, UiInputField, UiModal, UiNumberField, UiRow } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import type { SlotInput } from '../hooks/useCurriculumEditor';

// Slot fields of a canvas node, validated with the generated canvas schema.
const slotSchema = AdminCanvasZod.CanvasControllerSaveBody.shape.nodes.element.pick({
  slotLabel: true,
  slotTheoryCredits: true,
  slotLabCredits: true,
  electiveGroup: true,
});

export interface SlotEditorModalProps {
  open: boolean;
  initial?: Partial<SlotInput>;
  onSave: (slot: SlotInput) => void;
  onCancel: () => void;
}

/** Elective slot "Elective CS1 (3,1)": the learner picks a course of the group later (FR-RDM.05.5). */
export function SlotEditorModal({ open, initial, onSave, onCancel }: SlotEditorModalProps) {
  const { t } = useTranslation();
  const { control, handleSubmit, reset, setError } = useForm<SlotInput>({
    defaultValues: { slotLabel: '', slotTheoryCredits: 3, slotLabCredits: 0, electiveGroup: '' },
    resolver: zodResolver(slotSchema) as never,
  });

  useEffect(() => {
    if (open) reset({ slotLabel: '', slotTheoryCredits: 3, slotLabCredits: 0, electiveGroup: '', ...initial });
  }, [open, initial, reset]);

  const submit = handleSubmit((values) => {
    // Optional on the DTO, but a slot cannot be saved without a label (canvas save rule)
    if (!values.slotLabel?.trim()) {
      setError('slotLabel', { message: t('roadmap.slot.labelRequired') });
      return;
    }
    onSave({
      slotLabel: values.slotLabel.trim(),
      slotTheoryCredits: values.slotTheoryCredits ?? 0,
      slotLabCredits: values.slotLabCredits ?? 0,
      electiveGroup: values.electiveGroup?.trim() || undefined,
    });
  });

  return (
    <UiModal
      open={open}
      title={initial?.slotLabel ? t('roadmap.slot.edit') : t('roadmap.slot.add')}
      okText={t('config.common.save')}
      cancelText={t('config.common.cancel')}
      onOk={submit}
      onCancel={onCancel}
    >
      <UiForm layout="vertical" onFinish={submit}>
        <UiInputField name="slotLabel" control={control} label={t('roadmap.slot.label')} required placeholder="Elective CS1" />
        <UiRow gutter={12}>
          <UiCol span={12}>
            <UiNumberField name="slotTheoryCredits" control={control} label={t('config.course.theoryCredits')} min={0} precision={0} />
          </UiCol>
          <UiCol span={12}>
            <UiNumberField name="slotLabCredits" control={control} label={t('config.course.labCredits')} min={0} precision={0} />
          </UiCol>
        </UiRow>
        <UiInputField name="electiveGroup" control={control} label={t('roadmap.slot.group')} placeholder={t('roadmap.slot.groupPlaceholder')} />
      </UiForm>
    </UiModal>
  );
}
