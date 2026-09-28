import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { UiFormItem } from './uiFormItem';
import { UiInputNumber } from '../primitives/uiInputNumber';

export interface UiNumberFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  disabled?: boolean;
  addonAfter?: React.ReactNode;
}

/** Number input bound to react-hook-form; an empty box is stored as `undefined`. */
export const UiNumberField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  required,
  min,
  max,
  step,
  precision,
  disabled,
  addonAfter,
}: UiNumberFieldProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UiFormItem label={label} required={required} validateStatus={error ? 'error' : ''} help={error?.message}>
          <UiInputNumber
            ref={field.ref}
            value={field.value ?? null}
            onBlur={field.onBlur}
            onChange={(value) => field.onChange(value === null ? undefined : value)}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            precision={precision}
            disabled={disabled}
            addonAfter={addonAfter}
            style={{ width: '100%' }}
          />
        </UiFormItem>
      )}
    />
  );
};
