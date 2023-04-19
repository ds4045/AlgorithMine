import React from 'react';
import { Anchor, ConfigProvider } from 'antd';
import MineHotel from './MineHotel';
import MinePool from './MinePool';
import InvestMine from './InvestMine';
import RepairAsic from './RepairAsic';
import styles from './services.module.css';
import { FormattedMessage } from 'react-intl';
const Services: React.FC = () => (
  <>
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#F94F0C',
            colorText: 'black',
          },
        }}>
        <Anchor
          className={styles.anchor}
          direction="horizontal"
          items={[
            {
              key: 'mine_hotel',
              href: '#mine_hotel',
              title: <FormattedMessage id="services.mining_hotel" />,
            },
            {
              key: 'mining_pool',
              href: '#mining_pool',
              title: <FormattedMessage id="services.mining_pool" />,
            },
            {
              key: 'invest_mining',
              href: '#invest_mining',
              title: <FormattedMessage id="services.invest_mining" />,
            },
            {
              key: 'repair_asic',
              href: '#repair_asic',
              title: <FormattedMessage id="services.repair" />,
            },
          ]}
        />
      </ConfigProvider>
    </div>

    <div>
      <MineHotel />
      <MinePool />
      <InvestMine />
      <RepairAsic />
    </div>
  </>
);

export default Services;
