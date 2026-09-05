import React from 'react';
import { Button, ButtonProps } from 'antd';

export interface UiButtonProps extends ButtonProps {
  // Add any custom props here if needed
}

export const UiButton: React.FC<UiButtonProps> = (props) => {
  return <Button {...props} />;
};
