import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  useCourseOfferingsControllerGetById,
  useCourseOfferingsControllerPublish,
  useCourseOfferingsControllerUnpublish,
  useCourseOfferingsControllerUpdate,
  type CourseOfferingResponse,
  type CourseOfferingUpdateRequest,
} from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiButton, UiCard, UiPageHeader, UiResult, UiSkeleton, UiSpace, UiTabs, UiTag, UiText, useToast } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../../api/apiResult';
import { OfferingForm } from './components/offeringForm';
import { LecturerAssignTable } from './components/lecturerAssignTable';

/** Course offering of one academic year: info, lecturers, topics (FL-RDM-08). Editable after publish. */
export function CourseOfferingEditPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const queryClient = useQueryClient();
  const { id = '' } = useParams<{ id: string }>();
  const offeringId = Number(id);

  const { data: raw, isLoading, isError } = useCourseOfferingsControllerGetById(offeringId, { query: { enabled: offeringId > 0 } });
  const offering = unwrapData<CourseOfferingResponse>(raw);
  const { mutateAsync: update, isPending: saving } = useCourseOfferingsControllerUpdate();
  const { mutateAsync: publish, isPending: publishing } = useCourseOfferingsControllerPublish();
  const { mutateAsync: unpublish, isPending: unpublishing } = useCourseOfferingsControllerUnpublish();

  const run = async (action: () => Promise<unknown>) => {
    try {
      await action();
      toast.success(t('config.common.success'));
      queryClient.invalidateQueries();
    } catch (err: unknown) {
      toast.error(apiErrorMessage(err, t, t('config.common.saveFailed')));
    }
  };

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 8 }} />;
  if (isError || !offering) return <UiResult status="error" title={t('config.common.failedToLoad')} />;

  const saveInfo = (values: Omit<CourseOfferingUpdateRequest, 'lecturers'>) => run(() => update({ data: { ...values, id: offering.id } }));

  return (
    <div>
      {toastContextHolder}
      <UiPageHeader
        title={
          <UiSpace wrap>
            {offering.course.code} — {offering.course.name}
            <UiTag color="blue">
              {offering.academicYear}-{offering.academicYear + 1}
            </UiTag>
            <UiTag color={offering.status === 'PUBLISHED' ? 'green' : 'orange'}>{t(`config.offering.status.${offering.status}`)}</UiTag>
          </UiSpace>
        }
        action={
          <UiSpace>
            <UiButton onClick={() => navigate(RoutePaths.web.config.courseOffering.root)}>{t('config.common.back')}</UiButton>
            {offering.status === 'DRAFT' ? (
              <UiButton type="primary" loading={publishing} onClick={() => run(() => publish({ id: offering.id }))}>
                {t('config.offering.publish')}
              </UiButton>
            ) : (
              <UiButton loading={unpublishing} onClick={() => run(() => unpublish({ id: offering.id }))}>
                {t('config.offering.unpublish')}
              </UiButton>
            )}
          </UiSpace>
        }
      />
      <UiCard>
        <UiTabs
          items={[
            { key: 'info', label: t('config.offering.infoTab'), children: <OfferingForm offering={offering} loading={saving} onSubmit={saveInfo} /> },
            {
              key: 'lecturers',
              label: t('config.offering.lecturersTab', { count: offering.lecturers.length }),
              children: (
                <LecturerAssignTable offering={offering} loading={saving} onSave={(lecturers) => run(() => update({ data: { id: offering.id, lecturers } }))} />
              ),
            },
            {
              key: 'topics',
              label: t('config.offering.topicsTab', { count: offering.topicCount }),
              children: (
                <UiSpace direction="vertical">
                  <UiText>{t('config.offering.topicsHint', { count: offering.topicCount })}</UiText>
                  <UiButton type="primary" onClick={() => navigate(RoutePaths.web.config.courseOffering.topics.replace(':id', String(offering.id)))}>
                    {t('config.offering.designTopics')}
                  </UiButton>
                </UiSpace>
              ),
            },
          ]}
        />
      </UiCard>
    </div>
  );
}
