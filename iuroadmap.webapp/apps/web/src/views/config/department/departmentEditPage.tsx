import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDepartmentsControllerGetById,
  useDepartmentsControllerUpdate,
  type DepartmentResponse,
} from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiSkeleton, UiResult, UiCard, useToast } from '../../../uikit';
import { DepartmentForm, type DepartmentFormValues } from './components/departmentForm';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../../api/apiResult';

export function DepartmentEditPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id = '' } = useParams<{ id: string }>();
  const numericId = Number(id);
  const { toast, toastContextHolder } = useToast();
  const { mutateAsync: update, isPending } = useDepartmentsControllerUpdate();

  const { data: raw, isLoading, isError } = useDepartmentsControllerGetById(numericId, {
    query: { enabled: Boolean(id) && !isNaN(numericId) },
  });
  const record = unwrapData<DepartmentResponse>(raw);

  const defaults = useMemo<Partial<DepartmentFormValues> | undefined>(() => {
    if (!record) return undefined;
    return {
      name: record.name ?? '',
      slug: record.slug ?? '',
      description: record.description ?? '',
    };
  }, [record]);

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 6 }} />;
  if (isError || !record) {
    return <UiResult status="error" title={t('config.department.loadFailed')} />;
  }

  return (
    <UiCard title={t('config.department.edit')} style={{ margin: '0 auto', maxWidth: 800 }}>
      {toastContextHolder}
      <DepartmentForm
        defaultValues={defaults}
        loading={isPending}
        submitLabel={t('config.common.save')}
        onCancel={() => navigate(RoutePaths.web.config.department.root)}
        onSubmit={async (values) => {
          try {
            await update({ data: { ...values, id: numericId } });
            toast.success(t('config.department.updated'));
            navigate(RoutePaths.web.config.department.root);
          } catch (err: unknown) {
            toast.error(apiErrorMessage(err, t, t('config.department.updateFailed')));
          }
        }}
      />
    </UiCard>
  );
}
