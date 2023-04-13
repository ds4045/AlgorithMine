import { FC, useState } from 'react';
import { Button, Descriptions, Divider, Input, Space } from 'antd';
import styles from './cart.module.css';
import SingleCartItem from './SingleCartItem';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import useAlert from '../../hooks/useAlert';
import { useAppSelector } from '../../redux/hooks';
type CartProps = {};
const promo = ['new10'];
const Cart: FC<CartProps> = () => {
  const navigate = useNavigate();
  const addedItems = useAppSelector((state) => state.cart.addedItems);
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [value, setValue] = useState('');
  const [alertSuccess, alertError, contextHolder] = useAlert();
  const submitHandler = () => {
    setIsOpenInput(false);
    if (promo.includes(value)) {
      alertSuccess(<FormattedMessage id="cart.promo_success" />);
    } else alertError(<FormattedMessage id="cart.promo_error" />);
    setValue('');
  };
  const totalCount = addedItems.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = addedItems.reduce((acc, item) => acc + item.price * item.count, 0);
  return (
    <>
      <Divider plain>
        {contextHolder}
        <FormattedMessage id="cart.cart" />
      </Divider>
      <div className={styles.wrapper_cart}>
        <div className={styles.carts}>
          {addedItems.map((el) => (
            <SingleCartItem key={el.id} item={el} />
          ))}
        </div>
        <div className={styles.get_order}>
          <div className={styles.get_order_price}>
            <span>
              {totalCount}
              <span className={styles.units}>
                <FormattedMessage id="cart.units" />
              </span>
            </span>
            <span>{totalPrice}$</span>
          </div>
          <div className={styles.get_order_btn_groups}>
            {isOpenInput ? (
              <Space.Compact>
                <Input
                  autoFocus
                  placeholder="..."
                  value={value}
                  className={styles.inp}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Button type="primary" onClick={submitHandler}>
                  <FormattedMessage id="catalog.reviews.submit" />
                </Button>
              </Space.Compact>
            ) : (
              <Button onClick={() => setIsOpenInput(true)}>
                <FormattedMessage id="cart.promo" />
              </Button>
            )}

            <Button type="primary">
              <FormattedMessage id="cart.order_now" />
            </Button>
          </div>
          <Divider />
          <div className={styles.about_order}>
            <Descriptions
              column={1}
              title={<FormattedMessage id="cart.contacts" />}
              className={styles.order_contacts}>
              <Descriptions.Item label={<FormattedMessage id="cart.address" />}>
                Zhou Maomao
              </Descriptions.Item>
              <Descriptions.Item label={<FormattedMessage id="cart.phone" />}>
                1810000000
              </Descriptions.Item>
            </Descriptions>
            <Button type="primary" onClick={() => navigate(-1)}>
              <FormattedMessage id="auth.btn_back" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
