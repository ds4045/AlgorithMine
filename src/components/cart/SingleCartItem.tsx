import { HeartFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Image } from 'antd';
import { FC } from 'react';
import styles from './cart.module.css';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch } from '../../redux/hooks';
import { addItem, removeItem } from '../../redux/cartSlice';
import { Item } from '../../types/types';

type SingleCartItemProps = {
  item: Item & { count: number };
};

const SingleCartItem: FC<SingleCartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const addHandler = () => {
    dispatch(addItem(item));
  };
  const removeHandler = () => {
    dispatch(removeItem(item));
  };
  return (
    <div className={styles.cart}>
      <Image width={200} src={item.images[0]} />
      <Card className={styles.cart_options}>
        <HeartFilled className={styles.favorites} />
        <p className={styles.title}>{item.title}</p>
        <Button onClick={removeHandler}>
          <MinusOutlined />
        </Button>
        <span>{item.price}$</span>
        <Button onClick={addHandler}>
          <PlusOutlined />
        </Button>
        <b>{item.price * item.count} $ </b>
        <span className={styles.units}>
          {item.count}
          <FormattedMessage id="cart.units" />
        </span>
      </Card>
    </div>
  );
};

export default SingleCartItem;
