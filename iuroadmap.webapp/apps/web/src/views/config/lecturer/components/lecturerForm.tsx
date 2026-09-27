import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LecturersZod, LecturerStatus, type LecturerCreateRequest } from '@iuroadmap/api-gen';
import { UiCard, UiCol, UiForm, UiFormActions, UiInputField, UiRow, UiSelectField } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useDepartmentOptions } from '../../../../hooks/useMasterDataOptions';

export type LecturerFormValues = LecturerCreateRequest;

export interface LecturerFormProps {
  defaultValues?: Partial<LecturerFormValues>;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (values: LecturerFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

function emptyDefaults(): Partial<LecturerFormValues> {
  return { fullName: '', title: '', email: '', status: LecturerStatus.ACTIVE };
}

/** Lecturer master data (D17), assigned to course offerings by academic year. */
export function LecturerForm({ defaultValues, loading, submitLabel, onSubmit, onCancel }: LecturerFormProps) {
  const { t } = useTranslation();
  const { options: departmentOptions, isLoading: departmentsLoading } = useDepartmentOptions();
  const form = useForm<LecturerFormValues>({
    defaultValues: { ...emptyDefaults(), ...defaultValues } as LecturerFormValues,
    resolver: zodResolver(LecturersZod.LecturersControllerCreateBody) as never,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { handleSubmit, reset, control } = form;

  useEffect(() => {
    if (defaultValues) reset({ ...emptyDefaults(), ...defaultValues } as LecturerFormValues);
  }, [defaultValues, reset]);

  const submit: SubmitHandler<LecturerFormValues> = async (values) => {
    // Empty optional strings are sent as undefined so the unique email check ignores them
    await onSubmit({ ...values, title: values.title || undefined, email: values.email || undefined });
  };

  return (
    <UiForm layout="vertical" onFinish={handleSubmit(submit)}>
      <UiCard title={t('config.lecturer.info')} style={{ marginBottom: 16 }}>
        <UiRow gutter={[16, 0]}>
          <UiCol xs={24} md={6}>
            <UiInputField name="title" control={control} label={t('config.lecturer.title')} placeholder={t('config.lecturer.titlePlaceholder')} />
          </UiCol>
          <UiCol xs={24} md={18}>
            <UiInputField name="fullName" control={control} label={t('config.lecturer.fullName')} required />
          </UiCol>
          <UiCol xs={24} md={12}>
            <UiSelectField
              name="departmentId"
              control={control}
              label={t('config.lecturer.department')}
              required
              options={departmentOptions}
              loading={departmentsLoading}
            />
          </UiCol>
          <UiCol xs={24} md={12}>
            <UiInputField name="email" control={control} label={t('config.lecturer.email')} type="email" />
          </UiCol>
          <UiCol xs={24} md={12}>
            <UiSelectField
              name="status"
              control={control}
              label={t('config.lecturer.status')}
              options={Object.values(LecturerStatus).map((s) => ({ value: s, label: t(`config.lecturer.statuses.${s}`) }))}
            />
          </UiCol>
        </UiRow>
      </UiCard>

      <UiFormActions
        loading={loading}
        submitLabel={submitLabel ?? t('config.common.save')}
        cancelLabel={t('config.common.cancel')}
        onCancel={onCancel}
      />
    </UiForm>
  );
}
