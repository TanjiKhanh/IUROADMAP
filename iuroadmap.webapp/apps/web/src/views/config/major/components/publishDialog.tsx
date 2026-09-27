import { useEffect, useMemo, useState } from 'react';
import {
  useCanvasControllerGetCanvas,
  useCurriculumVersionsControllerPublish,
  type CanvasResponse,
  type CurriculumVersionResponse,
} from '@iuroadmap/api-gen';
import type { CurriculumIssue } from '@iuroadmap/shared/roadmap-engine';
import { UiAlert, UiCheckbox, UiModal, UiSkeleton, UiText } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { apiErrorBody, apiErrorMessage, unwrapData } from '../../../../api/apiResult';
import { IssuesPanel } from '../../roadmap/components/IssuesPanel';

export interface PublishDialogProps {
  version: CurriculumVersionResponse | null;
  onClose: () => void;
  onPublished: (version: CurriculumVersionResponse) => void;
}

/**
 * Publish a curriculum year (T2, FR-RDM.04.4): errors block, warnings must be acknowledged.
 * Publishing a re-issue archives the previous PUBLISHED curriculum of the same year (T6).
 */
export function PublishDialog({ version, onClose, onPublished }: PublishDialogProps) {
  const { t } = useTranslation();
  const open = Boolean(version);
  const [acknowledged, setAcknowledged] = useState(false);
  const [error, setError] = useState<string>();

  // The saved canvas carries the current publish issues and the course codes to name them.
  const { data: raw, isFetching, refetch } = useCanvasControllerGetCanvas(version?.id ?? 0, {
    query: { enabled: open, gcTime: 0 },
  });
  const { mutateAsync: publish, isPending } = useCurriculumVersionsControllerPublish();
  const canvas = unwrapData<CanvasResponse>(raw);
  const issues = canvas?.issues;
  const labels = useMemo(
    () => new Map((canvas?.nodes ?? []).map((n) => [n.nodeKey, n.course?.code ?? n.slotLabel ?? n.nodeKey.slice(0, 8)])),
    [canvas],
  );

  useEffect(() => {
    if (open) {
      setAcknowledged(false);
      setError(undefined);
      refetch();
    }
  }, [open, refetch]);

  const errors = (issues?.errors ?? []) as CurriculumIssue[];
  const warnings = (issues?.warnings ?? []) as CurriculumIssue[];
  const canPublish = Boolean(issues) && errors.length === 0 && (warnings.length === 0 || acknowledged);

  return (
    <UiModal
      open={open}
      title={version ? t('config.curriculum.publishTitle', { year: version.cohortYear }) : ''}
      okText={t('config.curriculum.publish')}
      cancelText={t('config.common.cancel')}
      okButtonProps={{ disabled: !canPublish, loading: isPending }}
      onCancel={onClose}
      onOk={async () => {
        if (!version) return;
        setError(undefined);
        try {
          const published = unwrapData<CurriculumVersionResponse>(
            await publish({ id: version.id, data: { acknowledgeWarnings: warnings.length > 0 } }),
          );
          if (published) onPublished(published);
        } catch (err: unknown) {
          setError(apiErrorMessage(err, t, t('config.curriculum.publishFailed')));
          // The server re-validates: show its issues when they differ from the dialog
          if (apiErrorBody(err)?.issues) refetch();
        }
      }}
      width={640}
    >
      <UiAlert type="info" showIcon message={t('config.curriculum.publishImmutable')} style={{ marginBottom: 12 }} />
      {isFetching && !issues ? (
        <UiSkeleton active paragraph={{ rows: 3 }} />
      ) : (
        <IssuesPanel errors={errors} warnings={warnings} labelOf={(key) => labels.get(key) ?? key.slice(0, 8)} />
      )}
      {warnings.length > 0 && errors.length === 0 ? (
        <UiCheckbox checked={acknowledged} onChange={(e) => setAcknowledged(e.target.checked)} style={{ marginTop: 12 }} data-testid="publish-acknowledge">
          <UiText>{t('config.curriculum.acknowledgeWarnings')}</UiText>
        </UiCheckbox>
      ) : null}
      {error ? <UiAlert type="error" showIcon message={error} style={{ marginTop: 12 }} /> : null}
    </UiModal>
  );
}
