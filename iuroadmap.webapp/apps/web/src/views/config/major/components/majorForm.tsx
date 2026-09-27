import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UiForm, UiInputField, UiButton, UiSpace } from '../../../../uikit';

const majorFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  totalCreditsRequired: z.coerce.number().min(0, 'Total credits must be a positive number'),
});

export type MajorFormValues = z.infer<typeof majorFormSchema>;

interface MajorFormProps {
  initialValues?: Partial<MajorFormValues>;
  onSubmit: (data: MajorFormValues) => void;
  isLoading?: boolean;
  onCancel?: () => void;
}

export function MajorForm({ initialValues, onSubmit, isLoading, onCancel }: MajorFormProps) {
  const { control, handleSubmit } = useForm<MajorFormValues>({
    resolver: zodResolver(majorFormSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      description: initialValues?.description ?? '',
      totalCreditsRequired: initialValues?.totalCreditsRequired ?? 0,
    },
  });

  return (
    <UiForm onFinish={handleSubmit(onSubmit)}>
      <UiInputField control={control} name="name" label="Major Name" placeholder="Enter major name" />
      <UiInputField control={control} name="description" label="Description" placeholder="Enter major description" />
      <UiInputField control={control} name="totalCreditsRequired" label="Total Credits Required" placeholder="e.g. 120" />
      
      <UiSpace style={{ marginTop: 16 }}>
        <UiButton type="primary" htmlType="submit" loading={isLoading}>
          Save
        </UiButton>
        {onCancel && (
          <UiButton onClick={onCancel} disabled={isLoading}>
            Cancel
          </UiButton>
        )}
      </UiSpace>
    </UiForm>
  );
}