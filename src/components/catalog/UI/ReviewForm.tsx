import { Button, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import styles from '../catalog.module.css';
import { nanoid } from 'nanoid';
import { ReviewItemType } from '../../../types/types';
import useAlert from '../../../hooks/useAlert';
import { updateForFirestore } from '../../../firbase/firebaseAPI';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { FormattedMessage } from 'react-intl';
import { getCurrentDate } from '../../../helpers/getCurrentDate';
import defaultImage from '../../../assets/defaultImage.jpeg';
import { addReviewItem } from '../../../redux/itemsSlice';
import { addReviewUser } from '../../../redux/authSlice';
type ReviewFormType = {
  value: string;
  rate: number;
};

type ReviewFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  reviews: ReviewItemType[];
  itemID: string;
};
const initialStateReview: ReviewFormType = {
  value: '',
  rate: 0,
};
const ReviewForm: FC<ReviewFormProps> = ({ setIsOpen, reviews, itemID }) => {
  const me = useAppSelector((state) => state.auth.login);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const [alertSuccess, alertError, contextHolder] = useAlert();
  const [reviewForm, setReviewForm] = useState<ReviewFormType>(initialStateReview);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async () => {
    let resUser, resItem, allUserReviewsItemID;
    const review: ReviewItemType = {
      ...reviewForm,
      id: nanoid(),
      date: getCurrentDate(),
      author: me?.name || '',
      image: me?.image || defaultImage,
    };
    setReviewForm(initialStateReview);
    setIsOpen(false);

    if (!isAuth) {
      return alertError(<FormattedMessage id="catalog.reviews.check_login" />);
    }
    if (me?.reviews) allUserReviewsItemID = Object.keys(me.reviews);
    if (allUserReviewsItemID?.includes(itemID)) {
      return alertError(<FormattedMessage id="catalog.reviews.check_added" />);
    }
    if (!reviewForm.value.trim())
      return alertError(<FormattedMessage id="catalog.reviews.check_added_empty_string" />);

    const newAllItemReviews = [...reviews, review];
    const newAllUserReviews = { ...me?.reviews, [itemID]: newAllItemReviews };
    resItem = await updateForFirestore(
      'items',
      itemID,
      'reviews',
      newAllItemReviews,
      setIsLoading,
      alertSuccess,
      alertError,
      'add_review',
    );
    if (me?.id) {
      resUser = await updateForFirestore(
        'users',
        me.id,
        'reviews',
        newAllUserReviews,
        setIsLoading,
        alertSuccess,
        alertError,
      );
    }
    if (resItem === 'success' && resUser === 'success') {
      dispatch(
        addReviewItem({
          itemID,
          reviews: newAllItemReviews,
        }),
      );
      dispatch(addReviewUser(newAllUserReviews));
    }
  };
  return (
    <div className={styles.review_form}>
      {contextHolder}
      <TextArea
        rows={4}
        placeholder="..."
        value={reviewForm.value}
        onChange={(e) => setReviewForm((prev) => ({ ...prev, value: e.target.value }))}
      />
      <div className={styles.btn_groups_review}>
        <Rate
          onChange={(rate) => setReviewForm((prev) => ({ ...prev, rate: rate }))}
          value={reviewForm.rate}
        />
        <Button onClick={submitHandler} loading={isLoading as boolean}>
          <FormattedMessage id="catalog.reviews.submit" />
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;
