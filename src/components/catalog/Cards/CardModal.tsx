import { Button, Descriptions, Drawer, Popover } from 'antd';
import { FC } from 'react';
import styles from '../catalog.module.css';
import Reviews from '../Reviews';

type CardModalProps = {
  onClose: () => void;
  open: boolean;
};

const CardModal: FC<CardModalProps> = ({ onClose, open }) => {
  const content = <Reviews />;
  return (
    <Drawer
      title={'Bitmain Antminer E9'}
      placement="right"
      size="large"
      onClose={onClose}
      open={open}>
      <div>
        <Descriptions title="Характеристики">
          <Descriptions.Item label="Потреблнение">1900</Descriptions.Item>
          <Descriptions.Item label="Доходность">600</Descriptions.Item>
          <Descriptions.Item label="Оккупаемость">30.1</Descriptions.Item>
          <Descriptions.Item label="Хешрейт">100</Descriptions.Item>
          <Descriptions.Item label="Цена">400$</Descriptions.Item>
          <Descriptions.Item label="В наличии">✅</Descriptions.Item>
          <Descriptions.Item label="Артикул">1234567890</Descriptions.Item>
        </Descriptions>
        <p className={styles.modal_text}>
          <h5>Описание</h5>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto voluptas corrupti
          nobis veniam omnis delectus porro nemo labore suscipit perspiciatis in voluptatum,
          voluptatibus reiciendis repellat ea quidem voluptatem error esse. Quod voluptatibus eaque,
          ea ab ipsa magnam voluptate suscipit, sed veniam assumenda ullam! Ad maiores fugiat,
          aspernatur pariatur tempora placeat itaque voluptate dolorem? Facere minus, ratione
          aspernatur optio obcaecati aut non, ducimus nam, incidunt quos iure sunt quia cum quaerat
          et quae dolor expedita eum doloribus. Cum saepe quasi omnis odio nemo cupiditate, minima
          laborum eum quisquam fuga ratione perspiciatis maiores eos rerum ex sequi fugit veritatis
          sapiente neque numquam.
        </p>
        <p className={styles.modal_text}>
          <h5>Доставка</h5>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi recusandae optio dolore
          quasi laudantium eaque voluptates nostrum architecto quia magnam!
        </p>
        <div className={styles.btn_groups_modal}>
          <Button>Добавить к сравнению</Button>
          <Button>Добавить в избранное</Button>
          <Button>Добавить в корзину</Button>
          <Popover
            content={content}
            title="Отзывы"
            trigger="hover"
            overlayInnerStyle={{ overflow: 'scroll', height: 400 }}>
            <Button>Отзывы</Button>
          </Popover>
        </div>
      </div>
    </Drawer>
  );
};

export default CardModal;
