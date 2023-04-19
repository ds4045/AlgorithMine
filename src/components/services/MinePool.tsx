import { DashboardOutlined, DollarOutlined, RiseOutlined, SmileOutlined } from '@ant-design/icons';
import styles from './services.module.css';
import { FormattedMessage } from 'react-intl';

const MinePool = () => {
  return (
    <div id="mining_pool" className={styles.services_wrapper}>
      <div className={styles.pool_img}>
        <ul className={styles.hotel_list}>
          <li>
            <FormattedMessage id="services.mining_pool.easy" />
          </li>
          <li>
            <FormattedMessage id="services.mining_pool.commissions" />
          </li>
          <li>
            <FormattedMessage id="services.mining_pool.online" />
          </li>
        </ul>
      </div>
      <div className={styles.hotel_benefits}>
        <span>
          <DollarOutlined className={styles.hotel_icon} />
          <p>
            <FormattedMessage id="services.mining_pool.money" />
          </p>
        </span>
        <span>
          <SmileOutlined className={styles.hotel_icon} />
          <p>
            <FormattedMessage id="services.mining_pool.team" />
          </p>
        </span>
        <span>
          <DashboardOutlined className={styles.hotel_icon} />
          <p>
            <FormattedMessage id="services.mining_pool.profit" />
          </p>
        </span>
        <span>
          <RiseOutlined className={styles.hotel_icon} />
          <p>
            <FormattedMessage id="services.mining_pool.invest" />
          </p>
        </span>
      </div>
    </div>
  );
};

export default MinePool;
