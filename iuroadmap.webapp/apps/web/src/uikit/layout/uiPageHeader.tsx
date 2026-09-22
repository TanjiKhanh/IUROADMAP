import React, { ReactNode } from 'react';
import { UiTypography, UiTitle } from '../primitives/uiTypography';

export interface UiPageHeaderProps {
  title: ReactNode;
  action?: ReactNode;
}

export const UiPageHeader: React.FC<UiPageHeaderProps> = ({ title, action }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
      <UiTitle level={4} style={{ margin: 0 }}>{title}</UiTitle>
      {action ? <div>{action}</div> : null}
    </div>
  );
};
