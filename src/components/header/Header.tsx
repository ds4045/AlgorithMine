import React, { Dispatch, SetStateAction } from 'react';
import { Avatar, Badge, Button, Dropdown, Input, Switch } from 'antd';
import { LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import ToggleColorThemes from '../UI/ToggleColorThemes';
import styles from './header.module.css';
import MainLogoButton from '../UI/MainLogoButton';
import Contacts from '../UI/Contacts';
import { FormattedMessage } from 'react-intl';
import { items } from './utilsHeader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { isAuthFalse } from '../../redux/authSlice';
import { setUserDataCookie } from '../../hooks/useAutoSignIn';
import { useCurrentUser } from '../../hooks/useCurrentUser';
const { Search } = Input;

type HeaderProps = {
  onLocaleChange: () => void;
  setDarkThemes: Dispatch<SetStateAction<boolean>>;
  darkThemes: boolean;
};
const Header: React.FC<HeaderProps> = ({ onLocaleChange, setDarkThemes, darkThemes }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const me = useCurrentUser();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onSearch = (value: string) => console.log(value);
  const logOut = async () => {
    dispatch(isAuthFalse());
    await signOut(auth);
    setUserDataCookie(null);
    navigate('/');
  };
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
      <Badge count={5}>
        <ShoppingCartOutlined
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
