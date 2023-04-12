import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Input, Pagination, Select } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './catalog.module.css';
import { Item } from '../../types/types';
import { useAppDispatch } from '../../redux/hooks';
import { pushAllItems } from '../../redux/itemsSlice';
import { middleScore } from './Catalog';

const { Search } = Input;
type CatalogNavigationProps = {
  setCardsPosition: Dispatch<SetStateAction<'cards_horizontal' | 'cards_table'>>;
  items: Item[];
};

const CatalogNavigation: FC<CatalogNavigationProps> = ({ setCardsPosition, items }) => {
  const onSearch = () => {};
  console.log(items);
  const dispatch = useAppDispatch();
  const handleChange = (el: string) => {
    const renderItems: Item[] = [...items];
    switch (el) {
      case 'By priceUp': {
        renderItems.sort((a, b) => a.price - b.price);
        dispatch(pushAllItems(renderItems));
        break;
      }
      case 'By priceDown': {
        renderItems.sort((a, b) => b.price - a.price);
        dispatch(pushAllItems(renderItems));
        break;
      }
      case 'By THUp': {
        renderItems.sort((a, b) => a.optional?.hashrate - b.optional?.hashrate);
        dispatch(pushAllItems(renderItems));
        break;
      }
      case 'By THDown': {
        renderItems.sort((a, b) => b.optional?.hashrate - a.optional?.hashrate);
        dispatch(pushAllItems(renderItems));
        break;
      }
      case 'By rate': {
        renderItems.sort((a, b) => middleScore(b) - middleScore(a));
        dispatch(pushAllItems(renderItems));
        break;
      }
    }
  };
  return (
    <div className={styles.btn_groups}>
      <Select
        defaultValue="TH/s ▼"
        style={{ width: 130 }}
        onChange={handleChange}
        options={[
          { value: 'By priceUp', label: <FormattedMessage id="catalog.sort.price_up" /> },
          {
            value: 'By priceDown',
            label: <FormattedMessage id="catalog.sort.price_down" />,
          },
          { value: 'By THUp', label: <FormattedMessage id="catalog.sort.ths_up" /> },
          { value: 'By THDown', label: <FormattedMessage id="catalog.sort.ths_down" /> },
          { value: 'By rate', label: <FormattedMessage id="catalog.sort.rate" /> },
        ]}
      />
      <Search placeholder="..." onSearch={onSearch} allowClear style={{ width: 200 }} />
      <Button
        onClick={() => {
          setCardsPosition('cards_horizontal');
        }}>
        <UnorderedListOutlined className={styles.icon_sort} />
      </Button>
      <Button
        onClick={() => {
          setCardsPosition('cards_table');
        }}>
        <TableOutlined className={styles.icon_sort} />
      </Button>
      <Pagination defaultCurrent={1} total={50} />
    </div>
  );
};

export default CatalogNavigation;
