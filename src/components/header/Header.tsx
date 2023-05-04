import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { Avatar, Button, Dropdown, MenuProps, Switch } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import styles from './header.module.css';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firbase/firebaseConfig';
import { isAuthFalse } from '../../redux/authSlice';
import { setUserDataCookie } from '../../hooks/useAutoSignIn';
import { UserFirestoreDB } from '../../types/types';
import { pushAddedItems } from '../../redux/cartSlice';
import SocialNetwork from '../UI/soc_network_icons/SocialNetwork';
import ToggleColorThemes from '../UI/toggle_color/ToggleColorThemes';
import MainLogoButton from '../UI/logo/MainLogoButton';
import { BsTelegram } from 'react-icons/bs';
import { RiWhatsappFill } from 'react-icons/ri';
import BadgeWrapper from './BadgeWrapper';
import { setCurrentCategory } from '../../redux/currentCategorySlice';

type HeaderProps = {
  onLocaleChange: () => void;
  setDarkThemes: Dispatch<SetStateAction<boolean>>;
  darkThemes: boolean;
  me: UserFirestoreDB | null;
  locale: 'en' | 'ru';
};
const Header: React.FC<HeaderProps> = ({
  onLocaleChange,
  setDarkThemes,
  darkThemes,
  me,
  locale,
}) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const logOut = useCallback(async () => {
    dispatch(pushAddedItems([]));
    dispatch(isAuthFalse());
    await signOut(auth);
    setUserDataCookie(null);
    navigate('/');
  }, [dispatch, navigate]);
  const items: MenuProps['items'] = useMemo(
    () => [
      {
        key: '1',
        label: (
          <Link
            to="/catalog"
            onClick={() => {
              dispatch(setCurrentCategory('Asic'));
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
              dispatch(setCurrentCategory('Accessory'));
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
              dispatch(setCurrentCategory('GPU'));
            }}>
            <FormattedMessage id="header.catalog_videocards" />
          </Link>
        ),
      },
    ],
    [dispatch],
  );

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
      <span className={styles.contacts}>
        <SocialNetwork />
      </span>
      <span className={styles.contacts_mobile}>
        <a href="https://www.whatsapp.com/" target="blank">
          <RiWhatsappFill className={styles.wa} />
        </a>
        <a href="https://telegram.org/" target="blank">
          <BsTelegram className={styles.tg} />
        </a>
      </span>
      <ToggleColorThemes setDarkThemes={setDarkThemes} darkThemes={darkThemes} />
      <BadgeWrapper darkThemes={darkThemes} />
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
        <span
          onClick={() => {
            navigate('/login');
          }}>
          <UserOutlined
            className={styles.header_login_icon}
            onClick={() => {
              navigate('/login');
            }}
          />
          <FormattedMessage id="header.login" />
        </span>
      )}
    </header>
  );
};

export default Header;
