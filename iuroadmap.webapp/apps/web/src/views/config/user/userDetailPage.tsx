import { useNavigate, useParams } from 'react-router-dom';
import { useUsersControllerGetById, type UserDetailResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiCard, UiDescriptions, UiResult, UiSkeleton, UiButton, UiSpace } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';

export function UserDetailPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id = '' } = useParams<{ id: string }>();

  const { data: raw, isLoading, isError } = useUsersControllerGetById(id, {
    query: { enabled: Boolean(id) },
  });
  const record = raw?.data as any as UserDetailResponse | undefined;

  if (isLoading) {
    return <UiSkeleton active paragraph={{ rows: 8 }} />;
  }
  if (!id || isError || !record) {
    return <UiResult status='error' title={t('config.common.failedToLoad')} />;
  }

  const items = [
    { label: t('config.user.fullName'), children: record.name },
    { label: t('config.user.email'), children: record.email },
    { label: t('config.user.role'), children: record.role?.name ?? '' },
    { label: t('config.user.status'), children: record.status },
    { label: t('config.user.subscriptionTier'), children: record.subscriptionTier },
    { label: t('config.user.subscriptionExpiresAt'), children: record.subscriptionExpiresAt ?? t('config.common.notAvailable') },
    { label: t('config.user.createdAt'), children: record.createdAt ? new Date(record.createdAt).toLocaleString() : '' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <UiButton 
          type="primary" 
          onClick={() => navigate(RoutePaths.web.user.edit.replace(':id', id))}
        >
          {t('config.common.edit')}
        </UiButton>
      </div>

      <UiCard title={t('config.user.info')} size="small">
        <UiDescriptions items={items.map((item, index) => ({ key: index.toString(), ...item }))} column={{ xs: 1, sm: 2 }} />
      </UiCard>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <UiButton onClick={() => navigate(RoutePaths.web.user.root)}>
          {t('config.common.back')}
        </UiButton>
      </div>
    </div>
  );
}
