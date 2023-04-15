import { Button, Descriptions, Divider, Drawer, Popover } from 'antd';
import { FC, useState } from 'react';
import styles from '../catalog.module.css';
import { FormattedMessage } from 'react-intl';
import { Item, ItemOptional, ItemOptionalFields, UserFirestoreDB } from '../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { toggleFavoritesHandler } from '../../../firbase/toggleFavoretesHandler';
import { addItem } from '../../../redux/cartSlice';
import ReviewsCatalog from '../reviews/ReviewsCatalog';

type CardModalProps = {
  onClose: () => void;
  open: boolean;
  item: Item;
  alertSuccess: (text: React.ReactNode) => void;
  alertError: (text: React.ReactNode) => void;
  pcType?: boolean;
};

const CardModal: FC<CardModalProps> = ({
  onClose,
  open,
  item,
  alertSuccess,
  alertError,
  pcType,
}) => {
  const itemID = item?.id;
  const reviews = item?.reviews ?? [];
  const dispatch = useAppDispatch();
  const content = <ReviewsCatalog reviews={reviews} itemID={itemID} />;
  const user = useAppSelector((state) => state.auth.login);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isFavorite = user?.favorites.some((el) => el === itemID) ?? false;
  const optionalProperties: { key: ItemOptionalFields; value: string | number }[] = [];
  const optional: ItemOptional = item?.optional;
  for (const [key, value] of Object.entries(optional ?? {})) {
    if (typeof value === 'string' || typeof value === 'number') {
      optionalProperties.push({ key: key as ItemOptionalFields, value });
    }
  }
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
  const addToCart = () => {
    dispatch(addItem(item));
    alertSuccess(<FormattedMessage id="cart.add_item_alert" />);
  };
  return (
    item && (
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
          <Divider />
          <Descriptions title={<FormattedMessage id="catalog.card.description" />}>
            <Descriptions.Item>{item.description}</Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions title={<FormattedMessage id="catalog.card.modal_delivery" />}>
            <Descriptions.Item>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi recusandae optio dolore
              quasi laudantium eaque voluptates nostrum architecto quia magnam!
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <div className={styles.btn_groups_modal}>
            <Button onClick={addToCart} type="primary">
              <FormattedMessage id="catalog.card.modal_add_to_cart" />
            </Button>
            {!pcType && (
              <Button>
                <FormattedMessage id="catalog.card.modal_add_to_сomparison" />
              </Button>
            )}
            <Button onClick={toggleFavorite} loading={isLoading}>
              <FormattedMessage
                id={`catalog.card.modal_${isFavorite ? 'delete' : 'add'}_to_favorites`}
              />
            </Button>
            {!pcType && (
              <Popover
                content={content}
                title={<FormattedMessage id="catalog.card.modal_reviews" />}
                trigger="click"
                overlayInnerStyle={{ overflow: 'scroll' }}>
                <Button>
                  <FormattedMessage id="catalog.card.modal_reviews" />
                </Button>
              </Popover>
            )}
          </div>
        </div>
      </Drawer>
    )
  );
};

export default CardModal;
