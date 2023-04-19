import { SettingOutlined } from '@ant-design/icons';
import styles from './services.module.css';
import { FormattedMessage } from 'react-intl';

const RepairAsic = () => {
  return (
    <div id="repair_asic" className={styles.services_wrapper}>
      <div className={styles.repair_header}>
        <h2>
          <SettingOutlined />
          <FormattedMessage id="services.repair.why" />
        </h2>
        <p>
          <FormattedMessage id="services.repair.company" />
        </p>
        <div className={styles.img_repair_wrapper}>
          <div className={styles.img_repair_diagnostic}>
            <p className={styles.repair_description}>
              <FormattedMessage id="services.repair.diagnostics" />
            </p>
          </div>
          <div className={styles.img_repair_in_stock}>
            <p className={styles.repair_description}>
              <FormattedMessage id="services.repair.in_stock" />
            </p>
          </div>
          <div className={styles.img_repair_warranty}>
            <p className={styles.repair_description}>
              <FormattedMessage id="services.repair.insurance" />
            </p>
          </div>
          <div className={styles.img_repair_repair}>
            <p className={styles.repair_description}>
              <FormattedMessage id="services.repair.repair" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairAsic;
