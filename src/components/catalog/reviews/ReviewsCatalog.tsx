import { FC, useState } from 'react';
import styles from '../catalog.module.css';
import { Button, Empty, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';
import ReviewForm from './ReviewForm';
import { ReviewItemType } from '../../../types/types';
import SingleReview from './SingleReview';
import { reviewHandler } from '../../../firbase/reviewHandler';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useAlert from '../../../hooks/useAlert';

type ReviewsProps = {
  itemID: string;
  reviews: ReviewItemType[];
};
export type ReviewFormType = {
  value: string;
  rate: number;
};
const Reviews: FC<ReviewsProps> = ({ itemID, reviews }) => {
  const idReview = undefined;
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const me = useAppSelector((state) => state.auth.login);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const [alertSuccess, alertError, contextHolder] = useAlert();
  const [reviewForm, setReviewForm] = useState<ReviewFormType>({
    value: '',
    rate: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handlerReviewForm = () => {
    if (me)
      reviewHandler(
        'add',
        me,
        isAuth,
        itemID,
        reviews,
        reviewForm,
        setReviewForm,
        dispatch,
        setIsOpenPopover,
        setIsLoading,
        alertSuccess,
        alertError,
        idReview,
      );
  };
  const content = (
    <ReviewForm
      setReviewForm={setReviewForm}
      reviewForm={reviewForm}
      isLoading={isLoading}
      handlerReviewForm={handlerReviewForm}
    />
  );
  return (
    <div className={styles.reviews}>
      {contextHolder}
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
