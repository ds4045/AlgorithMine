import { Button, Result } from 'antd';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle={<FormattedMessage id="cart.empty_cart" />}
      extra={
        <Button type="primary" onClick={() => navigate('/catalog')}>
          <FormattedMessage id="cart.btn_to_shop" />
        </Button>
      }
    />
  );
};

export default EmptyCart;
