/**
 * Helpers around the Orval fetch client.
 *
 * - The generated functions return `{ data: <body>, status }` and the backend wraps every body as
 *   `{ status, data, timestamp, path }`, so the payload is `raw.data.data` (`unwrapData`).
 * - `bootstrapApi` makes non-2xx `/api` responses throw an `ApiError` shaped like an axios error,
 *   so `err?.response?.data?.message` works in every `catch`.
 */

export interface ApiErrorBody {
  status?: string;
  /** ErrorCodes from @iuroadmap/shared, e.g. DEPARTMENT_HAS_MAJORS */
  code?: string;
  message?: string | string[];
  [key: string]: unknown;
}

export class ApiError extends Error {
  readonly response: { status: number; data: ApiErrorBody };

  constructor(status: number, body: ApiErrorBody | undefined) {
    const message = Array.isArray(body?.message) ? body!.message.join(', ') : body?.message;
    super(message || `Request failed with status ${status}`);
    this.name = 'ApiError';
    this.response = { status, data: { ...(body ?? {}), message: message ?? undefined } };
  }

  get status(): number {
    return this.response.status;
  }

  get code(): string | undefined {
    return this.response.data.code;
  }
}

/** The payload of a generated query/mutation result (`raw.data.data`). */
export function unwrapData<T>(raw: unknown): T | undefined {
  return (raw as { data?: { data?: T } } | undefined)?.data?.data;
}

export function apiErrorCode(error: unknown): string | undefined {
  return error instanceof ApiError ? error.code : (error as ApiError | undefined)?.response?.data?.code;
}

/** Extra fields of the error body (e.g. `issues` of PUBLISH_VALIDATION_FAILED). */
export function apiErrorBody(error: unknown): ApiErrorBody | undefined {
  return (error as ApiError | undefined)?.response?.data;
}

/**
 * User-facing message: the translated error code when a translation exists
 * (`errors.<CODE>`), else the backend message, else the fallback.
 */
export function apiErrorMessage(error: unknown, t: (key: string) => string, fallback: string): string {
  const code = apiErrorCode(error);
  if (code) {
    const key = `errors.${code}`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
  }
  const message = (error as ApiError | undefined)?.response?.data?.message ?? (error as Error | undefined)?.message;
  return (typeof message === 'string' && message) || fallback;
}
