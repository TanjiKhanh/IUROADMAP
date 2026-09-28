import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  useStudentRoadmapsControllerDelete,
  useStudentRoadmapsControllerDrop,
  useStudentRoadmapsControllerMy,
  useStudentRoadmapsControllerReactivate,
  type StudentRoadmapSummaryResponse,
} from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import {
  UiAlert,
  UiButton,
  UiCard,
  UiCheckbox,
  UiCol,
  UiEmpty,
  UiPageHeader,
  UiProgress,
  UiRow,
  UiSkeleton,
  UiSpace,
  UiTag,
  UiText,
  uiConfirm,
  useToast,
} from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { useConfirmAndDelete } from '../../../hooks/useConfirmAndDelete';
import { apiErrorMessage, unwrapData } from '../../../api/apiResult';

const STATUS_COLORS = { ENROLLED: 'blue', COMPLETED: 'green', DROPPED: 'default' } as const;

/** My Roadmaps (FL-LRN-03/09): one roadmap per major, drop keeps the data, delete removes it. */
export function MyRoadmapsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const queryClient = useQueryClient();
  const [includeDropped, setIncludeDropped] = useState(false);
  const [error, setError] = useState<string>();

  const { data: raw, isLoading } = useStudentRoadmapsControllerMy({ includeDropped });
  const roadmaps = unwrapData<StudentRoadmapSummaryResponse[]>(raw) ?? [];

  const refresh = () => queryClient.invalidateQueries();
  const { mutateAsync: drop } = useStudentRoadmapsControllerDrop();
  const { mutateAsync: reactivate } = useStudentRoadmapsControllerReactivate();
  const { mutateAsync: remove } = useStudentRoadmapsControllerDelete();
  const onDelete = useConfirmAndDelete({ mutateAsync: remove, onError: setError, onSuccess: refresh });

  const run = async (action: () => Promise<unknown>) => {
    setError(undefined);
    try {
      await action();
      toast.success(t('config.common.success'));
      refresh();
    } catch (err: unknown) {
      setError(apiErrorMessage(err, t, t('config.common.saveFailed')));
    }
  };

  return (
    <div>
      {toastContextHolder}
      <UiPageHeader
        title={t('learner.myRoadmaps.title')}
        action={
          <UiSpace>
            <UiCheckbox checked={includeDropped} onChange={(e) => setIncludeDropped(e.target.checked)}>
              {t('learner.myRoadmaps.showDropped')}
            </UiCheckbox>
            <UiButton type="primary" onClick={() => navigate(RoutePaths.web.roadmap.exploreRoadmaps)}>
              {t('learner.myRoadmaps.explore')}
            </UiButton>
          </UiSpace>
        }
      />
      {error ? <UiAlert type="error" showIcon closable message={error} onClose={() => setError(undefined)} style={{ marginBottom: 12 }} /> : null}
      {isLoading ? <UiSkeleton active paragraph={{ rows: 6 }} /> : null}
      {!isLoading && !roadmaps.length ? (
        <UiEmpty description={t('learner.myRoadmaps.empty')}>
          <UiButton type="primary" onClick={() => navigate(RoutePaths.web.roadmap.exploreRoadmaps)}>
            {t('learner.myRoadmaps.explore')}
          </UiButton>
        </UiEmpty>
      ) : null}

      <UiRow gutter={[16, 16]}>
        {roadmaps.map((r) => {
          const open = () => navigate(RoutePaths.web.roadmap.myRoadmap.replace(':id', String(r.id)));
          return (
            <UiCol key={r.id} xs={24} md={12} xl={8}>
              <UiCard
                hoverable
                data-testid={`my-roadmap-card-${r.majorSlug}`}
                title={r.majorName}
                extra={<UiTag color={STATUS_COLORS[r.status]}>{t(`learner.myRoadmaps.status.${r.status}`)}</UiTag>}
                actions={[
                  <UiButton key="open" type="link" onClick={open}>
                    {t('learner.myRoadmaps.open')}
                  </UiButton>,
                  r.status === 'DROPPED' ? (
                    <UiButton key="reactivate" type="link" onClick={() => run(() => reactivate({ id: r.id }))}>
                      {t('learner.myRoadmaps.reactivate')}
                    </UiButton>
                  ) : (
                    <UiButton
                      key="drop"
                      type="link"
                      onClick={() => uiConfirm(t('learner.myRoadmaps.drop'), t('learner.myRoadmaps.dropConfirm'), () => run(() => drop({ id: r.id })))}
                    >
                      {t('learner.myRoadmaps.drop')}
                    </UiButton>
                  ),
                  <UiButton key="delete" type="link" danger onClick={() => onDelete({ id: r.id })}>
                    {t('config.common.delete')}
                  </UiButton>,
                ]}
              >
                <UiText type="secondary">
                  {r.departmentName} · K{r.version.cohortYear}
                  {r.version.revisionNo && r.version.revisionNo > 1 ? ` #${r.version.revisionNo}` : ''}
                </UiText>
                {r.newerVersionId ? (
                  <UiTag color="gold" style={{ marginLeft: 8 }}>
                    {t('learner.myRoadmap.newerVersion')}
                  </UiTag>
                ) : null}
                <UiProgress percent={Math.min(100, r.summary.progressPercent)} format={() => `${r.summary.progressPercent}%`} style={{ marginTop: 8 }} />
                <UiText>
                  {t('learner.myRoadmap.creditsPassed', { passed: r.summary.creditsPassed, total: r.summary.totalCredits })}
                </UiText>
                {r.summary.gpa100 !== undefined && r.summary.gpa100 !== null ? (
                  <UiText type="secondary" style={{ display: 'block' }}>
                    {t('learner.myRoadmap.gpa', { gpa100: r.summary.gpa100.toFixed(1), gpa4: (r.summary.gpa4 ?? 0).toFixed(2) })}
                  </UiText>
                ) : null}
              </UiCard>
            </UiCol>
          );
        })}
      </UiRow>
    </div>
  );
}
