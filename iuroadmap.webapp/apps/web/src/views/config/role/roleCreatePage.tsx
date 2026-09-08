import { useNavigate } from 'react-router-dom';
import { useRolesControllerCreate } from '@iuroadmap/api-gen';
import { RoutePaths } from '@iuroadmap/core';
import { message } from 'antd';
import { RoleForm } from './components/roleForm';

export function RoleCreatePage() {
  const navigate = useNavigate();
  const { mutateAsync: create, isPending } = useRolesControllerCreate();

  return (
    <RoleForm
      loading={isPending}
      submitLabel="Create"
      onCancel={() => navigate(RoutePaths.web.role.root)}
      onSubmit={async (values) => {
        try {
          await create({ data: values });
          message.success("Success");
          navigate(RoutePaths.web.role.root);
        } catch (err: any) {
          message.error(err?.response?.data?.message ?? err?.message ?? "Failed to create");
        }
      }}
    />
  );
}
