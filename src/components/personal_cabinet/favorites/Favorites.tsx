import { FC, useState } from 'react';
import styles from '../personal_cabinet.module.css';
import { Item, UserFirestoreDB } from '../../../types/types';
import { Button, Divider, Empty } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Avatar, List } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import CardModal from '../../catalog/cards/CardModal';
import { useAlert } from '../../../hooks/useAlert';
type FavoritesProps = {
  me: UserFirestoreDB | null;
};

const Favorites: FC<FavoritesProps> = ({ me }) => {
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const showDescription = (item: Item) => {
    if (item) {
      setCurrentItem(item);
      setOpen(true);
    }
  };
  const onCloseDescription = () => {
    setOpen(false);
  };
  const [alertSuccess, alertError, contextHolder] = useAlert();
  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <div className={styles.personal_data}>
        <Divider plain>
          <FormattedMessage id="catalog.favorites" />
        </Divider>
        {me?.favorites.length ? (
          <List
            className={styles.favorites_list}
            grid={{ column: 1 }}
            itemLayout="horizontal"
            dataSource={me.favorites}
            renderItem={(item) => (
              <List.Item style={{ display: 'flex' }}>
                <List.Item.Meta
                  avatar={<Avatar src={item.images[0]} />}
                  title={item.title}
                  description={item.description}
                />
                <Button onClick={() => showDescription(item)}>
                  <FolderOpenOutlined />
                </Button>
              </List.Item>
            )}
          />
        ) : (
          <Empty description={false} />
        )}
      </div>
      {currentItem && (
        <CardModal
          onClose={onCloseDescription}
          open={open}
          item={currentItem}
          alertError={alertError}
          alertSuccess={alertSuccess}
        />
      )}
    </div>
  );
};

export default Favorites;
