import type { ReactNode } from 'react';
import { UiAlert, UiButton, UiCard, UiPageHeader, UiPlusIcon } from '../../../uikit';
import { useTranslation } from '../../../hooks/useTranslation';

export interface ConfigListShellProps {
  title: ReactNode;
  onAdd?: () => void;
  /** Extra header buttons, rendered before "Add" */
  actions?: ReactNode;
  /** Filter controls shown above the table */
  filters?: ReactNode;
  errorMessage?: string;
  onCloseError?: () => void;
  children: ReactNode;
}

/** Header + filters + white table panel shared by the config list pages. */
export function ConfigListShell({ title, onAdd, actions, filters, errorMessage, onCloseError, children }: ConfigListShellProps) {
  const { t } = useTranslation();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <UiPageHeader
        title={title}
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            {actions}
            {onAdd ? (
              <UiButton type="primary" icon={<UiPlusIcon />} onClick={onAdd}>
                {t('config.common.add')}
              </UiButton>
            ) : null}
          </div>
        }
      />
      {errorMessage ? (
        <UiAlert type="error" showIcon closable message={errorMessage} onClose={onCloseError} style={{ marginBottom: 16 }} />
      ) : null}
      {filters ? (
        <UiCard size="small" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>{filters}</div>
        </UiCard>
      ) : null}
      <div style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, padding: 16 }}>{children}</div>
    </div>
  );
}
