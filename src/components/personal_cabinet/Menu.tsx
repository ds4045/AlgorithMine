import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  ContainerOutlined,
  HeartOutlined,
  LikeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PhoneOutlined,
  RollbackOutlined,
  SecurityScanOutlined,
  SettingFilled,
} from '@ant-design/icons';
import { Button, Menu, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { ActualPageType } from './PersonalCabinet';
import styles from './personal_cabinet.module.css';
import { UserFirestoreDB } from '../../types/types';
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
type MenuTypeProps = {
  setActualPage: Dispatch<SetStateAction<ActualPageType>>;
  me: UserFirestoreDB | null;
};
const MenuComponent: FC<MenuTypeProps> = ({ setActualPage, me }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const items: MenuItem[] = [
    getItem(
      <div
        onClick={() => {
          setActualPage('settings');
        }}>
        <FormattedMessage id="pc.btn_settings" />
      </div>,
      '1',
      <SettingFilled
        onClick={() => {
          setActualPage('settings');
        }}
      />,
    ),
    getItem(
      <div
        onClick={() => {
          setActualPage('orders');
        }}>
        <FormattedMessage id="pc.btn_orders" />
      </div>,
      '2',
      <ContainerOutlined
        onClick={() => {
          setActualPage('orders');
        }}
      />,
    ),
    getItem(
      <div
        onClick={() => {
          setActualPage('reviews');
        }}>
        <FormattedMessage id="pc.btn_reviews" />
      </div>,
      '3',
      <LikeOutlined
        onClick={() => {
          setActualPage('reviews');
        }}
      />,
    ),
    getItem(
      <div
        onClick={() => {
          setActualPage('favorites');
        }}>
        <FormattedMessage id="catalog.favorites" />
      </div>,
      '4',
      <HeartOutlined
        onClick={() => {
          setActualPage('favorites');
        }}
      />,
    ),
    getItem(
      <div
        onClick={() => {
          setActualPage('contacts');
        }}>
        <FormattedMessage id="pc.btn_contacts" />
      </div>,
      '5',
      <PhoneOutlined
        onClick={() => {
          setActualPage('contacts');
        }}
      />,
    ),
    getItem(
      <div
        onClick={() => {
          navigate(-1);
        }}>
        <FormattedMessage id="auth.btn_back" />
      </div>,
      '6',
      <RollbackOutlined
        onClick={() => {
          navigate('/');
        }}
      />,
    ),
    me?.isAdmin
      ? getItem(
          <div
            onClick={() => {
              setActualPage('admin');
            }}>
            Админ
          </div>,
          '7',
          <SecurityScanOutlined
            onClick={() => {
              setActualPage('admin');
            }}
          />,
        )
      : null,
  ];
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className={styles.wrapper_pk_settings}>
      <Button type="primary" onClick={toggleCollapsed} className={styles.btn_open_settings}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        className={styles.menu}
      />
    </div>
  );
};

export default MenuComponent;
