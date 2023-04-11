import { FC, useState } from 'react';
import { Card as AntCard, Button } from 'antd';
import CardModal from './CardModal';
import ImageCatalog from '../UI/ImageCatalog';
import DescriptionCard from '../UI/DescriptionCard';
import { FormattedMessage } from 'react-intl';
import { Item } from '../../../types/types';

type CardTableProps = {
  loading: boolean;
  item: Item;
};

const CardTable: FC<CardTableProps> = ({ loading, item }) => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const showLargeDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <AntCard
        loading={loading}
        style={{
          width: 350,
        }}
        actions={[
          <Button key="more" type="primary" onClick={showLargeDrawer}>
            <FormattedMessage id="catalog.card.btn_more" />
          </Button>,
          <Button key="buy">
            <FormattedMessage id="catalog.card.btn_buy" />
          </Button>,
        ]}>
        <ImageCatalog setVisible={setVisible} visible={visible} images={item.images} />
        <div>
          <DescriptionCard price={item.price} title={item.title} th={item.optional?.hashrate} />
        </div>
      </AntCard>
      <CardModal onClose={onClose} open={open} item={item} />
    </div>
  );
};

export default CardTable;
