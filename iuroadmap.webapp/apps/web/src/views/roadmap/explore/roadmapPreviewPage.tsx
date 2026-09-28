import { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useExploreRoadmapsControllerPreview, type ExploreRoadmapPreviewResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiButton, UiCard, UiPageHeader, UiResult, UiSelect, UiSkeleton, UiSpace, UiTag, UiText } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { useCourseCategories } from '../../../hooks/useMasterDataOptions';
import { unwrapData } from '../../../api/apiResult';
import { CategoryLegend, RelationLegend, SemesterCanvas } from '../../../components/semester-canvas';
import { buildPreviewCanvasViews } from '../lib/learnerCanvasViews';
import { CloneDialog } from './components/cloneDialog';

/** Read-only curriculum of a major for a cohort year, before cloning (FR-LRN.02.3). */
export function RoadmapPreviewPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { majorSlug = '' } = useParams<{ majorSlug: string }>();
  const [params, setParams] = useSearchParams();
  const cohortYear = params.get('cohortYear') ? Number(params.get('cohortYear')) : undefined;
  const [cloneOpen, setCloneOpen] = useState(false);
  const { categories } = useCourseCategories();

  const { data: raw, isLoading, isError } = useExploreRoadmapsControllerPreview(majorSlug, { cohortYear }, { query: { enabled: Boolean(majorSlug) } });
  const preview = unwrapData<ExploreRoadmapPreviewResponse>(raw);
  const views = useMemo(() => (preview ? buildPreviewCanvasViews(preview, t) : null), [preview, t]);
  const courseIdByNode = useMemo(() => new Map((preview?.nodes ?? []).map((n) => [n.nodeKey, n.course?.id])), [preview]);

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 10 }} />;
  if (isError || !preview || !views) return <UiResult status="404" title={t('learner.explore.notFound')} />;

  const { curriculum } = preview;
  return (
    <div>
      <UiPageHeader
        title={
          <UiSpace wrap>
            {curriculum.majorName}
            <UiTag>{curriculum.departmentName}</UiTag>
          </UiSpace>
        }
        action={
          <UiSpace wrap>
            <UiButton onClick={() => navigate(RoutePaths.web.roadmap.exploreRoadmaps)}>{t('common.back')}</UiButton>
            <UiSelect
              style={{ width: 140 }}
              value={curriculum.cohortYear}
              options={preview.availableYears.map((y) => ({ value: y.cohortYear, label: `K${y.cohortYear}` }))}
              onChange={(year) => setParams({ cohortYear: String(year) })}
            />
            <UiButton type="primary" onClick={() => setCloneOpen(true)} data-testid="preview-clone">
              {t('learner.explore.clone')}
            </UiButton>
          </UiSpace>
        }
      />
      <UiCard size="small" style={{ marginBottom: 12 }}>
        <UiSpace wrap size={24}>
          <UiText>{t('learner.explore.totalCredits', { count: curriculum.totalCredits })}</UiText>
          <UiText>{t('learner.explore.courseCount', { count: curriculum.courseCount })}</UiText>
          <UiText type="secondary">{t('learner.explore.learnerCount', { count: curriculum.learnerCount })}</UiText>
          <UiText type="secondary">{t('learner.explore.previewHint')}</UiText>
        </UiSpace>
      </UiCard>
      <SemesterCanvas
        mode="readOnly"
        terms={views.terms}
        nodes={views.nodes}
        edges={views.edges}
        height="calc(100vh - 290px)"
        onNodeClick={(nodeKey) => {
          const courseId = courseIdByNode.get(nodeKey);
          if (courseId) navigate(RoutePaths.web.roadmap.courseDetail.replace(':courseId', String(courseId)));
        }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 8 }}>
        <CategoryLegend items={categories} />
        <RelationLegend />
      </div>
      <CloneDialog curriculum={cloneOpen ? curriculum : null} onClose={() => setCloneOpen(false)} />
    </div>
  );
}
