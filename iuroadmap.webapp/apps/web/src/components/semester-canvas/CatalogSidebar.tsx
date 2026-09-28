import { useMemo, useState } from 'react';
import {
  useCoursesControllerGetByIndex,
  useExploreCoursesControllerList,
  type CourseResponse,
  type ExploreCourseCardResponse,
} from '@iuroadmap/api-gen';
import { UiButton, UiEmpty, UiInput, UiPlusIcon, UiSearchIcon, UiSelect, UiSpin, UiTag, UiText, UiTooltip } from '../../uikit';
import { useTranslation } from '../../hooks/useTranslation';
import { useCourseCategories } from '../../hooks/useMasterDataOptions';
import { unwrapData } from '../../api/apiResult';
import { CourseNodeCard } from './CourseNodeCard';
import { setCatalogDragPayload } from './lib/catalogDrag';
import { CATALOG_DRAG_MIME, type CatalogDragPayload } from './types';

const PAGE_SIZE = 40;

export interface CatalogSidebarProps {
  /** `admin`: full catalog (RM.AD); `explore`: public Course Explorer list (learners) */
  source: 'admin' | 'explore';
  /** Course ids already on the canvas (a course appears once per plan) */
  usedCourseIds: ReadonlySet<number>;
  /** Keyboard / click alternative to drag and drop */
  onAdd?: (course: CatalogDragPayload) => void;
  disabled?: boolean;
  height?: number | string;
}

function fromAdmin(course: CourseResponse): CatalogDragPayload {
  return {
    courseId: course.id,
    code: course.code,
    name: course.name,
    theoryCredits: course.theoryCredits,
    labCredits: course.labCredits,
    fillColor: course.fillColor,
    borderColor: course.borderColor,
    categoryCode: course.categoryCode,
    gradingMode: course.gradingMode,
    countsTowardGpa: course.countsTowardGpa,
    countsTowardCredits: course.countsTowardCredits,
  };
}

function fromExplore(card: ExploreCourseCardResponse): CatalogDragPayload {
  const c = card.course;
  return {
    courseId: c.id,
    code: c.code,
    name: c.name,
    theoryCredits: c.theoryCredits,
    labCredits: c.labCredits,
    fillColor: c.fillColor,
    borderColor: c.borderColor,
    categoryCode: c.categoryCode,
    gradingMode: c.gradingMode,
    countsTowardGpa: c.countsTowardGpa,
    countsTowardCredits: c.countsTowardCredits,
  };
}

/** Course catalog to drag onto the semester canvas (FR-RDM.05.3, FR-LRN.04.3). */
export function CatalogSidebar({ source, usedCourseIds, onAdd, disabled, height = 640 }: CatalogSidebarProps) {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useState<string>();
  const [categoryId, setCategoryId] = useState<number>();
  const { options: categoryOptions } = useCourseCategories();

  const params = { currentPage: 1, rowsPerPage: PAGE_SIZE, keyword: search, categoryId };
  const adminQuery = useCoursesControllerGetByIndex(params, { query: { enabled: source === 'admin' } });
  const exploreQuery = useExploreCoursesControllerList(params, { query: { enabled: source === 'explore' } });

  const { courses, total, isLoading } = useMemo(() => {
    if (source === 'admin') {
      const data = unwrapData<{ datas: CourseResponse[]; totalRows: number }>(adminQuery.data);
      return { courses: (data?.datas ?? []).map(fromAdmin), total: data?.totalRows ?? 0, isLoading: adminQuery.isLoading };
    }
    const data = unwrapData<{ datas: ExploreCourseCardResponse[]; totalRows: number }>(exploreQuery.data);
    return { courses: (data?.datas ?? []).map(fromExplore), total: data?.totalRows ?? 0, isLoading: exploreQuery.isLoading };
  }, [source, adminQuery.data, adminQuery.isLoading, exploreQuery.data, exploreQuery.isLoading]);

  return (
    <div
      data-testid="catalog-sidebar"
      style={{ height, display: 'flex', flexDirection: 'column', gap: 8, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 10 }}
    >
      <UiText strong>{t('roadmap.catalog.title')}</UiText>
      <UiInput
        size="small"
        allowClear
        prefix={<UiSearchIcon />}
        placeholder={t('roadmap.catalog.search')}
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
          if (!e.target.value) setSearch(undefined);
        }}
        onPressEnter={() => setSearch(keyword.trim() || undefined)}
      />
      <UiSelect size="small" allowClear placeholder={t('config.course.category')} options={categoryOptions} value={categoryId} onChange={setCategoryId} />
      <UiText type="secondary" style={{ fontSize: 12 }}>
        {t('roadmap.catalog.hint')}
      </UiText>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 8 }}>
        {isLoading ? <UiSpin /> : null}
        {!isLoading && !courses.length ? <UiEmpty image={UiEmpty.PRESENTED_IMAGE_SIMPLE} /> : null}
        {courses.map((course) => {
          const used = usedCourseIds.has(course.courseId);
          const draggable = !disabled && !used;
          return (
            <div
              key={course.courseId}
              data-testid={`catalog-course-${course.code}`}
              draggable={draggable}
              onDragStart={(event) => {
                event.dataTransfer.setData(CATALOG_DRAG_MIME, JSON.stringify(course));
                event.dataTransfer.effectAllowed = 'copy';
                setCatalogDragPayload(course);
              }}
              onDragEnd={() => setCatalogDragPayload(null)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: used ? 0.45 : 1, cursor: draggable ? 'grab' : 'not-allowed' }}
            >
              <CourseNodeCard
                code={course.code}
                name={course.name}
                theoryCredits={course.theoryCredits}
                labCredits={course.labCredits}
                fillColor={course.fillColor}
                borderColor={course.borderColor}
                width={170}
              />
              {used ? (
                <UiTag style={{ fontSize: 10 }}>{t('roadmap.catalog.onCanvas')}</UiTag>
              ) : onAdd && !disabled ? (
                <UiTooltip title={t('roadmap.catalog.add')}>
                  <UiButton size="small" type="text" icon={<UiPlusIcon />} onClick={() => onAdd(course)} aria-label={t('roadmap.catalog.add')} />
                </UiTooltip>
              ) : null}
            </div>
          );
        })}
        {total > PAGE_SIZE ? (
          <UiText type="secondary" style={{ fontSize: 12 }}>
            {t('roadmap.catalog.more', { count: total - PAGE_SIZE })}
          </UiText>
        ) : null}
      </div>
    </div>
  );
}
