import { useEffect } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IamRolesZod, type RoleCreateRequest } from '@iuroadmap/api-gen';
import { UiForm, UiRow, UiCol, UiCard, UiInputField, UiFormActions } from '../../../../uikit';
import { PermissionMatrixForm } from './permissionMatrixForm';
import { useTranslation } from '../../../../hooks/useTranslation';

export type RoleFormValues = RoleCreateRequest;

export interface RoleFormProps {
  defaultValues?: Partial<RoleFormValues>;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (values: RoleFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

function emptyDefaults(): Partial<RoleFormValues> {
  return { name: '', permissionIds: [] };
}

export function RoleForm({
  defaultValues,
  loading,
  submitLabel,
  onSubmit,
  onCancel,
}: RoleFormProps) {
  const { t } = useTranslation();
  const form = useForm<RoleFormValues>({
    defaultValues: { ...emptyDefaults(), ...defaultValues } as RoleFormValues,
    resolver: zodResolver(IamRolesZod.RolesControllerCreateBody) as never,
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { handleSubmit, reset, control, formState: { errors } } = form;

  useEffect(() => {
    if (defaultValues) reset({ ...emptyDefaults(), ...defaultValues } as RoleFormValues);
  }, [defaultValues, reset]);

  const submit: SubmitHandler<RoleFormValues> = async (values) => {
    await onSubmit(values);
  };

  return (
    <UiForm layout="vertical" onFinish={handleSubmit(submit)}>
      <UiCard title={t('config.role.info')} style={{ marginBottom: 16 }}>
        <UiRow gutter={[16, 0]}>
          <UiCol xs={24} md={12}>
            <UiInputField
              name="name"
              control={control as any}
              label={t('config.role.name')}
              required
            />
          </UiCol>
        </UiRow>
      </UiCard>

      <UiCard title={t('config.role.permissionMatrix')} style={{ marginBottom: 16 }}>
        <PermissionMatrixForm<RoleFormValues> control={control} name='permissionIds' />
      </UiCard>

      <UiFormActions
        loading={loading}
        submitLabel={submitLabel ?? t('config.common.save')}
        cancelLabel={t('config.common.cancel')}
        onCancel={onCancel}
      />
    </UiForm>
  );
}
