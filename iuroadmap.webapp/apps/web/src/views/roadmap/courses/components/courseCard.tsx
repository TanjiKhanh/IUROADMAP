import type { ExploreCourseCardResponse } from '@iuroadmap/api-gen';
import { UiCard, UiSpace, UiTag, UiText } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';

/** One course in the Course Explorer grid. */
export function CourseCard({ card, onOpen }: { card: ExploreCourseCardResponse; onOpen: () => void }) {
  const { t } = useTranslation();
  const { course } = card;
  return (
    <UiCard
      hoverable
      size="small"
      onClick={onOpen}
      data-testid={`course-card-${course.code}`}
      style={{ borderLeft: `6px solid ${course.borderColor}`, height: '100%' }}
    >
      <UiSpace wrap size={6}>
        <UiText strong>{course.code}</UiText>
        <UiTag>{card.credits} TC</UiTag>
        {course.gradingMode === 'PASS_FAIL' ? <UiTag color="gold">P/F</UiTag> : null}
        {card.hasProject ? <UiTag color="purple">{t('config.offering.project')}</UiTag> : null}
      </UiSpace>
      <div style={{ fontWeight: 500, margin: '4px 0', minHeight: 40 }}>{course.name}</div>
      <UiText type="secondary" style={{ fontSize: 12, display: 'block' }}>
        {card.categoryName}
        {card.offeringYear ? ` · ${card.offeringYear}-${card.offeringYear + 1}` : ''}
      </UiText>
      {card.lecturers.length ? (
        <UiText style={{ fontSize: 12, display: 'block' }} ellipsis>
          {card.lecturers.map((l) => `${l.title ? `${l.title} ` : ''}${l.fullName}`).join(', ')}
        </UiText>
      ) : null}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <UiText type="secondary" style={{ fontSize: 12 }} ellipsis>
          {card.majors.map((m) => m.name).join(', ')}
        </UiText>
        <UiText type="secondary" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
          💬 {card.commentCount}
        </UiText>
      </div>
    </UiCard>
  );
}
