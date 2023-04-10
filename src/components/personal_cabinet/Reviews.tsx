import { FC } from 'react';
import styles from './personal_cabinet.module.css';

import { UserFirestoreDB } from '../../types/types';

type ReviewsProps = {
  me: UserFirestoreDB | null;
};

const Reviews: FC<ReviewsProps> = ({ me }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.personal_data}>Reviews</div>
    </div>
  );
};

export default Reviews;
