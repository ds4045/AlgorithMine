import { useEffect, useState } from 'react';
import { ConfigProvider, FloatButton, theme } from 'antd';
import Header from './components/header/Header';
import ruRU from 'antd/lib/locale/ru_RU';
import enUS from 'antd/lib/locale/en_US';
import { IntlProvider } from 'react-intl';
import messages from './translations/messages';
import Carousel from './components/carousel/Carousel';
import CryptoTicker from './components/crypto_ticker/CryptoTicker';
import Popular from './components/popular/Popular';
import { Route, Routes, useLocation } from 'react-router-dom';
import Register from './components/auth/Register';
import { useAutoSignIn } from './hooks/useAutoSignIn';
import Login from './components/auth/Login';
import PersonalCabinet from './components/personal_cabinet/PersonalCabinet';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import Footer from './components/footer/Footer';
import Catalog from './components/catalog/Catalog';
import NotFound from './components/not_found/NotFound';
import Cart from './components/cart/Cart';
import { loadCartFromLocalStorage } from './helpers/localStorage';
import { pushAddedItems } from './redux/cartSlice';
import { fetchItems } from './api/fetchItems';
import { CategoryType } from './types/types';
import OrderSuccess from './components/cart/OrderSuccess';
import { PhoneOutlined } from '@ant-design/icons';
import Quiz from './components/carousel/quiz/Quiz';
import AboutUs from './components/about_us/aboutUs';
import ButtonScrollUp from './components/UI/button_scroll_up/buttonScrollUp';
import Blog from './components/blog/Blog';
import PostPage from './components/blog/posts/PostPage';
import { fetchPosts } from './api/fetchPosts';

const App = () => {
  useAutoSignIn();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const me = useAppSelector((state) => state.auth.login);
  const [currentCategory, setCurrentCategory] = useState<CategoryType>('Asic');
  const [locale, setLocale] = useState<'ru' | 'en'>('ru');
  const [darkThemes, setDarkThemes] = useState<boolean>(false);
  const handleLocaleChange = () => {
    locale === 'en' ? setLocale('ru') : setLocale('en');
  };
  useEffect(() => {
    dispatch(pushAddedItems(loadCartFromLocalStorage('cart')));
    fetchItems(dispatch);
    fetchPosts(dispatch);
  }, [dispatch]);
  return (
    <ConfigProvider
      locale={locale === 'ru' ? ruRU : enUS}
      theme={{
        algorithm: darkThemes ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#F94F0C',
        },
      }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <div className={darkThemes ? 'App_dark' : 'App_light'}>
          {location.pathname !== '/login' && (
            <>
              <CryptoTicker />
              <Header
                setCurrentCategory={setCurrentCategory}
                onLocaleChange={handleLocaleChange}
                setDarkThemes={setDarkThemes}
                darkThemes={darkThemes}
                me={me}
                locale={locale}
              />
            </>
          )}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Carousel />
                  <Popular setCurrentCategory={setCurrentCategory} />
                </>
              }
            />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="personal-cabinet" element={<PersonalCabinet me={me} />} />
            <Route
              path="catalog"
              element={
                <Catalog
                  currentCategory={currentCategory}
                  setCurrentCategory={setCurrentCategory}
                />
              }
            />
            <Route path="cart" element={<Cart />} />
            <Route path="cart/success" element={<OrderSuccess />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<PostPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {(location.pathname === '/' ||
            location.pathname === '/catalog' ||
            location.pathname === '/cart') && (
            <FloatButton
              className="btn_call_me"
              shape="circle"
              type="primary"
              icon={<PhoneOutlined />}
            />
          )}
          <ButtonScrollUp />
          <Footer />
        </div>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
