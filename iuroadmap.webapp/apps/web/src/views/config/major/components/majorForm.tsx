import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MajorsZod, type MajorCreateRequest } from '@iuroadmap/api-gen';
import { UiForm, UiRow, UiCol, UiCard, UiInputField, UiSelectField, UiTextAreaField, UiFormActions } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useDepartmentOptions } from '../../../../hooks/useMasterDataOptions';

export type MajorFormValues = MajorCreateRequest;

export interface MajorFormProps {
  defaultValues?: Partial<MajorFormValues>;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (values: MajorFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

function emptyDefaults(): Partial<MajorFormValues> {
  return { name: '', slug: '', description: '' };
}

/** Major (program). Total credits live on each curriculum year, not here (D9). */
export function MajorForm({ defaultValues, loading, submitLabel, onSubmit, onCancel }: MajorFormProps) {
  const { t } = useTranslation();
  const { options: departmentOptions, isLoading: departmentsLoading } = useDepartmentOptions();
  const form = useForm<MajorFormValues>({
    defaultValues: { ...emptyDefaults(), ...defaultValues } as MajorFormValues,
    resolver: zodResolver(MajorsZod.MajorsControllerCreateBody) as never,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { handleSubmit, reset, control } = form;

  useEffect(() => {
    if (defaultValues) reset({ ...emptyDefaults(), ...defaultValues } as MajorFormValues);
  }, [defaultValues, reset]);

  const submit: SubmitHandler<MajorFormValues> = async (values) => {
    await onSubmit(values);
  };

  return (
    <UiForm layout="vertical" onFinish={handleSubmit(submit)}>
      <UiCard title={t('config.major.info')} style={{ marginBottom: 16 }}>
        <UiRow gutter={[16, 0]}>
          <UiCol xs={24} md={12}>
            <UiInputField name="name" control={control} label={t('config.major.name')} required placeholder={t('config.major.namePlaceholder')} />
          </UiCol>
          <UiCol xs={24} md={12}>
            <UiInputField name="slug" control={control} label={t('config.major.slug')} required placeholder={t('config.major.slugPlaceholder')} />
          </UiCol>
          <UiCol xs={24} md={12}>
            <UiSelectField
              name="departmentId"
              control={control}
              label={t('config.major.department')}
              required
              options={departmentOptions}
              loading={departmentsLoading}
              placeholder={t('config.major.departmentPlaceholder')}
            />
          </UiCol>
          <UiCol xs={24}>
            <UiTextAreaField name="description" control={control} label={t('config.major.description')} rows={3} />
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
