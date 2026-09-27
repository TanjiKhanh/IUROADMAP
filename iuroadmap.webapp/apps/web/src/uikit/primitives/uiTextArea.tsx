import React from 'react';
import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';

export interface UiTextAreaProps extends TextAreaProps {}

export const UiTextArea = React.forwardRef<any, UiTextAreaProps>((props, ref) => {
  return <Input.TextArea ref={ref} {...props} />;
});

UiTextArea.displayName = 'UiTextArea';
