import { FC, useState } from 'react';
import { Card as AntCard, Button } from 'antd';
import CardModal from './CardModal';
import ImageCatalog from '../UI/ImageCatalog';
import DescriptionCard from '../UI/DescriptionCard';
import { FormattedMessage } from 'react-intl';
import { Item } from '../../../types/types';
import { useAppDispatch } from '../../../redux/hooks';
import { addItem } from '../../../redux/cartSlice';

type CardTableProps = {
  loading: boolean;
  item: Item;
  score: number;
  alert: () => void;
};

const CardTable: FC<CardTableProps> = ({ loading, item, score, alert }) => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const showDescription = () => {
    setOpen(true);
  };
  const onCloseDescription = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();
  const buyHandler = () => {
    dispatch(addItem(item));
    alert();
  };
  return (
    <div>
      <AntCard
        loading={loading}
        style={{
          width: 350,
        }}
        actions={[
          <Button key="more" type="primary" onClick={showDescription}>
            <FormattedMessage id="catalog.card.btn_more" />
          </Button>,
          <Button key="buy" onClick={buyHandler}>
            <FormattedMessage id="catalog.card.btn_buy" />
          </Button>,
        ]}>
        <ImageCatalog setVisible={setVisible} visible={visible} images={item.images} />
        <div>
          <DescriptionCard
            price={item.price}
            title={item.title}
            th={item.optional?.hashrate}
            score={score}
          />
        </div>
      </AntCard>
      <CardModal onClose={onCloseDescription} open={open} item={item} buyHandler={buyHandler} />
    </div>
  );
};

export default CardTable;
