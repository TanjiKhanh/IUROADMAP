import type { CourseOfferingLecturerResponse } from '@iuroadmap/api-gen';
import { UiSpace, UiTag, UiText } from '../../uikit';
import { useTranslation } from '../../hooks/useTranslation';

/** Lecturers of an offering, with role and term of the year (FR-LRN.11.4). */
export function OfferingLecturers({ lecturers }: { lecturers: CourseOfferingLecturerResponse[] }) {
  const { t } = useTranslation();
  if (!lecturers.length) return <UiText type="secondary">{t('learner.course.noLecturer')}</UiText>;
  return (
    <UiSpace direction="vertical" size={4}>
      {lecturers.map((l) => (
        <span key={`${l.lecturerId}-${l.termInYear ?? ''}`}>
          <UiText strong>
            {l.title ? `${l.title} ` : ''}
            {l.fullName}
          </UiText>{' '}
          {l.role === 'TA' ? <UiTag>{t('config.offering.roles.TA')}</UiTag> : null}
          {l.termInYear ? <UiTag color="blue">{t(`learner.term.termInYearOptions.${l.termInYear}`)}</UiTag> : null}
        </span>
      ))}
    </UiSpace>
  );
}
