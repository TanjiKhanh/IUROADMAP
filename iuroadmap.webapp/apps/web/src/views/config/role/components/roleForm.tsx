import { useEffect } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IamRolesZod, type RoleCreateRequest } from '@iuroadmap/api-gen';
import { Form, Input, Row, Col, Button, Card, Space } from 'antd';
import { PermissionMatrixForm } from './permissionMatrixForm';

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
    <Form layout="vertical" onFinish={handleSubmit(submit)}>
      <Card title="Role Info" style={{ marginBottom: 16 }}>
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item 
              label="Role Name" 
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
        </Row>
      </Card>

      <Card title="Permission Matrix" style={{ marginBottom: 16 }}>
        <PermissionMatrixForm<RoleFormValues> control={control} name='permissionIds' />
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
