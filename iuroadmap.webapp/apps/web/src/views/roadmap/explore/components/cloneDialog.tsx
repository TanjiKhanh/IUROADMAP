import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useStudentRoadmapsControllerClone, type ExploreCurriculumCardResponse, type StudentRoadmapSummaryResponse } from '@iuroadmap/api-gen';
import { ErrorCodes } from '@iuroadmap/shared/constants';
import { RoutePaths } from '@iuroadmap/core';
import { UiAlert, UiButton, UiModal, UiParagraph } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { apiErrorBody, apiErrorCode, apiErrorMessage, unwrapData } from '../../../../api/apiResult';

export interface CloneDialogProps {
  curriculum: ExploreCurriculumCardResponse | null;
  onClose: () => void;
}

/** Clone a published curriculum into My Roadmaps: one row, no copy (design §6.1, FL-LRN-03). */
export function CloneDialog({ curriculum, onClose }: CloneDialogProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: clone, isPending } = useStudentRoadmapsControllerClone();
  const [error, setError] = useState<string>();
  const [existingId, setExistingId] = useState<number>();

  const openRoadmap = (id: number) => navigate(RoutePaths.web.roadmap.myRoadmap.replace(':id', String(id)));

  const close = () => {
    setError(undefined);
    setExistingId(undefined);
    onClose();
  };

  return (
    <UiModal
      open={Boolean(curriculum)}
      title={t('learner.explore.cloneTitle')}
      onCancel={close}
      footer={
        existingId ? (
          <UiButton type="primary" onClick={() => openRoadmap(existingId)}>
            {t('learner.explore.openExisting')}
          </UiButton>
        ) : (
          <>
            <UiButton onClick={close}>{t('config.common.cancel')}</UiButton>
            <UiButton
              type="primary"
              loading={isPending}
              data-testid="clone-confirm"
              onClick={async () => {
                if (!curriculum) return;
                setError(undefined);
                try {
                  const created = unwrapData<StudentRoadmapSummaryResponse>(
                    await clone({ data: { roadmapId: curriculum.majorId, versionId: curriculum.versionId } }),
                  );
                  queryClient.invalidateQueries();
                  if (created) openRoadmap(created.id);
                } catch (err: unknown) {
                  if (apiErrorCode(err) === ErrorCodes.ALREADY_CLONED) {
                    setExistingId(Number(apiErrorBody(err)?.studentRoadmapId));
                  }
                  setError(apiErrorMessage(err, t, t('learner.explore.cloneFailed')));
                }
              }}
            >
              {t('learner.explore.clone')}
            </UiButton>
          </>
        )
      }
    >
      {curriculum ? (
        <UiParagraph>
          {t('learner.explore.cloneConfirm', { major: curriculum.majorName, year: curriculum.cohortYear })}
        </UiParagraph>
      ) : null}
      <UiAlert type="info" showIcon message={t('learner.explore.cloneHint')} />
      {error ? <UiAlert type={existingId ? 'warning' : 'error'} showIcon message={error} style={{ marginTop: 12 }} /> : null}
    </UiModal>
  );
}
