import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useUsersControllerGetByIndex,
  useUsersControllerDelete,
  type UserDetailResponse,
} from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { Table, Button, Tooltip, Typography, Space } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useConfirmAndDelete } from '../../../hooks/useConfirmAndDelete';
import { useListUrlState } from '../../../hooks/useListUrlState';
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
  const data = raw?.data as any as UserListData | undefined;
  const rows = data?.datas ?? [];
  const totalRows = data?.totalRows ?? 0;

  const columns = useMemo<ColumnsType<UserDetailResponse>>(
    () => [
      {
        key: 'name',
        title: "Full Name",
        dataIndex: 'name',
        render: (value, row) => (
          <Button type="link"
            onClick={() => navigate(RoutePaths.web.user.detail.replace(':id', row.id ?? ''))}
          >
            {(value as string | null) ?? ''}
          </Button>
        ),
      },
      {
        key: 'email',
        title: "Email",
        dataIndex: 'email',
      },
      {
        key: 'roleName',
        title: "Role",
        render: (_v, row) => row.role?.name ?? '',
      },
      {
        key: 'actions',
        title: "Actions",
        align: 'right',
        width: 160,
        render: (_v, row) => (
          <Space>
            <Tooltip title="View Detail">
              <Button
                size='small'
                type='text'
                icon={<EyeOutlined />}
                onClick={() => navigate(RoutePaths.web.user.detail.replace(':id', row.id ?? ''))}
              />
            </Tooltip>
            <Tooltip title="Edit">
              <Button
                size='small'
                type='text'
                icon={<EditOutlined />}
                onClick={() => navigate(RoutePaths.web.user.edit.replace(':id', row.id ?? ''))}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                size='small'
                type='text'
                danger
                icon={<DeleteOutlined />}
                onClick={() => onDelete({ id: row.id ?? '' })}
              />
            </Tooltip>
          </Space>
        ),
      },
    ],
    [navigate, onDelete],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>Users</Typography.Title>
        <Button type="primary" onClick={() => navigate(RoutePaths.web.user.create)}>Add</Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <UserFilterForm
          value={filter}
          onChange={(next) => applyFilter(next)}
        />
      </div>

      <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 16 }}>
        <Table
          columns={columns}
          dataSource={rows}
          rowKey='id'
          loading={isLoading}
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
