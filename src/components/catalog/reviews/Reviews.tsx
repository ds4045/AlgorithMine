import { FC, useState } from 'react';
import styles from '../catalog.module.css';
import { Button, Empty, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';
import ReviewForm from './ReviewForm';
import { ReviewItemType } from '../../../types/types';
import SingleReview from './SingleReview';

type ReviewsProps = {
  itemID: string;
  reviews: ReviewItemType[];
};

const Reviews: FC<ReviewsProps> = ({ itemID, reviews }) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const content = <ReviewForm setIsOpen={setIsOpenPopover} reviews={reviews} itemID={itemID} />;
  return (
    <div className={styles.reviews}>
      {reviews.length ? (
        reviews.map((el, ind) => (
          <SingleReview
            key={el.id + ind}
            name={el?.author}
            image={el?.image}
            score={el?.rate}
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
