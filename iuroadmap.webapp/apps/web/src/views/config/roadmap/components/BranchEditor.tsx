import { useEffect, useState } from 'react';
import { formatBranchCondition, parseBranchCondition, type BranchOperator } from '@iuroadmap/shared/roadmap-engine';
import { EntityConstant } from '@iuroadmap/shared/constants';
import { UiButton, UiInput, UiInputNumber, UiSelect, UiSpace, UiText } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { branchLabel } from '../../../../components/semester-canvas';

const MAX_GPA = 100;

export interface BranchEditorProps {
  choiceGroup?: string;
  condition?: string;
  readOnly: boolean;
  /** Both empty = not in a branch */
  onChange: (value: { choiceGroup?: string; condition?: string }) => void;
}

/**
 * Conditional branch of a course (FR-RDM.07.4): e.g. group "HK8", "GPA ≥ 70" → Thesis,
 * "GPA < 70" → Special Study. The learner sees which branch fits their cumulative GPA.
 */
export function BranchEditor({ choiceGroup, condition, readOnly, onChange }: BranchEditorProps) {
  const { t } = useTranslation();
  const parsed = parseBranchCondition(condition);
  const [group, setGroup] = useState(choiceGroup ?? '');
  const [operator, setOperator] = useState<BranchOperator>(parsed?.operator ?? '>=');
  const [threshold, setThreshold] = useState<number | null>(parsed?.threshold ?? null);

  useEffect(() => {
    const next = parseBranchCondition(condition);
    setGroup(choiceGroup ?? '');
    setOperator(next?.operator ?? '>=');
    setThreshold(next?.threshold ?? null);
  }, [choiceGroup, condition]);

  if (readOnly) {
    return choiceGroup && condition ? (
      <UiText>
        {choiceGroup} · {branchLabel(t, condition)}
      </UiText>
    ) : (
      <UiText type="secondary">—</UiText>
    );
  }

  const complete = group.trim() !== '' && threshold !== null;
  return (
    <div data-testid="branch-editor">
      <UiSpace direction="vertical" size={4} style={{ width: '100%' }}>
        <UiInput size="small" value={group} maxLength={EntityConstant.ElectiveGroup} placeholder={t('roadmap.branch.groupPlaceholder')} onChange={(e) => setGroup(e.target.value)} />
        <UiSpace size={4}>
          <UiText style={{ fontSize: 12 }}>GPA</UiText>
          <UiSelect
            size="small"
            style={{ width: 70 }}
            value={operator}
            onChange={setOperator}
            options={[
              { value: '>=', label: '≥' },
              { value: '<', label: '<' },
            ]}
          />
          <UiInputNumber size="small" style={{ width: 80 }} min={0} max={MAX_GPA} value={threshold} onChange={(v) => setThreshold(typeof v === 'number' ? v : null)} />
        </UiSpace>
        <UiSpace size={4}>
          <UiButton
            size="small"
            type="primary"
            disabled={!complete}
            onClick={() =>
              onChange({ choiceGroup: group.trim(), condition: formatBranchCondition({ metric: 'CUM_GPA100', operator, threshold: threshold! }) })
            }
          >
            {t('roadmap.branch.apply')}
          </UiButton>
          {choiceGroup || condition ? (
            <UiButton size="small" onClick={() => onChange({ choiceGroup: undefined, condition: undefined })}>
              {t('roadmap.branch.clear')}
            </UiButton>
          ) : null}
        </UiSpace>
        <UiText type="secondary" style={{ fontSize: 11 }}>
          {t('roadmap.branch.hint')}
        </UiText>
      </UiSpace>
    </div>
  );
}
