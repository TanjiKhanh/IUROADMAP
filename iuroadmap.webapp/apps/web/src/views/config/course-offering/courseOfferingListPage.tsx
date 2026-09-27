import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  OfferingStatus,
  useCourseOfferingsControllerDelete,
  useCourseOfferingsControllerGetByIndex,
  type CourseOfferingResponse,
} from '@iuroadmap/api-gen';
import { AppConstant } from '@iuroadmap/shared/constants';
import { RoutePaths } from '@iuroadmap/core';
import { UiButton, UiColumnsType, UiInputNumber, UiSelect, UiTable, UiTag, useToast } from '../../../uikit';
import { useConfirmAndDelete } from '../../../hooks/useConfirmAndDelete';
import { useTranslation } from '../../../hooks/useTranslation';
import { useLecturerOptions } from '../../../hooks/useMasterDataOptions';
import { unwrapData } from '../../../api/apiResult';
import { ConfigListShell } from '../shared/configListShell';
import { KeywordFilter } from '../shared/keywordFilter';
import { RowActions } from '../shared/rowActions';
import { useConfigListState } from '../shared/useConfigListState';
import { CreateOfferingModal } from './components/createOfferingModal';
import { CopyYearModal } from './components/copyYearModal';

const PAGE_SIZE = 20;

/** Current academic year: it starts in September (2025-09 → 2025, 2026-03 → 2025). */
function currentAcademicYear(): number {
  const now = new Date();
  return now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
}

type OfferingFilter = { keyword?: string; academicYear?: number; lecturerId?: number; status?: string };

/** Course offerings by academic year (FL-RDM-08). */
export function CourseOfferingListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [createOpen, setCreateOpen] = useState(false);
  const [copyOpen, setCopyOpen] = useState(false);
  const { options: lecturerOptions } = useLecturerOptions();

  const { filter, page, applyFilter, changePage } = useConfigListState<OfferingFilter>({
    keyword: 'string',
    academicYear: 'number',
    lecturerId: 'number',
    status: 'string',
  });
  const { data: raw, isLoading } = useCourseOfferingsControllerGetByIndex({
    currentPage: page,
    rowsPerPage: PAGE_SIZE,
    keyword: filter.keyword,
    academicYear: filter.academicYear,
    lecturerId: filter.lecturerId,
    status: filter.status as OfferingStatus | undefined,
  });
  const data = unwrapData<{ datas: CourseOfferingResponse[]; totalRows: number }>(raw);

  const { mutateAsync: remove } = useCourseOfferingsControllerDelete();
  const onDelete = useConfirmAndDelete({ mutateAsync: remove, onError: setErrorMessage, onSuccess: () => queryClient.invalidateQueries() });

  const columns = useMemo<UiColumnsType<CourseOfferingResponse>>(
    () => [
      {
        key: 'course',
        title: t('config.offering.course'),
        render: (_v, row) => (
          <span>
            <strong>{row.course.code}</strong> {row.course.name}
          </span>
        ),
      },
      { key: 'year', title: t('config.offering.academicYear'), dataIndex: 'academicYear', render: (y: number) => `${y}-${y + 1}`, width: 110 },
      {
        key: 'status',
        title: t('config.offering.statusLabel'),
        dataIndex: 'status',
        render: (s: OfferingStatus) => <UiTag color={s === 'PUBLISHED' ? 'green' : 'orange'}>{t(`config.offering.status.${s}`)}</UiTag>,
      },
      {
        key: 'lecturers',
        title: t('config.offering.lecturers'),
        render: (_v, row) => row.lecturers.map((l) => `${l.title ? `${l.title} ` : ''}${l.fullName}`).join(', ') || '—',
      },
      {
        key: 'weights',
        title: t('config.offering.weights'),
        render: (_v, row) => (row.weightProcess !== undefined ? `${row.weightProcess}/${row.weightMidterm}/${row.weightFinal}` : '—'),
      },
      { key: 'project', title: t('config.offering.project'), render: (_v, row) => (row.hasProject ? <UiTag color="purple">{t('config.offering.hasProject')}</UiTag> : null) },
      { key: 'topicCount', title: t('config.offering.topicCount'), dataIndex: 'topicCount', align: 'right' },
      {
        key: 'actions',
        title: t('config.common.actions'),
        align: 'right',
        render: (_v, row) => (
          <RowActions
            onEdit={() => navigate(RoutePaths.web.config.courseOffering.edit.replace(':id', String(row.id)))}
            onDelete={() => onDelete({ id: row.id })}
            canDelete={row.canDelete}
            deleteBlockedReason={t('config.offering.deletePublished')}
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
        title={t('config.offering.list')}
        onAdd={() => setCreateOpen(true)}
        actions={<UiButton onClick={() => setCopyOpen(true)}>{t('config.offering.copyYear')}</UiButton>}
        errorMessage={errorMessage}
        onCloseError={() => setErrorMessage(undefined)}
        filters={
          <>
            <KeywordFilter value={filter.keyword} placeholder={t('config.course.searchPlaceholder')} onSearch={(keyword) => applyFilter({ ...filter, keyword })} />
            <UiInputNumber
              style={{ width: 150 }}
              placeholder={t('config.offering.academicYear')}
              min={AppConstant.AcademicYear.Min}
              max={AppConstant.AcademicYear.Max}
              precision={0}
              value={filter.academicYear ?? null}
              onChange={(v) => applyFilter({ ...filter, academicYear: typeof v === 'number' ? v : undefined })}
            />
            <UiSelect
              style={{ width: 240 }}
              allowClear
              showSearch
              optionFilterProp="label"
              placeholder={t('config.offering.lecturer')}
              options={lecturerOptions}
              value={filter.lecturerId}
              onChange={(lecturerId) => applyFilter({ ...filter, lecturerId })}
            />
            <UiSelect
              style={{ width: 150 }}
              allowClear
              placeholder={t('config.offering.statusLabel')}
              options={Object.values(OfferingStatus).map((s) => ({ value: s, label: t(`config.offering.status.${s}`) }))}
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
      <CreateOfferingModal
        open={createOpen}
        defaultYear={filter.academicYear ?? currentAcademicYear()}
        onClose={() => setCreateOpen(false)}
        onCreated={(created) => {
          setCreateOpen(false);
          queryClient.invalidateQueries();
          navigate(RoutePaths.web.config.courseOffering.edit.replace(':id', String(created.id)));
        }}
      />
      <CopyYearModal
        open={copyOpen}
        defaultFromYear={filter.academicYear ?? currentAcademicYear()}
        onClose={() => setCopyOpen(false)}
        onCopied={(result) => {
          setCopyOpen(false);
          toast.success(t('config.offering.copied', { created: result.created, skipped: result.skipped }));
          queryClient.invalidateQueries();
        }}
      />
    </>
  );
}
