import type { ReactNode } from 'react';
import { useState } from 'react';
import { UiInput, UiRow, UiCol, UiButton, UiSelect, UiCard } from '../../../../uikit';
import { useRolesControllerGetByIndex } from '@iuroadmap/api-gen';
import { useTranslation } from '../../../../hooks/useTranslation';

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
  const { t } = useTranslation();
  const [draft, setDraft] = useState<UserFilterValue>(value);

  const { data: rawRoles, isLoading: rolesLoading } = useRolesControllerGetByIndex({ rowsPerPage: 100 });
  const roles = ((rawRoles?.data as any)?.data as any)?.datas ?? [];

  const set = <K extends keyof UserFilterValue>(key: K, next: UserFilterValue[K]) => {
    setDraft((prev) => ({ ...prev, [key]: next }));
  };

  return (
    <UiCard size="small" style={{ marginBottom: 16 }}>
      {actions ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          {actions}
        </div>
      ) : null}

      <UiRow gutter={[16, 16]}>
        <UiCol xs={24} md={8} lg={6}>
          <UiInput
            value={draft.keyword ?? ''}
            onChange={(event) => set('keyword', event.target.value || null)}
            placeholder={t('config.user.searchPlaceholder')}
            allowClear
            onPressEnter={() => onChange(draft)}
          />
        </UiCol>
        <UiCol xs={24} md={8} lg={6}>
          <UiSelect
            style={{ width: '100%' }}
            value={draft.roleId}
            onChange={(value) => set('roleId', value)}
            placeholder={t('config.user.rolePlaceholder')}
            loading={rolesLoading}
            allowClear
            options={roles.map((r: any) => ({ label: r.name, value: r.id }))}
          />
        </UiCol>
        <UiCol xs={24} md={8} lg={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <UiButton type="primary" htmlType="submit" onClick={() => onChange(draft)}>
            {t('config.common.search')}
          </UiButton>
        </UiCol>
      </UiRow>
    </UiCard>
  );
}
