import { ExploreCoursesControllerListSort, GradingMode, useExploreCoursesControllerAcademicYears } from '@iuroadmap/api-gen';
import { UiCard, UiCheckbox, UiInputNumber, UiSelect, UiSpace } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useCourseCategories, useDepartmentOptions, useLecturerOptions, useMajorOptions } from '../../../../hooks/useMasterDataOptions';
import { unwrapData } from '../../../../api/apiResult';
import { KeywordFilter } from '../../../config/shared/keywordFilter';

export type CourseExplorerFilter = {
  keyword?: string;
  departmentId?: number;
  majorId?: number;
  academicYear?: number;
  lecturerId?: number;
  credits?: number;
  hasProject?: boolean;
  categoryId?: number;
  gradingMode?: string;
  sort?: string;
};

/** Filters of the Course Explorer (FR-LRN.11.2): academic year first, as Stanford / NUSMods do. */
export function CourseFilterBar({ value, onChange }: { value: CourseExplorerFilter; onChange: (next: CourseExplorerFilter) => void }) {
  const { t } = useTranslation();
  const { data: rawYears } = useExploreCoursesControllerAcademicYears();
  const years = unwrapData<number[]>(rawYears) ?? [];
  const { options: departmentOptions } = useDepartmentOptions();
  const { options: majorOptions } = useMajorOptions(value.departmentId);
  const { options: lecturerOptions } = useLecturerOptions({ departmentId: value.departmentId, academicYear: value.academicYear });
  const { options: categoryOptions } = useCourseCategories();
  const set = (patch: Partial<CourseExplorerFilter>) => onChange({ ...value, ...patch });

  return (
    <UiCard size="small" style={{ marginBottom: 16 }}>
      <UiSpace wrap>
        <UiSelect
          style={{ width: 150 }}
          allowClear
          placeholder={t('learner.course.academicYear')}
          value={value.academicYear}
          onChange={(academicYear) => set({ academicYear, lecturerId: undefined })}
          options={years.map((y) => ({ value: y, label: `${y}-${y + 1}` }))}
          data-testid="explorer-year"
        />
        <KeywordFilter value={value.keyword} placeholder={t('learner.course.search')} onSearch={(keyword) => set({ keyword })} width={220} />
        <UiSelect
          style={{ width: 220 }}
          allowClear
          showSearch
          optionFilterProp="label"
          placeholder={t('learner.explore.department')}
          options={departmentOptions}
          value={value.departmentId}
          onChange={(departmentId) => set({ departmentId, majorId: undefined, lecturerId: undefined })}
        />
        <UiSelect
          style={{ width: 220 }}
          allowClear
          showSearch
          optionFilterProp="label"
          placeholder={t('learner.explore.major')}
          options={majorOptions}
          value={value.majorId}
          onChange={(majorId) => set({ majorId })}
        />
        <UiSelect
          style={{ width: 220 }}
          allowClear
          showSearch
          optionFilterProp="label"
          placeholder={t('config.offering.lecturer')}
          options={lecturerOptions}
          value={value.lecturerId}
          onChange={(lecturerId) => set({ lecturerId })}
        />
        <UiSelect style={{ width: 180 }} allowClear placeholder={t('config.course.category')} options={categoryOptions} value={value.categoryId} onChange={(categoryId) => set({ categoryId })} />
        <UiInputNumber
          style={{ width: 110 }}
          min={0}
          precision={0}
          placeholder={t('learner.course.credits')}
          value={value.credits ?? null}
          onChange={(v) => set({ credits: typeof v === 'number' ? v : undefined })}
        />
        <UiSelect
          style={{ width: 150 }}
          allowClear
          placeholder={t('config.course.gradingMode')}
          value={value.gradingMode}
          onChange={(gradingMode) => set({ gradingMode })}
          options={Object.values(GradingMode).map((g) => ({ value: g, label: t(`roadmap.gradingMode.${g}`) }))}
        />
        <UiCheckbox checked={Boolean(value.hasProject)} onChange={(e) => set({ hasProject: e.target.checked || undefined })}>
          {t('learner.course.withProject')}
        </UiCheckbox>
        <UiSelect
          style={{ width: 160 }}
          placeholder={t('learner.course.sort')}
          value={value.sort ?? ExploreCoursesControllerListSort.code}
          onChange={(sort) => set({ sort })}
          options={Object.values(ExploreCoursesControllerListSort).map((s) => ({ value: s, label: t(`learner.course.sortBy.${s}`) }))}
        />
      </UiSpace>
    </UiCard>
  );
}
