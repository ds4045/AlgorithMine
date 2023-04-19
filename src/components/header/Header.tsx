import React, { Dispatch, SetStateAction } from 'react';
import { Avatar, Badge, Button, Dropdown, MenuProps, Switch } from 'antd';
import { LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import styles from './header.module.css';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firbase/firebaseConfig';
import { isAuthFalse } from '../../redux/authSlice';
import { setUserDataCookie } from '../../hooks/useAutoSignIn';
import { CategoryType, UserFirestoreDB } from '../../types/types';
import { pushAddedItems } from '../../redux/cartSlice';
import SocialNetwork from '../UI/soc_network_icons/SocialNetwork';
import ToggleColorThemes from '../UI/toggle_color/ToggleColorThemes';
import MainLogoButton from '../UI/logo/MainLogoButton';

type HeaderProps = {
  onLocaleChange: () => void;
  setDarkThemes: Dispatch<SetStateAction<boolean>>;
  darkThemes: boolean;
  me: UserFirestoreDB | null;
  setCurrentCategory: Dispatch<SetStateAction<CategoryType>>;
  locale: 'en' | 'ru';
};
const Header: React.FC<HeaderProps> = ({
  onLocaleChange,
  setDarkThemes,
  darkThemes,
  me,
  setCurrentCategory,
  locale,
}) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const addedItems = useAppSelector((state) => state.cart.addedItems);
  const totalUnits = addedItems.reduce((acc, curr) => acc + curr.count, 0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logOut = async () => {
    dispatch(pushAddedItems([]));
    dispatch(isAuthFalse());
    await signOut(auth);
    setUserDataCookie(null);
    navigate('/');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link
          to="/catalog"
          onClick={() => {
            setCurrentCategory('Asic');
          }}>
          <FormattedMessage id="header.catalog_asic" />
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link
          to="/catalog"
          onClick={() => {
            setCurrentCategory('Accessory');
          }}>
          <FormattedMessage id="header.catalog_accessories" />
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link
          to="/catalog"
          onClick={() => {
            setCurrentCategory('GPU');
          }}>
          <FormattedMessage id="header.catalog_videocards" />
        </Link>
      ),
    },
  ];

  return (
    <header className={styles.header}>
      <span onClick={() => navigate('/')}>
        <MainLogoButton />
      </span>
      <div className={styles.header_btn_group}>
        <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
          <Button className={styles.width90}>
            <FormattedMessage id="header.catalog" />
          </Button>
        </Dropdown>
        <Button className={styles.width90} onClick={() => navigate('/services')}>
          <FormattedMessage id="header.services" />
        </Button>
        <Button className={styles.width90} onClick={() => navigate('/about-us')}>
          <FormattedMessage id="header.aboutUs" />
        </Button>
        <Button className={styles.width90} onClick={() => navigate('/blog')}>
          <FormattedMessage id="header.blog" />
        </Button>
      </div>
      <Switch
        checked={locale === 'ru'}
        checkedChildren="Ru"
        unCheckedChildren="Eng"
        onClick={onLocaleChange}
      />
      <SocialNetwork />
      <ToggleColorThemes setDarkThemes={setDarkThemes} darkThemes={darkThemes} />
      <Badge count={totalUnits} color="#F94F0C">
        <ShoppingCartOutlined
          onClick={() => navigate('/cart')}
          className={`${styles.cart} ${darkThemes ? styles.dark : styles.light}`}
        />
      </Badge>
      {isAuth ? (
        <>
          <LogoutOutlined onClick={logOut} className={styles.header_login_icon} />
          <Avatar
            className={styles.ava}
            size={40}
            src={me?.image}
            onClick={() => {
              navigate('/personal-cabinet');
            }}
          />
        </>
      ) : (
        <>
          <UserOutlined
            className={styles.header_login_icon}
            onClick={() => {
              navigate('/login');
            }}
          />
          <FormattedMessage id="header.login" />
        </>
      )}
    </header>
  );
};

export default Header;
