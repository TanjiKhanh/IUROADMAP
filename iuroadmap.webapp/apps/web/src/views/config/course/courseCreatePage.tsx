import { useNavigate } from 'react-router-dom';
import { useCoursesControllerCreate } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiCard, useToast } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage } from '../../../api/apiResult';
import { CourseForm } from './components/courseForm';

export function CourseCreatePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const { mutateAsync: create, isPending } = useCoursesControllerCreate();

  return (
    <UiCard title={t('config.course.create')} style={{ margin: '0 auto', maxWidth: 1000 }}>
      {toastContextHolder}
      <CourseForm
        loading={isPending}
        submitLabel={t('config.common.add')}
        onCancel={() => navigate(RoutePaths.web.config.course.root)}
        onSubmit={async (values) => {
          try {
            await create({ data: values });
            toast.success(t('config.common.success'));
            navigate(RoutePaths.web.config.course.root);
          } catch (err: unknown) {
            toast.error(apiErrorMessage(err, t, t('config.common.saveFailed')));
          }
        }}
      />
    </UiCard>
  );
}
