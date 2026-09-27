import { useExploreCoursesControllerDetail, useExploreCoursesControllerTopics, type ExploreCourseDetailResponse, type TopicsGraphResponse } from '@iuroadmap/api-gen';
import { UiAlert, UiDescriptions, UiEmpty, UiResult, UiSelect, UiSkeleton, UiSpace, UiTabs, UiTag, UiText, UiTitle } from '../../uikit';
import { useTranslation } from '../../hooks/useTranslation';
import { unwrapData } from '../../api/apiResult';
import { TopicGraph } from '../topic-graph/TopicGraph';
import { CommentThread } from './comments/CommentThread';
import { CourseCurriculaTab } from './CourseCurriculaTab';
import { OfferingLecturers } from './OfferingLecturers';
import { StudentGuide } from './StudentGuide';

export type CourseDetailTab = 'overview' | 'content' | 'curricula' | 'comments';

export interface CourseDetailPanelProps {
  courseId: number;
  /** Requested academic year (2025 = 2025-2026); empty = latest */
  academicYear?: number;
  onYearChange: (year: number | undefined) => void;
  tab: CourseDetailTab;
  onTabChange: (tab: CourseDetailTab) => void;
}

/**
 * Course page used by the Course Explorer, the curriculum preview and My Roadmap (FL-LRN-11):
 * official info of the chosen academic year (offering) next to student comments.
 */
export function CourseDetailPanel({ courseId, academicYear, onYearChange, tab, onTabChange }: CourseDetailPanelProps) {
  const { t } = useTranslation();
  const { data: raw, isLoading, isError } = useExploreCoursesControllerDetail(courseId, { academicYear }, { query: { enabled: courseId > 0 } });
  const detail = unwrapData<ExploreCourseDetailResponse>(raw);
  const offering = detail?.offering;
  const { data: rawTopics, isLoading: topicsLoading } = useExploreCoursesControllerTopics(
    courseId,
    { academicYear: offering?.academicYear ?? academicYear },
    { query: { enabled: tab === 'content' && courseId > 0 } },
  );
  const topics = unwrapData<TopicsGraphResponse>(rawTopics);

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 8 }} />;
  if (isError || !detail) return <UiResult status="404" title={t('learner.course.notFound')} />;

  const { course } = detail;
  const fallback = offering && academicYear !== undefined && offering.academicYear !== academicYear;

  return (
    <div data-testid="course-detail">
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div>
          <UiTitle level={3} style={{ margin: 0 }}>
            {course.code} — {course.name}
          </UiTitle>
          <UiSpace wrap style={{ marginTop: 6 }}>
            <span
              style={{ display: 'inline-block', width: 16, height: 12, borderRadius: 3, background: course.fillColor, border: `2px solid ${course.borderColor}` }}
            />
            <UiText>{detail.categoryName}</UiText>
            <UiTag>
              {course.theoryCredits + course.labCredits} ({course.theoryCredits},{course.labCredits})
            </UiTag>
            {course.gradingMode === 'PASS_FAIL' ? <UiTag color="gold">{t('roadmap.gradingMode.PASS_FAIL')}</UiTag> : null}
            {!course.countsTowardCredits ? <UiTag>{t('config.course.noCredits')}</UiTag> : null}
            {offering?.hasProject ? <UiTag color="purple">{t('config.offering.hasProject')}</UiTag> : null}
          </UiSpace>
        </div>
        <UiSelect
          style={{ width: 180 }}
          placeholder={t('learner.course.latestYear')}
          allowClear
          value={academicYear}
          onChange={(y) => onYearChange(y ?? undefined)}
          options={detail.availableYears.map((y) => ({ value: y, label: `${y}-${y + 1}` }))}
          data-testid="course-year-select"
        />
      </div>
      {fallback ? (
        <UiAlert
          type="info"
          showIcon
          style={{ marginBottom: 12 }}
          message={t('learner.course.fallbackYear', { requested: `${academicYear}-${academicYear! + 1}`, shown: `${offering!.academicYear}-${offering!.academicYear + 1}` })}
        />
      ) : null}

      <UiTabs
        activeKey={tab}
        onChange={(key) => onTabChange(key as CourseDetailTab)}
        items={[
          {
            key: 'overview',
            label: t('learner.course.overview'),
            children: (
              <div>
                {detail.description ? <p style={{ whiteSpace: 'pre-wrap' }}>{detail.description}</p> : null}
                {offering ? (
                  <>
                    <UiDescriptions
                      bordered
                      size="small"
                      column={1}
                      items={[
                        { key: 'year', label: t('config.offering.academicYear'), children: `${offering.academicYear}-${offering.academicYear + 1}` },
                        { key: 'lecturers', label: t('config.offering.lecturers'), children: <OfferingLecturers lecturers={offering.lecturers} /> },
                        {
                          key: 'weights',
                          label: t('config.offering.weights'),
                          children:
                            offering.weightProcess !== undefined
                              ? t('learner.course.weightsValue', { p: offering.weightProcess, m: offering.weightMidterm ?? 0, f: offering.weightFinal ?? 0 })
                              : '—',
                        },
                        {
                          key: 'syllabus',
                          label: t('config.offering.syllabusUrl'),
                          children: offering.syllabusUrl ? (
                            <a href={offering.syllabusUrl} target="_blank" rel="noopener noreferrer">
                              {offering.syllabusUrl}
                            </a>
                          ) : (
                            '—'
                          ),
                        },
                        ...(offering.hasProject
                          ? [{ key: 'project', label: t('config.offering.project'), children: offering.projectDescription ?? t('config.offering.hasProject') }]
                          : []),
                      ]}
                    />
                    {offering.studentGuide ? (
                      <div style={{ marginTop: 16 }}>
                        <UiTitle level={5}>{t('config.offering.studentGuide')}</UiTitle>
                        <StudentGuide markdown={offering.studentGuide} />
                      </div>
                    ) : null}
                  </>
                ) : (
                  <UiEmpty image={UiEmpty.PRESENTED_IMAGE_SIMPLE} description={t('learner.course.noOffering')} />
                )}
              </div>
            ),
          },
          {
            key: 'content',
            label: t('learner.course.content'),
            children: topicsLoading ? (
              <UiSkeleton active paragraph={{ rows: 4 }} />
            ) : topics?.topics.length ? (
              <TopicGraph topics={topics.topics} edges={topics.edges} height={480} />
            ) : (
              <UiEmpty image={UiEmpty.PRESENTED_IMAGE_SIMPLE} description={t('learner.course.noTopics')} />
            ),
          },
          { key: 'curricula', label: t('learner.course.inCurricula'), children: <CourseCurriculaTab courseId={courseId} /> },
          {
            key: 'comments',
            label: t('learner.course.comments', { count: detail.commentCount }),
            children: <CommentThread courseId={courseId} academicYears={detail.availableYears} />,
          },
        ]}
      />
    </div>
  );
}
