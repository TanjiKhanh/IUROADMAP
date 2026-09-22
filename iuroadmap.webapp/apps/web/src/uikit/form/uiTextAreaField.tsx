import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { UiFormItem } from './uiFormItem';
import { UiTextArea } from '../primitives/uiTextArea';

export interface UiTextAreaFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

export const UiTextAreaField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  required,
  rows,
}: UiTextAreaFieldProps<TFieldValues>) => {
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
          <UiTextArea {...field} placeholder={placeholder} rows={rows} />
        </UiFormItem>
      )}
    />
  );
};
