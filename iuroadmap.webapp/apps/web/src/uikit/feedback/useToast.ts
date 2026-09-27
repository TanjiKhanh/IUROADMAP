import { message } from 'antd';

export const useToast = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const toast = {
    success: (content: string) => messageApi.success(content),
    error: (content: string) => messageApi.error(content),
    info: (content: string) => messageApi.info(content),
    warning: (content: string) => messageApi.warning(content),
  };

  return { toast, toastContextHolder: contextHolder };
};
