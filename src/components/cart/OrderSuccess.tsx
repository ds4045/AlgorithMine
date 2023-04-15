import { FC } from 'react';
import { Button, Result } from 'antd';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const OrderSuccess: FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="success"
      title={<FormattedMessage id="cart.order_success_thanks" />}
      subTitle={<FormattedMessage id="cart.order_success" />}
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => {
            navigate('/');
          }}>
          <FormattedMessage id="auth.btn_back" />
        </Button>,
        <Button
          key="buy"
          onClick={() => {
            navigate('/catalog');
          }}>
          <FormattedMessage id="cart.go_to_catalog" />
        </Button>,
      ]}
    />
  );
};

export default OrderSuccess;
