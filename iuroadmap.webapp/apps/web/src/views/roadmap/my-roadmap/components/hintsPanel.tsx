import type { RoadmapHintResponse } from '@iuroadmap/api-gen';
import { UiEmpty, UiText } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface HintsPanelProps {
  hints: ReadonlyArray<RoadmapHintResponse>;
  labelOf: (nodeKey: string) => string;
  onSelect?: (hint: RoadmapHintResponse) => void;
}

/** Suggestions only: the learner is free to plan (BR-LRN-12); nothing here blocks saving. */
export function HintsPanel({ hints, labelOf, onSelect }: HintsPanelProps) {
  const { t } = useTranslation();
  if (!hints.length) return <UiEmpty image={UiEmpty.PRESENTED_IMAGE_SIMPLE} description={t('learner.hints.none')} />;
  return (
    <div data-testid="hints-panel">
      <UiText type="secondary" style={{ fontSize: 12 }}>
        {t('learner.hints.intro')}
      </UiText>
      <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0' }}>
        {hints.map((hint, index) => (
          <li
            key={`${hint.code}-${index}`}
            onClick={() => onSelect?.(hint)}
            style={{ padding: '6px 0', borderBottom: '1px solid #f1f5f9', cursor: onSelect ? 'pointer' : 'default', fontSize: 13 }}
          >
            <span style={{ color: '#c2410c', marginRight: 6 }}>⚠</span>
            {t(`learner.hints.${hint.code}`, {
              courses: hint.nodeKeys.map(labelOf).join(' → '),
              ...(hint.meta ?? {}),
            })}
          </li>
        ))}
      </ul>
    </div>
  );
}
