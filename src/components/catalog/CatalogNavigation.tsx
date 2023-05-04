import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import { Dispatch, FC, SetStateAction, memo, useCallback, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './catalog.module.css';
import { Item } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { searchItem, sortItem } from '../../redux/itemsSlice';
import { middleScore } from '../../helpers/middleScore';
let select = [
  { value: 'By priceUp', label: <FormattedMessage id="catalog.sort.price_up" /> },
  {
    value: 'By priceDown',
    label: <FormattedMessage id="catalog.sort.price_down" />,
  },
  { value: 'By HRUp', label: <FormattedMessage id="catalog.sort.ths_up" /> },
  { value: 'By HRDown', label: <FormattedMessage id="catalog.sort.ths_down" /> },
  { value: 'By rate', label: <FormattedMessage id="catalog.sort.rate" /> },
];
const { Search } = Input;
type CatalogNavigationProps = {
  setCardsPosition: Dispatch<SetStateAction<'cards_horizontal' | 'cards_table'>>;
};

const CatalogNavigation: FC<CatalogNavigationProps> = ({ setCardsPosition }) => {
  const onSearch = (search: string) => {
    dispatch(searchItem(search.trim()));
  };
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.items.searchedItems);
  const currentCategory = useAppSelector((state) => state.currentCategory.currentCategory);
  const handleChange = useCallback(
    (value: string) => {
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
        case 'By HRUp': {
          renderItems.sort((a, b) => a.optional?.hashrate - b.optional?.hashrate);
          dispatch(sortItem(renderItems));
          break;
        }
        case 'By HRDown': {
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
    },
    [dispatch, items],
  );
  useEffect(() => {
    if (currentCategory === 'Parts' || currentCategory === 'Accessory') {
      select = select.filter((el) => !el.value.includes('TH'));
    }
  }, [currentCategory]);

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
    </div>
  );
};
export default memo(CatalogNavigation);
