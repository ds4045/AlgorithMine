import { Button, Descriptions, Drawer, Popover } from 'antd';
import { FC } from 'react';
import styles from '../catalog.module.css';
import Reviews from '../Reviews';
import { FormattedMessage } from 'react-intl';
import { Item, ItemOptional, ItemOptionalFields } from '../../../types/types';

type CardModalProps = {
  onClose: () => void;
  open: boolean;
  item: Item;
  buyHandler: () => void;
};

const CardModal: FC<CardModalProps> = ({ onClose, open, item, buyHandler }) => {
  const itemID = item.id;
  const reviews = item.reviews ?? [];
  const content = <Reviews reviews={reviews} itemID={itemID} />;
  const optionalProperties: { key: ItemOptionalFields; value: string | number }[] = [];
  const optional: ItemOptional = item.optional;
  for (const [key, value] of Object.entries(optional)) {
    if (typeof value === 'string' || typeof value === 'number') {
      optionalProperties.push({ key: key as ItemOptionalFields, value });
    }
  }
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
        <p className={styles.modal_text}>
          <b>
            <FormattedMessage id="catalog.card.description" />
          </b>
          <br />
          {item.description}
        </p>
        <p className={styles.modal_text}>
          <b>
            <FormattedMessage id="catalog.card.modal_delivery" />
          </b>
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi recusandae optio dolore
          quasi laudantium eaque voluptates nostrum architecto quia magnam!
        </p>
        <div className={styles.btn_groups_modal}>
          <Button>
            <FormattedMessage id="catalog.card.modal_add_to_сomparison" />
          </Button>
          <Button>
            <FormattedMessage id="catalog.card.modal_add_to_favorites" />
          </Button>
          <Button onClick={buyHandler}>
            <FormattedMessage id="catalog.card.modal_add_to_cart" />
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
