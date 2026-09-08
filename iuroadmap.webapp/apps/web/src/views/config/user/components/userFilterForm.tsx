import type { ReactNode } from 'react';
import { useState } from 'react';
import { Input, Row, Col, Button, Select, Card } from 'antd';
import { useRolesControllerGetByIndex } from '@iuroadmap/api-gen';

export interface UserFilterValue {
  keyword: string | null;
  roleId: string | null;
}

export interface UserFilterFormProps {
  value: UserFilterValue;
  onChange: (next: UserFilterValue) => void;
  actions?: ReactNode;
}

export function UserFilterForm({ value, onChange, actions }: UserFilterFormProps) {
  const [draft, setDraft] = useState<UserFilterValue>(value);

  const { data: rawRoles, isLoading: rolesLoading } = useRolesControllerGetByIndex({ rowsPerPage: 100 });
  const roles = (rawRoles?.data as any)?.datas ?? [];

  const set = <K extends keyof UserFilterValue>(key: K, next: UserFilterValue[K]) => {
    setDraft((prev) => ({ ...prev, [key]: next }));
  };

  return (
    <Card size="small" style={{ marginBottom: 16 }}>
      {actions ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          {actions}
        </div>
      ) : null}

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8} lg={6}>
          <Input
            value={draft.keyword ?? ''}
            onChange={(event) => set('keyword', event.target.value || null)}
            placeholder="Search by keyword"
            allowClear
            onPressEnter={() => onChange(draft)}
          />
        </Col>
        <Col xs={24} md={8} lg={6}>
          <Select
            style={{ width: '100%' }}
            value={draft.roleId}
            onChange={(value) => set('roleId', value)}
            placeholder="Select a role"
            loading={rolesLoading}
            allowClear
            options={roles.map((r: any) => ({ label: r.name, value: r.id }))}
          />
        </Col>
      </Row>

      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 16 }}>
        <Button type="primary" htmlType="submit" onClick={() => onChange(draft)}>Search</Button>
      </div>
    </Card>
  );
}
