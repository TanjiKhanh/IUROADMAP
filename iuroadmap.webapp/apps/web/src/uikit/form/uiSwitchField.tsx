import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { UiFormItem } from './uiFormItem';
import { UiSwitch } from '../primitives/uiSwitch';

export interface UiSwitchFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  help?: string;
  disabled?: boolean;
}

export const UiSwitchField = <TFieldValues extends FieldValues>({ name, control, label, help, disabled }: UiSwitchFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UiFormItem label={label} validateStatus={error ? 'error' : ''} help={error?.message ?? help}>
          <UiSwitch ref={field.ref} checked={Boolean(field.value)} onChange={field.onChange} disabled={disabled} />
        </UiFormItem>
      )}
    />
  );
};
