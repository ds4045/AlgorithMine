import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import { Button, Card, Image, Spin } from 'antd';
import { FC, useState } from 'react';
import styles from './cart.module.css';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addItem, removeItem } from '../../redux/cartSlice';
import { Item, UserFirestoreDB } from '../../types/types';
import { useAlert } from '../../hooks/useAlert';
import { toggleFavoritesHandler } from '../../firbase/toggleFavoretesHandler';
type SingleCartItemProps = {
  item: Item & { count: number };
};

const SingleCartItem: FC<SingleCartItemProps> = ({ item }) => {
  const itemID = item.id;
  const user = useAppSelector((state) => state.auth.login);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [, alertError, contextHolder] = useAlert();
  const isFavorite = user?.favorites.some((el) => el === itemID) ?? false;
  const dispatch = useAppDispatch();
  const addHandler = () => {
    dispatch(addItem(item));
  };
  const removeHandler = () => {
    dispatch(removeItem(item));
  };
  const [isLoading, setIsLoading] = useState(false);
  const toggleFavorite = () => {
    toggleFavoritesHandler(
      isFavorite ? 'delete' : 'add',
      item,
      user as UserFirestoreDB,
      isAuth,
      dispatch,
      setIsLoading,
      alertError,
    );
  };
  return (
    <div className={styles.cart}>
      {contextHolder}
      <Image width={200} src={item.images[0]} />
      <Card className={styles.cart_options}>
        {isLoading ? (
          <Spin className={styles.spinner} />
        ) : (
          <StarFilled
            className={isFavorite ? styles.favorites_active : styles.favorites}
            onClick={toggleFavorite}
          />
        )}
        <p className={styles.title}>{item.title}</p>
        <Button onClick={removeHandler}>
          <MinusOutlined />
        </Button>
        <span className={styles.price}>{item.price}$</span>
        <Button onClick={addHandler}>
          <PlusOutlined />
        </Button>
        <b className={styles.price}>{item.price * item.count} $ </b>
        <span className={styles.units}>
          {item.count}
          <FormattedMessage id="cart.units" />
        </span>
      </Card>
    </div>
  );
};

export default SingleCartItem;
