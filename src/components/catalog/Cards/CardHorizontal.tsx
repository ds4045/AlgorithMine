import { Button, Card } from 'antd';
import { FC, useState } from 'react';
import styles from '../catalog.module.css';

import ImageCatalog from '../UI/ImageCatalog';
import CardModal from './CardModal';
import DescriptionCard from '../UI/DescriptionCard';
type CardHorizontalProps = {};

const CardHorizontal: FC<CardHorizontalProps> = () => {
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
      className={styles.card_horizontal}
      bodyStyle={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <ImageCatalog setVisible={setVisible} visible={visible} />
      <div className={styles.horizontal_description}>
        <h5>Описание</h5>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore porro recusandae vitae
          necessitatibus, asperiores nostrum beatae, cumque qui eaque, a incidunt dolore!
          Dignissimos, sequi similique. Repudiandae, sit, dicta similique odio quae repellendus
          tempore error fuga possimus ab velit, obcaecati quibusdam.
        </p>
      </div>
      <div className={styles.horizontal_options}>
        <DescriptionCard />
        <div className={styles.btn_groups_horizontal}>
          <Button onClick={showLargeDrawer} type="primary">
            Подробнее
          </Button>
          <Button onClick={showLargeDrawer}>Купить</Button>
        </div>
      </div>
      <CardModal onClose={onClose} open={open} />
    </Card>
  );
};

export default CardHorizontal;
