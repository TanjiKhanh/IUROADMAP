import React, { ReactNode } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { UiFormItem } from './uiFormItem';
import { UiInput } from '../primitives/uiInput';
import { UiPasswordInput } from '../primitives/uiPasswordInput';

export interface UiInputFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  required?: boolean;
  prefix?: ReactNode;
  autoComplete?: string;
  autoFocus?: boolean;
}

export const UiInputField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  required,
  prefix,
  autoComplete,
  autoFocus,
}: UiInputFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UiFormItem
          label={label}
          required={required}
          validateStatus={error ? 'error' : ''}
          help={error?.message}
        >
          {type === 'password' ? (
            <UiPasswordInput {...field} placeholder={placeholder} prefix={prefix} autoComplete={autoComplete} autoFocus={autoFocus} />
          ) : (
            <UiInput {...field} type={type} placeholder={placeholder} prefix={prefix} autoComplete={autoComplete} autoFocus={autoFocus} />
          )}
        </UiFormItem>
      )}
    />
  );
};
