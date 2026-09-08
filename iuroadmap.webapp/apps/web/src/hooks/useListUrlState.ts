import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface UseListUrlStateProps<T> {
  defaultFilter: T;
  toParams: (filter: T, page: number) => Record<string, string>;
  fromParams: (params: URLSearchParams) => { filter: T; page: number };
}

export function useListUrlState<T>({
  defaultFilter,
  toParams,
  fromParams,
}: UseListUrlStateProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filter: urlFilter, page: urlPage } = fromParams(searchParams);

  const [filter, setFilter] = useState<T>(urlFilter || defaultFilter);
  const [page, setPage] = useState<number>(urlPage || 1);

  const applyFilter = (nextFilter: T) => {
    setFilter(nextFilter);
    setPage(1);
    setSearchParams(toParams(nextFilter, 1));
  };

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    setSearchParams(toParams(filter, nextPage));
  };

  return { filter, page, applyFilter, changePage };
}
