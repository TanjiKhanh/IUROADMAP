import { Modal } from 'antd';
import { useTranslation } from './useTranslation';
import { apiErrorMessage } from '../api/apiResult';

export interface UseConfirmAndDeleteProps {
  mutateAsync: (args: any) => Promise<any>;
  onError?: (message: string) => void;
  onSuccess?: () => void;
}

export function useConfirmAndDelete({ mutateAsync, onError, onSuccess }: UseConfirmAndDeleteProps) {
  const { t } = useTranslation();
  return (args: any) => {
    Modal.confirm({
      title: t('config.common.confirmDeleteTitle'),
      content: t('config.common.confirmDeleteContent'),
      okText: t('config.common.delete'),
      okType: 'danger',
      cancelText: t('config.common.cancel'),
      onOk: async () => {
        try {
          await mutateAsync(args);
          onSuccess?.();
        } catch (error: unknown) {
          onError?.(apiErrorMessage(error, t, t('config.common.deleteFailed')));
        }
      },
    });
  };
}
