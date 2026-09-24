import { useNavigate } from 'react-router-dom';
import { useUsersControllerCreate } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { useToast } from '../../../uikit';
import { UserForm } from './components/userForm';

import { useTranslation } from '../../../hooks/useTranslation';

export function UserCreatePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { mutateAsync: create, isPending } = useUsersControllerCreate();

  return (
    <UserForm
      loading={isPending}
      submitLabel={t('config.user.create')}
      onCancel={() => navigate(RoutePaths.web.config.user.root)}
      onSubmit={async (values) => {
        try {
          await create({ data: values });
          toast.success(t('config.common.success'));
          navigate(RoutePaths.web.config.user.root);
        } catch (err: any) {
          toast.error(err?.response?.data?.message ?? err?.message ?? t('config.common.failedToLoad'));
        }
      }}
    />
  );
}
