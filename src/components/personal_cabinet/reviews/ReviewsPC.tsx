import { FC } from 'react';
import styles from '../personal_cabinet.module.css';

import { UserFirestoreDB } from '../../../types/types';
import { Divider, Empty } from 'antd';
import { FormattedMessage } from 'react-intl';
import { useAppSelector } from '../../../redux/hooks';
import SingleReview from './SingleReview';

type ReviewsProps = {
  me: UserFirestoreDB | null;
};

const Reviews: FC<ReviewsProps> = ({ me }) => {
  const idItems = me?.reviews ? Object.keys(me.reviews) : [];
  const reviews = me?.reviews ? Object.values(me.reviews).flat() : [];
  const items = useAppSelector((state) => state.items.items);
  return (
    <div className={styles.wrapper}>
      <div className={styles.reviews}>
        <Divider plain>
          <FormattedMessage id="pc.btn_reviews" />
        </Divider>
        {reviews.length ? (
          reviews.map((el, ind) => (
            <SingleReview
              key={el.id}
              item={items.find((item) => item.id === idItems[ind]) ?? null}
              userImg={el.image}
              text={el.value}
              rate={el.rate}
              date={el.date}
              idReview={el.id}
            />
          ))
        ) : (
          <Empty description={false} />
        )}
      </div>
    </div>
  );
};

export default Reviews;
