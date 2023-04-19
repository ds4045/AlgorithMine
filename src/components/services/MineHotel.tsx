import {
  FieldTimeOutlined,
  SecurityScanOutlined,
  ThunderboltOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import styles from './services.module.css';
import { FormattedMessage } from 'react-intl';

const MineHotel = () => {
  return (
    <div id="mine_hotel" className={styles.services_wrapper}>
      <div className={styles.hotel_img}>
        <ul className={styles.hotel_list}>
          <li>
            <FormattedMessage id="services.mining_hotel.delivery" />
          </li>
          <li>
            <FormattedMessage id="services.mining_hotel.placement" />
          </li>
          <li>
            <FormattedMessage id="services.mining_hotel.security" />
          </li>
          <li>
            <FormattedMessage id="services.mining_hotel.works" />
          </li>
        </ul>
      </div>
      <div className={styles.hotel_benefits}>
        <span>
          <FieldTimeOutlined className={styles.hotel_icon} />
          <p>
            <FormattedMessage id="services.mining_hotel.time" />
          </p>
        </span>
        <span>
          <ThunderboltOutlined className={styles.hotel_icon} />
          <p>
            <FormattedMessage id="services.mining_hotel.energy" />
          </p>
        </span>
        <span>
          <SecurityScanOutlined className={styles.hotel_icon} />
          <p>
            <FormattedMessage id="services.mining_hotel.security_icon" />
          </p>
        </span>
        <span>
          <VideoCameraOutlined className={styles.hotel_icon} />
          <p>
            <FormattedMessage id="services.mining_hotel.camera" />
          </p>
        </span>
      </div>
    </div>
  );
};

export default MineHotel;
