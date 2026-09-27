import { useNavigate } from 'react-router-dom';
import { useDepartmentsControllerCreate } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiCard, useToast } from '../../../uikit';
import { DepartmentForm } from './components/departmentForm';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage } from '../../../api/apiResult';

export function DepartmentCreatePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const { mutateAsync: create, isPending } = useDepartmentsControllerCreate();

  return (
    <UiCard title={t('config.department.create')} style={{ margin: '0 auto', maxWidth: 800 }}>
      {toastContextHolder}
      <DepartmentForm
        loading={isPending}
        submitLabel={t('config.common.add')}
        onCancel={() => navigate(RoutePaths.web.config.department.root)}
        onSubmit={async (values) => {
          try {
            await create({ data: values });
            toast.success(t('config.department.created'));
            navigate(RoutePaths.web.config.department.root);
          } catch (err: unknown) {
            toast.error(apiErrorMessage(err, t, t('config.department.createFailed')));
          }
        }}
      />
    </UiCard>
  );
}
