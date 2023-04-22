import { FC, useState } from 'react';
import { Button, Descriptions, Divider, Input, Space } from 'antd';
import styles from './cart.module.css';
import SingleCartItem from './SingleCartItem';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import useAlert from '../../hooks/useAlert';
import { useAppSelector } from '../../redux/hooks';
import ConfirmOrder from './ConfirmOrder';
import EmptyCart from './EmptyCart';
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
    <div className={styles.layout}>
      <Divider plain>
        {contextHolder}
        <FormattedMessage id="cart.cart" />
      </Divider>
      <div className={styles.wrapper_cart}>
        {addedItems.length > 0 ? (
          <div className={styles.carts}>
            {addedItems.map((el) => (
              <SingleCartItem key={el.id} item={el} />
            ))}
          </div>
        ) : (
          <EmptyCart />
        )}
        <div className={styles.get_order}>
          <div className={styles.get_order_price}>
            <span>
              {totalCount}
              <span className={styles.units}>
                <FormattedMessage id="cart.units" />
              </span>
            </span>
            <span>
              <span className={styles.units}>
                <FormattedMessage id="cart.total_price" />
              </span>
              {totalPrice}₽
            </span>
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
                <Button type="primary" onClick={submitHandler} disabled={!addedItems.length}>
                  <FormattedMessage id="catalog.reviews.submit" />
                </Button>
              </Space.Compact>
            ) : (
              <Button onClick={() => setIsOpenInput(true)} disabled={!addedItems.length}>
                <FormattedMessage id="cart.promo" />
              </Button>
            )}
            <ConfirmOrder totalPrice={totalPrice} items={addedItems} />
          </div>
          <Divider />
          <div className={styles.about_order}>
            <Descriptions
              column={1}
              title={<FormattedMessage id="cart.contacts" />}
              className={styles.order_contacts}>
              <Descriptions.Item label={<FormattedMessage id="cart.address" />}>
                <FormattedMessage id="pc.company_address" />
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
    </div>
  );
};

export default Cart;
