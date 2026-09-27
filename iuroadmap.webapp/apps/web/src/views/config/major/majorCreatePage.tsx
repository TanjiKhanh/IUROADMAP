import { useNavigate } from 'react-router-dom';
import { useMajorsControllerCreate, type MajorResponse } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiCard, useToast } from '../../../uikit';
import { MajorForm } from './components/majorForm';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage, unwrapData } from '../../../api/apiResult';

export function MajorCreatePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const { mutateAsync: create, isPending } = useMajorsControllerCreate();

  return (
    <UiCard title={t('config.major.create')} style={{ margin: '0 auto', maxWidth: 800 }}>
      {toastContextHolder}
      <MajorForm
        loading={isPending}
        submitLabel={t('config.common.add')}
        onCancel={() => navigate(RoutePaths.web.config.major.root)}
        onSubmit={async (values) => {
          try {
            const created = unwrapData<MajorResponse>(await create({ data: values }));
            toast.success(t('config.major.created'));
            // Straight to the major page so the admin can create the first curriculum year
            navigate(
              created ? RoutePaths.web.config.major.detail.replace(':id', String(created.id)) : RoutePaths.web.config.major.root,
            );
          } catch (err: unknown) {
            toast.error(apiErrorMessage(err, t, t('config.major.createFailed')));
          }
        }}
      />
    </UiCard>
  );
}
