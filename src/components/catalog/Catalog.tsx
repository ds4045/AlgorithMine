import React, { FC, useEffect, useState } from 'react';
import {
  ClusterOutlined,
  EyeOutlined,
  FundProjectionScreenOutlined,
  HeartOutlined,
  RollbackOutlined,
  ShoppingCartOutlined,
  UsbOutlined,
} from '@ant-design/icons';
import { Badge, MenuProps } from 'antd';
import { Menu } from 'antd';
import { useAlert } from '../../hooks/useAlert';
import styles from './catalog.module.css';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import CatalogNavigation from './CatalogNavigation';
import CardHorizontal from './Cards/CardHorizontal';
import CardTable from './Cards/CardTable';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Item } from '../../types/types';
import { fetchItems } from '../../api/fetchItems';
type MenuItem = Required<MenuProps>['items'][number];
export const middleScore = (item: Item) =>
  Math.round(item.reviews.reduce((acc, curr) => acc + curr?.rate, 0) / item.reviews.length);
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7'];
const Catalog: FC = () => {
  const navigate = useNavigate();
  const addedItems = useAppSelector((state) => state.cart.addedItems);
  const totalUnits = addedItems.reduce((acc, curr) => acc + curr.count, 0);
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const [cardsPosition, setCardsPosition] = useState<'cards_horizontal' | 'cards_table'>(
    'cards_horizontal',
  );

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const items = useAppSelector((state) => state.items.searchedItems);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchItems(dispatch, setIsLoading);
  }, [dispatch]);
  const menuItems: MenuItem[] = [
    getItem(
      <div>
        <FormattedMessage id="header.catalog_asic" />
      </div>,
      'sub1',
      <ClusterOutlined />,
      [
        getItem(<div>WhatsMiner</div>, '1'),
        getItem(<div>Antminer</div>, '2'),
        getItem(<div>AvalonMiner</div>, '3'),
        getItem(<div>Innosilicon</div>, '4'),
        getItem(<div>Gold Shell</div>, '5'),
        getItem(
          <div>
            <FormattedMessage id="catalog.all" />
          </div>,
          '6',
        ),
      ],
    ),
    getItem(
      <div>
        <FormattedMessage id="header.catalog_accessories" />
      </div>,
      'sub2',
      <UsbOutlined />,
      [
        getItem(
          <div>
            <FormattedMessage id="catalog.parts" />
          </div>,
          '8',
        ),
        getItem(
          <div>
            <FormattedMessage id="catalog.accessory" />
          </div>,
          '9',
        ),
      ],
    ),
    getItem(
      <div>
        <FormattedMessage id="header.catalog_videocards" />
      </div>,
      'sub3',
      <FundProjectionScreenOutlined />,
      [getItem('NVIDIA', '10'), getItem('AMD', '11'), getItem('MSI', '12'), getItem('ASUS', '13')],
    ),
    getItem(
      <Badge count={1} offset={[10, 0]}>
        <div>
          <FormattedMessage id="catalog.comparison" />
        </div>
      </Badge>,
      'sub4',
      <EyeOutlined />,
    ),
    getItem(
      <Badge count={4} offset={[13, 0]}>
        <div>
          <FormattedMessage id="catalog.favorites" />
        </div>
      </Badge>,
      'sub5',
      <HeartOutlined />,
    ),
    getItem(
      <Badge count={totalUnits} offset={[10, 0]}>
        <div onClick={() => navigate('/cart')}>
          <FormattedMessage id="catalog.cart" />
        </div>
      </Badge>,
      'sub6',
      <ShoppingCartOutlined />,
    ),
    getItem(
      <div onClick={() => navigate('/')}>
        <FormattedMessage id="auth.btn_back" />
      </div>,
      'sub7',
      <RollbackOutlined />,
    ),
  ];
  const [alertSuccess, alertError, contextHolder] = useAlert();

  return (
    <div>
      {contextHolder}
      <Menu
        className={styles.menu}
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={menuItems}
      />
      <div className={styles.wrapper}>
        <CatalogNavigation setCardsPosition={setCardsPosition} items={items} />
        <div className={styles[cardsPosition]}>
          {cardsPosition === 'cards_horizontal'
            ? items.map((el) => (
                <CardHorizontal
                  key={el.id}
                  loading={isLoading}
                  item={el}
                  score={middleScore(el)}
                  alertSuccess={alertSuccess}
                  alertError={alertError}
                />
              ))
            : items.map((el) => (
                <CardTable
                  key={el.id}
                  loading={isLoading}
                  item={el}
                  score={middleScore(el)}
                  alertSuccess={alertSuccess}
                  alertError={alertError}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
