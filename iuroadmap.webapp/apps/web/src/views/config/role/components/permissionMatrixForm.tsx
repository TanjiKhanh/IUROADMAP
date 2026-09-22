import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useRolesControllerGetAllPermissions, type PermissionGroupResponse } from '@iuroadmap/api-gen';
import { UiCard, UiCheckbox, UiCol, UiRow, UiSkeleton, UiCheckboxChangeEvent } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface PermissionMatrixFormProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
}

export function PermissionMatrixForm<TFieldValues extends FieldValues>({
  control,
  name,
}: PermissionMatrixFormProps<TFieldValues>) {
  const { t } = useTranslation();
  const { data: raw, isLoading } = useRolesControllerGetAllPermissions();
  const groups = ((raw?.data as any)?.data as PermissionGroupResponse[] | undefined) ?? [];

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

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 6 }} />;

  return (
    <UiRow gutter={[16, 16]}>
      {groups.map((group) => {
        const permissions = group.permissions ?? [];
        const allChecked =
          permissions.length > 0 && permissions.every((p) => p.id && selected.has(p.id));
        const someChecked = permissions.some((p) => p.id && selected.has(p.id));
        return (
          <UiCol key={group.id} xs={24} md={12} lg={8}>
            <UiCard
              size="small"
              title={
                <UiCheckbox
                  checked={allChecked}
                  indeterminate={!allChecked && someChecked}
                  onChange={(e: UiCheckboxChangeEvent) => toggleGroup(group, e.target.checked)}
                >
                  <span style={{fontWeight:600}}>{group.groupName ?? ''}</span>
                </UiCheckbox>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {permissions.map((p) => (
                  <UiCheckbox
                    key={p.id}
                    checked={Boolean(p.id && selected.has(p.id))}
                    onChange={(e: UiCheckboxChangeEvent) => p.id && toggle(p.id, e.target.checked)}
                  >
                    {p.displayName ?? ''}
                  </UiCheckbox>
                ))}
              </div>
            </UiCard>
          </UiCol>
        );
      })}
      {groups.length === 0 ? (
        <UiCol xs={24}>
          <div style={{ textAlign: 'center', color: '#999', padding: 24 }}>
            {t('config.common.noData')}
          </div>
        </UiCol>
      ) : null}
    </UiRow>
  );
}
