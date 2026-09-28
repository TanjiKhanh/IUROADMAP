import { useNavigate, useParams } from 'react-router-dom';
import { useMajorsControllerGetById, type MajorResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import {
  UiButton,
  UiCard,
  UiDescriptions,
  UiEditIcon,
  UiPageHeader,
  UiResult,
  UiSkeleton,
  UiSpace,
  UiTabs,
  UiTag,
} from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { unwrapData } from '../../../api/apiResult';
import { CurriculumVersionTab } from './components/curriculumVersionTab';

/** Major page: its curricula by cohort year (FL-RDM-04) and general info. */
export function MajorDetailPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id = '' } = useParams<{ id: string }>();
  const majorId = Number(id);

  const { data: raw, isLoading, isError } = useMajorsControllerGetById(majorId, { query: { enabled: majorId > 0 } });
  const major = unwrapData<MajorResponse>(raw);

  if (isLoading) return <UiSkeleton active paragraph={{ rows: 8 }} />;
  if (isError || !major) return <UiResult status="error" title={t('config.common.failedToLoad')} />;

  return (
    <div>
      <UiPageHeader
        title={
          <UiSpace>
            {major.name}
            <UiTag>{major.departmentName}</UiTag>
          </UiSpace>
        }
        action={
          <UiSpace>
            <UiButton onClick={() => navigate(RoutePaths.web.config.major.root)}>{t('config.common.back')}</UiButton>
            <UiButton icon={<UiEditIcon />} onClick={() => navigate(RoutePaths.web.config.major.edit.replace(':id', String(major.id)))}>
              {t('config.common.edit')}
            </UiButton>
          </UiSpace>
        }
      />
      <UiCard>
        <UiTabs
          items={[
            { key: 'curricula', label: t('config.major.curricula'), children: <CurriculumVersionTab majorId={major.id} /> },
            {
              key: 'info',
              label: t('config.major.info'),
              children: (
                <UiDescriptions
                  column={1}
                  bordered
                  size="small"
                  items={[
                    { key: 'name', label: t('config.major.name'), children: major.name },
                    { key: 'slug', label: t('config.major.slug'), children: major.slug },
                    { key: 'department', label: t('config.major.department'), children: major.departmentName },
                    { key: 'description', label: t('config.major.description'), children: major.description ?? '—' },
                    { key: 'learners', label: t('config.major.learnerCount'), children: major.learnerCount },
                  ]}
                />
              ),
            },
          ]}
        />
      </UiCard>
    </div>
  );
}
