import { useQuery } from 'react-query';
import { fetchCurrency } from '../../api/fetchCurrency';
import styles from './crypto_ticker.module.css';

const CryptoTicker = () => {
  const { data } = useQuery('currency', fetchCurrency);
  return (
    <>
      {data && (
        <div className={styles.marquee}>
          <div className={styles.content}>
            <div className={styles.currency}>
              <img
                src="https://icon-library.com/images/bitcoin-icon/bitcoin-icon-3.jpg"
                alt=""
                className={styles.img}
              />
              <span className={styles.text}>
                {data.name} {data.values.USD.price.toFixed()}$
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CryptoTicker;
