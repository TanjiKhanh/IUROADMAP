import React from 'react';
import { Button, ButtonProps } from 'antd';

export interface UiButtonProps extends ButtonProps {
  variant?: 'solid' | 'text' | 'outlined';
}

export const UiButton: React.FC<UiButtonProps> = (props) => {
  const { variant, type, ...buttonProps } = props;
  const buttonType = type ?? (variant === 'text' ? 'text' : variant === 'outlined' ? 'default' : undefined);
  return <Button type={buttonType} {...buttonProps} />;
};
