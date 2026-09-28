import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  useCourseCategoriesControllerDelete,
  useCourseCategoriesControllerGetByIndex,
  type CourseCategoryResponse,
} from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiColumnsType, UiTable, useToast } from '../../../uikit';
import { useConfirmAndDelete } from '../../../hooks/useConfirmAndDelete';
import { useTranslation } from '../../../hooks/useTranslation';
import { unwrapData } from '../../../api/apiResult';
import { CourseNodeCard } from '../../../components/semester-canvas';
import { ConfigListShell } from '../shared/configListShell';
import { KeywordFilter } from '../shared/keywordFilter';
import { RowActions } from '../shared/rowActions';
import { useConfigListState } from '../shared/useConfigListState';

const PAGE_SIZE = 20;

type CategoryFilter = { keyword?: string };

interface CategoryListData {
  datas: CourseCategoryResponse[];
  totalRows: number;
}

export function CourseCategoryListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string>();

  const { mutateAsync: remove } = useCourseCategoriesControllerDelete();
  const onDelete = useConfirmAndDelete({
    mutateAsync: remove,
    onError: setErrorMessage,
    onSuccess: () => {
      toast.success(t('config.common.deleted'));
      queryClient.invalidateQueries();
    },
  });

  const { filter, page, applyFilter, changePage } = useConfigListState<CategoryFilter>({ keyword: 'string' });
  const { data: raw, isLoading } = useCourseCategoriesControllerGetByIndex({
    currentPage: page,
    rowsPerPage: PAGE_SIZE,
    keyword: filter.keyword,
  });
  const data = unwrapData<CategoryListData>(raw);

  const columns = useMemo<UiColumnsType<CourseCategoryResponse>>(
    () => [
      { key: 'sortOrder', title: '#', dataIndex: 'sortOrder', width: 60 },
      { key: 'code', title: t('config.courseCategory.code'), dataIndex: 'code', render: (text) => <code>{text}</code> },
      { key: 'name', title: t('config.courseCategory.name'), dataIndex: 'name', render: (text) => <strong>{text}</strong> },
      {
        key: 'preview',
        title: t('config.courseCategory.preview'),
        render: (_v, row) => (
          <CourseNodeCard code={row.code} name={row.name} theoryCredits={3} labCredits={1} fillColor={row.fillColor} borderColor={row.borderColor} width={170} />
        ),
      },
      { key: 'courseCount', title: t('config.courseCategory.courseCount'), dataIndex: 'courseCount', align: 'right', width: 110 },
      {
        key: 'actions',
        title: t('config.common.actions'),
        align: 'right',
        width: 110,
        render: (_v, row) => (
          <RowActions
            onEdit={() => navigate(RoutePaths.web.config.courseCategory.edit.replace(':id', String(row.id)))}
            onDelete={() => onDelete({ id: row.id })}
            canDelete={row.canDelete}
            deleteBlockedReason={t('errors.CATEGORY_IN_USE')}
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
        title={t('config.courseCategory.list')}
        onAdd={() => navigate(RoutePaths.web.config.courseCategory.create)}
        errorMessage={errorMessage}
        onCloseError={() => setErrorMessage(undefined)}
        filters={
          <KeywordFilter value={filter.keyword} placeholder={t('config.common.searchPlaceholder')} onSearch={(keyword) => applyFilter({ keyword })} />
        }
      >
        <UiTable
          columns={columns}
          dataSource={data?.datas ?? []}
          rowKey="id"
          loading={isLoading}
          scroll={{ x: 'max-content' }}
          pagination={{ current: page, pageSize: PAGE_SIZE, total: data?.totalRows ?? 0, onChange: (next) => changePage(next) }}
        />
      </ConfigListShell>
    </>
  );
}
