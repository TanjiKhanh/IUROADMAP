import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMajorsControllerGetById, useMajorsControllerUpdate, type MajorResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiCard, UiResult, UiSkeleton, useToast } from '../../../uikit';
import { MajorForm, type MajorFormValues } from './components/majorForm';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../../api/apiResult';

export function MajorEditPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id = '' } = useParams<{ id: string }>();
  const numericId = Number(id);
  const { toast, toastContextHolder } = useToast();
  const { mutateAsync: update, isPending } = useMajorsControllerUpdate();

  const { data: raw, isLoading, isError } = useMajorsControllerGetById(numericId, {
    query: { enabled: Boolean(id) && !isNaN(numericId) },
  });
  const record = unwrapData<MajorResponse>(raw);

  const defaults = useMemo<Partial<MajorFormValues> | undefined>(() => {
    if (!record) return undefined;
    return {
      name: record.name,
      slug: record.slug,
      departmentId: record.departmentId,
      description: record.description ?? '',
    };
  }, [record]);

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 6 }} />;
  if (isError || !record) return <UiResult status="error" title={t('config.common.failedToLoad')} />;

  const backToDetail = () => navigate(RoutePaths.web.config.major.detail.replace(':id', String(numericId)));

  return (
    <UiCard title={t('config.major.edit')} style={{ margin: '0 auto', maxWidth: 800 }}>
      {toastContextHolder}
      <MajorForm
        defaultValues={defaults}
        loading={isPending}
        submitLabel={t('config.common.save')}
        onCancel={backToDetail}
        onSubmit={async (values) => {
          try {
            await update({ data: { ...values, id: numericId } });
            toast.success(t('config.common.success'));
            backToDetail();
          } catch (err: unknown) {
            toast.error(apiErrorMessage(err, t, t('config.major.updateFailed')));
          }
        }}
      />
    </UiCard>
  );
}
