import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLecturersControllerGetById, useLecturersControllerUpdate, type LecturerResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiCard, UiResult, UiSkeleton, useToast } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../../api/apiResult';
import { LecturerForm, type LecturerFormValues } from './components/lecturerForm';

export function LecturerEditPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id = '' } = useParams<{ id: string }>();
  const numericId = Number(id);
  const { toast, toastContextHolder } = useToast();
  const { mutateAsync: update, isPending } = useLecturersControllerUpdate();

  const { data: raw, isLoading, isError } = useLecturersControllerGetById(numericId, {
    query: { enabled: Boolean(id) && !isNaN(numericId) },
  });
  const record = unwrapData<LecturerResponse>(raw);

  const defaults = useMemo<Partial<LecturerFormValues> | undefined>(
    () =>
      record
        ? {
            fullName: record.fullName,
            title: record.title ?? '',
            departmentId: record.departmentId,
            email: record.email ?? '',
            status: record.status,
          }
        : undefined,
    [record],
  );

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 6 }} />;
  if (isError || !record) return <UiResult status="error" title={t('config.common.failedToLoad')} />;

  return (
    <UiCard title={t('config.lecturer.edit')} style={{ margin: '0 auto', maxWidth: 800 }}>
      {toastContextHolder}
      <LecturerForm
        defaultValues={defaults}
        loading={isPending}
        submitLabel={t('config.common.save')}
        onCancel={() => navigate(RoutePaths.web.config.lecturer.root)}
        onSubmit={async (values) => {
          try {
            await update({ data: { ...values, id: numericId } });
            toast.success(t('config.common.success'));
            navigate(RoutePaths.web.config.lecturer.root);
          } catch (err: unknown) {
            toast.error(apiErrorMessage(err, t, t('config.common.saveFailed')));
          }
        }}
      />
    </UiCard>
  );
}
