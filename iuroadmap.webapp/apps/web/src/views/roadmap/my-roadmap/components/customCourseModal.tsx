import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StudentRoadmapsZod } from '@iuroadmap/api-gen';
import { UiCol, UiForm, UiInputField, UiModal, UiNumberField, UiRow } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface CustomCourseValues {
  code: string;
  name: string;
  theoryCredits: number;
  labCredits: number;
}

// Custom-course fields of an ADD_NODE op, from the generated change schema.
const opSchema = StudentRoadmapsZod.StudentRoadmapsControllerChangesBody.shape.ops.element.pick({
  customCode: true,
  customName: true,
  customTheoryCredits: true,
  customLabCredits: true,
});

type FormValues = { customCode: string; customName: string; customTheoryCredits: number; customLabCredits: number };

/** A course that is not in the catalog (transfer, exchange…), FR-LRN.04.3. */
export function CustomCourseModal({ open, onSave, onCancel }: { open: boolean; onSave: (v: CustomCourseValues) => void; onCancel: () => void }) {
  const { t } = useTranslation();
  const { control, handleSubmit, reset, setError } = useForm<FormValues>({ resolver: zodResolver(opSchema) as never });

  useEffect(() => {
    if (open) reset({ customCode: '', customName: '', customTheoryCredits: 3, customLabCredits: 0 });
  }, [open, reset]);

  const submit = handleSubmit((v) => {
    // Required together for a custom ADD_NODE (the DTO keeps them optional because catalog adds omit them)
    if (!v.customCode?.trim()) return setError('customCode', { message: t('learner.custom.required') });
    if (!v.customName?.trim()) return setError('customName', { message: t('learner.custom.required') });
    if ((v.customTheoryCredits ?? 0) + (v.customLabCredits ?? 0) <= 0) {
      return setError('customTheoryCredits', { message: t('learner.custom.creditsPositive') });
    }
    onSave({ code: v.customCode.trim(), name: v.customName.trim(), theoryCredits: v.customTheoryCredits ?? 0, labCredits: v.customLabCredits ?? 0 });
  });

  return (
    <UiModal open={open} title={t('learner.custom.title')} okText={t('config.common.add')} cancelText={t('config.common.cancel')} onOk={submit} onCancel={onCancel}>
      <UiForm layout="vertical" onFinish={submit}>
        <UiRow gutter={12}>
          <UiCol span={8}>
            <UiInputField name="customCode" control={control} label={t('config.course.code')} required />
          </UiCol>
          <UiCol span={16}>
            <UiInputField name="customName" control={control} label={t('config.course.name')} required />
          </UiCol>
          <UiCol span={12}>
            <UiNumberField name="customTheoryCredits" control={control} label={t('config.course.theoryCredits')} min={0} precision={0} />
          </UiCol>
          <UiCol span={12}>
            <UiNumberField name="customLabCredits" control={control} label={t('config.course.labCredits')} min={0} precision={0} />
          </UiCol>
        </UiRow>
      </UiForm>
    </UiModal>
  );
}
