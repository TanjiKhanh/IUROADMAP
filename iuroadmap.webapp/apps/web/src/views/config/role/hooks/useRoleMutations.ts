import { useQueryClient } from '@tanstack/react-query';
import {
  useRolesControllerCreate,
  useRolesControllerDelete,
  useRolesControllerUpdate,
} from '@iuroadmap/api-gen';

export function useRoleMutations() {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries();
  };

  const mutationOptions = { mutation: { onSuccess } };

  return {
    create: useRolesControllerCreate(mutationOptions),
    update: useRolesControllerUpdate(mutationOptions),
    remove: useRolesControllerDelete(mutationOptions),
  };
}
