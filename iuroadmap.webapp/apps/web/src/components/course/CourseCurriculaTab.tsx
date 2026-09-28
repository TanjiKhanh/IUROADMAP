import { Link } from 'react-router-dom';
import { useExploreCoursesControllerCurricula, type CourseCurriculumUsageResponse, type CourseRelationRefResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiCard, UiEmpty, UiSkeleton, UiSpace, UiTag, UiText } from '../../uikit';
import { useTranslation } from '../../hooks/useTranslation';
import { unwrapData } from '../../api/apiResult';

function Relations({ items, label }: { items: CourseRelationRefResponse[]; label: string }) {
  const { t } = useTranslation();
  if (!items.length) return null;
  return (
    <div style={{ marginTop: 6 }}>
      <UiText type="secondary" style={{ fontSize: 12 }}>
        {label}:{' '}
      </UiText>
      <UiSpace wrap size={4}>
        {items.map((r) => (
          <UiTag key={`${r.code}-${r.type}`} title={r.name}>
            {r.code} · {t(`roadmap.relation.${r.type}`)}
          </UiTag>
        ))}
      </UiSpace>
    </div>
  );
}

/** Where the course sits in each published curriculum, with the courses before / after it (FR-LRN.11.5). */
export function CourseCurriculaTab({ courseId }: { courseId: number }) {
  const { t } = useTranslation();
  const { data: raw, isLoading } = useExploreCoursesControllerCurricula(courseId);
  const usages = unwrapData<CourseCurriculumUsageResponse[]>(raw) ?? [];

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 4 }} />;
  if (!usages.length) return <UiEmpty image={UiEmpty.PRESENTED_IMAGE_SIMPLE} description={t('learner.course.notInCurricula')} />;

  return (
    <UiSpace direction="vertical" style={{ width: '100%' }}>
      {usages.map((u) => (
        <UiCard key={u.versionId} size="small">
          <UiSpace wrap>
            <Link to={`${RoutePaths.web.roadmap.roadmapPreview.replace(':majorSlug', u.majorSlug)}?cohortYear=${u.cohortYear}`}>
              <UiText strong>{u.majorName}</UiText>
            </Link>
            <UiTag color="blue">K{u.cohortYear}</UiTag>
            <UiTag>
              {u.termKind === 'REGULAR'
                ? t('roadmap.term.semester', { n: u.semesterNo ?? '?' })
                : u.termKind === 'SUMMER'
                  ? t('roadmap.term.summer')
                  : t('roadmap.term.electivePool')}
            </UiTag>
          </UiSpace>
          <Relations items={u.before} label={t('learner.course.before')} />
          <Relations items={u.after} label={t('learner.course.after')} />
        </UiCard>
      ))}
    </UiSpace>
  );
}
