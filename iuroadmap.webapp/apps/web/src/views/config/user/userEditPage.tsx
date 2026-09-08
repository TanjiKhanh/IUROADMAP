import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsersControllerGetById, useUsersControllerUpdate, type UserDetailResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { Result, Skeleton, Card, message } from 'antd';
import { UserForm, type UserFormValues } from './components/userForm';

export function UserEditPage() {
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();
  const { mutateAsync: update, isPending } = useUsersControllerUpdate();

  const { data: raw, isLoading, isError } = useUsersControllerGetById(id, {
    query: { enabled: Boolean(id) },
  });
  const record = raw?.data as any as UserDetailResponse | undefined;

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

  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />;
  if (isError || !record) {
    return <Result status='error' title="Failed to load" />;
  }

  return (
    <Card title="Edit" style={{ margin: '0 auto', maxWidth: 800 }}>
      <UserForm
        defaultValues={defaults}
        loading={isPending}
        isEdit
        submitLabel="Save"
        onCancel={() => navigate(RoutePaths.web.user.root)}
        onSubmit={async (values) => {
          try {
            const { password, ...rest } = values;
            const payload = password ? { ...rest, id, password } : { ...rest, id };
            await update({ data: payload as any });
            message.success("Success");
            navigate(RoutePaths.web.user.root);
          } catch (err: any) {
            message.error(err?.response?.data?.message ?? err?.message ?? "Failed");
          }
        }}
      />
    </Card>
  );
}
