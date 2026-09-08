import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useRolesControllerGetAllPermissions, type PermissionGroupResponse } from '@iuroadmap/api-gen';
import { translations, getTranslation } from '@iuroadmap/core';
import { Card, Checkbox, Col, Row, Skeleton } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

export interface PermissionMatrixFormProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
}

export function PermissionMatrixForm<TFieldValues extends FieldValues>({
  control,
  name,
}: PermissionMatrixFormProps<TFieldValues>) {
  const { data: raw, isLoading } = useRolesControllerGetAllPermissions();
  const groups = (raw?.data as any as PermissionGroupResponse[] | undefined) ?? [];

  const { field } = useController<TFieldValues>({ control, name });
  const selected = new Set<string>((field.value as string[] | undefined) ?? []);

  function toggle(permissionId: string, checked: boolean) {
    const next = new Set(selected);
    if (checked) next.add(permissionId);
    else next.delete(permissionId);
    field.onChange(Array.from(next) as never);
  }

  function toggleGroup(group: PermissionGroupResponse, checked: boolean) {
    const next = new Set(selected);
    for (const p of group.permissions ?? []) {
      if (!p.id) continue;
      if (checked) next.add(p.id);
      else next.delete(p.id);
    }
    field.onChange(Array.from(next) as never);
  }

  if (isLoading) return <Skeleton active paragraph={{ rows: 6 }} />;

  return (
    <Row gutter={[16, 16]}>
      {groups.map((group) => {
        const permissions = group.permissions ?? [];
        const allChecked =
          permissions.length > 0 && permissions.every((p) => p.id && selected.has(p.id));
        const someChecked = permissions.some((p) => p.id && selected.has(p.id));
        return (
          <Col key={group.id} xs={24} md={12} lg={8}>
            <Card
              size="small"
              title={
                <Checkbox
                  checked={allChecked}
                  indeterminate={!allChecked && someChecked}
                  onChange={(e: CheckboxChangeEvent) => toggleGroup(group, e.target.checked)}
                >
                  <span style={{fontWeight:600}}>{group.groupName ?? ''}</span>
                </Checkbox>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {permissions.map((p) => (
                  <Checkbox
                    key={p.id}
                    checked={Boolean(p.id && selected.has(p.id))}
                    onChange={(e: CheckboxChangeEvent) => p.id && toggle(p.id, e.target.checked)}
                  >
                    {p.displayName ?? ''}
                  </Checkbox>
                ))}
              </div>
            </Card>
          </Col>
        );
      })}
      {groups.length === 0 ? (
        <Col xs={24}>
          <div style={{ textAlign: 'center', color: '#999', padding: 24 }}>
            No Data
          </div>
        </Col>
      ) : null}
    </Row>
  );
}
