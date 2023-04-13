import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import { Button, Card, Image, Spin } from 'antd';
import { FC, useState } from 'react';
import styles from './cart.module.css';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addItem, removeItem } from '../../redux/cartSlice';
import { Item } from '../../types/types';
import { useAlert } from '../../hooks/useAlert';
import { toggleFavoritesHandler } from '../../firbase/toggleFavoretesHandler';
type SingleCartItemProps = {
  item: Item & { count: number };
};

const SingleCartItem: FC<SingleCartItemProps> = ({ item }) => {
  const itemID = item.id;
  const user = useAppSelector((state) => state.auth.login);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const usersFavorites = user?.favorites ?? [];
  const [, alertError, contextHolder] = useAlert();
  const [isFavorite, setIsFavorite] = useState(usersFavorites.some((el) => el.id === itemID));
  const dispatch = useAppDispatch();
  const addHandler = () => {
    dispatch(addItem(item));
  };
  const removeHandler = () => {
    dispatch(removeItem(item));
  };
  const [isLoading, setIsLoading] = useState(false);

  const toggle = async () => {
    if (!user) return alertError(<FormattedMessage id="catalog.favorites.check_login" />);
    try {
      setIsLoading(true);
      const res = await toggleFavoritesHandler(
        isFavorite ? 'delete' : 'add',
        item,
        user,
        isAuth,
        dispatch,
      );
      if (res) setIsFavorite((prev) => !prev);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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
            onClick={toggle}
          />
        )}
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
