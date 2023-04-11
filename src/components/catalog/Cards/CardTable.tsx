import { FC, useState } from 'react';
import { Card as AntCard, Button } from 'antd';
import CardModal from './CardModal';
import ImageCatalog from '../UI/ImageCatalog';
import DescriptionCard from '../UI/DescriptionCard';

type CardTableProps = {};

const CardTable: FC<CardTableProps> = () => {
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
        style={{
          width: 350,
        }}
        actions={[
          <Button key="more" type="primary" onClick={showLargeDrawer}>
            Подробнее
          </Button>,
          <Button key="add">Купить</Button>,
        ]}>
        <ImageCatalog setVisible={setVisible} visible={visible} />
        <div>
          <DescriptionCard />
        </div>
      </AntCard>
      <CardModal onClose={onClose} open={open} />
    </div>
  );
};

export default CardTable;
