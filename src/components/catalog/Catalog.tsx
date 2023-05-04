import React, { FC, memo, useCallback, useMemo, useState } from 'react';
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
import styles from './catalog.module.css';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import CatalogNavigation from './CatalogNavigation';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Comparison from './comparison/Comparison';
import { setCurrentCategory } from '../../redux/currentCategorySlice';
import CardWrapper from './CardWrapper';
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

const rootSubmenuKeys = ['Asic', 'Accessory', 'GPU', 'Comparison', 'Cart', 'Back'];
const Catalog: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const comparisonItems = useAppSelector((state) => state.comparison.addedItems);
  const currentCategory = useAppSelector((state) => state.currentCategory.currentCategory);
  const [isComparison, setIsComparison] = useState(false);
  const addedItems = useAppSelector((state) => state.cart.addedItems);
  const totalUnits = useMemo(
    () => addedItems.reduce((acc, curr) => acc + curr.count, 0),
    [addedItems],
  );
  const [openKeys, setOpenKeys] = useState([
    rootSubmenuKeys.find((el) => el === currentCategory) ?? 'Asic',
  ]);
  const [cardsPosition, setCardsPosition] = useState<'cards_horizontal' | 'cards_table'>(
    'cards_table',
  );
  const onOpenChange: MenuProps['onOpenChange'] = useCallback(
    (keys: string[]) => {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
      if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    },
    [openKeys],
  );
  const menuItems: MenuItem[] = useMemo(
    () => [
      getItem(
        <div>
          <FormattedMessage id="header.catalog_asic" />
        </div>,
        'Asic',
        <ClusterOutlined />,
        [
          getItem(
            <div onClick={() => dispatch(setCurrentCategory('WhatsMiner'))}>WhatsMiner</div>,
            '1',
          ),
          getItem(
            <div onClick={() => dispatch(setCurrentCategory('Antminer'))}>Antminer</div>,
            '2',
          ),
          getItem(
            <div onClick={() => dispatch(setCurrentCategory('AvalonMiner'))}>AvalonMiner</div>,
            '3',
          ),
          getItem(
            <div onClick={() => dispatch(setCurrentCategory('Innosilicon'))}>Innosilicon</div>,
            '4',
          ),
          getItem(
            <div onClick={() => dispatch(setCurrentCategory('Gold Shell'))}>Gold Shell</div>,
            '5',
          ),
          getItem(
            <div onClick={() => dispatch(setCurrentCategory('Asic'))}>
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
        'Accessories',
        <UsbOutlined />,
        [
          getItem(
            <div onClick={() => dispatch(setCurrentCategory('Parts'))}>
              <FormattedMessage id="catalog.parts" />
            </div>,
            '8',
          ),
          getItem(
            <div onClick={() => dispatch(setCurrentCategory('Accessory'))}>
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
          getItem(<div onClick={() => dispatch(setCurrentCategory('NVIDIA'))}>NVIDIA</div>, '10'),
          getItem(<div onClick={() => dispatch(setCurrentCategory('AMD'))}>AMD</div>, '11'),
          getItem(<div onClick={() => dispatch(setCurrentCategory('MSI'))}>MSI</div>, '12'),
          getItem(<div onClick={() => dispatch(setCurrentCategory('ASUS'))}>ASUS</div>, '13'),
          getItem(
            <div onClick={() => dispatch(setCurrentCategory('GPU'))}>
              <FormattedMessage id="catalog.all" />
            </div>,
            '14',
          ),
        ],
      ),
      getItem(
        <Badge count={comparisonItems.length} offset={[10, 0]} color="#F94F0C">
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
    ],
    [comparisonItems.length, totalUnits, dispatch, navigate],
  );

  return (
    <div className={styles.catalog}>
      <Menu
        className={styles.menu}
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={menuItems}
      />
      <div className={styles.wrapper}>
        <CatalogNavigation setCardsPosition={setCardsPosition} />
        <Drawer
          size="large"
          placement="right"
          onClose={() => setIsComparison(false)}
          open={isComparison}>
          <Comparison />
        </Drawer>
        <div className={styles[cardsPosition]}>
          <CardWrapper cardsPosition={cardsPosition} />
        </div>
      </div>
    </div>
  );
};

export default memo(Catalog);
