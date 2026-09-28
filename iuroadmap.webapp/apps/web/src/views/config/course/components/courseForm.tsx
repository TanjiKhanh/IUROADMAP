import { useEffect } from 'react';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CoursesZod, GradingMode, type CourseCreateRequest } from '@iuroadmap/api-gen';
import {
  UiCard,
  UiCol,
  UiForm,
  UiFormActions,
  UiInputField,
  UiNumberField,
  UiRow,
  UiSelectField,
  UiSwitchField,
  UiTextAreaField,
} from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useCourseCategories } from '../../../../hooks/useMasterDataOptions';
import { CourseNodeCard } from '../../../../components/semester-canvas';

export type CourseFormValues = CourseCreateRequest;

export interface CourseFormProps {
  defaultValues?: Partial<CourseFormValues>;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (values: CourseFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

function emptyDefaults(): Partial<CourseFormValues> {
  return {
    code: '',
    name: '',
    theoryCredits: 3,
    labCredits: 0,
    gradingMode: GradingMode.SCORE,
    countsTowardGpa: true,
    countsTowardCredits: true,
    description: '',
  };
}

/** Stable course of the catalog (D3/D16); year-specific data lives on the course offering. */
export function CourseForm({ defaultValues, loading, submitLabel, onSubmit, onCancel }: CourseFormProps) {
  const { t } = useTranslation();
  const { categories, isLoading: categoriesLoading } = useCourseCategories();
  const form = useForm<CourseFormValues>({
    defaultValues: { ...emptyDefaults(), ...defaultValues } as CourseFormValues,
    resolver: zodResolver(CoursesZod.CoursesControllerCreateBody) as never,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { handleSubmit, reset, control, setValue } = form;
  const [code, name, theoryCredits, labCredits, categoryId, gradingMode] = useWatch({
    control,
    name: ['code', 'name', 'theoryCredits', 'labCredits', 'categoryId', 'gradingMode'],
  });
  const category = categories.find((c) => c.id === categoryId);
  const isPassFail = gradingMode === GradingMode.PASS_FAIL;

  useEffect(() => {
    if (defaultValues) reset({ ...emptyDefaults(), ...defaultValues } as CourseFormValues);
  }, [defaultValues, reset]);

  // Pass/fail courses have no grade point, so they never count in the GPA (design §9.1).
  useEffect(() => {
    if (isPassFail) setValue('countsTowardGpa', false);
  }, [isPassFail, setValue]);

  const submit: SubmitHandler<CourseFormValues> = async (values) => {
    await onSubmit({ ...values, code: values.code.trim().toUpperCase() });
  };

  return (
    <UiForm layout="vertical" onFinish={handleSubmit(submit)}>
      <UiCard title={t('config.course.info')} style={{ marginBottom: 16 }}>
        <UiRow gutter={[16, 0]}>
          <UiCol xs={24} md={6}>
            <UiInputField name="code" control={control} label={t('config.course.code')} required placeholder="IT089IU" />
          </UiCol>
          <UiCol xs={24} md={12}>
            <UiInputField name="name" control={control} label={t('config.course.name')} required />
          </UiCol>
          <UiCol xs={12} md={3}>
            <UiNumberField name="theoryCredits" control={control} label={t('config.course.theoryCredits')} required min={0} precision={0} />
          </UiCol>
          <UiCol xs={12} md={3}>
            <UiNumberField name="labCredits" control={control} label={t('config.course.labCredits')} required min={0} precision={0} />
          </UiCol>
          <UiCol xs={24} md={12}>
            <UiSelectField
              name="categoryId"
              control={control}
              label={t('config.course.category')}
              required
              loading={categoriesLoading}
              placeholder={t('config.course.categoryPlaceholder')}
              options={categories.map((c) => ({
                value: c.id,
                label: (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 14, height: 10, background: c.fillColor, border: `2px solid ${c.borderColor}`, borderRadius: 2 }} />
                    {c.name}
                  </span>
                ),
              }))}
            />
          </UiCol>
          <UiCol xs={24} md={12}>
            <UiSelectField
              name="gradingMode"
              control={control}
              label={t('config.course.gradingMode')}
              options={[
                { value: GradingMode.SCORE, label: t('roadmap.gradingMode.SCORE') },
                { value: GradingMode.PASS_FAIL, label: t('roadmap.gradingMode.PASS_FAIL') },
              ]}
            />
          </UiCol>
          <UiCol xs={12} md={6}>
            <UiSwitchField
              name="countsTowardGpa"
              control={control}
              label={t('config.course.countsTowardGpa')}
              disabled={isPassFail}
              help={isPassFail ? t('config.course.passFailNoGpa') : undefined}
            />
          </UiCol>
          <UiCol xs={12} md={6}>
            <UiSwitchField
              name="countsTowardCredits"
              control={control}
              label={t('config.course.countsTowardCredits')}
              help={t('config.course.countsTowardCreditsHelp')}
            />
          </UiCol>
          <UiCol xs={24} md={12}>
            <div style={{ color: '#64748b', fontSize: 12, marginBottom: 8 }}>{t('config.courseCategory.preview')}</div>
            <CourseNodeCard
              code={code || 'CODE'}
              name={name || '—'}
              theoryCredits={theoryCredits ?? 0}
              labCredits={labCredits ?? 0}
              fillColor={category?.fillColor ?? '#FFFFFF'}
              borderColor={category?.borderColor ?? '#94A3B8'}
            />
          </UiCol>
          <UiCol xs={24}>
            <UiTextAreaField name="description" control={control} label={t('config.course.description')} rows={3} />
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
