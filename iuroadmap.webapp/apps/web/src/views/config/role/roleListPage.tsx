import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRolesControllerGetByIndex, type RoleResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import {
  UiTable,
  UiButton,
  UiTooltip,
  UiSpace,
  UiColumnsType,
  UiEditIcon,
  UiDeleteIcon,
  UiPageHeader,
  UiResult
} from '../../../uikit';
import { useConfirmAndDelete } from '../../../hooks/useConfirmAndDelete';
import { useListUrlState } from '../../../hooks/useListUrlState';
import { useTranslation } from '../../../hooks/useTranslation';
import { useRoleMutations } from './hooks/useRoleMutations';

const PAGE_SIZE = 20;

interface RoleFilter {
  page?: number;
}

interface RoleListData {
  datas: RoleResponse[];
  totalRows: number;
}

export function RoleListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { remove } = useRoleMutations();
  const [errorMessage, setErrorMessage] = useState<string>();
  const onDelete = useConfirmAndDelete({
    mutateAsync: remove.mutateAsync,
    onError: setErrorMessage,
  });

  const { page, changePage } = useListUrlState<RoleFilter>({
    defaultFilter: {},
    toParams: (_, p) => (p > 1 ? { page: String(p) } : {}) as Record<string, string>,
    fromParams: (params) => ({
      filter: {},
      page: Number(params.get('page') ?? '1') || 1,
    }),
  });

  const { data: raw, isLoading } = useRolesControllerGetByIndex({
    currentPage: page,
    rowsPerPage: PAGE_SIZE,
  });

  const data = (raw?.data as any)?.data as RoleListData | undefined;
  const rows = data?.datas ?? [];
  const totalRows = data?.totalRows ?? 0;

  const columns = useMemo<UiColumnsType<RoleResponse>>(
    () => [
      {
        key: 'name',
        title: t('config.role.name'),
        dataIndex: 'name',
        render: (text) => <strong>{text}</strong>,
      },
      {
        key: 'description',
        title: t('config.department.description'),
        dataIndex: 'description',
      },
      {
        key: 'actions',
        title: t('config.common.actions'),
        align: 'right',
        width: 120,
        render: (_v, row) => (
          <UiSpace>
            <UiTooltip title={t('config.common.edit')}>
              <UiButton
                size='small'
                type='text'
                icon={<UiEditIcon />}
                onClick={() => navigate(RoutePaths.web.config.role.edit.replace(':id', row.id ?? ''))}
              />
            </UiTooltip>
            <UiTooltip title={t('config.common.delete')}>
              <UiButton
                size='small'
                type='text'
                danger
                icon={<UiDeleteIcon />}
                onClick={() => onDelete({ id: row.id ?? '' })}
              />
            </UiTooltip>
          </UiSpace>
        ),
      },
    ],
    [navigate, onDelete, t],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {errorMessage ? <UiResult status='error' title={errorMessage} /> : null}
      <UiPageHeader
        title={t('config.role.list')}
        action={<UiButton type="primary" onClick={() => navigate(RoutePaths.web.config.role.create)}>{t('config.common.add')}</UiButton>}
      />

      <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 16 }}>
        <UiTable
          columns={columns}
          dataSource={rows}
          rowKey='id'
          loading={isLoading}
          scroll={{ x: 'max-content' }}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total: totalRows,
            onChange: (next) => changePage(next),
          }}
        />
      </div>
    </div>
  );
}
