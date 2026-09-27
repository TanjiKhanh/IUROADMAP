import { useListUrlState } from '../../../hooks/useListUrlState';

export type FilterFieldKind = 'string' | 'number' | 'boolean';
export type ConfigFilter = Record<string, string | number | boolean | undefined>;

/**
 * URL-synced filter + page for config list pages. `schema` tells how each filter key is parsed
 * back from the query string, e.g. `{ keyword: 'string', departmentId: 'number' }`.
 */
export function useConfigListState<F extends ConfigFilter>(schema: Record<keyof F & string, FilterFieldKind>) {
  return useListUrlState<F>({
    defaultFilter: {} as F,
    toParams: (filter, page) => {
      const out: Record<string, string> = {};
      for (const key of Object.keys(schema)) {
        const value = filter[key];
        if (value !== undefined && value !== null && value !== '') out[key] = String(value);
      }
      if (page > 1) out.page = String(page);
      return out;
    },
    fromParams: (params) => {
      const filter: ConfigFilter = {};
      for (const [key, kind] of Object.entries(schema)) {
        const raw = params.get(key);
        if (raw === null || raw === '') continue;
        if (kind === 'number') {
          const n = Number(raw);
          if (!Number.isNaN(n)) filter[key] = n;
        } else if (kind === 'boolean') {
          filter[key] = raw === 'true';
        } else {
          filter[key] = raw;
        }
      }
      return { filter: filter as F, page: Number(params.get('page') ?? '1') || 1 };
    },
  });
}
