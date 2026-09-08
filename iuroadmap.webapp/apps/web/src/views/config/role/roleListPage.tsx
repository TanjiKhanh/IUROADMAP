import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRolesControllerGetByIndex, useRolesControllerDelete, type RoleResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { Table, Button, Tooltip, Typography, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useConfirmAndDelete } from '../../../hooks/useConfirmAndDelete';
import { useListUrlState } from '../../../hooks/useListUrlState';

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

  const { mutateAsync: remove } = useRolesControllerDelete();
  const onDelete = useConfirmAndDelete({ mutateAsync: remove });

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

  const data = raw?.data as any as RoleListData | undefined;
  const rows = data?.datas ?? [];
  const totalRows = data?.totalRows ?? 0;

  const columns = useMemo<ColumnsType<RoleResponse>>(
    () => [
      {
        key: 'name',
        title: "Role Name",
        dataIndex: 'name',
        render: (text) => <strong>{text}</strong>,
      },
      {
        key: 'description',
        title: "Description",
        dataIndex: 'description',
      },
      {
        key: 'actions',
        title: "Actions",
        align: 'right',
        width: 120,
        render: (_v, row) => (
          <Space>
            <Tooltip title="Edit">
              <Button
                size='small'
                type='text'
                icon={<EditOutlined />}
                onClick={() => navigate(RoutePaths.web.role.edit.replace(':id', row.id ?? ''))}
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
        <Typography.Title level={4} style={{ margin: 0 }}>Roles</Typography.Title>
        <Button type="primary" onClick={() => navigate(RoutePaths.web.role.create)}>Add</Button>
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
