import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { GradingMode, useCoursesControllerDelete, useCoursesControllerGetByIndex, type CourseResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiColumnsType, UiSelect, UiTable, UiTag, UiTooltip, useToast } from '../../../uikit';
import { useConfirmAndDelete } from '../../../hooks/useConfirmAndDelete';
import { useTranslation } from '../../../hooks/useTranslation';
import { useCourseCategories, useMajorOptions } from '../../../hooks/useMasterDataOptions';
import { unwrapData } from '../../../api/apiResult';
import { ConfigListShell } from '../shared/configListShell';
import { KeywordFilter } from '../shared/keywordFilter';
import { RowActions } from '../shared/rowActions';
import { useConfigListState } from '../shared/useConfigListState';

const PAGE_SIZE = 20;

type CourseFilter = { keyword?: string; categoryId?: number; majorId?: number; gradingMode?: string };

interface CourseListData {
  datas: CourseResponse[];
  totalRows: number;
}

export function CourseListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string>();
  const { options: categoryOptions } = useCourseCategories();
  const { options: majorOptions } = useMajorOptions();

  const { mutateAsync: remove } = useCoursesControllerDelete();
  const onDelete = useConfirmAndDelete({
    mutateAsync: remove,
    onError: setErrorMessage,
    onSuccess: () => {
      toast.success(t('config.common.deleted'));
      queryClient.invalidateQueries();
    },
  });

  const { filter, page, applyFilter, changePage } = useConfigListState<CourseFilter>({
    keyword: 'string',
    categoryId: 'number',
    majorId: 'number',
    gradingMode: 'string',
  });
  const { data: raw, isLoading } = useCoursesControllerGetByIndex({
    currentPage: page,
    rowsPerPage: PAGE_SIZE,
    keyword: filter.keyword,
    categoryId: filter.categoryId,
    majorId: filter.majorId,
    gradingMode: filter.gradingMode as GradingMode | undefined,
  });
  const data = unwrapData<CourseListData>(raw);

  const columns = useMemo<UiColumnsType<CourseResponse>>(
    () => [
      { key: 'code', title: t('config.course.code'), dataIndex: 'code', render: (text) => <strong>{text}</strong>, width: 110 },
      { key: 'name', title: t('config.course.name'), dataIndex: 'name' },
      {
        key: 'credits',
        title: t('config.course.credits'),
        render: (_v, row) => (
          <UiTooltip title={t('config.course.creditsHint')}>
            <span>
              {row.credits} ({row.theoryCredits},{row.labCredits})
            </span>
          </UiTooltip>
        ),
        width: 100,
      },
      {
        key: 'category',
        title: t('config.course.category'),
        render: (_v, row) => (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 14, height: 10, background: row.fillColor, border: `2px solid ${row.borderColor}`, borderRadius: 2 }} />
            {row.categoryName}
          </span>
        ),
      },
      {
        key: 'gradingMode',
        title: t('config.course.gradingMode'),
        dataIndex: 'gradingMode',
        render: (mode: GradingMode) => <UiTag color={mode === GradingMode.PASS_FAIL ? 'gold' : 'default'}>{t(`roadmap.gradingMode.${mode}`)}</UiTag>,
      },
      {
        key: 'counts',
        title: t('config.course.counts'),
        render: (_v, row) => (
          <>
            {!row.countsTowardGpa ? <UiTag>{t('config.course.noGpa')}</UiTag> : null}
            {!row.countsTowardCredits ? <UiTag>{t('config.course.noCredits')}</UiTag> : null}
          </>
        ),
      },
      {
        key: 'actions',
        title: t('config.common.actions'),
        align: 'right',
        width: 110,
        render: (_v, row) => (
          <RowActions
            onEdit={() => navigate(RoutePaths.web.config.course.edit.replace(':id', String(row.id)))}
            onDelete={() => onDelete({ id: row.id })}
            canDelete={row.canDelete}
            deleteBlockedReason={t('errors.COURSE_IN_USE')}
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
        title={t('config.course.list')}
        onAdd={() => navigate(RoutePaths.web.config.course.create)}
        errorMessage={errorMessage}
        onCloseError={() => setErrorMessage(undefined)}
        filters={
          <>
            <KeywordFilter value={filter.keyword} placeholder={t('config.course.searchPlaceholder')} onSearch={(keyword) => applyFilter({ ...filter, keyword })} />
            <UiSelect
              style={{ width: 200 }}
              allowClear
              placeholder={t('config.course.category')}
              options={categoryOptions}
              value={filter.categoryId}
              onChange={(categoryId) => applyFilter({ ...filter, categoryId })}
            />
            <UiSelect
              style={{ width: 240 }}
              allowClear
              showSearch
              optionFilterProp="label"
              placeholder={t('config.course.usedInMajor')}
              options={majorOptions}
              value={filter.majorId}
              onChange={(majorId) => applyFilter({ ...filter, majorId })}
            />
            <UiSelect
              style={{ width: 160 }}
              allowClear
              placeholder={t('config.course.gradingMode')}
              options={[
                { value: GradingMode.SCORE, label: t('roadmap.gradingMode.SCORE') },
                { value: GradingMode.PASS_FAIL, label: t('roadmap.gradingMode.PASS_FAIL') },
              ]}
              value={filter.gradingMode}
              onChange={(gradingMode) => applyFilter({ ...filter, gradingMode })}
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
