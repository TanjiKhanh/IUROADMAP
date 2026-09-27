import { useEffect, useState } from 'react';
import { TermInYear, type MergedTermResponse } from '@iuroadmap/api-gen';
import { AppConstant, EntityConstant } from '@iuroadmap/shared/constants';
import { UiCol, UiFormItem, UiInput, UiInputNumber, UiModal, UiRow, UiSelect, UiText } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { academicYearLabel } from '../../lib/learnerCanvasViews';

export interface TermYearValue {
  label?: string;
  academicYear: number | null;
  termInYear: TermInYear | null;
}

export interface TermYearModalProps {
  term: MergedTermResponse | null;
  onSave: (value: TermYearValue) => void;
  onCancel: () => void;
}

/**
 * Label a term with its real academic year ("HK1 2025-2026", FR-LRN.05.6) and rename a term the
 * learner added. Curriculum terms keep their "Semester n" title.
 */
export function TermYearModal({ term, onSave, onCancel }: TermYearModalProps) {
  const { t } = useTranslation();
  const [label, setLabel] = useState('');
  const [academicYear, setAcademicYear] = useState<number | null>(null);
  const [termInYear, setTermInYear] = useState<TermInYear | null>(null);

  useEffect(() => {
    if (!term) return;
    setLabel(term.customLabel ?? '');
    setAcademicYear(term.academicYear ?? null);
    setTermInYear(term.termInYear ?? null);
  }, [term]);

  const isCustom = term?.origin === 'CUSTOM';
  return (
    <UiModal
      open={Boolean(term)}
      title={t('learner.term.editTitle')}
      okText={t('config.common.save')}
      cancelText={t('config.common.cancel')}
      okButtonProps={{ disabled: isCustom && !label.trim() }}
      onCancel={onCancel}
      onOk={() => onSave({ label: isCustom ? label.trim() : undefined, academicYear, termInYear })}
    >
      {isCustom ? (
        <UiFormItem label={t('learner.term.label')} required>
          <UiInput value={label} maxLength={EntityConstant.TermLabel} onChange={(e) => setLabel(e.target.value)} placeholder="IE1" />
        </UiFormItem>
      ) : null}
      <UiRow gutter={12}>
        <UiCol span={12}>
          <UiFormItem label={t('learner.term.academicYear')} help={academicYear ? academicYearLabel(academicYear) : undefined}>
            <UiInputNumber
              style={{ width: '100%' }}
              value={academicYear}
              min={AppConstant.AcademicYear.Min}
              max={AppConstant.AcademicYear.Max}
              precision={0}
              onChange={(value) => setAcademicYear(typeof value === 'number' ? value : null)}
            />
          </UiFormItem>
        </UiCol>
        <UiCol span={12}>
          <UiFormItem label={t('learner.term.termInYear')}>
            <UiSelect
              allowClear
              value={termInYear ?? undefined}
              onChange={(value) => setTermInYear((value as TermInYear) ?? null)}
              options={Object.values(TermInYear).map((v) => ({ value: v, label: t(`learner.term.termInYearOptions.${v}`) }))}
            />
          </UiFormItem>
        </UiCol>
      </UiRow>
      <UiText type="secondary" style={{ fontSize: 12 }}>
        {t('learner.term.yearHint')}
      </UiText>
    </UiModal>
  );
}
