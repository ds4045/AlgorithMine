import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Input, Pagination, Select } from 'antd';
import { Dispatch, FC, SetStateAction } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './catalog.module.css';

const { Search } = Input;
type CatalogNavigationProps = {
  setCardsPosition: Dispatch<SetStateAction<'cards_horizontal' | 'cards_table'>>;
};

const CatalogNavigation: FC<CatalogNavigationProps> = ({ setCardsPosition }) => {
  const onSearch = () => {};
  const handleChange = (el: string) => {
    console.log(el);
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
