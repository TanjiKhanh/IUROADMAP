import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

export interface UiIconProps extends LucideProps {
  name: keyof typeof LucideIcons;
}

export const UiIcon: React.FC<UiIconProps> = ({ name, ...props }) => {
  const IconComponent = LucideIcons[name] as React.FC<LucideProps>;
  if (!IconComponent) {
    console.warn(`Icon ${name} not found`);
    return null;
  }
  return <IconComponent {...props} />;
};
