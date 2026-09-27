import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { RoutePaths } from '@iuroadmap/core';
import { UiButton, UiCard } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { CourseDetailPanel, type CourseDetailTab } from '../../../components/course/CourseDetailPanel';

const TABS: CourseDetailTab[] = ['overview', 'content', 'curricula', 'comments'];

/** Course page; the academic year and the tab live in the URL so a link can be shared. */
export function CourseDetailPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { courseId = '' } = useParams<{ courseId: string }>();
  const [params, setParams] = useSearchParams();
  const academicYear = params.get('academicYear') ? Number(params.get('academicYear')) : undefined;
  const tabParam = params.get('tab') as CourseDetailTab | null;
  const tab = tabParam && TABS.includes(tabParam) ? tabParam : 'overview';

  const update = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined) next.delete(key);
      else next.set(key, value);
    }
    setParams(next, { replace: true });
  };

  return (
    <div>
      <UiButton style={{ marginBottom: 12 }} onClick={() => navigate(RoutePaths.web.roadmap.exploreCourses)}>
        {t('common.back')}
      </UiButton>
      <UiCard>
        <CourseDetailPanel
          courseId={Number(courseId)}
          academicYear={academicYear}
          onYearChange={(year) => update({ academicYear: year === undefined ? undefined : String(year) })}
          tab={tab}
          onTabChange={(next) => update({ tab: next === 'overview' ? undefined : next })}
        />
      </UiCard>
    </div>
  );
}
