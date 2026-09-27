import { useMemo } from 'react';
import {
  useCurriculumVersionsControllerOverlayStatistics,
  type CourseBriefResponse,
  type CurriculumVersionResponse,
  type OverlayStatsResponse,
} from '@iuroadmap/api-gen';
import {
  UiAlert,
  UiColumnsType,
  UiDivider,
  UiDrawer,
  UiEmpty,
  UiSkeleton,
  UiSpace,
  UiStatistic,
  UiTable,
  UiTag,
  UiText,
} from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { unwrapData } from '../../../../api/apiResult';
import { termTitle } from '../../roadmap/lib/adminCanvasViews';

export interface OverlayStatsDrawerProps {
  version: CurriculumVersionResponse | null;
  onClose: () => void;
}

const courseLabel = (course?: CourseBriefResponse, fallback?: string) => (course ? `${course.code} — ${course.name}` : fallback ?? '—');

/**
 * How learners adapt a curriculum (FR-RDM.07.5): courses moved to another term, catalog courses
 * added, choices for elective slots. A signal for the department to revise the next curriculum.
 */
export function OverlayStatsDrawer({ version, onClose }: OverlayStatsDrawerProps) {
  const { t } = useTranslation();
  const { data: raw, isLoading } = useCurriculumVersionsControllerOverlayStatistics(version?.id ?? 0, {
    query: { enabled: Boolean(version), gcTime: 0 },
  });
  const stats = unwrapData<OverlayStatsResponse>(raw);

  const termName = useMemo(() => {
    const byKey = new Map((stats?.terms ?? []).map((term) => [term.termKey, termTitle(t, term.kind, term.semesterNo)]));
    return (termKey: string, isCustom = false) => byKey.get(termKey) ?? (isCustom ? t('config.stats.customTerm') : '?');
  }, [stats, t]);

  const movedColumns: UiColumnsType<OverlayStatsResponse['movedCourses'][number]> = [
    { key: 'course', title: t('config.stats.course'), render: (_v, row) => courseLabel(row.course, row.slotLabel) },
    { key: 'from', title: t('config.stats.curriculumTerm'), render: (_v, row) => termName(row.fromTermKey) },
    {
      key: 'targets',
      title: t('config.stats.movedTo'),
      render: (_v, row) => (
        <UiSpace wrap size={4}>
          {row.targets.slice(0, 4).map((target) => (
            <UiTag key={target.termKey} color={target.isCustomTerm ? 'purple' : 'blue'}>
              {termName(target.termKey, target.isCustomTerm)} · {target.learnerCount}
            </UiTag>
          ))}
        </UiSpace>
      ),
    },
    { key: 'count', title: t('config.stats.learners'), dataIndex: 'learnerCount', align: 'right', width: 90 },
  ];

  const countColumns: UiColumnsType<{ course: CourseBriefResponse; learnerCount: number }> = [
    { key: 'course', title: t('config.stats.course'), render: (_v, row) => courseLabel(row.course) },
    { key: 'count', title: t('config.stats.learners'), dataIndex: 'learnerCount', align: 'right', width: 90 },
  ];

  return (
    <UiDrawer
      open={Boolean(version)}
      width={Math.min(860, window.innerWidth - 40)}
      title={version ? t('config.stats.title', { year: version.cohortYear }) : ''}
      onClose={onClose}
      destroyOnHidden
    >
      {isLoading || !stats ? (
        <UiSkeleton active paragraph={{ rows: 8 }} />
      ) : stats.learnerCount === 0 ? (
        <UiEmpty description={t('config.stats.noLearner')} />
      ) : (
        <div data-testid="overlay-stats">
          <UiAlert type="info" showIcon message={t('config.stats.hint')} style={{ marginBottom: 12 }} />
          <UiSpace size={32} wrap>
            <UiStatistic title={t('config.stats.learnerCount')} value={stats.learnerCount} />
            <UiStatistic title={t('config.stats.insertedTerms')} value={stats.insertedTermLearners} />
            <UiStatistic title={t('config.stats.customCourses')} value={stats.customCourseLearners} />
          </UiSpace>

          <UiDivider plain titlePlacement="start">
            {t('config.stats.moved')}
          </UiDivider>
          <UiTable columns={movedColumns} dataSource={stats.movedCourses} rowKey="nodeKey" pagination={false} size="small" />

          <UiDivider plain titlePlacement="start">
            {t('config.stats.added')}
          </UiDivider>
          <UiTable columns={countColumns} dataSource={stats.addedCourses} rowKey={(row) => row.course.id} pagination={false} size="small" />

          {stats.slotChoices.length ? (
            <>
              <UiDivider plain titlePlacement="start">
                {t('config.stats.slotChoices')}
              </UiDivider>
              {stats.slotChoices.map((slot) => (
                <div key={slot.nodeKey} style={{ marginBottom: 12 }}>
                  <UiText strong>{slot.slotLabel}</UiText>
                  <UiTable columns={countColumns} dataSource={slot.choices} rowKey={(row) => row.course.id} pagination={false} size="small" />
                </div>
              ))}
            </>
          ) : null}
        </div>
      )}
    </UiDrawer>
  );
}
