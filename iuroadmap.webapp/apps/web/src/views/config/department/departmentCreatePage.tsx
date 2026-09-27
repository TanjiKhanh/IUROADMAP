import { useNavigate } from 'react-router-dom';
import { useDepartmentsControllerCreate } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { useToast } from '../../../uikit';
import { DepartmentForm } from './components/departmentForm';
import { useTranslation } from '../../../hooks/useTranslation';

export function DepartmentCreatePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { mutateAsync: create, isPending } = useDepartmentsControllerCreate();

  return (
    <DepartmentForm
      loading={isPending}
      submitLabel={t('config.common.add')}
      onCancel={() => navigate(RoutePaths.web.config.department.root)}
      onSubmit={async (values) => {
        try {
          await create({ data: values });
          toast.success(t('config.department.created'));
          navigate(RoutePaths.web.config.department.root);
        } catch (err: any) {
          toast.error(err?.response?.data?.message ?? err?.message ?? t('config.department.createFailed'));
        }
      }}
    />
  );
}