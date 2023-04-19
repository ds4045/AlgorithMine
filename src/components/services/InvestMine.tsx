import { FormattedMessage } from 'react-intl';
import styles from './services.module.css';

const InvestMine = () => {
  return (
    <div id="invest_mining" className={styles.services_wrapper}>
      <div className={styles.invest_wrapper}>
        <div className={styles.invest_img}>
          <h2>
            <FormattedMessage id="services.invest_mining.title" />
          </h2>
        </div>
        <ul className={styles.invest_text}>
          <h4>
            <FormattedMessage id="services.invest_mining.how" />
          </h4>
          <li>
            <FormattedMessage id="services.invest_mining.find" />
          </li>
          <li>
            <FormattedMessage id="services.invest_mining.open" />
          </li>
          <li>
            <FormattedMessage id="services.invest_mining.insurance" />
          </li>
          <li>
            <FormattedMessage id="services.invest_mining.data_center" />
          </li>
          <li>
            <FormattedMessage id="services.invest_mining.help" />
          </li>
          <li>
            <FormattedMessage id="services.invest_mining.error" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InvestMine;
