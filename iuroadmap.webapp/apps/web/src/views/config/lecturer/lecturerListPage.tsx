import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { LecturerStatus, useLecturersControllerDelete, useLecturersControllerGetByIndex, type LecturerResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiColumnsType, UiSelect, UiTable, UiTag, useToast } from '../../../uikit';
import { useConfirmAndDelete } from '../../../hooks/useConfirmAndDelete';
import { useTranslation } from '../../../hooks/useTranslation';
import { useDepartmentOptions } from '../../../hooks/useMasterDataOptions';
import { unwrapData } from '../../../api/apiResult';
import { ConfigListShell } from '../shared/configListShell';
import { KeywordFilter } from '../shared/keywordFilter';
import { RowActions } from '../shared/rowActions';
import { useConfigListState } from '../shared/useConfigListState';

const PAGE_SIZE = 20;

type LecturerFilter = { keyword?: string; departmentId?: number; status?: string };

interface LecturerListData {
  datas: LecturerResponse[];
  totalRows: number;
}

const STATUS_COLORS: Record<LecturerStatus, string> = { ACTIVE: 'green', INACTIVE: 'default', RETIRED: 'purple' };

export function LecturerListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string>();
  const { options: departmentOptions } = useDepartmentOptions();

  const { mutateAsync: remove } = useLecturersControllerDelete();
  const onDelete = useConfirmAndDelete({
    mutateAsync: remove,
    onError: setErrorMessage,
    onSuccess: () => {
      toast.success(t('config.common.deleted'));
      queryClient.invalidateQueries();
    },
  });

  const { filter, page, applyFilter, changePage } = useConfigListState<LecturerFilter>({
    keyword: 'string',
    departmentId: 'number',
    status: 'string',
  });
  const { data: raw, isLoading } = useLecturersControllerGetByIndex({
    currentPage: page,
    rowsPerPage: PAGE_SIZE,
    keyword: filter.keyword,
    departmentId: filter.departmentId,
    status: filter.status as LecturerStatus | undefined,
  });
  const data = unwrapData<LecturerListData>(raw);

  const columns = useMemo<UiColumnsType<LecturerResponse>>(
    () => [
      {
        key: 'fullName',
        title: t('config.lecturer.fullName'),
        render: (_v, row) => (
          <strong>
            {row.title ? `${row.title} ` : ''}
            {row.fullName}
          </strong>
        ),
      },
      { key: 'departmentName', title: t('config.lecturer.department'), dataIndex: 'departmentName' },
      { key: 'email', title: t('config.lecturer.email'), dataIndex: 'email' },
      {
        key: 'status',
        title: t('config.lecturer.status'),
        dataIndex: 'status',
        render: (status: LecturerStatus) => <UiTag color={STATUS_COLORS[status]}>{t(`config.lecturer.statuses.${status}`)}</UiTag>,
      },
      { key: 'offeringCount', title: t('config.lecturer.offeringCount'), dataIndex: 'offeringCount', align: 'right', width: 110 },
      {
        key: 'actions',
        title: t('config.common.actions'),
        align: 'right',
        width: 110,
        render: (_v, row) => (
          <RowActions
            onEdit={() => navigate(RoutePaths.web.config.lecturer.edit.replace(':id', String(row.id)))}
            onDelete={() => onDelete({ id: row.id })}
            canDelete={row.canDelete}
            deleteBlockedReason={t('errors.LECTURER_IN_USE')}
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
        title={t('config.lecturer.list')}
        onAdd={() => navigate(RoutePaths.web.config.lecturer.create)}
        errorMessage={errorMessage}
        onCloseError={() => setErrorMessage(undefined)}
        filters={
          <>
            <KeywordFilter value={filter.keyword} placeholder={t('config.common.searchPlaceholder')} onSearch={(keyword) => applyFilter({ ...filter, keyword })} />
            <UiSelect
              style={{ width: 260 }}
              allowClear
              showSearch
              optionFilterProp="label"
              placeholder={t('config.lecturer.department')}
              options={departmentOptions}
              value={filter.departmentId}
              onChange={(departmentId) => applyFilter({ ...filter, departmentId })}
            />
            <UiSelect
              style={{ width: 160 }}
              allowClear
              placeholder={t('config.lecturer.status')}
              options={Object.values(LecturerStatus).map((s) => ({ value: s, label: t(`config.lecturer.statuses.${s}`) }))}
              value={filter.status}
              onChange={(status) => applyFilter({ ...filter, status })}
            />
          </>
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
