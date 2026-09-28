import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useExploreCoursesControllerTopics, type TopicResponse, type TopicsGraphResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiButton, UiDescriptions, UiDrawer, UiEmpty, UiPageHeader, UiResult, UiSkeleton, UiSpace, UiTag } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { unwrapData } from '../../../api/apiResult';
import { TopicGraph } from '../../../components/topic-graph/TopicGraph';

/**
 * Micro roadmap: the topics of a course for one academic year (FL-LRN-08). Falls back to the
 * nearest earlier offering when the year has none (FR-LRN.11.6).
 */
export function MicroRoadmapPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { courseId = '' } = useParams<{ courseId: string }>();
  const [params] = useSearchParams();
  const academicYear = params.get('academicYear') ? Number(params.get('academicYear')) : undefined;
  const [selected, setSelected] = useState<TopicResponse | null>(null);

  const { data: raw, isLoading, isError } = useExploreCoursesControllerTopics(Number(courseId), { academicYear }, { query: { enabled: Number(courseId) > 0 } });
  const graph = unwrapData<TopicsGraphResponse>(raw);

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 8 }} />;
  if (isError || !graph) return <UiResult status="404" title={t('learner.course.noTopics')} />;

  return (
    <div>
      <UiPageHeader
        title={
          <UiSpace wrap>
            {graph.courseCode} — {graph.courseName}
            <UiTag color="blue">
              {graph.academicYear}-{graph.academicYear + 1}
            </UiTag>
          </UiSpace>
        }
        action={
          <UiButton onClick={() => navigate(`${RoutePaths.web.roadmap.courseDetail.replace(':courseId', courseId)}?tab=content`)}>{t('common.back')}</UiButton>
        }
      />
      {graph.topics.length ? (
        <TopicGraph topics={graph.topics} edges={graph.edges} height="calc(100vh - 200px)" selectedTopicId={selected?.id} onTopicClick={setSelected} />
      ) : (
        <UiEmpty description={t('learner.course.noTopics')} />
      )}
      <UiDrawer open={Boolean(selected)} title={selected?.title} width={420} onClose={() => setSelected(null)}>
        {selected ? (
          <UiDescriptions
            column={1}
            size="small"
            items={[
              { key: 'description', label: t('config.topic.description'), children: selected.description ?? '—' },
              { key: 'objectives', label: t('config.topic.objectives'), children: <span style={{ whiteSpace: 'pre-wrap' }}>{selected.learningObjectives ?? '—'}</span> },
              {
                key: 'resources',
                label: t('config.topic.resourcesUrl'),
                children: selected.resourcesUrl ? (
                  <a href={selected.resourcesUrl} target="_blank" rel="noopener noreferrer">
                    {selected.resourcesUrl}
                  </a>
                ) : (
                  '—'
                ),
              },
              { key: 'hours', label: t('config.topic.estimatedHours'), children: selected.estimatedHours ?? '—' },
            ]}
          />
        ) : null}
      </UiDrawer>
    </div>
  );
}
