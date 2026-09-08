import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRolesControllerGetById, useRolesControllerUpdate, type RoleDetailResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { Skeleton, Result, Card, message } from 'antd';
import { RoleForm, type RoleFormValues } from './components/roleForm';

export function RoleEditPage() {
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();
  const { mutateAsync: update, isPending } = useRolesControllerUpdate();

  const { data: raw, isLoading, isError } = useRolesControllerGetById(id, {
    query: { enabled: Boolean(id) },
  });
  const record = raw?.data as any as RoleDetailResponse | undefined;

  const defaults = useMemo<Partial<RoleFormValues> | undefined>(() => {
    if (!record) return undefined;
    const permissionIds: string[] = [];
    for (const group of record.permissionGroups ?? []) {
      for (const p of group.permissions ?? []) {
        if (p.isInRole && p.id) permissionIds.push(p.id);
      }
    }
    return {
      name: record.name ?? '',
      permissionIds,
    };
  }, [record]);

  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />;
  if (isError || !record) {
    return <Result status='error' title="Failed to load" />;
  }

  return (
    <Card title="Edit Role" style={{ margin: '0 auto', maxWidth: 800 }}>
      <RoleForm
        defaultValues={defaults}
        loading={isPending}
        submitLabel="Save"
        onCancel={() => navigate(RoutePaths.web.role.root)}
        onSubmit={async (values) => {
          try {
            await update({ data: { ...values, id, name: values.name ?? '' } });
            message.success("Success");
            navigate(RoutePaths.web.role.root);
          } catch (err: any) {
            message.error(err?.response?.data?.message ?? err?.message ?? "Failed");
          }
        }}
      />
    </Card>
  );
}
