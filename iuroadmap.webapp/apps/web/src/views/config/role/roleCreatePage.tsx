import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import { UiResult, useToast } from '../../../uikit';
import { RoleForm } from './components/roleForm';
import { useTranslation } from '../../../hooks/useTranslation';
import { useRoleMutations } from './hooks/useRoleMutations';

export function RoleCreatePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { create } = useRoleMutations();
  const [errorMessage, setErrorMessage] = useState<string>();

  return (
    <>
      {errorMessage ? <UiResult status='error' title={errorMessage} /> : null}
      <RoleForm
        loading={create.isPending}
        submitLabel={t('config.common.add')}
        onCancel={() => navigate(RoutePaths.web.config.role.root)}
        onSubmit={async (values) => {
          setErrorMessage(undefined);
          try {
            await create.mutateAsync({ data: values });
            toast.success(t('config.common.success'));
            navigate(RoutePaths.web.config.role.root);
          } catch (err: any) {
            setErrorMessage(err?.response?.data?.message ?? err?.message ?? t('config.role.createFailed'));
          }
        }}
      />
    </>
  );
}
