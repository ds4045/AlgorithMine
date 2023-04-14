import { FC } from 'react';
import styles from '../personal_cabinet.module.css';

import { UserFirestoreDB } from '../../../types/types';
import { Divider } from 'antd';
import { FormattedMessage } from 'react-intl';
import { useAppSelector } from '../../../redux/hooks';

type ReviewsProps = {
  me: UserFirestoreDB | null;
};

const Reviews: FC<ReviewsProps> = ({ me }) => {
  console.log(me?.reviews);
  const reviewsItems = me?.reviews ? Object.keys(me.reviews) : [];
  let items = useAppSelector((state) => state.items.items);
  items = items.filter((el) => reviewsItems.includes(el.id));
  console.log(reviewsItems, items);
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
