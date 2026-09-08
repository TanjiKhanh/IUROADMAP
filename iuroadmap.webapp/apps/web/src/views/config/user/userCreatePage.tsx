import { useNavigate } from 'react-router-dom';
import { useUsersControllerCreate } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { Card, message } from 'antd';
import { UserForm } from './components/userForm';
import { useToast } from 'uikit';

export function UserCreatePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutateAsync: create, isPending } = useUsersControllerCreate();

  return (
    <Card title="Create" style={{ margin: '0 auto', maxWidth: 800 }}>
      <UserForm
        loading={isPending}
        submitLabel="Create"
        onCancel={() => navigate(RoutePaths.web.user.root)}
        onSubmit={async (values) => {
          try {
            await create({ data: values });
            message.success("Success");
            navigate(RoutePaths.web.user.root);
          } catch (err: any) {
            toast.error(err?.response?.data?.message ?? err?.message ?? "Failed");
          }
        }}
      />
    </Card>
  );
}
