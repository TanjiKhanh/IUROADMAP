import { useEffect, useMemo, useState } from 'react';
import {
  StudentRoadmapsZod,
  useGradingControllerGetConfig,
  useStudentRoadmapsControllerGetResults,
  useStudentRoadmapsControllerSaveResults,
  type GradingConfigResponse,
  type TermResultItemRequest,
  type TermResultRowResponse,
  type TermResultsResponse,
  type TermResultSummaryResponse,
} from '@iuroadmap/api-gen';
import {
  computeTotal,
  evaluateResult,
  isValidScore,
  isValidWeights,
  summarizeResults,
  type ClassificationBand,
  type CourseResultInput,
  type GradeBand,
} from '@iuroadmap/shared/roadmap-engine';
import { ErrorCodes } from '@iuroadmap/shared/constants';
import {
  UiAlert,
  UiButton,
  UiDrawer,
  UiEmpty,
  UiInputNumber,
  UiSelect,
  UiSkeleton,
  UiSpace,
  UiTable,
  UiTag,
  UiText,
  type UiColumnsType,
} from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { apiErrorCode, apiErrorMessage, unwrapData } from '../../../../api/apiResult';

type Choice = 'NONE' | 'IN_PROGRESS' | 'GRADED';
type Triple = [number | null, number | null, number | null];

interface RowState {
  row: TermResultRowResponse;
  choice: Choice;
  weights: Triple;
  scores: Triple;
  /** Typed total when the three component scores are not all set */
  manualTotal: number | null;
  isPassed: boolean | null;
}

function initialState(row: TermResultRowResponse): RowState {
  const r = row.result;
  return {
    row,
    choice: r ? r.status : 'NONE',
    weights: [
      r?.weightProcess ?? row.defaultWeightProcess ?? null,
      r?.weightMidterm ?? row.defaultWeightMidterm ?? null,
      r?.weightFinal ?? row.defaultWeightFinal ?? null,
    ],
    scores: [r?.scoreProcess ?? null, r?.scoreMidterm ?? null, r?.scoreFinal ?? null],
    manualTotal: r && (r.scoreProcess === undefined || r.scoreProcess === null) ? r.totalScore ?? null : null,
    isPassed: r?.isPassed ?? null,
  };
}

/** Total shown for a row: computed from weights × scores (half-up) or typed by the learner. */
function totalOf(s: RowState): number | null {
  if (s.row.gradingMode === 'PASS_FAIL') return null;
  return computeTotal(s.weights, s.scores) ?? s.manualTotal;
}

function rowProblem(s: RowState): string | null {
  if (s.choice !== 'GRADED' || s.row.gradingMode === 'PASS_FAIL') return null;
  if (!isValidWeights(s.weights)) return 'INVALID_WEIGHTS';
  if (!s.scores.every((x) => isValidScore(x)) || !isValidScore(s.manualTotal)) return 'INVALID_SCORE';
  if (totalOf(s) === null) return 'MISSING_TOTAL';
  return null;
}

function toItem(s: RowState): TermResultItemRequest | null {
  if (s.choice === 'NONE') return s.row.result ? { nodeKey: s.row.nodeKey, remove: true } : null;
  if (s.row.gradingMode === 'PASS_FAIL') {
    return { nodeKey: s.row.nodeKey, status: s.choice, isPassed: s.choice === 'GRADED' ? s.isPassed : null };
  }
  const allScores = s.scores.every((x) => x !== null);
  return {
    nodeKey: s.row.nodeKey,
    status: s.choice,
    weightProcess: s.weights[0],
    weightMidterm: s.weights[1],
    weightFinal: s.weights[2],
    scoreProcess: s.scores[0],
    scoreMidterm: s.scores[1],
    scoreFinal: s.scores[2],
    totalScore: allScores ? null : s.manualTotal,
  };
}

function toResultInput(s: RowState): CourseResultInput | null {
  if (s.choice === 'NONE') return null;
  return {
    credits: s.row.credits,
    gradingMode: s.row.gradingMode,
    countsTowardGpa: s.row.countsTowardGpa,
    countsTowardCredits: s.row.countsTowardCredits,
    status: s.choice,
    totalScore: totalOf(s),
    isPassed: s.isPassed,
  };
}

export interface TermResultsDrawerProps {
  roadmapId: number;
  termKey: string | null;
  title: string;
  onClose: () => void;
  /** Results change the roadmap revision: the page reloads the merged view */
  onSaved: () => void;
}

/**
 * Transcript of one term (FL-LRN-06, design §9): QT/GK/CK weights and scores, total rounded half-up,
 * letter and grade point from the grade scale, term and cumulative GPA. PASS_FAIL courses take P/F.
 */
export function TermResultsDrawer({ roadmapId, termKey, title, onClose, onSaved }: TermResultsDrawerProps) {
  const { t } = useTranslation();
  const open = Boolean(termKey);
  const { data: raw, isLoading, refetch } = useStudentRoadmapsControllerGetResults(roadmapId, termKey ?? '', {
    query: { enabled: open, gcTime: 0 },
  });
  const { data: rawConfig } = useGradingControllerGetConfig();
  const { mutateAsync: save, isPending } = useStudentRoadmapsControllerSaveResults();
  const results = unwrapData<TermResultsResponse>(raw);
  const config = unwrapData<GradingConfigResponse>(rawConfig);

  const bands = useMemo<GradeBand[]>(
    () => (config?.gradeScales ?? []).map((b) => ({ letter: b.letter, minScore: b.minScore, maxScore: b.maxScore, gradePoint: b.gradePoint, isPassing: b.isPassing })),
    [config],
  );
  const classifications = useMemo<ClassificationBand[]>(
    () => (config?.classifications ?? []).map((c) => ({ labelKey: c.labelKey, minGpa100: c.minGpa100, maxGpa100: c.maxGpa100 })),
    [config],
  );

  const [rows, setRows] = useState<RowState[]>([]);
  const [error, setError] = useState<string>();
  useEffect(() => {
    setRows((results?.rows ?? []).map(initialState));
    setError(undefined);
  }, [results]);

  const update = (nodeKey: string, patch: Partial<RowState>) =>
    setRows((prev) => prev.map((r) => (r.row.nodeKey === nodeKey ? { ...r, ...patch } : r)));

  const liveSummary = useMemo(
    () => summarizeResults(rows.map(toResultInput).filter((x): x is CourseResultInput => x !== null), bands, classifications),
    [rows, bands, classifications],
  );
  const problems = rows.map(rowProblem).filter(Boolean);

  const columns: UiColumnsType<RowState> = [
    {
      key: 'course',
      title: t('learner.results.course'),
      render: (_v, s) => (
        <div style={{ minWidth: 160 }}>
          <strong>{s.row.code}</strong> <UiText type="secondary">({s.row.credits})</UiText>
          <div style={{ fontSize: 12, color: '#475569' }}>{s.row.name}</div>
          {s.row.gradingMode === 'PASS_FAIL' ? <UiTag color="gold">{t('roadmap.gradingMode.PASS_FAIL')}</UiTag> : null}
          {!s.row.countsTowardCredits ? <UiTag>{t('config.course.noCredits')}</UiTag> : null}
        </div>
      ),
    },
    {
      key: 'status',
      title: t('learner.results.status'),
      render: (_v, s) => (
        <UiSelect
          size="small"
          style={{ width: 130 }}
          disabled={!s.row.editable}
          value={s.choice}
          onChange={(choice) => update(s.row.nodeKey, { choice })}
          options={[
            { value: 'NONE', label: t('learner.results.choice.NONE') },
            { value: 'IN_PROGRESS', label: t('learner.results.choice.IN_PROGRESS') },
            { value: 'GRADED', label: t('learner.results.choice.GRADED') },
          ]}
        />
      ),
    },
    {
      key: 'scores',
      title: t('learner.results.scores'),
      render: (_v, s) => {
        if (s.choice !== 'GRADED') return s.row.editable ? null : <UiText type="secondary">{t('learner.results.chooseCourseFirst')}</UiText>;
        if (s.row.gradingMode === 'PASS_FAIL') {
          return (
            <UiSelect
              size="small"
              style={{ width: 110 }}
              value={s.isPassed === null ? undefined : s.isPassed ? 'P' : 'F'}
              placeholder="P / F"
              onChange={(v) => update(s.row.nodeKey, { isPassed: v === 'P' })}
              options={[
                { value: 'P', label: t('learner.results.pass') },
                { value: 'F', label: t('learner.results.fail') },
              ]}
            />
          );
        }
        const cell = (field: 'weights' | 'scores', index: 0 | 1 | 2, max: number, step: number) => (
          <UiInputNumber
            size="small"
            style={{ width: 62 }}
            min={0}
            max={max}
            step={step}
            value={s[field][index]}
            onChange={(v) => {
              const next = [...s[field]] as Triple;
              next[index] = typeof v === 'number' ? v : null;
              update(s.row.nodeKey, { [field]: next } as Partial<RowState>);
            }}
          />
        );
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(3, 66px)', gap: 4, alignItems: 'center', fontSize: 12 }}>
            <span>{t('learner.results.weights')}</span>
            {cell('weights', 0, 100, 5)}
            {cell('weights', 1, 100, 5)}
            {cell('weights', 2, 100, 5)}
            <span>{t('learner.results.componentScores')}</span>
            {cell('scores', 0, 100, 0.5)}
            {cell('scores', 1, 100, 0.5)}
            {cell('scores', 2, 100, 0.5)}
          </div>
        );
      },
    },
    {
      key: 'total',
      title: t('learner.results.total'),
      render: (_v, s) => {
        if (s.choice !== 'GRADED' || s.row.gradingMode === 'PASS_FAIL') return null;
        const computed = computeTotal(s.weights, s.scores);
        return computed !== null ? (
          <strong data-testid={`total-${s.row.code}`}>{computed}</strong>
        ) : (
          <UiInputNumber
            size="small"
            style={{ width: 70 }}
            min={0}
            max={100}
            step={0.5}
            placeholder="0-100"
            value={s.manualTotal}
            onChange={(v) => update(s.row.nodeKey, { manualTotal: typeof v === 'number' ? v : null })}
          />
        );
      },
    },
    {
      key: 'letter',
      title: t('learner.results.letter'),
      render: (_v, s) => {
        const input = toResultInput(s);
        if (!input || s.choice !== 'GRADED') return null;
        const evaluated = evaluateResult(input, bands);
        if (!evaluated.letter) return null;
        return (
          <UiTag color={evaluated.state === 'FAILED' ? 'red' : 'green'} data-testid={`letter-${s.row.code}`}>
            {evaluated.letter}
            {evaluated.gradePoint !== undefined ? ` · ${evaluated.gradePoint.toFixed(1)}` : ''}
          </UiTag>
        );
      },
    },
  ];

  const summaryLine = (label: string, s?: TermResultSummaryResponse | null, testId?: string) => (
    <div data-testid={testId}>
      <UiText strong>{label}: </UiText>
      {s && s.gpa100 !== undefined && s.gpa100 !== null ? (
        <UiText>
          {t('learner.results.summaryLine', {
            gpa100: s.gpa100.toFixed(1),
            gpa4: (s.gpa4 ?? 0).toFixed(2),
            credits: s.creditsPassed,
          })}
          {s.classificationKey ? ` · ${t(s.classificationKey)}` : ''}
        </UiText>
      ) : (
        <UiText type="secondary">{t('learner.results.noGpa', { credits: s?.creditsPassed ?? 0 })}</UiText>
      )}
    </div>
  );

  return (
    <UiDrawer
      open={open}
      title={title}
      width={Math.min(980, window.innerWidth - 40)}
      onClose={onClose}
      destroyOnHidden
      extra={
        <UiButton
          type="primary"
          loading={isPending}
          disabled={!results || problems.length > 0}
          data-testid="results-save"
          onClick={async () => {
            if (!results || !termKey) return;
            const payload = { revision: results.revision, items: rows.map(toItem).filter((x): x is TermResultItemRequest => x !== null) };
            const parsed = StudentRoadmapsZod.StudentRoadmapsControllerSaveResultsBody.safeParse(payload);
            if (!parsed.success) {
              setError(parsed.error.issues[0]?.message);
              return;
            }
            setError(undefined);
            try {
              await save({ id: roadmapId, termKey, data: payload });
              // the page summary and this table reload in parallel
              onSaved();
              await refetch();
            } catch (err: unknown) {
              if (apiErrorCode(err) === ErrorCodes.REVISION_CONFLICT) refetch();
              setError(apiErrorMessage(err, t, t('config.common.saveFailed')));
            }
          }}
        >
          {t('config.common.save')}
        </UiButton>
      }
    >
      {isLoading ? <UiSkeleton active paragraph={{ rows: 6 }} /> : null}
      {error ? <UiAlert type="error" showIcon message={error} style={{ marginBottom: 12 }} /> : null}
      {problems.length ? <UiAlert type="warning" showIcon message={t(`learner.results.problem.${problems[0]}`)} style={{ marginBottom: 12 }} /> : null}
      {results && !rows.length ? <UiEmpty description={t('learner.results.empty')} /> : null}
      {rows.length ? <UiTable columns={columns} dataSource={rows} rowKey={(s) => s.row.nodeKey} pagination={false} size="small" scroll={{ x: 'max-content' }} /> : null}
      {results ? (
        <UiSpace direction="vertical" style={{ marginTop: 16 }}>
          {summaryLine(t('learner.results.termLive'), {
            gpa100: liveSummary.gpa100 ?? undefined,
            gpa4: liveSummary.gpa4 ?? undefined,
            creditsPassed: liveSummary.creditsPassed,
            creditsInGpa: liveSummary.creditsInGpa,
            classificationKey: liveSummary.classificationKey,
          }, 'term-summary')}
          {summaryLine(t('learner.results.cumulative'), results.term.cumulative, 'cumulative-summary')}
          <UiText type="secondary" style={{ fontSize: 12 }}>
            {t('learner.results.rulesHint')}
          </UiText>
        </UiSpace>
      ) : null}
    </UiDrawer>
  );
}
