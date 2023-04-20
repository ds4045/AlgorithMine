import {
  ContainerOutlined,
  HeartOutlined,
  LikeOutlined,
  PhoneOutlined,
  RollbackOutlined,
  SecurityScanOutlined,
  SettingFilled,
} from '@ant-design/icons';
import { Dispatch, FC, SetStateAction } from 'react';
import { ActualPageType } from './PersonalCabinet';
import styles from './personal_cabinet.module.css';
import { useNavigate } from 'react-router-dom';

type MenuMobileProps = {
  setActualPage: Dispatch<SetStateAction<ActualPageType>>;
  isAdmin: boolean;
};

const MenuMobile: FC<MenuMobileProps> = ({ setActualPage, isAdmin }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.menu_mobile}>
      <SettingFilled
        onClick={() => {
          setActualPage('settings');
        }}
      />
      <ContainerOutlined
        onClick={() => {
          setActualPage('orders');
        }}
      />
      <LikeOutlined
        onClick={() => {
          setActualPage('reviews');
        }}
      />
      <HeartOutlined
        onClick={() => {
          setActualPage('favorites');
        }}
      />
      <PhoneOutlined
        onClick={() => {
          setActualPage('contacts');
        }}
      />
      <RollbackOutlined
        onClick={() => {
          navigate('/');
        }}
      />
      {isAdmin && (
        <SecurityScanOutlined
          onClick={() => {
            setActualPage('admin');
          }}
        />
      )}
    </div>
  );
};

export default MenuMobile;
