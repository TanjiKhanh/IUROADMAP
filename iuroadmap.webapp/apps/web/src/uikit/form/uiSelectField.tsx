import React, { ReactNode } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { UiFormItem } from './uiFormItem';
import { UiSelect } from '../primitives/uiSelect';

export interface UiSelectFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: ReactNode; value: string | number }[];
  loading?: boolean;
  mode?: 'multiple' | 'tags';
  disabled?: boolean;
  allowClear?: boolean;
}

export const UiSelectField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  required,
  options,
  loading,
  mode,
  disabled,
  allowClear,
}: UiSelectFieldProps<TFieldValues>) => {
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
          <UiSelect
            {...field}
            options={options}
            loading={loading}
            placeholder={placeholder}
            mode={mode}
            disabled={disabled}
            allowClear={allowClear}
          />
        </UiFormItem>
      )}
    />
  );
};
