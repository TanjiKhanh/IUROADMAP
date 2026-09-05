import React from 'react';
import { Form, FormItemProps } from 'antd';

export interface UiFormItemProps extends FormItemProps {}

export const UiFormItem: React.FC<UiFormItemProps> = (props) => {
  return <Form.Item {...props} />;
};
