import { Button, Descriptions, Drawer, Popover } from 'antd';
import { FC } from 'react';
import styles from '../catalog.module.css';
import Reviews from '../reviews/Reviews';
import { FormattedMessage } from 'react-intl';
import { Item, ItemOptional, ItemOptionalFields } from '../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { toggleFavoritesHandler } from '../../../firbase/toggleFavoretesHandler';
import { addItem } from '../../../redux/cartSlice';

type CardModalProps = {
  onClose: () => void;
  open: boolean;
  item: Item;
  alertSuccess: (text: React.ReactNode) => void;
  alertError: (text: React.ReactNode) => void;
};

const CardModal: FC<CardModalProps> = ({ onClose, open, item, alertSuccess, alertError }) => {
  const itemID = item.id;
  const reviews = item.reviews ?? [];
  const dispatch = useAppDispatch();
  const content = <Reviews reviews={reviews} itemID={itemID} />;
  const user = useAppSelector((state) => state.auth.login);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const optionalProperties: { key: ItemOptionalFields; value: string | number }[] = [];
  const optional: ItemOptional = item.optional;
  for (const [key, value] of Object.entries(optional)) {
    if (typeof value === 'string' || typeof value === 'number') {
      optionalProperties.push({ key: key as ItemOptionalFields, value });
    }
  }
  const addFavoriteHandler = () => {
    !user
      ? alertError(<FormattedMessage id="catalog.favorites.check_login" />)
      : toggleFavoritesHandler('add', item, user, isAuth, dispatch, alertSuccess, alertError);
  };
  const addToCart = () => {
    dispatch(addItem(item));
    alertSuccess(<FormattedMessage id="cart.add_item_alert" />);
  };
  return (
    <Drawer title={item.title} placement="right" size="large" onClose={onClose} open={open}>
      <div>
        <Descriptions title={<FormattedMessage id="catalog.card.modal_specifications" />}>
          <Descriptions.Item label={<FormattedMessage id="catalog.card.modal_inStock" />}>
            {item.inStock ? '✅' : <FormattedMessage id="catalog.card.modal_under_the_order" />}
          </Descriptions.Item>
          <Descriptions.Item label={<FormattedMessage id="catalog.card.modal_sku" />}>
            {item.sku}
          </Descriptions.Item>
          {optionalProperties.map((el) => (
            <Descriptions.Item
              key={el.key}
              label={<FormattedMessage id={`catalog.card.modal_${el.key}`} />}>
              {el.value}
            </Descriptions.Item>
          ))}
        </Descriptions>
        <Descriptions title={<FormattedMessage id="catalog.card.description" />}>
          <Descriptions.Item>{item.description}</Descriptions.Item>
        </Descriptions>
        <Descriptions title={<FormattedMessage id="catalog.card.modal_delivery" />}>
          <Descriptions.Item>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi recusandae optio dolore
            quasi laudantium eaque voluptates nostrum architecto quia magnam!
          </Descriptions.Item>
        </Descriptions>
        <div className={styles.btn_groups_modal}>
          <Button onClick={addToCart} type="primary">
            <FormattedMessage id="catalog.card.modal_add_to_cart" />
          </Button>
          <Button>
            <FormattedMessage id="catalog.card.modal_add_to_сomparison" />
          </Button>
          <Button onClick={addFavoriteHandler}>
            <FormattedMessage id="catalog.card.modal_add_to_favorites" />
          </Button>
          <Popover
            content={content}
            title={<FormattedMessage id="catalog.card.modal_reviews" />}
            trigger="click"
            overlayInnerStyle={{ overflow: 'scroll' }}>
            <Button>
              <FormattedMessage id="catalog.card.modal_reviews" />
            </Button>
          </Popover>
        </div>
      </div>
    </Drawer>
  );
};

export default CardModal;
