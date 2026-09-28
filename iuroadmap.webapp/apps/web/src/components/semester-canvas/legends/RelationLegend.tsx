import { useTranslation } from '../../../hooks/useTranslation';
import { RELATION_COLORS } from '../edges/RelationEdge';

function Line({ dashed, arrow }: { dashed?: boolean; arrow?: boolean }) {
  return (
    <svg width="40" height="12" aria-hidden>
      <line x1="2" y1="6" x2={arrow ? 32 : 38} y2="6" stroke={RELATION_COLORS.base} strokeWidth="2" strokeDasharray={dashed ? '5 3' : undefined} />
      {arrow ? <polygon points="32,2 39,6 32,10" fill={RELATION_COLORS.base} /> : null}
    </svg>
  );
}

/** Legend of the three relation types (design §4.4). */
export function RelationLegend({ showCustom }: { showCustom?: boolean }) {
  const { t } = useTranslation();
  const item = { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#334155' } as const;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
      <span style={item}>
        <Line arrow /> {t('roadmap.relation.PREREQUISITE')}
      </span>
      <span style={item}>
        <Line dashed arrow /> {t('roadmap.relation.PREVIOUS')}
      </span>
      <span style={item}>
        <Line /> {t('roadmap.relation.COREQUISITE')}
      </span>
      {showCustom ? (
        <span style={item}>
          <span style={{ width: 24, height: 2, background: RELATION_COLORS.custom, display: 'inline-block' }} />
          {t('roadmap.relation.custom')}
        </span>
      ) : null}
    </div>
  );
}
