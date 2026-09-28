import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useMajorsControllerDelete, useMajorsControllerGetByIndex, type MajorResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiButton, UiColumnsType, UiSelect, UiTable, UiTag, UiTooltip, useToast } from '../../../uikit';
import { useConfirmAndDelete } from '../../../hooks/useConfirmAndDelete';
import { useTranslation } from '../../../hooks/useTranslation';
import { useDepartmentOptions } from '../../../hooks/useMasterDataOptions';
import { unwrapData } from '../../../api/apiResult';
import { ConfigListShell } from '../shared/configListShell';
import { KeywordFilter } from '../shared/keywordFilter';
import { RowActions } from '../shared/rowActions';
import { useConfigListState } from '../shared/useConfigListState';

const PAGE_SIZE = 20;

type MajorFilter = { keyword?: string; departmentId?: number };

interface MajorListData {
  datas: MajorResponse[];
  totalRows: number;
}

export function MajorListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string>();
  const { options: departmentOptions, isLoading: departmentsLoading } = useDepartmentOptions();

  const { mutateAsync: remove } = useMajorsControllerDelete();
  const onDelete = useConfirmAndDelete({
    mutateAsync: remove,
    onError: setErrorMessage,
    onSuccess: () => {
      toast.success(t('config.common.deleted'));
      queryClient.invalidateQueries();
    },
  });

  const { filter, page, applyFilter, changePage } = useConfigListState<MajorFilter>({ keyword: 'string', departmentId: 'number' });

  const { data: raw, isLoading } = useMajorsControllerGetByIndex({
    currentPage: page,
    rowsPerPage: PAGE_SIZE,
    keyword: filter.keyword,
    departmentId: filter.departmentId,
  });
  const data = unwrapData<MajorListData>(raw);

  const columns = useMemo<UiColumnsType<MajorResponse>>(() => {
    const openDetail = (id: number) => navigate(RoutePaths.web.config.major.detail.replace(':id', String(id)));
    return [
      {
        key: 'name',
        title: t('config.major.name'),
        dataIndex: 'name',
        render: (text, row) => (
          <UiButton type="link" style={{ padding: 0, fontWeight: 600 }} onClick={() => openDetail(row.id)}>
            {text}
          </UiButton>
        ),
      },
      { key: 'slug', title: t('config.major.slug'), dataIndex: 'slug', render: (text) => <code>{text}</code> },
      { key: 'departmentName', title: t('config.major.department'), dataIndex: 'departmentName' },
      {
        key: 'publishedYears',
        title: t('config.major.publishedYears'),
        dataIndex: 'publishedYears',
        render: (years: number[]) =>
          years?.length ? years.map((y) => <UiTag key={y} color="green">{y}</UiTag>) : <span style={{ color: '#94a3b8' }}>—</span>,
      },
      { key: 'curriculumCount', title: t('config.major.curriculumCount'), dataIndex: 'curriculumCount', align: 'right', width: 120 },
      { key: 'learnerCount', title: t('config.major.learnerCount'), dataIndex: 'learnerCount', align: 'right', width: 110 },
      {
        key: 'actions',
        title: t('config.common.actions'),
        align: 'right',
        width: 170,
        render: (_v, row) => (
          <RowActions
            extra={
              <UiTooltip title={t('config.major.manageCurricula')}>
                <UiButton size="small" type="primary" ghost onClick={() => openDetail(row.id)}>
                  {t('config.major.curricula')}
                </UiButton>
              </UiTooltip>
            }
            onEdit={() => navigate(RoutePaths.web.config.major.edit.replace(':id', String(row.id)))}
            onDelete={() => onDelete({ id: row.id })}
            canDelete={row.canDelete}
            deleteBlockedReason={t('errors.MAJOR_HAS_PUBLISHED_CURRICULUM')}
          />
        ),
      },
    ];
  }, [navigate, onDelete, t]);

  return (
    <>
      {toastContextHolder}
      <ConfigListShell
        title={t('config.major.list')}
        onAdd={() => navigate(RoutePaths.web.config.major.create)}
        errorMessage={errorMessage}
        onCloseError={() => setErrorMessage(undefined)}
        filters={
          <>
            <KeywordFilter
              value={filter.keyword}
              placeholder={t('config.common.searchPlaceholder')}
              onSearch={(keyword) => applyFilter({ ...filter, keyword })}
            />
            <UiSelect
              style={{ width: 280 }}
              allowClear
              showSearch
              optionFilterProp="label"
              placeholder={t('config.major.departmentPlaceholder')}
              loading={departmentsLoading}
              options={departmentOptions}
              value={filter.departmentId}
              onChange={(departmentId) => applyFilter({ ...filter, departmentId })}
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
