import React from 'react';
import { ColorPicker } from 'antd';
import type { ColorPickerProps } from 'antd';

export interface UiColorPickerProps extends Omit<ColorPickerProps, 'value' | 'onChange'> {
  /** #RRGGBB */
  value?: string;
  onChange?: (hex: string) => void;
}

/** Color picker that reads and writes plain upper-case `#RRGGBB` strings. */
export const UiColorPicker: React.FC<UiColorPickerProps> = ({ value, onChange, ...props }) => {
  return (
    <ColorPicker
      {...props}
      value={value}
      disabledAlpha
      showText
      onChange={(color) => onChange?.(color.toHexString().toUpperCase())}
    />
  );
};
