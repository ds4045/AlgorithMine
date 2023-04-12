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
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import styles from './catalog.module.css';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import CatalogNavigation from './CatalogNavigation';
import CardHorizontal from './Cards/CardHorizontal';
import CardTable from './Cards/CardTable';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { pushAllItems } from '../../redux/itemsSlice';
import { Item } from '../../types/types';
import { getDataFromDB } from '../../firbase/firebaseAPI';
type MenuItem = Required<MenuProps>['items'][number];

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
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const [cardsPosition, setCardsPosition] = useState<'cards_horizontal' | 'cards_table'>(
    'cards_horizontal',
  );
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
      <div>
        <FormattedMessage id="catalog.comparison" />
      </div>,
      'sub4',
      <EyeOutlined />,
    ),
    getItem(
      <div>
        <FormattedMessage id="catalog.favorites" />
      </div>,
      'sub5',
      <HeartOutlined />,
    ),
    getItem(
      <div>
        <FormattedMessage id="catalog.cart" />
      </div>,
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
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const items = useAppSelector((state) => state.items.items);
  console.log(items);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      const res = await getDataFromDB('items');
      if (!items.length) dispatch(pushAllItems(res as Item[]));
      setIsLoading(false);
    };
    fetchItems();
  }, [dispatch, setIsLoading, items.length]);
  const middleScore = (item: Item) =>
    Math.round(item.reviews.reduce((acc, curr) => acc + curr?.rate, 0) / item.reviews.length);
  return (
    <div>
      <Menu
        className={styles.menu}
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={menuItems}
      />
      <div className={styles.wrapper}>
        <CatalogNavigation setCardsPosition={setCardsPosition} />
        <div className={styles[cardsPosition]}>
          {cardsPosition === 'cards_horizontal'
            ? items.map((el) => (
                <CardHorizontal key={el.id} loading={isLoading} item={el} score={middleScore(el)} />
              ))
            : items.map((el) => (
                <CardTable key={el.id} loading={isLoading} item={el} score={middleScore(el)} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
