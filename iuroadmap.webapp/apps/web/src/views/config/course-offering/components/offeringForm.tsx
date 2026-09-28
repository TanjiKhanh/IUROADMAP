import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdminCourseOfferingsZod, type CourseOfferingResponse, type CourseOfferingUpdateRequest } from '@iuroadmap/api-gen';
import { isValidWeights } from '@iuroadmap/shared/roadmap-engine';
import {
  UiAlert,
  UiCard,
  UiCol,
  UiForm,
  UiFormActions,
  UiInputField,
  UiNumberField,
  UiRow,
  UiSwitchField,
  UiTabs,
  UiTextAreaField,
} from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { StudentGuide } from '../../../../components/course/StudentGuide';

type InfoValues = Omit<CourseOfferingUpdateRequest, 'lecturers'>;

export interface OfferingFormProps {
  offering: CourseOfferingResponse;
  loading?: boolean;
  onSubmit: (values: InfoValues) => void | Promise<void>;
}

/** Year-specific data of a course: student notes, syllabus, default weights, project (FR-RDM.08.1). */
export function OfferingForm({ offering, loading, onSubmit }: OfferingFormProps) {
  const { t } = useTranslation();
  const { control, handleSubmit, reset, setError } = useForm<InfoValues>({
    resolver: zodResolver(AdminCourseOfferingsZod.CourseOfferingsControllerUpdateBody.omit({ lecturers: true })) as never,
  });
  const [studentGuide, hasProject, w1, w2, w3] = useWatch({ control, name: ['studentGuide', 'hasProject', 'weightProcess', 'weightMidterm', 'weightFinal'] });
  const weightsOk = isValidWeights([w1 ?? null, w2 ?? null, w3 ?? null]);

  useEffect(() => {
    reset({
      id: offering.id,
      studentGuide: offering.studentGuide ?? '',
      syllabusUrl: offering.syllabusUrl ?? '',
      weightProcess: offering.weightProcess,
      weightMidterm: offering.weightMidterm,
      weightFinal: offering.weightFinal,
      hasProject: offering.hasProject,
      projectDescription: offering.projectDescription ?? '',
    });
  }, [offering, reset]);

  const submit = handleSubmit(async (values) => {
    if (!weightsOk) {
      setError('weightFinal', { message: t('errors.INVALID_WEIGHTS') });
      return;
    }
    await onSubmit({
      ...values,
      studentGuide: values.studentGuide?.trim() || null,
      syllabusUrl: values.syllabusUrl?.trim() || null,
      projectDescription: values.hasProject ? values.projectDescription?.trim() || null : null,
      weightProcess: values.weightProcess ?? null,
      weightMidterm: values.weightMidterm ?? null,
      weightFinal: values.weightFinal ?? null,
    });
  });

  return (
    <UiForm layout="vertical" onFinish={submit}>
      <UiCard size="small" title={t('config.offering.weights')} style={{ marginBottom: 12 }}>
        <UiRow gutter={12}>
          <UiCol xs={8}>
            <UiNumberField name="weightProcess" control={control} label={t('config.offering.weightProcess')} min={0} max={100} precision={0} addonAfter="%" />
          </UiCol>
          <UiCol xs={8}>
            <UiNumberField name="weightMidterm" control={control} label={t('config.offering.weightMidterm')} min={0} max={100} precision={0} addonAfter="%" />
          </UiCol>
          <UiCol xs={8}>
            <UiNumberField name="weightFinal" control={control} label={t('config.offering.weightFinal')} min={0} max={100} precision={0} addonAfter="%" />
          </UiCol>
        </UiRow>
        {!weightsOk ? <UiAlert type="warning" showIcon message={t('errors.INVALID_WEIGHTS')} /> : null}
      </UiCard>

      <UiCard size="small" title={t('config.offering.syllabusAndProject')} style={{ marginBottom: 12 }}>
        <UiInputField name="syllabusUrl" control={control} label={t('config.offering.syllabusUrl')} placeholder="https://" />
        <UiSwitchField name="hasProject" control={control} label={t('config.offering.hasProject')} />
        {hasProject ? <UiTextAreaField name="projectDescription" control={control} label={t('config.offering.projectDescription')} rows={3} /> : null}
      </UiCard>

      <UiCard size="small" title={t('config.offering.studentGuide')} style={{ marginBottom: 12 }}>
        <UiTabs
          size="small"
          items={[
            {
              key: 'write',
              label: t('config.offering.write'),
              children: <UiTextAreaField name="studentGuide" control={control} rows={10} placeholder={t('config.offering.studentGuidePlaceholder')} />,
            },
            { key: 'preview', label: t('config.offering.preview'), children: <StudentGuide markdown={studentGuide} /> },
          ]}
        />
      </UiCard>

      <UiFormActions loading={loading} submitLabel={t('config.common.save')} cancelLabel={t('config.common.cancel')} />
    </UiForm>
  );
}
