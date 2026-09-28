import type { CurriculumIssue } from '@iuroadmap/shared/roadmap-engine';
import { UiEmpty, UiTag, UiText } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface IssuesPanelProps {
  errors: ReadonlyArray<CurriculumIssue>;
  warnings: ReadonlyArray<CurriculumIssue>;
  /** node key → course code, to name the courses in messages */
  labelOf: (nodeKey: string) => string;
  termLabelOf?: (termKey: string) => string;
  onSelect?: (issue: CurriculumIssue) => void;
}

/** Translated message of a curriculum issue (codes of FR-RDM.04.4). */
export function useIssueMessage(labelOf: (nodeKey: string) => string, termLabelOf?: (termKey: string) => string) {
  const { t } = useTranslation();
  return (issue: CurriculumIssue) =>
    t(`roadmap.issue.${issue.code}`, {
      courses: issue.nodeKeys.map(labelOf).join(' → '),
      term: issue.termKey && termLabelOf ? termLabelOf(issue.termKey) : '',
      ...(issue.meta ?? {}),
    });
}

/** Errors block publishing, warnings must be acknowledged (BR-RM-09). */
export function IssuesPanel({ errors, warnings, labelOf, termLabelOf, onSelect }: IssuesPanelProps) {
  const { t } = useTranslation();
  const message = useIssueMessage(labelOf, termLabelOf);

  if (!errors.length && !warnings.length) {
    return <UiEmpty image={UiEmpty.PRESENTED_IMAGE_SIMPLE} description={t('roadmap.issue.none')} />;
  }

  const row = (issue: CurriculumIssue, index: number) => (
    <li
      key={`${issue.code}-${index}`}
      style={{ padding: '6px 0', borderBottom: '1px solid #f1f5f9', cursor: onSelect ? 'pointer' : 'default' }}
      onClick={() => onSelect?.(issue)}
      data-testid={`issue-${issue.code}`}
    >
      <UiTag color={issue.severity === 'ERROR' ? 'red' : 'orange'}>{t(`roadmap.issue.severity.${issue.severity}`)}</UiTag>
      <UiText style={{ fontSize: 13 }}>{message(issue)}</UiText>
    </li>
  );

  return (
    <div>
      <UiText strong>
        {t('roadmap.issue.summary', { errors: errors.length, warnings: warnings.length })}
      </UiText>
      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0' }}>
        {errors.map(row)}
        {warnings.map((w, i) => row(w, errors.length + i))}
      </ul>
    </div>
  );
}
