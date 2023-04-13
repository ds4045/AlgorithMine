import { useEffect, useState } from 'react';
import { ConfigProvider, theme } from 'antd';
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
import { useAppDispatch, useAppSelector } from './redux/hooks';
import Footer from './components/footer/Footer';
import Catalog from './components/catalog/Catalog';
import { useCurrentUser } from './hooks/useCurrentUser';
import NotFound from './components/not_found/NotFound';
import Cart from './components/cart/Cart';
import { loadCartFromLocalStorage } from './helpers/localStorage';
import { pushAddedItems } from './redux/cartSlice';
import { fetchUsers } from './api/fetchUsers';
import { fetchItems } from './api/fetchItems';

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
    if (isAuth) fetchUsers(dispatch);
  }, [dispatch, isAuth]);
  const me = useCurrentUser();
  useEffect(() => {
    dispatch(pushAddedItems(loadCartFromLocalStorage('cart')));
    fetchItems(dispatch);
  }, [dispatch]);
  return (
    <ConfigProvider locale={locale === 'ru' ? ruRU : enUS}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <ConfigProvider
          theme={{
            algorithm: darkThemes ? theme.darkAlgorithm : theme.defaultAlgorithm,
            token: {
              colorPrimary: '#F94F0C',
            },
          }}>
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
                      me={me}
                    />
                    <Carousel />
                    <Popular />
                    <Footer />
                  </>
                }
              />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="personal-cabinet" element={<PersonalCabinet me={me} />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </ConfigProvider>
      </IntlProvider>
    </ConfigProvider>
  );
}

export default App;
