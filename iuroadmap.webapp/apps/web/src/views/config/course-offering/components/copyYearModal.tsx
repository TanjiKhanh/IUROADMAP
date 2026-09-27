import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AdminCourseOfferingsZod,
  useCourseOfferingsControllerCopyYear,
  type CourseOfferingCopyYearRequest,
  type CourseOfferingCopyYearResponse,
} from '@iuroadmap/api-gen';
import { AppConstant } from '@iuroadmap/shared/constants';
import { UiAlert, UiCol, UiForm, UiModal, UiNumberField, UiRow } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../../../api/apiResult';

export interface CopyYearModalProps {
  open: boolean;
  defaultFromYear: number;
  onClose: () => void;
  onCopied: (result: CourseOfferingCopyYearResponse) => void;
}

/** Start a new academic year from the previous one: every offering is copied as DRAFT (FR-RDM.08.3). */
export function CopyYearModal({ open, defaultFromYear, onClose, onCopied }: CopyYearModalProps) {
  const { t } = useTranslation();
  const [error, setError] = useState<string>();
  const { mutateAsync: copy, isPending } = useCourseOfferingsControllerCopyYear();
  const { control, handleSubmit, reset } = useForm<CourseOfferingCopyYearRequest>({
    resolver: zodResolver(AdminCourseOfferingsZod.CourseOfferingsControllerCopyYearBody) as never,
  });

  useEffect(() => {
    if (open) {
      reset({ fromYear: defaultFromYear, toYear: defaultFromYear + 1 });
      setError(undefined);
    }
  }, [open, defaultFromYear, reset]);

  const submit = handleSubmit(async (values) => {
    setError(undefined);
    try {
      const result = unwrapData<CourseOfferingCopyYearResponse>(await copy({ data: values }));
      if (result) onCopied(result);
    } catch (err: unknown) {
      setError(apiErrorMessage(err, t, t('config.common.saveFailed')));
    }
  });

  const yearField = (name: 'fromYear' | 'toYear', label: string) => (
    <UiNumberField name={name} control={control} label={label} required min={AppConstant.AcademicYear.Min} max={AppConstant.AcademicYear.Max} precision={0} />
  );

  return (
    <UiModal open={open} title={t('config.offering.copyYear')} okText={t('config.offering.copy')} cancelText={t('config.common.cancel')} okButtonProps={{ loading: isPending }} onOk={submit} onCancel={onClose}>
      <UiAlert type="info" showIcon message={t('config.offering.copyYearHint')} style={{ marginBottom: 12 }} />
      <UiForm layout="vertical" onFinish={submit}>
        <UiRow gutter={12}>
          <UiCol span={12}>{yearField('fromYear', t('config.offering.fromYear'))}</UiCol>
          <UiCol span={12}>{yearField('toYear', t('config.offering.toYear'))}</UiCol>
        </UiRow>
      </UiForm>
      {error ? <UiAlert type="error" showIcon message={error} /> : null}
    </UiModal>
  );
}
