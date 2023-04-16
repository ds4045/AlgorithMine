import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  ClusterOutlined,
  EyeOutlined,
  FundProjectionScreenOutlined,
  RollbackOutlined,
  ShoppingCartOutlined,
  UsbOutlined,
} from '@ant-design/icons';
import { Badge, Drawer, MenuProps } from 'antd';
import { Menu } from 'antd';
import { useAlert } from '../../hooks/useAlert';
import styles from './catalog.module.css';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import CatalogNavigation from './CatalogNavigation';
import CardHorizontal from './Cards/CardHorizontal';
import CardTable from './Cards/CardTable';
import { useAppSelector } from '../../redux/hooks';
import { middleScore } from '../../helpers/middleScore';
import { CategoryType } from '../../types/types';
import { renderItemByCategory } from '../../helpers/renderItemByCategory';
import Comparison from './comporison/Comparison';
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
type CatalogProps = {
  currentCategory: CategoryType;
  setCurrentCategory: Dispatch<SetStateAction<CategoryType>>;
};
const rootSubmenuKeys = ['Asic', 'Accessory', 'GPU', 'Comparison', 'Cart', 'Back'];
const Catalog: FC<CatalogProps> = ({ currentCategory, setCurrentCategory }) => {
  const navigate = useNavigate();
  const [isComparison, setIsComparison] = useState(false);
  const addedItems = useAppSelector((state) => state.cart.addedItems);
  const totalUnits = addedItems.reduce((acc, curr) => acc + curr.count, 0);
  const [openKeys, setOpenKeys] = useState([
    rootSubmenuKeys.find((el) => el === currentCategory) ?? 'Asic',
  ]);
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
  const menuItems: MenuItem[] = [
    getItem(
      <div>
        <FormattedMessage id="header.catalog_asic" />
      </div>,
      'Asic',
      <ClusterOutlined />,
      [
        getItem(<div onClick={() => setCurrentCategory('WhatsMiner')}>WhatsMiner</div>, '1'),
        getItem(<div onClick={() => setCurrentCategory('Antminer')}>Antminer</div>, '2'),
        getItem(<div onClick={() => setCurrentCategory('AvalonMiner')}>AvalonMiner</div>, '3'),
        getItem(<div onClick={() => setCurrentCategory('Innosilicon')}>Innosilicon</div>, '4'),
        getItem(<div onClick={() => setCurrentCategory('Gold Shell')}>Gold Shell</div>, '5'),
        getItem(
          <div onClick={() => setCurrentCategory('Asic')}>
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
      'Accessory',
      <UsbOutlined />,
      [
        getItem(
          <div onClick={() => setCurrentCategory('Parts')}>
            <FormattedMessage id="catalog.parts" />
          </div>,
          '8',
        ),
        getItem(
          <div onClick={() => setCurrentCategory('Accessory')}>
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
      'GPU',
      <FundProjectionScreenOutlined />,
      [
        getItem(<div onClick={() => setCurrentCategory('NVIDIA')}>NVIDIA</div>, '10'),
        getItem(<div onClick={() => setCurrentCategory('AMD')}>AMD</div>, '11'),
        getItem(<div onClick={() => setCurrentCategory('MSI')}>MSI</div>, '12'),
        getItem(<div onClick={() => setCurrentCategory('ASUS')}>ASUS</div>, '13'),
        getItem(
          <div onClick={() => setCurrentCategory('GPU')}>
            <FormattedMessage id="catalog.all" />
          </div>,
          '14',
        ),
      ],
    ),
    getItem(
      <Badge count={1} offset={[10, 0]} color="#F94F0C">
        <div onClick={() => setIsComparison(true)}>
          <FormattedMessage id="catalog.comparison" />
        </div>
      </Badge>,
      'Comparison',
      <EyeOutlined />,
    ),
    getItem(
      <Badge count={totalUnits} offset={[10, 0]} color="#F94F0C">
        <div onClick={() => navigate('/cart')}>
          <FormattedMessage id="catalog.cart" />
        </div>
      </Badge>,
      'Cart',
      <ShoppingCartOutlined />,
    ),
    getItem(
      <div onClick={() => navigate('/')}>
        <FormattedMessage id="auth.btn_back" />
      </div>,
      'Back',
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
        <CatalogNavigation
          setCardsPosition={setCardsPosition}
          items={items}
          currentCategory={currentCategory}
        />
        <Drawer
          size="large"
          title="Basic Drawer"
          placement="right"
          onClose={() => setIsComparison(false)}
          open={isComparison}>
          <Comparison />
        </Drawer>
        <div className={styles[cardsPosition]}>
          {cardsPosition === 'cards_horizontal'
            ? renderItemByCategory(currentCategory, items).map((el) => (
                <CardHorizontal
                  key={el.id}
                  item={el}
                  score={middleScore(el)}
                  alertSuccess={alertSuccess}
                  alertError={alertError}
                />
              ))
            : renderItemByCategory(currentCategory, items).map((el) => (
                <CardTable
                  key={el.id}
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
