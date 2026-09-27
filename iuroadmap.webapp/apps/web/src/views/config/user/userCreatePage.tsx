import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import { UiResult, useToast } from '../../../uikit';
import { UserForm } from './components/userForm';

import { useTranslation } from '../../../hooks/useTranslation';
import { useUserMutations } from './hooks/useUserMutations';

export function UserCreatePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { create } = useUserMutations();
  const [errorMessage, setErrorMessage] = useState<string>();

  return (
    <>
      {errorMessage ? <UiResult status='error' title={errorMessage} /> : null}
      <UserForm
        loading={create.isPending}
        submitLabel={t('config.user.create')}
        onCancel={() => navigate(RoutePaths.web.config.user.root)}
        onSubmit={async (values) => {
          setErrorMessage(undefined);
          try {
            await create.mutateAsync({ data: values });
            toast.success(t('config.common.success'));
            navigate(RoutePaths.web.config.user.root);
          } catch (err: any) {
            setErrorMessage(err?.response?.data?.message ?? err?.message ?? t('config.common.failedToLoad'));
          }
        }}
      />
    </>
  );
}
