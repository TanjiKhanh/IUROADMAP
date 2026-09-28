import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExploreRoadmapsControllerList, useExploreRoadmapsControllerYears, type ExploreCurriculumCardResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import {
  UiButton,
  UiCard,
  UiCol,
  UiEmpty,
  UiPageHeader,
  UiRow,
  UiSelect,
  UiSkeleton,
  UiSpace,
  UiTag,
  UiText,
} from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { useDepartmentOptions, useMajorOptions } from '../../../hooks/useMasterDataOptions';
import { unwrapData } from '../../../api/apiResult';
import { KeywordFilter } from '../../config/shared/keywordFilter';
import { useConfigListState } from '../../config/shared/useConfigListState';
import { CloneDialog } from './components/cloneDialog';

const PAGE_SIZE = 12;

type ExploreFilter = { keyword?: string; departmentId?: number; majorId?: number; cohortYear?: number };

/** Published curricula to browse and clone (FL-LRN-02). */
export function ExploreRoadmapsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [cloning, setCloning] = useState<ExploreCurriculumCardResponse | null>(null);
  const { filter, page, applyFilter, changePage } = useConfigListState<ExploreFilter>({
    keyword: 'string',
    departmentId: 'number',
    majorId: 'number',
    cohortYear: 'number',
  });
  const { options: departmentOptions } = useDepartmentOptions();
  const { options: majorOptions } = useMajorOptions(filter.departmentId);
  const { data: rawYears } = useExploreRoadmapsControllerYears();
  const years = unwrapData<number[]>(rawYears) ?? [];

  const { data: raw, isLoading } = useExploreRoadmapsControllerList({ currentPage: page, rowsPerPage: PAGE_SIZE, ...filter });
  const data = unwrapData<{ datas: ExploreCurriculumCardResponse[]; totalRows: number }>(raw);
  const cards = data?.datas ?? [];
  const totalPages = Math.ceil((data?.totalRows ?? 0) / PAGE_SIZE);

  const preview = (card: ExploreCurriculumCardResponse) =>
    navigate(`${RoutePaths.web.roadmap.roadmapPreview.replace(':majorSlug', card.majorSlug)}?cohortYear=${card.cohortYear}`);

  return (
    <div>
      <UiPageHeader title={t('learner.explore.title')} />
      <UiCard size="small" style={{ marginBottom: 16 }}>
        <UiSpace wrap>
          <KeywordFilter value={filter.keyword} placeholder={t('learner.explore.search')} onSearch={(keyword) => applyFilter({ ...filter, keyword })} />
          <UiSelect
            style={{ width: 260 }}
            allowClear
            showSearch
            optionFilterProp="label"
            placeholder={t('learner.explore.department')}
            options={departmentOptions}
            value={filter.departmentId}
            onChange={(departmentId) => applyFilter({ ...filter, departmentId, majorId: undefined })}
          />
          <UiSelect
            style={{ width: 260 }}
            allowClear
            showSearch
            optionFilterProp="label"
            placeholder={t('learner.explore.major')}
            options={majorOptions}
            value={filter.majorId}
            onChange={(majorId) => applyFilter({ ...filter, majorId })}
          />
          <UiSelect
            style={{ width: 160 }}
            allowClear
            placeholder={t('learner.explore.cohortYear')}
            options={years.map((y) => ({ value: y, label: `K${y}` }))}
            value={filter.cohortYear}
            onChange={(cohortYear) => applyFilter({ ...filter, cohortYear })}
          />
        </UiSpace>
      </UiCard>

      {isLoading ? <UiSkeleton active paragraph={{ rows: 6 }} /> : null}
      {!isLoading && !cards.length ? <UiEmpty description={t('learner.explore.empty')} /> : null}

      <UiRow gutter={[16, 16]}>
        {cards.map((card) => (
          <UiCol key={card.versionId} xs={24} md={12} xl={8}>
            <UiCard
              hoverable
              data-testid={`curriculum-card-${card.majorSlug}-${card.cohortYear}`}
              title={card.majorName}
              extra={<UiTag color="blue">K{card.cohortYear}</UiTag>}
              actions={[
                <UiButton key="preview" type="link" onClick={() => preview(card)}>
                  {t('learner.explore.preview')}
                </UiButton>,
                <UiButton key="clone" type="link" onClick={() => setCloning(card)}>
                  {t('learner.explore.clone')}
                </UiButton>,
              ]}
            >
              <UiText type="secondary">{card.departmentName}</UiText>
              <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
                <UiText>{t('learner.explore.totalCredits', { count: card.totalCredits })}</UiText>
                <UiText>{t('learner.explore.courseCount', { count: card.courseCount })}</UiText>
                <UiText type="secondary">{t('learner.explore.learnerCount', { count: card.learnerCount })}</UiText>
              </div>
              {card.majorDescription ? (
                <UiText type="secondary" style={{ display: 'block', marginTop: 8, fontSize: 12 }} ellipsis>
                  {card.majorDescription}
                </UiText>
              ) : null}
            </UiCard>
          </UiCol>
        ))}
      </UiRow>

      {totalPages > 1 ? (
        <UiSpace style={{ marginTop: 16 }}>
          <UiButton disabled={page <= 1} onClick={() => changePage(page - 1)}>
            {t('common.back')}
          </UiButton>
          <UiText>
            {page} / {totalPages}
          </UiText>
          <UiButton disabled={page >= totalPages} onClick={() => changePage(page + 1)}>
            {t('common.next')}
          </UiButton>
        </UiSpace>
      ) : null}

      <CloneDialog curriculum={cloning} onClose={() => setCloning(null)} />
    </div>
  );
}
