import { useNavigate } from 'react-router-dom';
import {
  useExploreCoursesControllerList,
  type ExploreCourseCardResponse,
  type ExploreCoursesControllerListSort,
  type GradingMode,
} from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiButton, UiCol, UiEmpty, UiPageHeader, UiRow, UiSkeleton, UiSpace, UiText } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { unwrapData } from '../../../api/apiResult';
import { useConfigListState } from '../../config/shared/useConfigListState';
import { CourseFilterBar, type CourseExplorerFilter } from './components/courseFilterBar';
import { CourseCard } from './components/courseCard';

const PAGE_SIZE = 24;

/** Course Explorer (FL-LRN-11): browse courses by academic year, department, major, lecturer… */
export function CourseExplorerPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { filter, page, applyFilter, changePage } = useConfigListState<CourseExplorerFilter>({
    keyword: 'string',
    departmentId: 'number',
    majorId: 'number',
    academicYear: 'number',
    lecturerId: 'number',
    credits: 'number',
    hasProject: 'boolean',
    categoryId: 'number',
    gradingMode: 'string',
    sort: 'string',
  });

  const { data: raw, isLoading } = useExploreCoursesControllerList({
    currentPage: page,
    rowsPerPage: PAGE_SIZE,
    ...filter,
    gradingMode: filter.gradingMode as GradingMode | undefined,
    sort: filter.sort as ExploreCoursesControllerListSort | undefined,
  });
  const data = unwrapData<{ datas: ExploreCourseCardResponse[]; totalRows: number }>(raw);
  const cards = data?.datas ?? [];
  const totalPages = Math.ceil((data?.totalRows ?? 0) / PAGE_SIZE);

  const open = (card: ExploreCourseCardResponse) => {
    const base = RoutePaths.web.roadmap.courseDetail.replace(':courseId', String(card.course.id));
    navigate(filter.academicYear ? `${base}?academicYear=${filter.academicYear}` : base);
  };

  return (
    <div>
      <UiPageHeader title={t('learner.course.explorerTitle')} />
      <CourseFilterBar value={filter} onChange={applyFilter} />
      <UiText type="secondary" style={{ display: 'block', marginBottom: 8 }}>
        {t('learner.course.resultCount', { count: data?.totalRows ?? 0 })}
      </UiText>
      {isLoading ? <UiSkeleton active paragraph={{ rows: 6 }} /> : null}
      {!isLoading && !cards.length ? <UiEmpty description={t('learner.course.empty')} /> : null}
      <UiRow gutter={[12, 12]}>
        {cards.map((card) => (
          <UiCol key={card.course.id} xs={24} sm={12} lg={8} xl={6}>
            <CourseCard card={card} onOpen={() => open(card)} />
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
    </div>
  );
}
