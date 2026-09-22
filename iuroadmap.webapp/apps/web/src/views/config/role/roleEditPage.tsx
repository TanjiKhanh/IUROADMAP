import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRolesControllerGetById, useRolesControllerUpdate, type RoleDetailResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiSkeleton, UiResult, useToast } from '../../../uikit';
import { RoleForm, type RoleFormValues } from './components/roleForm';
import { useTranslation } from '../../../hooks/useTranslation';

export function RoleEditPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id = '' } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { mutateAsync: update, isPending } = useRolesControllerUpdate();

  const { data: raw, isLoading, isError } = useRolesControllerGetById(id, {
    query: { enabled: Boolean(id) },
  });
  const responseData = raw?.data as any;
  const record = (responseData?.data ?? responseData) as RoleDetailResponse | undefined;

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

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 6 }} />;
  if (isError || !record) {
    return <UiResult status='error' title={t('config.common.failedToLoad')} />;
  }

  return (
    <RoleForm
      defaultValues={defaults}
      loading={isPending}
      submitLabel={t('config.common.save')}
      onCancel={() => navigate(RoutePaths.web.role.root)}
      onSubmit={async (values) => {
        try {
          await update({ data: { ...values, id, name: values.name ?? '' } });
          toast.success(t('config.common.success'));
          navigate(RoutePaths.web.role.root);
        } catch (err: any) {
          toast.error(err?.response?.data?.message ?? err?.message ?? t('config.common.failedToLoad'));
        }
      }}
    />
  );
}
