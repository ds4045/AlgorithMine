import { FC } from 'react';
import styles from '../personal_cabinet.module.css';

import { UserFirestoreDB } from '../../../types/types';
import { Divider } from 'antd';
import { FormattedMessage } from 'react-intl';

type ReviewsProps = {
  me: UserFirestoreDB | null;
};

const Reviews: FC<ReviewsProps> = ({ me }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.personal_data}>
        <Divider plain>
          <FormattedMessage id="pc.btn_reviews" />
        </Divider>
      </div>
    </div>
  );
};

export default Reviews;
