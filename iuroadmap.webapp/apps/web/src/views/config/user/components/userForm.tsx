import { useEffect } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { Form, Input, Row, Col, Button, Card, Space, Select } from 'antd';
import { useRolesControllerGetByIndex } from '@iuroadmap/api-gen';

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
  const form = useForm<UserFormValues>({
    defaultValues: { ...emptyDefaults(), ...defaultValues },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { handleSubmit, reset, control, formState: { errors } } = form;

  const { data: rawRoles, isLoading: rolesLoading } = useRolesControllerGetByIndex({ rowsPerPage: 100 });
  const roles = (rawRoles?.data as any)?.datas ?? [];

  useEffect(() => {
    if (defaultValues) reset({ ...emptyDefaults(), ...defaultValues });
  }, [defaultValues, reset]);

  const submit: SubmitHandler<UserFormValues> = async (values) => {
    await onSubmit(values);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(submit)}>
      <Card title="General Info" style={{ marginBottom: 16 }}>
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item 
              label="Full Name" 
              required 
              validateStatus={errors.name ? 'error' : ''}
              help={errors.name?.message}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item 
              label="Email" 
              required={!isEdit}
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email?.message}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} disabled={isEdit} />}
              />
            </Form.Item>
          </Col>
          {!isEdit ? (
            <Col xs={24} md={12}>
              <Form.Item 
                label="Password" 
                required 
                validateStatus={errors.password ? 'error' : ''}
                help={errors.password?.message}
              >
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => <Input.Password {...field} />}
                />
              </Form.Item>
            </Col>
          ) : null}
          <Col xs={24} md={12}>
            <Form.Item 
              label="Role" 
              required
              validateStatus={errors.roleId ? 'error' : ''}
              help={errors.roleId?.message}
            >
              <Controller
                name="roleId"
                control={control}
                render={({ field }) => (
                  <Select {...field} loading={rolesLoading}>
                    {roles.map((r: any) => (
                      <Select.Option key={r.id} value={r.id}>{r.name}</Select.Option>
                    ))}
                  </Select>
                )}
              />
            </Form.Item>
          </Col>

          {isEdit ? (
            <>
              <Col xs={24} md={12}>
                <Form.Item label="Status">
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} options={[
                        { label: 'ACTIVE', value: 'ACTIVE' },
                        { label: 'PENDING_APPROVAL', value: 'PENDING_APPROVAL' },
                        { label: 'BANNED', value: 'BANNED' },
                        { label: 'REJECTED', value: 'REJECTED' },
                      ]} />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Subscription Tier">
                  <Controller
                    name="subscriptionTier"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} options={[
                        { label: 'FREE', value: 'FREE' },
                        { label: 'VIP', value: 'VIP' },
                        { label: 'PRO', value: 'PRO' },
                      ]} />
                    )}
                  />
                </Form.Item>
              </Col>
            </>
          ) : null}
        </Row>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <Space>
          {onCancel ? <Button onClick={onCancel} disabled={loading}>Cancel</Button> : null}
          <Button type="primary" htmlType="submit" loading={loading}>
            {submitLabel ?? "Save"}
          </Button>
        </Space>
      </div>
    </Form>
  );
}
