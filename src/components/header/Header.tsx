import React, { Dispatch, SetStateAction } from 'react';
import { Avatar, Badge, Button, Dropdown, Input, MenuProps, Switch } from 'antd';
import { LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import ToggleColorThemes from '../UI/ToggleColorThemes';
import styles from './header.module.css';
import MainLogoButton from '../UI/MainLogoButton';
import Contacts from '../UI/Contacts';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firbase/firebaseConfig';
import { isAuthFalse } from '../../redux/authSlice';
import { setUserDataCookie } from '../../hooks/useAutoSignIn';
import { CategoryType, UserFirestoreDB } from '../../types/types';
import { pushAddedItems } from '../../redux/cartSlice';
const { Search } = Input;

type HeaderProps = {
  onLocaleChange: () => void;
  setDarkThemes: Dispatch<SetStateAction<boolean>>;
  darkThemes: boolean;
  me: UserFirestoreDB | null;
  setCurrentCategory: Dispatch<SetStateAction<CategoryType>>;
};
const Header: React.FC<HeaderProps> = ({
  onLocaleChange,
  setDarkThemes,
  darkThemes,
  me,
  setCurrentCategory,
}) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const addedItems = useAppSelector((state) => state.cart.addedItems);
  const totalUnits = addedItems.reduce((acc, curr) => acc + curr.count, 0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSearch = (value: string) => console.log(value);
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
      <MainLogoButton />
      <div className={styles.header_btn_group}>
        <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
          <Button className={styles.width90}>
            <FormattedMessage id="header.catalog" />
          </Button>
        </Dropdown>
        <Button className={styles.width90}>
          <FormattedMessage id="header.services" />
        </Button>
        <Button className={styles.width90}>
          <FormattedMessage id="header.aboutUs" />
        </Button>
        <Search placeholder="..." onSearch={onSearch} allowClear style={{ width: 200 }} />
      </div>
      <Switch
        checkedChildren="Ru"
        unCheckedChildren="Eng"
        defaultChecked
        onClick={onLocaleChange}
      />
      <Contacts />
      <ToggleColorThemes setDarkThemes={setDarkThemes} />
      <Badge count={totalUnits}>
        <ShoppingCartOutlined
          onClick={() => navigate('/cart')}
          className={`${styles.cart} ${darkThemes ? styles.dark : styles.light}`}
        />
      </Badge>
      <Avatar
        className={styles.header_login_icon}
        size={40}
        icon={
          isAuth ? (
            <LogoutOutlined onClick={logOut} />
          ) : (
            <UserOutlined
              onClick={() => {
                navigate('/login');
              }}
            />
          )
        }
      />
      {isAuth ? (
        <Avatar
          className={styles.ava}
          size={40}
          src={me?.image}
          onClick={() => {
            navigate('/personal-cabinet');
          }}
        />
      ) : (
        <FormattedMessage id="header.login" />
      )}
    </header>
  );
};

export default Header;
