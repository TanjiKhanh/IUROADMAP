import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  useDepartmentsControllerGetByIndex,
  useDepartmentsControllerDelete,
  type DepartmentResponse,
} from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiTable, UiColumnsType, useToast } from '../../../uikit';
import { useConfirmAndDelete } from '../../../hooks/useConfirmAndDelete';
import { useTranslation } from '../../../hooks/useTranslation';
import { unwrapData } from '../../../api/apiResult';
import { ConfigListShell } from '../shared/configListShell';
import { KeywordFilter } from '../shared/keywordFilter';
import { RowActions } from '../shared/rowActions';
import { useConfigListState } from '../shared/useConfigListState';

const PAGE_SIZE = 20;

type DepartmentFilter = { keyword?: string };

interface DepartmentListData {
  datas: DepartmentResponse[];
  totalRows: number;
}

export function DepartmentListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string>();

  const { mutateAsync: remove } = useDepartmentsControllerDelete();
  const onDelete = useConfirmAndDelete({
    mutateAsync: remove,
    onError: setErrorMessage,
    onSuccess: () => {
      toast.success(t('config.common.deleted'));
      queryClient.invalidateQueries();
    },
  });

  const { filter, page, applyFilter, changePage } = useConfigListState<DepartmentFilter>({ keyword: 'string' });

  const { data: raw, isLoading } = useDepartmentsControllerGetByIndex({
    currentPage: page,
    rowsPerPage: PAGE_SIZE,
    keyword: filter.keyword,
  });

  const data = unwrapData<DepartmentListData>(raw);
  const rows = data?.datas ?? [];
  const totalRows = data?.totalRows ?? 0;

  const columns = useMemo<UiColumnsType<DepartmentResponse>>(
    () => [
      { key: 'name', title: t('config.department.name'), dataIndex: 'name', render: (text) => <strong>{text}</strong> },
      { key: 'slug', title: t('config.department.slug'), dataIndex: 'slug', render: (text) => <code>{text}</code> },
      { key: 'majorCount', title: t('config.department.majorCount'), dataIndex: 'majorCount', align: 'right', width: 110 },
      { key: 'lecturerCount', title: t('config.department.lecturerCount'), dataIndex: 'lecturerCount', align: 'right', width: 130 },
      { key: 'description', title: t('config.department.description'), dataIndex: 'description', ellipsis: true },
      {
        key: 'actions',
        title: t('config.common.actions'),
        align: 'right',
        width: 110,
        render: (_v, row) => (
          <RowActions
            onEdit={() => navigate(RoutePaths.web.config.department.edit.replace(':id', String(row.id)))}
            onDelete={() => onDelete({ id: row.id })}
            canDelete={row.canDelete}
            deleteBlockedReason={t('errors.DEPARTMENT_HAS_MAJORS')}
          />
        ),
      },
    ],
    [navigate, onDelete, t],
  );

  return (
    <>
      {toastContextHolder}
      <ConfigListShell
        title={t('config.department.list')}
        onAdd={() => navigate(RoutePaths.web.config.department.create)}
        errorMessage={errorMessage}
        onCloseError={() => setErrorMessage(undefined)}
        filters={
          <KeywordFilter
            value={filter.keyword}
            placeholder={t('config.common.searchPlaceholder')}
            onSearch={(keyword) => applyFilter({ keyword })}
          />
        }
      >
        <UiTable
          columns={columns}
          dataSource={rows}
          rowKey="id"
          loading={isLoading}
          scroll={{ x: 'max-content' }}
          pagination={{ current: page, pageSize: PAGE_SIZE, total: totalRows, onChange: (next) => changePage(next) }}
        />
      </ConfigListShell>
    </>
  );
}
