import { FC, useState } from 'react';
import { Item, UserFirestoreDB } from '../../../types/types';
import styles from '../personal_cabinet.module.css';
import { Button, Input, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ItemForm from './ItemForm';
import { useAlert } from '../../../hooks/useAlert';
import { fetchItems } from '../../../api/fetchItems';
import { fetchPosts } from '../../../api/fetchPosts';

type AdminProps = {
  me: UserFirestoreDB;
};
const { Search } = Input;
const Admin: FC<AdminProps> = ({ me }) => {
  const [loading, setLoading] = useState(false);
  const items = useAppSelector((state) => state.items.items);
  const [alertSuccess, alertError, contextHolder] = useAlert();
  const dispatch = useAppDispatch();
  const onSearch = (value: string) => {
    const find = items.find((el) => el.sku.toString() === value);
    if (find) {
      setCurrentItem(find);
      alertSuccess('Товар найден');
    } else {
      setCurrentItem(null);
      alertError('Товар не найден');
    }
  };
  const [currentItem, setCurrentItem] = useState<null | Item>(null);
  const updateDB = async () => {
    setLoading(true);
    await fetchItems(dispatch);
    await fetchPosts(dispatch);
    setLoading(false);
    setCurrentItem(null);
  };
  return (
    <Spin spinning={loading}>
      <div className={styles.wrapper}>
        {contextHolder}
        <div className={styles.personal_data}>
          <div className={styles.admin_btn_group}>
            <Button onClick={updateDB}>Обновить БД</Button>
            <Button>Добавить товар</Button>
            <Button>Добавить пост</Button>
            <Search placeholder="Поиск по sku" onSearch={onSearch} enterButton allowClear />
          </div>
          <ItemForm item={currentItem} alertSuccess={alertSuccess} alertError={alertError} />
        </div>
      </div>
    </Spin>
  );
};

export default Admin;
