import { useEffect } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IamUsersZod } from '@iuroadmap/api-gen';
import { UiForm, UiRow, UiCol, UiCard, UiInputField, UiSelectField, UiFormActions } from '../../../../uikit';
import { useRolesControllerGetByIndex } from '@iuroadmap/api-gen';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface UserFormValues {
  name: string;
  email: string;
  password: string;
  roleId: string;
  status?: string;
  subscriptionTier?: string;
}

export interface UserFormProps {
  defaultValues?: Partial<UserFormValues>;
  loading?: boolean;
  submitLabel?: string;
  isEdit?: boolean;
  onSubmit: (values: UserFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

function emptyDefaults(): Partial<UserFormValues> {
  return {
    name: '',
    email: '',
    password: '',
    roleId: '',
  };
}

export function UserForm({
  defaultValues,
  loading,
  submitLabel,
  isEdit,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const { t } = useTranslation();
  const form = useForm<UserFormValues>({
    defaultValues: { ...emptyDefaults(), ...defaultValues },
    resolver: zodResolver(
      (isEdit ? IamUsersZod.UsersControllerUpdateBody.omit({ id: true }) : IamUsersZod.UsersControllerCreateBody) as any
    ),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { handleSubmit, reset, control, formState: { errors } } = form;

  const { data: rawRoles, isLoading: rolesLoading } = useRolesControllerGetByIndex({ rowsPerPage: 100 });
  const rolesResponse = rawRoles?.data as any;
  const roles = (rolesResponse?.data ?? rolesResponse)?.datas ?? [];

  useEffect(() => {
    if (defaultValues) reset({ ...emptyDefaults(), ...defaultValues });
  }, [defaultValues, reset]);

  const submit: SubmitHandler<UserFormValues> = async (values) => {
    await onSubmit(values);
  };

  return (
    <UiForm layout="vertical" onFinish={handleSubmit(submit)}>
      <UiCard title={t('config.user.info')} style={{ marginBottom: 16 }}>
        <UiRow gutter={[16, 0]}>
          <UiCol xs={24} md={12}>
            <UiInputField
              name="name"
              control={control as any}
              label={t('config.user.fullName')}
              required
            />
          </UiCol>
          <UiCol xs={24} md={12}>
            <UiInputField
              name="email"
              control={control as any}
              label={t('config.user.email')}
              required={!isEdit}
            />
          </UiCol>
          {!isEdit ? (
            <UiCol xs={24} md={12}>
              <UiInputField
                name="password"
                control={control as any}
                label={t('config.user.password')}
                type="password"
                required
              />
            </UiCol>
          ) : null}
          <UiCol xs={24} md={12}>
            <UiSelectField
              name="roleId"
              control={control as any}
              label={t('config.user.role')}
              required
              loading={rolesLoading}
              options={roles.map((r: any) => ({ label: r.name, value: r.id }))}
            />
          </UiCol>

          {isEdit ? (
            <>
              <UiCol xs={24} md={12}>
                <UiSelectField
                  name="status"
                  control={control as any}
                  label={t('config.user.status')}
                  options={[
                    { label: t('config.user.active'), value: 'ACTIVE' },
                    { label: t('config.user.pendingApproval'), value: 'PENDING_APPROVAL' },
                    { label: t('config.user.banned'), value: 'BANNED' },
                    { label: t('config.user.rejected'), value: 'REJECTED' },
                  ]}
                />
              </UiCol>
              <UiCol xs={24} md={12}>
                <UiSelectField
                  name="subscriptionTier"
                  control={control as any}
                  label={t('config.user.subscriptionTier')}
                  options={[
                    { label: t('config.user.free'), value: 'FREE' },
                    { label: t('config.user.vip'), value: 'VIP' },
                    { label: t('config.user.pro'), value: 'PRO' },
                  ]}
                />
              </UiCol>
            </>
          ) : null}
        </UiRow>
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
