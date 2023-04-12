import { Button, Card } from 'antd';
import { FC, useState } from 'react';
import styles from '../catalog.module.css';
import ImageCatalog from '../UI/ImageCatalog';
import CardModal from './CardModal';
import DescriptionCard from '../UI/DescriptionCard';
import { FormattedMessage } from 'react-intl';
import { Item } from '../../../types/types';
type CardHorizontalProps = {
  loading: boolean;
  item: Item;
  score: number;
};

const CardHorizontal: FC<CardHorizontalProps> = ({ loading, item, score }) => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const showLargeDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Card
      loading={loading}
      className={styles.card_horizontal}
      bodyStyle={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <ImageCatalog setVisible={setVisible} visible={visible} images={item.images} />
      <div className={styles.horizontal_description}>
        <h5>
          <FormattedMessage id="catalog.card.description" />
        </h5>
        <p>{item.description}</p>
      </div>
      <div className={styles.horizontal_options}>
        <DescriptionCard
          price={item.price}
          title={item.title}
          th={item.optional?.hashrate}
          score={score}
        />
        <div className={styles.btn_groups_horizontal}>
          <Button onClick={showLargeDrawer} type="primary">
            <FormattedMessage id="catalog.card.btn_more" />
          </Button>
          <Button onClick={showLargeDrawer}>
            <FormattedMessage id="catalog.card.btn_buy" />
          </Button>
        </div>
      </div>
      <CardModal onClose={onClose} open={open} item={item} />
    </Card>
  );
};

export default CardHorizontal;
