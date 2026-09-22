import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsersControllerGetById, useUsersControllerUpdate, type UserDetailResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiResult, UiSkeleton, useToast } from '../../../uikit';
import { UserForm, type UserFormValues } from './components/userForm';
import { useTranslation } from '../../../hooks/useTranslation';

export function UserEditPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id = '' } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { mutateAsync: update, isPending } = useUsersControllerUpdate();

  const { data: raw, isLoading, isError } = useUsersControllerGetById(id, {
    query: { enabled: Boolean(id) },
  });
  const responseData = raw?.data as any;
  const record = (responseData?.data ?? responseData) as UserDetailResponse | undefined;

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
    <UserForm
      defaultValues={defaults}
      loading={isPending}
      isEdit
      submitLabel={t('config.common.save')}
      onCancel={() => navigate(RoutePaths.web.user.root)}
      onSubmit={async (values) => {
        try {
          const { password, ...rest } = values;
          const payload = password ? { ...rest, id, password } : { ...rest, id };
          await update({ data: payload as any });
            toast.success(t('config.common.success'));
          navigate(RoutePaths.web.user.root);
        } catch (err: any) {
            toast.error(err?.response?.data?.message ?? err?.message ?? t('config.common.failedToLoad'));
        }
      }}
    />
  );
}
