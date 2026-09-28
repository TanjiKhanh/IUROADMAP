import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { UiFormItem } from './uiFormItem';
import { UiColorPicker } from '../primitives/uiColorPicker';

export interface UiColorFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  required?: boolean;
}

export const UiColorField = <TFieldValues extends FieldValues>({ name, control, label, required }: UiColorFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UiFormItem label={label} required={required} validateStatus={error ? 'error' : ''} help={error?.message}>
          <UiColorPicker value={field.value} onChange={field.onChange} />
        </UiFormItem>
      )}
    />
  );
};
