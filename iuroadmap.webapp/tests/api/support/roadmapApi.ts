import { randomUUID } from 'crypto';
import { expect, type APIRequestContext, type APIResponse } from '@playwright/test';
import { getStoredAuthToken } from '../auth/auth-utils';

/**
 * Thin client for the Roadmap v2 endpoints behind the gateway (`/api/v1/...`), authenticated with the
 * token stored by `api/auth/auth.setup.ts`. Success bodies are `{ status, data, ... }`, errors are
 * `{ status: 'error', code, message, ... }` (shared HttpExceptionFilter).
 */
export interface ApiResult<T = any> {
  status: number;
  ok: boolean;
  data: T;
  code?: string;
  body: any;
}

type Params = Record<string, string | number | boolean | undefined>;

async function wrap<T>(response: APIResponse): Promise<ApiResult<T>> {
  const body = await response.json().catch(() => ({}));
  return { status: response.status(), ok: response.ok(), data: body?.data as T, code: body?.code, body };
}

function clean(params?: Params): Record<string, string | number | boolean> | undefined {
  if (!params) return undefined;
  const out: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined) out[k] = v;
  return out;
}

/** `token`: explicit bearer token (E2E specs read it from the logged-in page); default = API setup token. */
export function roadmapApi(request: APIRequestContext, token?: string | null) {
  const headers = () => {
    token = token ?? getStoredAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };
  return {
    get: async <T = any>(path: string, params?: Params) => wrap<T>(await request.get(`/api/v1/${path}`, { headers: headers(), params: clean(params) })),
    post: async <T = any>(path: string, data?: unknown) => wrap<T>(await request.post(`/api/v1/${path}`, { headers: headers(), data: data ?? {} })),
    /** Same call without a token (public endpoints) */
    anonymousGet: async <T = any>(path: string, params?: Params) => wrap<T>(await request.get(`/api/v1/${path}`, { params: clean(params) })),
  };
}

export type RoadmapApi = ReturnType<typeof roadmapApi>;

/** Unique lower-case suffix so parallel runs never collide on slugs / codes. */
export const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
export const newKey = () => randomUUID();

export function expectOk<T>(result: ApiResult<T>): T {
  expect(result.ok, `${result.status} ${JSON.stringify(result.body)}`).toBeTruthy();
  return result.data;
}

export function expectError(result: ApiResult, status: number, code?: string) {
  expect(result.status, JSON.stringify(result.body)).toBe(status);
  if (code) expect(result.code).toBe(code);
}

// ─── Fixture builders ─────────────────────────────────────────────────────────

export async function createDepartment(api: RoadmapApi, suffix = uid()) {
  return expectOk<{ id: number; slug: string }>(
    await api.post('departments/create', { slug: `pw-dept-${suffix}`, name: `PW Department ${suffix}` }),
  );
}

export async function createMajor(api: RoadmapApi, departmentId: number, suffix = uid()) {
  return expectOk<{ id: number; slug: string; name: string }>(
    await api.post('majors/create', { slug: `pw-major-${suffix}`, name: `PW Major ${suffix}`, departmentId }),
  );
}

export async function createCategory(api: RoadmapApi, suffix = uid()) {
  return expectOk<{ id: number; code: string }>(
    await api.post('course-categories/create', {
      code: `PW${suffix}`.toUpperCase().slice(0, 20),
      name: `PW Category ${suffix}`,
      fillColor: '#BDD7EE',
      borderColor: '#2F5597',
    }),
  );
}

export interface CourseInput {
  theoryCredits?: number;
  labCredits?: number;
  gradingMode?: 'SCORE' | 'PASS_FAIL';
  countsTowardGpa?: boolean;
  countsTowardCredits?: boolean;
}

export async function createCourse(api: RoadmapApi, categoryId: number, input: CourseInput = {}, suffix = uid()) {
  return expectOk<{ id: number; code: string; theoryCredits: number; labCredits: number }>(
    await api.post('courses/create', {
      code: `PW${suffix}`.toUpperCase().slice(0, 20),
      name: `PW Course ${suffix}`,
      theoryCredits: input.theoryCredits ?? 3,
      labCredits: input.labCredits ?? 1,
      categoryId,
      gradingMode: input.gradingMode ?? 'SCORE',
      countsTowardGpa: input.countsTowardGpa ?? input.gradingMode !== 'PASS_FAIL',
      countsTowardCredits: input.countsTowardCredits ?? true,
    }),
  );
}

export interface PublishedCurriculum {
  majorId: number;
  majorSlug: string;
  versionId: number;
  cohortYear: number;
  terms: { s1: string; s2: string; pool: string };
  nodes: { a: string; b: string };
  edgeKey: string;
  courses: { a: number; b: number };
  codes: { a: string; b: string };
}

/**
 * Department → major → two courses → curriculum draft with A (semester 1) → B (semester 2,
 * prerequisite) → published. totalCredits matches the plan so there is no warning.
 */
export async function createPublishedCurriculum(api: RoadmapApi, cohortYear = 2023): Promise<PublishedCurriculum> {
  const department = await createDepartment(api);
  const major = await createMajor(api, department.id);
  const category = await createCategory(api);
  const a = await createCourse(api, category.id, { theoryCredits: 3, labCredits: 1 });
  const b = await createCourse(api, category.id, { theoryCredits: 3, labCredits: 1 });

  const draft = expectOk<{ id: number }>(await api.post(`admin/roadmaps/${major.id}/versions/create`, { cohortYear, totalCredits: 8 }));
  const canvas = expectOk<{ version: { revision: number } }>(await api.get(`admin/roadmap-versions/${draft.id}/canvas`));

  const terms = { s1: newKey(), s2: newKey(), pool: newKey() };
  const nodes = { a: newKey(), b: newKey() };
  const edgeKey = newKey();
  expectOk(
    await api.post(`admin/roadmap-versions/${draft.id}/canvas/save`, {
      revision: canvas.version.revision,
      terms: [
        { termKey: terms.s1, kind: 'REGULAR', semesterNo: 1 },
        { termKey: terms.s2, kind: 'REGULAR', semesterNo: 2 },
        { termKey: terms.pool, kind: 'ELECTIVE_POOL' },
      ],
      nodes: [
        { nodeKey: nodes.a, termKey: terms.s1, rowIndex: 0, kind: 'COURSE', courseId: a.id },
        { nodeKey: nodes.b, termKey: terms.s2, rowIndex: 0, kind: 'COURSE', courseId: b.id },
      ],
      edges: [{ edgeKey, sourceKey: nodes.a, targetKey: nodes.b, type: 'PREREQUISITE' }],
    }),
  );
  expectOk(await api.post(`admin/roadmap-versions/${draft.id}/publish`, { acknowledgeWarnings: true }));

  return {
    majorId: major.id,
    majorSlug: major.slug,
    versionId: draft.id,
    cohortYear,
    terms,
    nodes,
    edgeKey,
    courses: { a: a.id, b: b.id },
    codes: { a: a.code, b: b.code },
  };
}
