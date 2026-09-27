import { useEffect, useMemo } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import {
  GradingZod,
  useGradingControllerGetGradeScales,
  useGradingControllerSaveGradeScales,
  type GradeScaleResponse,
  type GradeScaleSaveRequest,
} from '@iuroadmap/api-gen';
import { validateGradeBands } from '@iuroadmap/shared/roadmap-engine';
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
  UiSwitch,
  UiTable,
  useToast,
} from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../../api/apiResult';

type Row = GradeScaleSaveRequest['items'][number];

/** GRADE_SCALES: bands must cover 0..100 without gap or overlap (BR-RM-14). */
export function GradeScalePage() {
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const queryClient = useQueryClient();
  const { data: raw, isLoading } = useGradingControllerGetGradeScales();
  const { mutateAsync: save, isPending } = useGradingControllerSaveGradeScales();

  const loaded = useMemo<Row[]>(
    () =>
      (unwrapData<GradeScaleResponse[]>(raw) ?? []).map((b) => ({
        letter: b.letter,
        minScore: b.minScore,
        maxScore: b.maxScore,
        gradePoint: b.gradePoint,
        isPassing: b.isPassing,
      })),
    [raw],
  );

  const form = useForm<GradeScaleSaveRequest>({
    defaultValues: { items: [] },
    resolver: zodResolver(GradingZod.GradingControllerSaveGradeScalesBody) as never,
  });
  const { control, handleSubmit, reset } = form;
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  const items = useWatch({ control, name: 'items' }) ?? [];

  useEffect(() => reset({ items: loaded }), [loaded, reset]);

  const problems = useMemo(
    () =>
      validateGradeBands(
        items.map((i) => ({
          letter: i.letter,
          minScore: Number(i.minScore),
          maxScore: Number(i.maxScore),
          gradePoint: Number(i.gradePoint),
          isPassing: Boolean(i.isPassing),
        })),
      ),
    [items],
  );

  const columns: UiColumnsType<{ id: string; index: number }> = [
    {
      key: 'letter',
      title: t('config.grading.letter'),
      width: 110,
      render: (_v, row) => (
        <Controller control={control} name={`items.${row.index}.letter`} render={({ field }) => <UiInput {...field} maxLength={10} />} />
      ),
    },
    {
      key: 'min',
      title: t('config.grading.minScore'),
      render: (_v, row) => (
        <Controller
          control={control}
          name={`items.${row.index}.minScore`}
          render={({ field }) => <UiInputNumber {...field} min={0} max={100} precision={0} style={{ width: 100 }} />}
        />
      ),
    },
    {
      key: 'max',
      title: t('config.grading.maxScore'),
      render: (_v, row) => (
        <Controller
          control={control}
          name={`items.${row.index}.maxScore`}
          render={({ field }) => <UiInputNumber {...field} min={0} max={100} precision={0} style={{ width: 100 }} />}
        />
      ),
    },
    {
      key: 'gradePoint',
      title: t('config.grading.gradePoint'),
      render: (_v, row) => (
        <Controller
          control={control}
          name={`items.${row.index}.gradePoint`}
          render={({ field }) => <UiInputNumber {...field} min={0} max={4} step={0.5} precision={1} style={{ width: 100 }} />}
        />
      ),
    },
    {
      key: 'isPassing',
      title: t('config.grading.isPassing'),
      render: (_v, row) => (
        <Controller
          control={control}
          name={`items.${row.index}.isPassing`}
          render={({ field }) => <UiSwitch checked={Boolean(field.value)} onChange={field.onChange} />}
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

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 8 }} />;

  return (
    <UiForm
      onFinish={handleSubmit(async (values) => {
        try {
          await save({ data: { items: [...values.items].sort((a, b) => b.minScore - a.minScore) } });
          toast.success(t('config.common.success'));
          queryClient.invalidateQueries();
        } catch (err: unknown) {
          toast.error(apiErrorMessage(err, t, t('config.common.saveFailed')));
        }
      })}
    >
      {toastContextHolder}
      <UiAlert type="info" showIcon message={t('config.grading.scaleHint')} style={{ marginBottom: 12 }} />
      {problems.length ? (
        <UiAlert
          type="warning"
          showIcon
          message={t('config.grading.coverageProblems')}
          description={problems.join(' · ')}
          style={{ marginBottom: 12 }}
        />
      ) : null}
      <UiTable
        columns={columns}
        dataSource={fields.map((f, index) => ({ id: f.id, index }))}
        rowKey="id"
        pagination={false}
        size="small"
      />
      <UiSpace style={{ marginTop: 12, width: '100%', justifyContent: 'space-between' }}>
        <UiButton icon={<UiPlusIcon />} onClick={() => append({ letter: '', minScore: 0, maxScore: 0, gradePoint: 0, isPassing: false })}>
          {t('config.grading.addBand')}
        </UiButton>
        <UiButton type="primary" htmlType="submit" loading={isPending} disabled={problems.length > 0}>
          {t('config.common.save')}
        </UiButton>
      </UiSpace>
    </UiForm>
  );
}
