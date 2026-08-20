import { useQueryClient } from '@tanstack/react-query';
import {
  useAuthenticationControllerLogin,
  useAuthenticationControllerRegister,
  useAuthenticationControllerRegisterMentor,
  useAuthenticationControllerForgotPassword,
  useAuthenticationControllerResetPassword,
  useAuthenticationControllerGetMe,
  useAuthenticationControllerLogout
} from '@iuroadmap/api-gen';

export function useAuthMutations() {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    // Invalidate relevant queries if needed
    queryClient.invalidateQueries();
  };

  const mutationOptions = { mutation: { onSuccess } };

  return {
    login: useAuthenticationControllerLogin(mutationOptions),
    registerLearner: useAuthenticationControllerRegister(mutationOptions),
    registerMentor: useAuthenticationControllerRegisterMentor(mutationOptions),
    forgotPassword: useAuthenticationControllerForgotPassword(mutationOptions),
    resetPassword: useAuthenticationControllerResetPassword(mutationOptions),
    logout: useAuthenticationControllerLogout(mutationOptions),
  };
}

export function useAuthQueries() {
  return {
    useGetMe: (options?: any) => useAuthenticationControllerGetMe({ query: options }),
  };
}
