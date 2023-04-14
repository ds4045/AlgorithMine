import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Input, Pagination, PaginationProps, Select } from 'antd';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './catalog.module.css';
import { CategoryType, Item } from '../../types/types';
import { useAppDispatch } from '../../redux/hooks';
import { searchItem, sortItem } from '../../redux/itemsSlice';
import { middleScore } from '../../helpers/middleScore';

const { Search } = Input;
type CatalogNavigationProps = {
  setCardsPosition: Dispatch<SetStateAction<'cards_horizontal' | 'cards_table'>>;
  items: Item[];
  currentCategory: CategoryType;
};

const CatalogNavigation: FC<CatalogNavigationProps> = ({
  setCardsPosition,
  items,
  currentCategory,
}) => {
  const pages = Math.ceil(items.length / 2);
  const [currentPage, setCurrentPage] = useState(1);
  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };
  const onSearch = (search: string) => {
    dispatch(searchItem(search.trim()));
  };
  const dispatch = useAppDispatch();
  const handleChange = (value: string) => {
    const renderItems: Item[] = [...items];
    switch (value) {
      case 'By priceUp': {
        renderItems.sort((a, b) => a.price - b.price);
        dispatch(sortItem(renderItems));
        break;
      }
      case 'By priceDown': {
        renderItems.sort((a, b) => b.price - a.price);
        dispatch(sortItem(renderItems));
        break;
      }
      case 'By THUp': {
        renderItems.sort((a, b) => a.optional?.hashrate - b.optional?.hashrate);
        dispatch(sortItem(renderItems));
        break;
      }
      case 'By THDown': {
        renderItems.sort((a, b) => b.optional?.hashrate - a.optional?.hashrate);
        dispatch(sortItem(renderItems));
        break;
      }
      case 'By rate': {
        renderItems.sort((a, b) => middleScore(b) - middleScore(a));
        dispatch(sortItem(renderItems));
        break;
      }
    }
  };
  let select = [
    { value: 'By priceUp', label: <FormattedMessage id="catalog.sort.price_up" /> },
    {
      value: 'By priceDown',
      label: <FormattedMessage id="catalog.sort.price_down" />,
    },
    { value: 'By THUp', label: <FormattedMessage id="catalog.sort.ths_up" /> },
    { value: 'By THDown', label: <FormattedMessage id="catalog.sort.ths_down" /> },
    { value: 'By rate', label: <FormattedMessage id="catalog.sort.rate" /> },
  ];
  if (currentCategory === 'Parts' || currentCategory === 'Accessory') {
    select = select.filter((el) => !el.value.includes('TH'));
  }
  return (
    <div className={styles.btn_groups}>
      <Select defaultValue="▼" style={{ width: 130 }} onChange={handleChange} options={select} />
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
      <Pagination current={currentPage} onChange={onChange} total={pages} />
    </div>
  );
};

export default CatalogNavigation;
