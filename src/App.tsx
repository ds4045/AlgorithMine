import { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import Header from './components/header/Header';
import ruRU from 'antd/lib/locale/ru_RU';
import enUS from 'antd/lib/locale/en_US';
import { IntlProvider } from 'react-intl';
import messages from './translations/messages';
import Carousel from './components/carousel/Carousel';
import CryptoTicker from './components/crypto_ticker/CryptoTicker';
import Popular from './components/popular/Popular';
import { Route, Routes } from 'react-router-dom';
import Register from './components/auth/Register';
import { useAutoSignIn } from './hooks/useAutoSignIn';
import Login from './components/auth/Login';
import PersonalCabinet from './components/personal_cabinet/PersonalCabinet';
import { getDBFromFirestoreDB } from './helpers/firestoreDBUsers';
import { pushAllUsers } from './redux/allUsersSlice';
import { UserFirestoreDB } from './types/types';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import Footer from './components/footer/Footer';

function App() {
  useAutoSignIn();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [locale, setLocale] = useState<'ru' | 'en'>('ru');
  const [darkThemes, setDarkThemes] = useState<boolean>(false);
  const handleLocaleChange = () => {
    locale === 'en' ? setLocale('ru') : setLocale('en');
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getDBFromFirestoreDB();
      if (res) dispatch(pushAllUsers(res as UserFirestoreDB[]));
    };
    if (isAuth) fetchUsers();
  }, [dispatch, isAuth]);
  return (
    <ConfigProvider locale={locale === 'ru' ? ruRU : enUS}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <div className={darkThemes ? 'App_dark' : 'App_light'}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <CryptoTicker />
                  <Header
                    onLocaleChange={handleLocaleChange}
                    setDarkThemes={setDarkThemes}
                    darkThemes={darkThemes}
                  />
                  <Carousel />
                  <Popular />
                  <Footer />
                </>
              }
            />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="personal-cabinet" element={<PersonalCabinet />} />
          </Routes>
        </div>
      </IntlProvider>
    </ConfigProvider>
  );
}

export default App;
