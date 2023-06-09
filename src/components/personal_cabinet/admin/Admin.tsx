import { FC, useState } from 'react';
import { Item, UserFirestoreDB } from '../../../types/types';
import styles from './admin.module.css';
import { Button, Input, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import ItemForm from './ItemForm';
import { useAlert } from '../../../hooks/useAlert';
import { fetchItems } from '../../../api/fetchItems';
import { fetchPosts } from '../../../api/fetchPosts';
import PostForm from './PostForm';

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
  const [currentPage, setCurrentPage] = useState<'items' | 'posts'>('items');

  const [currentItem, setCurrentItem] = useState<null | Item>(null);
  const updateDB = async () => {
    setLoading(true);
    await fetchItems(dispatch);
    await fetchPosts(dispatch);
    setLoading(false);
    setCurrentItem(null);
  };
  return (
    <div className={styles.request_wrapper}>
      <Spin spinning={loading}>
        {contextHolder}
        <div className={styles.admin_btn_group}>
          <Button onClick={updateDB}>Обновить БД</Button>
          <Button onClick={() => setCurrentPage('items')}>Добавить товар</Button>
          <Button onClick={() => setCurrentPage('posts')}>Добавить пост</Button>
          <Search placeholder="Поиск по sku" onSearch={onSearch} enterButton allowClear />
        </div>
        {currentPage === 'items' ? (
          <ItemForm item={currentItem} alertSuccess={alertSuccess} alertError={alertError} />
        ) : (
          <PostForm alertSuccess={alertSuccess} alertError={alertError} />
        )}
      </Spin>
    </div>
  );
};

export default Admin;
