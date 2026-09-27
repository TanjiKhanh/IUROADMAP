import type { RoadmapSummaryResponse } from '@iuroadmap/api-gen';
import { UiCard, UiProgress, UiStatistic, UiTooltip } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';

/**
 * Overall progress (FR-LRN.06.3, BR-LRN-04): credits passed / required (not capped at 100%),
 * planned credits, cumulative GPA on both scales and classification.
 */
export function SummaryBar({ summary }: { summary: RoadmapSummaryResponse }) {
  const { t } = useTranslation();
  const hasGpa = summary.gpa100 !== undefined && summary.gpa100 !== null;
  return (
    <UiCard size="small" style={{ marginBottom: 12 }} data-testid="summary-bar">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
        <div style={{ minWidth: 220 }}>
          <UiProgress
            percent={Math.min(100, summary.progressPercent)}
            format={() => `${summary.progressPercent}%`}
            status={summary.progressPercent >= 100 ? 'success' : 'active'}
          />
          <span style={{ fontSize: 12, color: '#475569' }}>
            {t('learner.myRoadmap.creditsPassed', { passed: summary.creditsPassed, total: summary.totalCredits })}
          </span>
        </div>
        <UiTooltip title={t('learner.myRoadmap.plannedHint')}>
          <div>
            <UiStatistic title={t('learner.myRoadmap.planned')} value={summary.plannedCredits} suffix={`/ ${summary.totalCredits}`} />
          </div>
        </UiTooltip>
        <UiStatistic title={t('learner.myRoadmap.gpa100')} value={hasGpa ? summary.gpa100!.toFixed(1) : '—'} />
        <UiStatistic title={t('learner.myRoadmap.gpa4')} value={hasGpa ? (summary.gpa4 ?? 0).toFixed(2) : '—'} />
        <UiStatistic title={t('learner.myRoadmap.classification')} value={summary.classificationKey ? t(summary.classificationKey) : '—'} />
      </div>
    </UiCard>
  );
}
