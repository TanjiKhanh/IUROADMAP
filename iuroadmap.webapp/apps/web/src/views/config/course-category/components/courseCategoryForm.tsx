import { useEffect } from 'react';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseCategoriesZod, type CourseCategoryCreateRequest } from '@iuroadmap/api-gen';
import {
  UiCard,
  UiCol,
  UiColorField,
  UiForm,
  UiFormActions,
  UiInputField,
  UiNumberField,
  UiRow,
  UiText,
} from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { CourseNodeCard } from '../../../../components/semester-canvas';

export type CourseCategoryFormValues = CourseCategoryCreateRequest;

export interface CourseCategoryFormProps {
  defaultValues?: Partial<CourseCategoryFormValues>;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (values: CourseCategoryFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

function emptyDefaults(): Partial<CourseCategoryFormValues> {
  return { code: '', name: '', fillColor: '#FFFFFF', borderColor: '#2F5597', sortOrder: 0 };
}

/** Course category = node colors on the canvas (D12). */
export function CourseCategoryForm({ defaultValues, loading, submitLabel, onSubmit, onCancel }: CourseCategoryFormProps) {
  const { t } = useTranslation();
  const form = useForm<CourseCategoryFormValues>({
    defaultValues: { ...emptyDefaults(), ...defaultValues } as CourseCategoryFormValues,
    resolver: zodResolver(CourseCategoriesZod.CourseCategoriesControllerCreateBody) as never,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { handleSubmit, reset, control } = form;
  const [code, name, fillColor, borderColor] = useWatch({ control, name: ['code', 'name', 'fillColor', 'borderColor'] });

  useEffect(() => {
    if (defaultValues) reset({ ...emptyDefaults(), ...defaultValues } as CourseCategoryFormValues);
  }, [defaultValues, reset]);

  const submit: SubmitHandler<CourseCategoryFormValues> = async (values) => {
    await onSubmit({ ...values, code: values.code.trim().toUpperCase() });
  };

  return (
    <UiForm layout="vertical" onFinish={handleSubmit(submit)}>
      <UiCard title={t('config.courseCategory.info')} style={{ marginBottom: 16 }}>
        <UiRow gutter={[16, 0]}>
          <UiCol xs={24} md={8}>
            <UiInputField name="code" control={control} label={t('config.courseCategory.code')} required placeholder="MAJOR" />
          </UiCol>
          <UiCol xs={24} md={10}>
            <UiInputField name="name" control={control} label={t('config.courseCategory.name')} required />
          </UiCol>
          <UiCol xs={24} md={6}>
            <UiNumberField name="sortOrder" control={control} label={t('config.courseCategory.sortOrder')} min={0} precision={0} />
          </UiCol>
          <UiCol xs={12} md={8}>
            <UiColorField name="fillColor" control={control} label={t('config.courseCategory.fillColor')} required />
          </UiCol>
          <UiCol xs={12} md={8}>
            <UiColorField name="borderColor" control={control} label={t('config.courseCategory.borderColor')} required />
          </UiCol>
          <UiCol xs={24} md={8}>
            <UiText type="secondary" style={{ display: 'block', marginBottom: 8 }}>
              {t('config.courseCategory.preview')}
            </UiText>
            <CourseNodeCard
              code="IT089IU"
              name={name || code || t('config.courseCategory.previewName')}
              theoryCredits={3}
              labCredits={1}
              fillColor={fillColor || '#FFFFFF'}
              borderColor={borderColor || '#000000'}
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
