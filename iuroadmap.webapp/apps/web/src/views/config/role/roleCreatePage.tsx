import { useNavigate } from 'react-router-dom';
import { useRolesControllerCreate } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { useToast } from '../../../uikit';
import { RoleForm } from './components/roleForm';
import { useTranslation } from '../../../hooks/useTranslation';

export function RoleCreatePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { mutateAsync: create, isPending } = useRolesControllerCreate();

  return (
    <RoleForm
      loading={isPending}
      submitLabel={t('config.common.add')}
      onCancel={() => navigate(RoutePaths.web.config.role.root)}
      onSubmit={async (values) => {
        try {
          await create({ data: values });
          toast.success(t('config.common.success'));
          navigate(RoutePaths.web.config.role.root);
        } catch (err: any) {
          toast.error(err?.response?.data?.message ?? err?.message ?? t('config.role.createFailed'));
        }
      }}
    />
  );
}
