import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCourseCategoriesControllerGetById,
  useCourseCategoriesControllerUpdate,
  type CourseCategoryResponse,
} from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiCard, UiResult, UiSkeleton, useToast } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../../api/apiResult';
import { CourseCategoryForm, type CourseCategoryFormValues } from './components/courseCategoryForm';

export function CourseCategoryEditPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id = '' } = useParams<{ id: string }>();
  const numericId = Number(id);
  const { toast, toastContextHolder } = useToast();
  const { mutateAsync: update, isPending } = useCourseCategoriesControllerUpdate();

  const { data: raw, isLoading, isError } = useCourseCategoriesControllerGetById(numericId, {
    query: { enabled: Boolean(id) && !isNaN(numericId) },
  });
  const record = unwrapData<CourseCategoryResponse>(raw);

  const defaults = useMemo<Partial<CourseCategoryFormValues> | undefined>(
    () =>
      record
        ? {
            code: record.code,
            name: record.name,
            fillColor: record.fillColor,
            borderColor: record.borderColor,
            sortOrder: record.sortOrder,
          }
        : undefined,
    [record],
  );

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 6 }} />;
  if (isError || !record) return <UiResult status="error" title={t('config.common.failedToLoad')} />;

  return (
    <UiCard title={t('config.courseCategory.edit')} style={{ margin: '0 auto', maxWidth: 900 }}>
      {toastContextHolder}
      <CourseCategoryForm
        defaultValues={defaults}
        loading={isPending}
        submitLabel={t('config.common.save')}
        onCancel={() => navigate(RoutePaths.web.config.courseCategory.root)}
        onSubmit={async (values) => {
          try {
            await update({ data: { ...values, id: numericId } });
            toast.success(t('config.common.success'));
            navigate(RoutePaths.web.config.courseCategory.root);
          } catch (err: unknown) {
            toast.error(apiErrorMessage(err, t, t('config.common.saveFailed')));
          }
        }}
      />
    </UiCard>
  );
}
