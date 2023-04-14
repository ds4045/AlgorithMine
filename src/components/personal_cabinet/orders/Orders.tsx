import { FC } from 'react';
import styles from '../personal_cabinet.module.css';
import { UserFirestoreDB } from '../../../types/types';
import { Divider } from 'antd';
import { FormattedMessage } from 'react-intl';

type OrdersProps = {
  me: UserFirestoreDB | null;
};

const Orders: FC<OrdersProps> = ({ me }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.personal_data}>
        <Divider plain>
          <FormattedMessage id="pc.btn_orders" />
        </Divider>
      </div>
    </div>
  );
};

export default Orders;
