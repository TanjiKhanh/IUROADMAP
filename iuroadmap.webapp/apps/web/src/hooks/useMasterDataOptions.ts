import { useMemo } from 'react';
import {
  useCourseCategoriesControllerGetAll,
  useCoursesControllerForDropdown,
  useDepartmentsControllerForDropdown,
  useLecturersControllerForDropdown,
  useMajorsControllerForDropdown,
  type CourseCategoryResponse,
  type DropdownItemDto,
} from '@iuroadmap/api-gen';
import { unwrapData } from '../api/apiResult';

export interface SelectOption {
  label: string;
  value: number;
}

const DROPDOWN_LIMIT = 200;

const toOptions = (items: DropdownItemDto[] | undefined): SelectOption[] =>
  (items ?? []).map((item) => ({ label: item.label, value: Number(item.id) }));

export function useDepartmentOptions() {
  const { data, isLoading } = useDepartmentsControllerForDropdown({ limit: DROPDOWN_LIMIT });
  const options = useMemo(() => toOptions(unwrapData<DropdownItemDto[]>(data)), [data]);
  return { options, isLoading };
}

export function useMajorOptions(departmentId?: number) {
  const { data, isLoading } = useMajorsControllerForDropdown({ limit: DROPDOWN_LIMIT, departmentId });
  const options = useMemo(() => toOptions(unwrapData<DropdownItemDto[]>(data)), [data]);
  return { options, isLoading };
}

export function useLecturerOptions(params?: { departmentId?: number; academicYear?: number }) {
  const { data, isLoading } = useLecturersControllerForDropdown({ limit: DROPDOWN_LIMIT, ...params });
  const options = useMemo(() => toOptions(unwrapData<DropdownItemDto[]>(data)), [data]);
  return { options, isLoading };
}

/** Course categories carry the node colors, so the full rows are returned too. */
export function useCourseCategories() {
  const { data, isLoading } = useCourseCategoriesControllerGetAll();
  const categories = useMemo(() => unwrapData<CourseCategoryResponse[]>(data) ?? [], [data]);
  const options = useMemo<SelectOption[]>(() => categories.map((c) => ({ label: c.name, value: c.id })), [categories]);
  return { categories, options, isLoading };
}

/** Catalog courses for pickers (label "CODE — Name"), searched on the server. */
export function useCourseOptions(keyword?: string) {
  const { data, isLoading } = useCoursesControllerForDropdown({ limit: DROPDOWN_LIMIT, keyword: keyword || undefined });
  const options = useMemo(() => toOptions(unwrapData<DropdownItemDto[]>(data)), [data]);
  return { options, isLoading };
}
