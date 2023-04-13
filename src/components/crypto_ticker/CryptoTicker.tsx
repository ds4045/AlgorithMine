import { useQuery } from 'react-query';
import { fetchCurrency } from '../../api/fetchCurrency';
import styles from './crypto_ticker.module.css';

type CoinsType = {
  id: number;
  name: string;
  rank: number;
  values: {
    USD: {
      price: number;
    };
  };
};

type CoinsTypeData = {
  data: CoinsType[];
};
const currencies = [
  {
    id: 1,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
  },
  {
    id: 3,
    img: 'https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG-Pic.png',
  },
  {
    id: 16,
    img: 'https://seeklogo.com/images/T/tether-usdt-logo-FA55C7F397-seeklogo.com.png',
  },
  {
    id: 26,
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Binance-coin-bnb-logo.png',
  },
  {
    id: 5,
    img: 'https://www.iconarchive.com/download/i109650/cjdowner/cryptocurrency-flat/Ripple-XRP.1024.png',
  },
];
const CryptoTicker = () => {
  const { data } = useQuery<CoinsTypeData>('currency', fetchCurrency);
  const coins =
    data &&
    data.data
      .filter((el) => currencies.some((token) => token.id === el.id))
      .map((el, ind) => {
        return (
          <div className={styles.token} key={el.id}>
            <img className={styles.img} src={currencies[ind].img} alt="" />
            <span className={styles.text}>
              {el.name} {el.values.USD.price.toFixed()}$
            </span>
          </div>
        );
      });

  return (
    <div className={styles.wrapper}>
      {data && (
        <div className={styles.marquee}>
          <div className={styles.content}>
            <div className={styles.currency}>{coins}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoTicker;
