import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  useCurriculumVersionsControllerArchive,
  useCurriculumVersionsControllerDelete,
  useCurriculumVersionsControllerList,
  useCurriculumVersionsControllerUnarchive,
  type CurriculumVersionCreateRequest,
  type CurriculumVersionResponse,
} from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import {
  UiAlert,
  UiButton,
  UiColumnsType,
  UiPlusIcon,
  UiSpace,
  UiTable,
  UiTooltip,
  uiConfirm,
  useToast,
} from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useConfirmAndDelete } from '../../../../hooks/useConfirmAndDelete';
import { apiErrorMessage, unwrapData } from '../../../../api/apiResult';
import { VersionStatusTag } from './versionStatusTag';
import { CreateDraftModal } from './createDraftModal';
import { PublishDialog } from './publishDialog';
import { OverlayStatsDrawer } from './overlayStatsDrawer';

/** Curricula by year of one major (FL-RDM-04): draft → publish → archive, re-issue a year. */
export function CurriculumVersionTab({ majorId }: { majorId: number }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [draftModal, setDraftModal] = useState<{ open: boolean; initial?: Partial<CurriculumVersionCreateRequest> }>({ open: false });
  const [publishing, setPublishing] = useState<CurriculumVersionResponse | null>(null);
  const [statsOf, setStatsOf] = useState<CurriculumVersionResponse | null>(null);

  const { data: raw, isLoading } = useCurriculumVersionsControllerList(majorId, { query: { enabled: majorId > 0 } });
  const versions = useMemo(() => unwrapData<CurriculumVersionResponse[]>(raw) ?? [], [raw]);

  const refresh = () => queryClient.invalidateQueries();
  const { mutateAsync: archive } = useCurriculumVersionsControllerArchive();
  const { mutateAsync: unarchive } = useCurriculumVersionsControllerUnarchive();
  const { mutateAsync: remove } = useCurriculumVersionsControllerDelete();
  const onDelete = useConfirmAndDelete({ mutateAsync: remove, onError: setErrorMessage, onSuccess: refresh });

  const openCanvas = (id: number) => navigate(RoutePaths.web.config.curriculumCanvas.replace(':versionId', String(id)));

  const runTransition = (title: string, content: string, action: () => Promise<unknown>) =>
    uiConfirm(title, content, async () => {
      setErrorMessage(undefined);
      try {
        await action();
        toast.success(t('config.common.success'));
        refresh();
      } catch (err: unknown) {
        setErrorMessage(apiErrorMessage(err, t, t('config.common.saveFailed')));
      }
    });

  const columns: UiColumnsType<CurriculumVersionResponse> = [
      {
        key: 'cohortYear',
        title: t('config.curriculum.cohortYear'),
        dataIndex: 'cohortYear',
        render: (year: number, row) => (
          <strong>
            {year}
            {row.revisionNo && row.revisionNo > 1 ? ` · #${row.revisionNo}` : ''}
          </strong>
        ),
      },
      { key: 'status', title: t('config.curriculum.status'), dataIndex: 'status', render: (status) => <VersionStatusTag status={status} /> },
      { key: 'totalCredits', title: t('config.curriculum.totalCredits'), dataIndex: 'totalCredits', align: 'right' },
      { key: 'decisionRef', title: t('config.curriculum.decisionRef'), dataIndex: 'decisionRef' },
      { key: 'nodeCount', title: t('config.curriculum.nodeCount'), dataIndex: 'nodeCount', align: 'right' },
      { key: 'learnerCount', title: t('config.curriculum.learnerCount'), dataIndex: 'learnerCount', align: 'right' },
      {
        key: 'publishedAt',
        title: t('config.curriculum.publishedAt'),
        dataIndex: 'publishedAt',
        render: (value?: string) => (value ? new Date(value).toLocaleDateString() : '—'),
      },
      {
        key: 'actions',
        title: t('config.common.actions'),
        align: 'right',
        render: (_v, row) => (
          <UiSpace size={4} wrap>
            <UiButton size="small" type={row.status === 'DRAFT' ? 'primary' : 'default'} onClick={() => openCanvas(row.id)}>
              {row.status === 'DRAFT' ? t('config.curriculum.editCanvas') : t('config.curriculum.viewCanvas')}
            </UiButton>
            {row.status === 'DRAFT' ? (
              <UiButton size="small" onClick={() => setPublishing(row)}>
                {t('config.curriculum.publish')}
              </UiButton>
            ) : null}
            {row.status === 'PUBLISHED' ? (
              <>
                <UiTooltip title={t('config.curriculum.reissueHint')}>
                  <UiButton
                    size="small"
                    onClick={() => setDraftModal({ open: true, initial: { cohortYear: row.cohortYear, totalCredits: row.totalCredits, fromVersionId: row.id } })}
                  >
                    {t('config.curriculum.reissue')}
                  </UiButton>
                </UiTooltip>
                <UiButton
                  size="small"
                  onClick={() =>
                    runTransition(t('config.curriculum.archive'), t('config.curriculum.archiveConfirm', { year: row.cohortYear }), () => archive({ id: row.id }))
                  }
                >
                  {t('config.curriculum.archive')}
                </UiButton>
              </>
            ) : null}
            {row.status === 'ARCHIVED' ? (
              <UiButton
                size="small"
                onClick={() =>
                  runTransition(t('config.curriculum.unarchive'), t('config.curriculum.unarchiveConfirm', { year: row.cohortYear }), () => unarchive({ id: row.id }))
                }
              >
                {t('config.curriculum.unarchive')}
              </UiButton>
            ) : null}
            {row.learnerCount > 0 ? (
              <UiButton size="small" onClick={() => setStatsOf(row)}>
                {t('config.stats.open')}
              </UiButton>
            ) : null}
            {row.canDelete ? (
              <UiButton size="small" danger type="text" onClick={() => onDelete({ id: row.id })}>
                {t('config.common.delete')}
              </UiButton>
            ) : null}
          </UiSpace>
        ),
      },
  ];

  return (
    <div>
      {toastContextHolder}
      {errorMessage ? <UiAlert type="error" showIcon closable message={errorMessage} onClose={() => setErrorMessage(undefined)} style={{ marginBottom: 12 }} /> : null}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <UiAlert type="info" showIcon message={t('config.curriculum.byYearHint')} style={{ flex: 1, marginRight: 12 }} />
        <UiButton type="primary" icon={<UiPlusIcon />} onClick={() => setDraftModal({ open: true })}>
          {t('config.curriculum.createDraft')}
        </UiButton>
      </div>
      <UiTable columns={columns} dataSource={versions} rowKey="id" loading={isLoading} pagination={false} scroll={{ x: 'max-content' }} />

      <CreateDraftModal
        open={draftModal.open}
        initial={draftModal.initial}
        majorId={majorId}
        versions={versions}
        onClose={() => setDraftModal({ open: false })}
        onCreated={(created) => {
          setDraftModal({ open: false });
          refresh();
          openCanvas(created.id);
        }}
      />
      <OverlayStatsDrawer version={statsOf} onClose={() => setStatsOf(null)} />
      <PublishDialog
        version={publishing}
        onClose={() => setPublishing(null)}
        onPublished={() => {
          setPublishing(null);
          toast.success(t('config.curriculum.published'));
          refresh();
        }}
      />
    </div>
  );
}
