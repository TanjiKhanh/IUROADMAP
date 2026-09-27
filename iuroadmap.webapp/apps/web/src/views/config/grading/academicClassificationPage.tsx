import { useEffect, useMemo } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import {
  GradingZod,
  useGradingControllerGetClassifications,
  useGradingControllerSaveClassifications,
  type AcademicClassificationResponse,
  type AcademicClassificationSaveRequest,
} from '@iuroadmap/api-gen';
import { validateClassificationBands } from '@iuroadmap/shared/roadmap-engine';
import {
  UiAlert,
  UiButton,
  UiColumnsType,
  UiDeleteIcon,
  UiForm,
  UiInput,
  UiInputNumber,
  UiPlusIcon,
  UiSkeleton,
  UiSpace,
  UiTable,
  UiText,
  useToast,
} from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../../api/apiResult';

type Row = AcademicClassificationSaveRequest['items'][number];

/** ACADEMIC_CLASSIFICATIONS on the 100-point GPA (IU handbook 2022); labels are i18n keys. */
export function AcademicClassificationPage() {
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const queryClient = useQueryClient();
  const { data: raw, isLoading } = useGradingControllerGetClassifications();
  const { mutateAsync: save, isPending } = useGradingControllerSaveClassifications();

  const loaded = useMemo<Row[]>(
    () =>
      (unwrapData<AcademicClassificationResponse[]>(raw) ?? []).map((c) => ({
        labelKey: c.labelKey,
        minGpa100: c.minGpa100,
        maxGpa100: c.maxGpa100,
      })),
    [raw],
  );

  const form = useForm<AcademicClassificationSaveRequest>({
    defaultValues: { items: [] },
    resolver: zodResolver(GradingZod.GradingControllerSaveClassificationsBody) as never,
  });
  const { control, handleSubmit, reset } = form;
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  const items = useWatch({ control, name: 'items' }) ?? [];

  useEffect(() => reset({ items: loaded }), [loaded, reset]);

  const problems = useMemo(
    () =>
      validateClassificationBands(
        items.map((i) => ({ labelKey: i.labelKey, minGpa100: Number(i.minGpa100), maxGpa100: Number(i.maxGpa100) })),
      ),
    [items],
  );

  const columns: UiColumnsType<{ id: string; index: number }> = [
    {
      key: 'labelKey',
      title: t('config.grading.labelKey'),
      render: (_v, row) => (
        <Controller
          control={control}
          name={`items.${row.index}.labelKey`}
          render={({ field }) => (
            <div>
              <UiInput {...field} maxLength={100} />
              <UiText type="secondary" style={{ fontSize: 12 }}>
                {field.value ? t(field.value) : ''}
              </UiText>
            </div>
          )}
        />
      ),
    },
    {
      key: 'min',
      title: t('config.grading.minGpa'),
      render: (_v, row) => (
        <Controller
          control={control}
          name={`items.${row.index}.minGpa100`}
          render={({ field }) => <UiInputNumber {...field} min={0} max={100} step={1} style={{ width: 100 }} />}
        />
      ),
    },
    {
      key: 'max',
      title: t('config.grading.maxGpa'),
      render: (_v, row) => (
        <Controller
          control={control}
          name={`items.${row.index}.maxGpa100`}
          render={({ field }) => <UiInputNumber {...field} min={0} max={100} step={1} style={{ width: 100 }} />}
        />
      ),
    },
    {
      key: 'actions',
      title: '',
      width: 60,
      render: (_v, row) => <UiButton type="text" danger icon={<UiDeleteIcon />} onClick={() => remove(row.index)} aria-label={t('config.common.delete')} />,
    },
  ];

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 6 }} />;

  return (
    <UiForm
      onFinish={handleSubmit(async (values) => {
        try {
          await save({ data: { items: [...values.items].sort((a, b) => b.minGpa100 - a.minGpa100) } });
          toast.success(t('config.common.success'));
          queryClient.invalidateQueries();
        } catch (err: unknown) {
          toast.error(apiErrorMessage(err, t, t('config.common.saveFailed')));
        }
      })}
    >
      {toastContextHolder}
      <UiAlert type="info" showIcon message={t('config.grading.classificationHint')} style={{ marginBottom: 12 }} />
      {problems.length ? (
        <UiAlert type="warning" showIcon message={t('config.grading.coverageProblems')} description={problems.join(' · ')} style={{ marginBottom: 12 }} />
      ) : null}
      <UiTable columns={columns} dataSource={fields.map((f, index) => ({ id: f.id, index }))} rowKey="id" pagination={false} size="small" />
      <UiSpace style={{ marginTop: 12, width: '100%', justifyContent: 'space-between' }}>
        <UiButton icon={<UiPlusIcon />} onClick={() => append({ labelKey: 'roadmap.classification.', minGpa100: 0, maxGpa100: 0 })}>
          {t('config.grading.addBand')}
        </UiButton>
        <UiButton type="primary" htmlType="submit" loading={isPending} disabled={problems.length > 0}>
          {t('config.common.save')}
        </UiButton>
      </UiSpace>
    </UiForm>
  );
}
