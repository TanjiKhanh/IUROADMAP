import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AdminCourseOfferingsZod,
  useCourseOfferingsControllerCreate,
  useCourseOfferingsControllerGetByIndex,
  type CourseOfferingCreateRequest,
  type CourseOfferingResponse,
} from '@iuroadmap/api-gen';
import { AppConstant } from '@iuroadmap/shared/constants';
import { UiAlert, UiForm, UiFormItem, UiModal, UiNumberField, UiSelect, UiSelectField } from '../../../../uikit';
import { useTranslation } from '../../../../hooks/useTranslation';
import { useCourseOptions } from '../../../../hooks/useMasterDataOptions';
import { apiErrorMessage, unwrapData } from '../../../../api/apiResult';

export interface CreateOfferingModalProps {
  open: boolean;
  defaultYear: number;
  onClose: () => void;
  onCreated: (offering: CourseOfferingResponse) => void;
}

/** One offering per (course, academic year); it can copy another year's content (FR-RDM.08.2). */
export function CreateOfferingModal({ open, defaultYear, onClose, onCreated }: CreateOfferingModalProps) {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState<string>();
  const [error, setError] = useState<string>();
  const { options: courseOptions, isLoading: coursesLoading } = useCourseOptions(keyword);
  const { mutateAsync: create, isPending } = useCourseOfferingsControllerCreate();
  const { control, handleSubmit, reset } = useForm<CourseOfferingCreateRequest>({
    resolver: zodResolver(AdminCourseOfferingsZod.CourseOfferingsControllerCreateBody) as never,
  });
  const courseId = useWatch({ control, name: 'courseId' });

  const { data: rawSources } = useCourseOfferingsControllerGetByIndex({ courseId, rowsPerPage: 50 }, { query: { enabled: open && Boolean(courseId) } });
  const sources = unwrapData<{ datas: CourseOfferingResponse[] }>(rawSources)?.datas ?? [];

  useEffect(() => {
    if (open) {
      reset({ academicYear: defaultYear });
      setError(undefined);
    }
  }, [open, defaultYear, reset]);

  const submit = handleSubmit(async (values) => {
    setError(undefined);
    try {
      const created = unwrapData<CourseOfferingResponse>(await create({ data: values }));
      if (created) onCreated(created);
    } catch (err: unknown) {
      setError(apiErrorMessage(err, t, t('config.common.saveFailed')));
    }
  });

  return (
    <UiModal open={open} title={t('config.offering.create')} okText={t('config.common.add')} cancelText={t('config.common.cancel')} okButtonProps={{ loading: isPending }} onOk={submit} onCancel={onClose}>
      <UiForm layout="vertical" onFinish={submit}>
        <Controller
          control={control}
          name="courseId"
          render={({ field, fieldState }) => (
            <UiFormItem label={t('config.offering.course')} required validateStatus={fieldState.error ? 'error' : ''} help={fieldState.error?.message}>
              <UiSelect
                showSearch
                filterOption={false}
                onSearch={(v) => setKeyword(v)}
                loading={coursesLoading}
                options={courseOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder={t('config.offering.coursePlaceholder')}
              />
            </UiFormItem>
          )}
        />
        <UiNumberField
          name="academicYear"
          control={control}
          label={t('config.offering.academicYear')}
          required
          min={AppConstant.AcademicYear.Min}
          max={AppConstant.AcademicYear.Max}
          precision={0}
        />
        <UiSelectField
          name="fromOfferingId"
          control={control}
          label={t('config.offering.copyFrom')}
          allowClear
          placeholder={t('config.offering.blank')}
          options={sources.map((o) => ({ value: o.id, label: `${o.academicYear}-${o.academicYear + 1}` }))}
        />
      </UiForm>
      {error ? <UiAlert type="error" showIcon message={error} /> : null}
    </UiModal>
  );
}
