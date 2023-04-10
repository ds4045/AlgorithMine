import { FC } from 'react';
import styles from './personal_cabinet.module.css';
import { UserFirestoreDB } from '../../types/types';

type OrdersProps = {
  me: UserFirestoreDB | null;
};

const Orders: FC<OrdersProps> = ({ me }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.personal_data}>Orders</div>
    </div>
  );
};

export default Orders;
