import { FC, useState } from 'react';
import styles from './catalog.module.css';
import { Button, Empty, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';
import ReviewForm from './UI/ReviewForm';
import { ReviewItemType } from '../../types/types';
import SingleReview from './UI/SingleReview';

type ReviewsProps = {
  allReviews: ReviewItemType[];
  itemID: string;
};

const Reviews: FC<ReviewsProps> = ({ allReviews, itemID }) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const score = Math.round(
    allReviews.reduce((acc, curr) => acc + curr?.rate, 0) / allReviews.length,
  );
  const content = (
    <ReviewForm setIsOpen={setIsOpenPopover} allReviews={allReviews} itemID={itemID} />
  );
  return (
    <div className={styles.reviews}>
      {allReviews.length ? (
        allReviews.map((el, ind) => (
          <SingleReview
            key={el.id + ind}
            name={el?.author}
            image={el?.image}
            score={score}
            date={el?.date}
            text={el?.value}
          />
        ))
      ) : (
        <Empty description={false} />
      )}
      <Popover
        content={content}
        trigger="click"
        placement="rightTop"
        open={isOpenPopover}
        onOpenChange={setIsOpenPopover}>
        <Button>
          <FormattedMessage id="catalog.card.modal_add_reviews" />
        </Button>
      </Popover>
    </div>
  );
};

export default Reviews;
