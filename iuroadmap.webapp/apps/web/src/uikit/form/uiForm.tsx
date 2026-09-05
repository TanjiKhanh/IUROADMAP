import React from 'react';
import { Form, FormProps } from 'antd';

export interface UiFormProps extends FormProps {}

export const UiForm: React.FC<UiFormProps> = (props) => {
  return <Form layout={props.layout || 'vertical'} {...props} />;
};
