import { FC, useState } from 'react';
import { Button, Card } from 'antd';
import ImageCatalog from '../UI/ImageCatalog';
import DescriptionCard from '../UI/DescriptionCard';
import { FormattedMessage } from 'react-intl';
import { Item } from '../../../types/types';
import { useAppDispatch } from '../../../redux/hooks';
import { addItem } from '../../../redux/cartSlice';
import CardModal from './CardModal';

type CardTableProps = {
  item: Item;
  score: number;
  alertSuccess: (text: React.ReactNode) => void;
  alertError: (text: React.ReactNode) => void;
};

const CardTable: FC<CardTableProps> = ({ item, score, alertSuccess, alertError }) => {
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
    alertSuccess(<FormattedMessage id="cart.add_item_alert" />);
  };
  return (
    <div>
      <Card
        style={{
          width: 350,
        }}
        actions={[
          <Button key="more" onClick={showDescription}>
            <FormattedMessage id="catalog.card.btn_more" />
          </Button>,
          <Button key="buy" onClick={buyHandler} type="primary">
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
      </Card>
      <CardModal
        onClose={onCloseDescription}
        open={open}
        item={item}
        alertError={alertError}
        alertSuccess={alertSuccess}
      />
    </div>
  );
};

export default CardTable;
