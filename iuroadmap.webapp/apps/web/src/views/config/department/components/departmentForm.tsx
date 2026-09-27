import { useEffect } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DepartmentsZod, type CreateDepartmentDto } from '@iuroadmap/api-gen';
import { UiForm, UiRow, UiCol, UiCard, UiInputField, UiTextAreaField, UiFormActions } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';

export type DepartmentFormValues = CreateDepartmentDto;

export interface DepartmentFormProps {
  defaultValues?: Partial<DepartmentFormValues>;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (values: DepartmentFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

function emptyDefaults(): Partial<DepartmentFormValues> {
  return { name: '', slug: '', description: '' };
}

export function DepartmentForm({
  defaultValues,
  loading,
  submitLabel,
  onSubmit,
  onCancel,
}: DepartmentFormProps) {
  const { t } = useTranslation();
  const form = useForm<DepartmentFormValues>({
    defaultValues: { ...emptyDefaults(), ...defaultValues } as DepartmentFormValues,
    resolver: zodResolver(DepartmentsZod.DepartmentsControllerCreateBody) as never,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { handleSubmit, reset, control, formState: { errors } } = form;

  useEffect(() => {
    if (defaultValues) reset({ ...emptyDefaults(), ...defaultValues } as DepartmentFormValues);
  }, [defaultValues, reset]);

  const submit: SubmitHandler<DepartmentFormValues> = async (values) => {
    await onSubmit(values);
  };

  return (
    <UiForm layout="vertical" onFinish={handleSubmit(submit)}>
      <UiCard title={t('config.department.info')} style={{ marginBottom: 16 }}>
        <UiRow gutter={[16, 0]}>
          <UiCol xs={24} md={12}>
            <UiInputField
              name="name"
              control={control as any}
              label={t('config.department.name')}
              required
              placeholder={t('config.department.namePlaceholder')}
            />
          </UiCol>
          <UiCol xs={24} md={12}>
            <UiInputField
              name="slug"
              control={control as any}
              label={t('config.department.slug')}
              required
              placeholder={t('config.department.slugPlaceholder')}
            />
          </UiCol>
        </UiRow>
        <UiRow gutter={[16, 0]}>
          <UiCol xs={24}>
            <UiTextAreaField
              name="description"
              control={control as any}
              label={t('config.department.description')}
              placeholder={t('config.department.descriptionPlaceholder')}
              rows={3}
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