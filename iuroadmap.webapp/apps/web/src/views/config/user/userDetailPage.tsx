import { useNavigate, useParams } from 'react-router-dom';
import { useUsersControllerGetById, type UserDetailResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { Card, Descriptions, Result, Skeleton, Button, Space } from 'antd';

export function UserDetailPage() {
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();

  const { data: raw, isLoading, isError } = useUsersControllerGetById(id, {
    query: { enabled: Boolean(id) },
  });
  const record = raw?.data as any as UserDetailResponse | undefined;

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 8 }} />;
  }
  if (!id || isError || !record) {
    return <Result status='error' title="Failed to load" />;
  }

  const items = [
    { label: "Full Name", children: record.name },
    { label: "Email", children: record.email },
    { label: "Role", children: record.role?.name ?? '' },
    { label: 'Status', children: record.status },
    { label: 'Subscription Tier', children: record.subscriptionTier },
    { label: 'Subscription Expires At', children: record.subscriptionExpiresAt ?? 'N/A' },
    { label: 'Created At', children: record.createdAt ? new Date(record.createdAt).toLocaleString() : '' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          type="primary" 
          onClick={() => navigate(RoutePaths.web.user.edit.replace(':id', id))}
        >
          "Edit"
        </Button>
      </div>

      <Card title="General Info" size="small">
        <Descriptions items={items.map((item, index) => ({ key: index.toString(), ...item }))} column={{ xs: 1, sm: 2 }} />
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => navigate(RoutePaths.web.user.root)}>
          Back
        </Button>
      </div>
    </div>
  );
}
