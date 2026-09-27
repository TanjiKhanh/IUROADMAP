import { useNavigate } from 'react-router-dom';
import { useCourseCategoriesControllerCreate } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiCard, useToast } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage } from '../../../api/apiResult';
import { CourseCategoryForm } from './components/courseCategoryForm';

export function CourseCategoryCreatePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const { mutateAsync: create, isPending } = useCourseCategoriesControllerCreate();

  return (
    <UiCard title={t('config.courseCategory.create')} style={{ margin: '0 auto', maxWidth: 900 }}>
      {toastContextHolder}
      <CourseCategoryForm
        loading={isPending}
        submitLabel={t('config.common.add')}
        onCancel={() => navigate(RoutePaths.web.config.courseCategory.root)}
        onSubmit={async (values) => {
          try {
            await create({ data: values });
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
