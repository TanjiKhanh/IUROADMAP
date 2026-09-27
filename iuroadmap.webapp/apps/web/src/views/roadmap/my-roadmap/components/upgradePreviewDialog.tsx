import { useEffect, useState } from 'react';
import {
  useExploreRoadmapsControllerPreview,
  useStudentRoadmapsControllerUpgrade,
  useStudentRoadmapsControllerUpgradePreview,
  type ExploreRoadmapPreviewResponse,
  type StudentRoadmapResponse,
  type UpgradePreviewItemResponse,
  type UpgradePreviewResponse,
} from '@iuroadmap/api-gen';
import { UiAlert, UiDivider, UiEmpty, UiModal, UiSelect, UiSkeleton, UiSpace, UiTag, UiText } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../../../api/apiResult';

export interface UpgradePreviewDialogProps {
  open: boolean;
  roadmap: StudentRoadmapResponse;
  /** Preselected target: the newer issue of the same year (banner) */
  initialTargetVersionId?: number;
  onClose: () => void;
  onUpgraded: (roadmap: StudentRoadmapResponse) => void;
}

function ItemList({ items, color }: { items: UpgradePreviewItemResponse[]; color: string }) {
  if (!items.length) return <UiText type="secondary">—</UiText>;
  return (
    <UiSpace wrap size={4}>
      {items.map((i) => (
        <UiTag key={i.nodeKey} color={color}>
          {i.courseCode ?? i.nodeKey.slice(0, 8)} {i.courseName ? `· ${i.courseName}` : ''}
        </UiTag>
      ))}
    </UiSpace>
  );
}

/**
 * Update / change curriculum (FL-LRN-07, design §6.5): dry-run first, then confirm. Never automatic;
 * a graded course that left the curriculum is kept as your own course with its result (BR-LRN-11).
 */
export function UpgradePreviewDialog({ open, roadmap, initialTargetVersionId, onClose, onUpgraded }: UpgradePreviewDialogProps) {
  const { t } = useTranslation();
  const [target, setTarget] = useState<number | undefined>(initialTargetVersionId);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (open) {
      setTarget(initialTargetVersionId);
      setError(undefined);
    }
  }, [open, initialTargetVersionId]);

  // Published years of the same major to switch to
  const { data: rawYears } = useExploreRoadmapsControllerPreview(roadmap.majorSlug, undefined, { query: { enabled: open } });
  const years = unwrapData<ExploreRoadmapPreviewResponse>(rawYears)?.availableYears ?? [];
  const options = years.filter((y) => y.versionId !== roadmap.version.id).map((y) => ({ value: y.versionId, label: `K${y.cohortYear}` }));
  if (roadmap.newerVersionId && !options.some((o) => o.value === roadmap.newerVersionId)) {
    options.unshift({ value: roadmap.newerVersionId, label: t('learner.upgrade.newerIssue', { year: roadmap.version.cohortYear }) });
  }

  const { data: rawPreview, isFetching } = useStudentRoadmapsControllerUpgradePreview(
    roadmap.id,
    { targetVersionId: target ?? 0 },
    { query: { enabled: open && Boolean(target), gcTime: 0 } },
  );
  const preview = unwrapData<UpgradePreviewResponse>(rawPreview);
  const { mutateAsync: upgrade, isPending } = useStudentRoadmapsControllerUpgrade();

  return (
    <UiModal
      open={open}
      width={680}
      title={t('learner.upgrade.title')}
      okText={t('learner.upgrade.confirm')}
      cancelText={t('config.common.cancel')}
      okButtonProps={{ disabled: !preview || !target, loading: isPending }}
      onCancel={onClose}
      onOk={async () => {
        if (!target) return;
        setError(undefined);
        try {
          const upgraded = unwrapData<StudentRoadmapResponse>(await upgrade({ id: roadmap.id, data: { targetVersionId: target, revision: roadmap.revision } }));
          if (upgraded) onUpgraded(upgraded);
        } catch (err: unknown) {
          setError(apiErrorMessage(err, t, t('learner.upgrade.failed')));
        }
      }}
    >
      <UiText>{t('learner.upgrade.current', { year: roadmap.version.cohortYear, revision: roadmap.version.revisionNo ?? 1 })}</UiText>
      <UiSelect
        style={{ width: '100%', margin: '12px 0' }}
        placeholder={t('learner.upgrade.pickTarget')}
        value={target}
        onChange={setTarget}
        options={options}
        notFoundContent={<UiEmpty image={UiEmpty.PRESENTED_IMAGE_SIMPLE} description={t('learner.upgrade.noTarget')} />}
      />
      {isFetching ? <UiSkeleton active paragraph={{ rows: 4 }} /> : null}
      {preview && !isFetching ? (
        <div data-testid="upgrade-preview">
          <UiAlert type="info" showIcon message={t('learner.upgrade.kept', { count: preview.keptCount })} style={{ marginBottom: 8 }} />
          <UiDivider plain titlePlacement="start">
            {t('learner.upgrade.remapped')}
          </UiDivider>
          <ItemList items={preview.remapped} color="blue" />
          <UiDivider plain titlePlacement="start">
            {t('learner.upgrade.convertedToCustom')}
          </UiDivider>
          <ItemList items={preview.convertedToCustom} color="purple" />
          <UiDivider plain titlePlacement="start">
            {t('learner.upgrade.dropped')}
          </UiDivider>
          <ItemList items={preview.dropped} color="red" />
          {preview.droppedTermCount || preview.droppedEdgeCount ? (
            <UiText type="secondary" style={{ display: 'block', marginTop: 8 }}>
              {t('learner.upgrade.droppedOther', { terms: preview.droppedTermCount, edges: preview.droppedEdgeCount })}
            </UiText>
          ) : null}
        </div>
      ) : null}
      {error ? <UiAlert type="error" showIcon message={error} style={{ marginTop: 12 }} /> : null}
    </UiModal>
  );
}
