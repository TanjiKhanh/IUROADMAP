import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useUsersControllerGetByIndex,
  useUsersControllerDelete,
  type UserDetailResponse,
  useRolesControllerGetByIndex,
} from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import {
  UiTable,
  UiButton,
  UiTooltip,
  UiSpace,
  UiColumnsType,
  UiEyeIcon,
  UiEditIcon,
  UiDeleteIcon,
  UiPageHeader
} from '../../../uikit';
import { useConfirmAndDelete } from '../../../hooks/useConfirmAndDelete';
import { useListUrlState } from '../../../hooks/useListUrlState';
import { useTranslation } from '../../../hooks/useTranslation';
import { UserFilterForm, type UserFilterValue } from './components/userFilterForm';

const PAGE_SIZE = 20;

const DEFAULT_FILTER: UserFilterValue = {
  keyword: null,
  roleId: null,
};

interface UserListData {
  datas: UserDetailResponse[];
  totalRows: number;
}

function filterToParams(filter: UserFilterValue, page: number): Record<string, string> {
  const out: Record<string, string> = {};
  if (filter.keyword) out.keyword = filter.keyword;
  if (filter.roleId) out.roleId = filter.roleId;
  if (page > 1) out.page = String(page);
  return out;
}

function filterFromParams(params: URLSearchParams): {
  filter: UserFilterValue;
  page: number;
} {
  return {
    filter: {
      keyword: params.get('keyword'),
      roleId: params.get('roleId'),
    },
    page: Number(params.get('page') ?? '1') || 1,
  };
}

export function UserListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutateAsync: remove } = useUsersControllerDelete();
  const onDelete = useConfirmAndDelete({ mutateAsync: remove });

  const { filter, page, applyFilter, changePage } = useListUrlState<UserFilterValue>({
    defaultFilter: DEFAULT_FILTER,
    toParams: filterToParams,
    fromParams: filterFromParams,
  });

  const { data: raw, isLoading } = useUsersControllerGetByIndex({
    currentPage: page,
    rowsPerPage: PAGE_SIZE,
    keyword: filter.keyword ?? undefined,
    roleId: filter.roleId ?? undefined,
  });
  const data = (raw?.data as any)?.data as UserListData | undefined;
  const rows = data?.datas ?? [];
  const totalRows = data?.totalRows ?? 0;

  const { data: rawRoles } = useRolesControllerGetByIndex({ rowsPerPage: 100 });
  const roles = ((rawRoles?.data as any)?.data as any)?.datas ?? [];
  
  const roleMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const r of roles) {
      if (r.id) map.set(r.id, r.name ?? '');
    }
    return map;
  }, [roles]);

  const columns = useMemo<UiColumnsType<UserDetailResponse>>(
    () => [
      {
        key: 'name',
        title: t('config.user.fullName'),
        dataIndex: 'name',
        render: (value, row) => (
          <UiButton type="link"
            onClick={() => navigate(RoutePaths.web.user.detail.replace(':id', row.id ?? ''))}
          >
            {(value as string | null) ?? ''}
          </UiButton>
        ),
      },
      {
        key: 'email',
        title: t('config.user.email'),
        dataIndex: 'email',
      },
      {
        key: 'roleName',
        title: t('config.user.role'),
        render: (_v, row) => row.role?.name ?? roleMap.get(row.roleId) ?? '',
      },
      {
        key: 'actions',
        title: t('config.common.actions'),
        align: 'right',
        width: 160,
        render: (_v, row) => (
          <UiSpace>
            <UiTooltip title={t('config.user.viewDetail')}>
              <UiButton
                size='small'
                type='text'
                icon={<UiEyeIcon />}
                onClick={() => navigate(RoutePaths.web.user.detail.replace(':id', row.id ?? ''))}
              />
            </UiTooltip>
            <UiTooltip title={t('config.common.edit')}>
              <UiButton
                size='small'
                type='text'
                icon={<UiEditIcon />}
                onClick={() => navigate(RoutePaths.web.user.edit.replace(':id', row.id ?? ''))}
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
      <UiPageHeader 
        title={t('config.user.list')} 
        action={<UiButton type="primary" onClick={() => navigate(RoutePaths.web.user.create)}>+ {t('config.common.add')}</UiButton>} 
      />

      <div style={{ marginBottom: 16 }}>
        <UserFilterForm
          value={filter}
          onChange={(next) => applyFilter(next)}
        />
      </div>

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
