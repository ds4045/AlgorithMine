import { message } from 'antd';
import { ReactNode } from 'react';

type UseAlertReturn = [(text: ReactNode) => void, (text: ReactNode) => void, React.ReactNode];

export const useAlert = (): UseAlertReturn => {
  const [messageApi, contextHolder] = message.useMessage();

  const alertSuccess = (text: ReactNode) => {
    messageApi.open({
      type: 'success',
      content: text,
    });
  };
  const alertError = (text: ReactNode) => {
    messageApi.open({
      type: 'error',
      content: text,
    });
  };
  return [alertSuccess, alertError, contextHolder];
};

export default useAlert;
