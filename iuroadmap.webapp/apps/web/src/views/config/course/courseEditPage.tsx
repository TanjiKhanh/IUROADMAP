import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCoursesControllerGetById, useCoursesControllerUpdate, type CourseDetailResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiCard, UiResult, UiSkeleton, UiSpace, UiTag, UiText, useToast } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../../api/apiResult';
import { CourseForm, type CourseFormValues } from './components/courseForm';
import { VersionStatusTag } from '../major/components/versionStatusTag';

export function CourseEditPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id = '' } = useParams<{ id: string }>();
  const numericId = Number(id);
  const { toast, toastContextHolder } = useToast();
  const { mutateAsync: update, isPending } = useCoursesControllerUpdate();

  const { data: raw, isLoading, isError } = useCoursesControllerGetById(numericId, {
    query: { enabled: Boolean(id) && !isNaN(numericId) },
  });
  const record = unwrapData<CourseDetailResponse>(raw);

  const defaults = useMemo<Partial<CourseFormValues> | undefined>(
    () =>
      record
        ? {
            code: record.code,
            name: record.name,
            theoryCredits: record.theoryCredits,
            labCredits: record.labCredits,
            categoryId: record.categoryId,
            gradingMode: record.gradingMode,
            countsTowardGpa: record.countsTowardGpa,
            countsTowardCredits: record.countsTowardCredits,
            description: record.description ?? '',
          }
        : undefined,
    [record],
  );

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 8 }} />;
  if (isError || !record) return <UiResult status="error" title={t('config.common.failedToLoad')} />;

  return (
    <div style={{ margin: '0 auto', maxWidth: 1000 }}>
      {toastContextHolder}
      <UiCard title={t('config.course.edit')} style={{ marginBottom: 16 }}>
        <CourseForm
          defaultValues={defaults}
          loading={isPending}
          submitLabel={t('config.common.save')}
          onCancel={() => navigate(RoutePaths.web.config.course.root)}
          onSubmit={async (values) => {
            try {
              await update({ data: { ...values, id: numericId } });
              toast.success(t('config.common.success'));
              navigate(RoutePaths.web.config.course.root);
            } catch (err: unknown) {
              toast.error(apiErrorMessage(err, t, t('config.common.saveFailed')));
            }
          }}
        />
      </UiCard>

      <UiCard title={t('config.course.usedIn')} size="small" style={{ marginBottom: 16 }}>
        {record.usedIn.length ? (
          <UiSpace wrap>
            {record.usedIn.map((u) => (
              <Link key={u.versionId} to={RoutePaths.web.config.major.detail.replace(':id', String(u.majorId))}>
                <UiTag style={{ cursor: 'pointer' }}>
                  {u.majorName} · {u.cohortYear} <VersionStatusTag status={u.status} bare />
                </UiTag>
              </Link>
            ))}
          </UiSpace>
        ) : (
          <UiText type="secondary">{t('config.course.notUsed')}</UiText>
        )}
      </UiCard>

      <UiCard title={t('config.course.offeringYears')} size="small">
        {record.offeringYears.length ? (
          <UiSpace wrap>
            {record.offeringYears.map((y) => (
              <UiTag key={y} color="blue">
                {y}-{y + 1}
              </UiTag>
            ))}
          </UiSpace>
        ) : (
          <UiText type="secondary">{t('config.course.noOffering')}</UiText>
        )}
      </UiCard>
    </div>
  );
}
