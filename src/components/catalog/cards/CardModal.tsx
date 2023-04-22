import { Button, Descriptions, Divider, Drawer, Popover } from 'antd';
import { FC, useState } from 'react';
import styles from '../catalog.module.css';
import { FormattedMessage } from 'react-intl';
import { Item, ItemOptional, ItemOptionalFields, UserFirestoreDB } from '../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { toggleFavoritesHandler } from '../../../firbase/toggleFavoretesHandler';
import { addItem } from '../../../redux/cartSlice';
import ReviewsCatalog from '../reviews/ReviewsCatalog';
import { addItemToComparison } from '../../../redux/comparisonSlice';
import { switchDescriptionHashrate } from '../../../helpers/switchDescripyionHashrate';

type CardModalProps = {
  onClose: () => void;
  open: boolean;
  item: Item;
  alertSuccess: (text: React.ReactNode) => void;
  alertError: (text: React.ReactNode) => void;
};

const CardModal: FC<CardModalProps> = ({ onClose, open, item, alertSuccess, alertError }) => {
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
  const addToComparison = (
    item: Item,
    alertError: (text: React.ReactNode) => void,
    alertSuccess: (text: React.ReactNode) => void,
  ) => {
    if (item.section === 'Asic' || item.section === 'GPU')
      dispatch(addItemToComparison({ item, alertError, alertSuccess }));
    else alertError(<FormattedMessage id="cart.comparison_error_type" />);
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
                {switchDescriptionHashrate(el)}
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
              <FormattedMessage id="catalog.card.modal_delivery_description" />
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <div className={styles.btn_groups_modal}>
            <Button onClick={addToCart} type="primary">
              <FormattedMessage id="catalog.card.modal_add_to_cart" />
            </Button>
            <Button onClick={() => addToComparison(item, alertError, alertSuccess)}>
              <FormattedMessage id="catalog.card.modal_add_to_сomparison" />
            </Button>
            <Button onClick={toggleFavorite} loading={isLoading}>
              <FormattedMessage
                id={`catalog.card.modal_${isFavorite ? 'delete' : 'add'}_to_favorites`}
              />
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
    )
  );
};

export default CardModal;
