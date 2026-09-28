import { useNavigate } from 'react-router-dom';
import { useLecturersControllerCreate } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { UiCard, useToast } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { apiErrorMessage } from '../../../api/apiResult';
import { LecturerForm } from './components/lecturerForm';

export function LecturerCreatePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast, toastContextHolder } = useToast();
  const { mutateAsync: create, isPending } = useLecturersControllerCreate();

  return (
    <UiCard title={t('config.lecturer.create')} style={{ margin: '0 auto', maxWidth: 800 }}>
      {toastContextHolder}
      <LecturerForm
        loading={isPending}
        submitLabel={t('config.common.add')}
        onCancel={() => navigate(RoutePaths.web.config.lecturer.root)}
        onSubmit={async (values) => {
          try {
            await create({ data: values });
            toast.success(t('config.common.success'));
            navigate(RoutePaths.web.config.lecturer.root);
          } catch (err: unknown) {
            toast.error(apiErrorMessage(err, t, t('config.common.saveFailed')));
          }
        }}
      />
    </UiCard>
  );
}
