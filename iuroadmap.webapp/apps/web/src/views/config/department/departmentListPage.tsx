import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useDepartmentsControllerGetByIndex,
  useDepartmentsControllerDelete,
  type DepartmentResponseDto,
} from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import {
  UiTable,
  UiButton,
  UiTooltip,
  UiSpace,
  UiColumnsType,
  UiEditIcon,
  UiDeleteIcon,
  UiPageHeader
} from '../../../uikit';
import { useConfirmAndDelete } from '../../../hooks/useConfirmAndDelete';
import { useListUrlState } from '../../../hooks/useListUrlState';
import { useTranslation } from '../../../hooks/useTranslation';

const PAGE_SIZE = 20;

interface DepartmentFilter {
  keyword?: string | null;
}

interface DepartmentListData {
  datas: DepartmentResponseDto[];
  totalRows: number;
}

const DEFAULT_FILTER: DepartmentFilter = {
  keyword: null,
};

function filterToParams(filter: DepartmentFilter, page: number): Record<string, string> {
  const out: Record<string, string> = {};
  if (filter.keyword) out.keyword = filter.keyword;
  if (page > 1) out.page = String(page);
  return out;
}

function filterFromParams(params: URLSearchParams): {
  filter: DepartmentFilter;
  page: number;
} {
  return {
    filter: {
      keyword: params.get('keyword'),
    },
    page: Number(params.get('page') ?? '1') || 1,
  };
}

export function DepartmentListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutateAsync: remove } = useDepartmentsControllerDelete();
  const onDelete = useConfirmAndDelete({ mutateAsync: remove });

  const { filter, page, applyFilter, changePage } = useListUrlState<DepartmentFilter>({
    defaultFilter: DEFAULT_FILTER,
    toParams: filterToParams,
    fromParams: filterFromParams,
  });

  const { data: raw, isLoading } = useDepartmentsControllerGetByIndex({
    currentPage: page,
    rowsPerPage: PAGE_SIZE,
    keyword: filter.keyword ?? undefined,
  });

  const data = (raw?.data as any)?.data as DepartmentListData | undefined;
  const rows = data?.datas ?? [];
  const totalRows = data?.totalRows ?? 0;

  const columns = useMemo<UiColumnsType<DepartmentResponseDto>>(
    () => [
      {
        key: 'id',
        title: t('config.common.id'),
        dataIndex: 'id',
        width: 80,
      },
      {
        key: 'name',
        title: t('config.department.name'),
        dataIndex: 'name',
        render: (text) => <strong>{text}</strong>,
      },
      {
        key: 'slug',
        title: 'Slug',
        dataIndex: 'slug',
        render: (text) => <code>{text}</code>,
      },
      {
        key: 'description',
        title: t('config.department.description'),
        dataIndex: 'description',
        ellipsis: true,
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
                onClick={() =>
                  navigate(
                    RoutePaths.web.config.department.edit.replace(':id', String(row.id))
                  )
                }
              />
            </UiTooltip>
            <UiTooltip title={t('config.common.delete')}>
              <UiButton
                size='small'
                type='text'
                danger
                icon={<UiDeleteIcon />}
                onClick={() => onDelete({ id: row.id })}
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
        title={t('config.department.list')} 
        action={<UiButton type="primary" onClick={() => navigate(RoutePaths.web.config.department.create)}>{t('config.common.add')}</UiButton>} 
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