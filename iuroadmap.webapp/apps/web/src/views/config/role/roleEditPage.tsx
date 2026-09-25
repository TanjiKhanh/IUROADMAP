import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRolesControllerGetById, type RoleDetailResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiSkeleton, UiResult, useToast } from '../../../uikit';
import { RoleForm, type RoleFormValues } from './components/roleForm';
import { useTranslation } from '../../../hooks/useTranslation';
import { useRoleMutations } from './hooks/useRoleMutations';

export function RoleEditPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id = '' } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { update } = useRoleMutations();
  const [errorMessage, setErrorMessage] = useState<string>();

  const { data: raw, isLoading, isError } = useRolesControllerGetById(id, {
    query: { enabled: Boolean(id) },
  });
  const responseData = raw?.data as any;
  const candidate = responseData?.data ?? responseData;
  const record =
    candidate && typeof candidate.id === 'string' && candidate.id.length > 0
      ? (candidate as RoleDetailResponse)
      : undefined;

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
    <>
      {errorMessage ? <UiResult status='error' title={errorMessage} /> : null}
      <RoleForm
        defaultValues={defaults}
        loading={update.isPending}
        submitLabel={t('config.common.save')}
        onCancel={() => navigate(RoutePaths.web.config.role.root)}
        onSubmit={async (values) => {
          setErrorMessage(undefined);
          try {
            await update.mutateAsync({ data: { ...values, id, name: values.name ?? '' } });
            toast.success(t('config.common.success'));
            navigate(RoutePaths.web.config.role.root);
          } catch (err: any) {
            setErrorMessage(err?.response?.data?.message ?? err?.message ?? t('config.common.failedToLoad'));
          }
        }}
      />
    </>
  );
}
