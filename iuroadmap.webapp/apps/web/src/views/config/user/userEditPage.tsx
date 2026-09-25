import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsersControllerGetById, type UserDetailResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiResult, UiSkeleton, useToast } from '../../../uikit';
import { UserForm, type UserFormValues } from './components/userForm';
import { useTranslation } from '../../../hooks/useTranslation';
import { useUserMutations } from './hooks/useUserMutations';

export function UserEditPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id = '' } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { update } = useUserMutations();
  const [errorMessage, setErrorMessage] = useState<string>();

  const { data: raw, isLoading, isError } = useUsersControllerGetById(id, {
    query: { enabled: Boolean(id) },
  });
  const responseData = raw?.data as any;
  const candidate = responseData?.data ?? responseData;
  const record =
    candidate && typeof candidate.id === 'string' && candidate.id.length > 0
      ? (candidate as UserDetailResponse)
      : undefined;

  const defaults = useMemo<Partial<UserFormValues> | undefined>(() => {
    if (!record) return undefined;
    return {
      name: record.name ?? '',
      email: record.email ?? '',
      roleId: record.roleId ?? '',
      status: record.status as any,
      subscriptionTier: record.subscriptionTier as any,
      password: '',
    };
  }, [record]);

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 6 }} />;
  if (isError || !record) {
    return <UiResult status='error' title={t('config.common.failedToLoad')} />;
  }

  return (
    <>
      {errorMessage ? <UiResult status='error' title={errorMessage} /> : null}
      <UserForm
        defaultValues={defaults}
        loading={update.isPending}
        isEdit
        submitLabel={t('config.common.save')}
        onCancel={() => navigate(RoutePaths.web.config.user.root)}
        onSubmit={async (values) => {
          setErrorMessage(undefined);
          try {
            const { password, ...rest } = values;
            const payload = password ? { ...rest, id, password } : { ...rest, id };
            await update.mutateAsync({ data: payload as any });
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
