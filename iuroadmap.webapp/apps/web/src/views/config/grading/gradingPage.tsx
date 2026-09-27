import { useSearchParams } from 'react-router-dom';
import { UiCard, UiPageHeader, UiTabs } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';
import { GradeScalePage } from './gradeScalePage';
import { AcademicClassificationPage } from './academicClassificationPage';

/** Grade scale + academic classification (design §9). The active tab is kept in the URL. */
export function GradingPage() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') === 'classification' ? 'classification' : 'scale';

  return (
    <div>
      <UiPageHeader title={t('config.grading.title')} />
      <UiCard>
        <UiTabs
          activeKey={tab}
          onChange={(key) => setParams(key === 'scale' ? {} : { tab: key })}
          items={[
            { key: 'scale', label: t('config.grading.scaleTab'), children: <GradeScalePage /> },
            { key: 'classification', label: t('config.grading.classificationTab'), children: <AcademicClassificationPage /> },
          ]}
        />
      </UiCard>
    </div>
  );
}
