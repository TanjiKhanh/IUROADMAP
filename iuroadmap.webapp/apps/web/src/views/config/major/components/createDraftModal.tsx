import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AdminCurriculumZod,
  useCurriculumVersionsControllerCreate,
  type CurriculumVersionCreateRequest,
  type CurriculumVersionResponse,
} from '@iuroadmap/api-gen';
import { AppConstant } from '@iuroadmap/shared/constants';
import { UiAlert, UiCol, UiForm, UiInputField, UiModal, UiNumberField, UiRow, UiSelectField } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../../../api/apiResult';

export interface CreateDraftModalProps {
  open: boolean;
  majorId: number;
  /** Existing curricula of the major, offered as copy sources */
  versions: CurriculumVersionResponse[];
  /** Prefill: copy this curriculum (e.g. "re-issue" of a published year) */
  initial?: Partial<CurriculumVersionCreateRequest>;
  onClose: () => void;
  onCreated: (version: CurriculumVersionResponse) => void;
}

/**
 * T1 — new draft for a cohort year, blank or copied from another curriculum. Copying keeps every
 * term / node / edge key so learner overlays survive a curriculum change (BR-RM-13).
 */
export function CreateDraftModal({ open, majorId, versions, initial, onClose, onCreated }: CreateDraftModalProps) {
  const { t } = useTranslation();
  const [error, setError] = useState<string>();
  const { mutateAsync: create, isPending } = useCurriculumVersionsControllerCreate();
  const { control, handleSubmit, reset } = useForm<CurriculumVersionCreateRequest>({
    resolver: zodResolver(AdminCurriculumZod.CurriculumVersionsControllerCreateBody) as never,
  });

  useEffect(() => {
    if (!open) return;
    setError(undefined);
    const latest = versions[0];
    reset({
      cohortYear: new Date().getFullYear(),
      totalCredits: latest?.totalCredits ?? 0,
      decisionRef: '',
      fromVersionId: latest?.id,
      ...initial,
    });
  }, [open, versions, initial, reset]);

  const submit = handleSubmit(async (values) => {
    setError(undefined);
    try {
      const created = unwrapData<CurriculumVersionResponse>(
        await create({ roadmapId: majorId, data: { ...values, decisionRef: values.decisionRef || undefined } }),
      );
      if (created) onCreated(created);
    } catch (err: unknown) {
      setError(apiErrorMessage(err, t, t('config.curriculum.createFailed')));
    }
  });

  return (
    <UiModal
      open={open}
      title={t('config.curriculum.createDraft')}
      okText={t('config.common.add')}
      cancelText={t('config.common.cancel')}
      okButtonProps={{ loading: isPending }}
      onOk={submit}
      onCancel={onClose}
    >
      <UiForm layout="vertical" onFinish={submit}>
        <UiRow gutter={12}>
          <UiCol span={12}>
            <UiNumberField
              name="cohortYear"
              control={control}
              label={t('config.curriculum.cohortYear')}
              required
              min={AppConstant.AcademicYear.Min}
              max={AppConstant.AcademicYear.Max}
              precision={0}
            />
          </UiCol>
          <UiCol span={12}>
            <UiNumberField name="totalCredits" control={control} label={t('config.curriculum.totalCredits')} required min={1} precision={0} />
          </UiCol>
        </UiRow>
        <UiInputField name="decisionRef" control={control} label={t('config.curriculum.decisionRef')} placeholder="89/QĐ-ĐHQT" />
        <UiSelectField
          name="fromVersionId"
          control={control}
          label={t('config.curriculum.copyFrom')}
          allowClear
          placeholder={t('config.curriculum.blankDraft')}
          options={versions.map((v) => ({
            value: v.id,
            label: `${v.cohortYear}${v.revisionNo && v.revisionNo > 1 ? ` (#${v.revisionNo})` : ''} · ${t(`roadmap.versionStatus.${v.status}`)}`,
          }))}
        />
      </UiForm>
      {error ? <UiAlert type="error" showIcon message={error} /> : null}
    </UiModal>
  );
}
