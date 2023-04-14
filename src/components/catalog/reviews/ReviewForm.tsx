import { Button, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Dispatch, FC, SetStateAction } from 'react';
import styles from '../catalog.module.css';
import { ReviewFormType } from '../../../types/types';
import { FormattedMessage } from 'react-intl';

type ReviewFormProps = {
  setReviewForm: Dispatch<SetStateAction<ReviewFormType>>;
  reviewForm: ReviewFormType;
  handlerReviewForm: () => void;
  isLoading: boolean;
};

const ReviewForm: FC<ReviewFormProps> = ({
  handlerReviewForm,
  reviewForm,
  setReviewForm,
  isLoading,
}) => {
  return (
    <div className={styles.review_form}>
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
        <Button onClick={handlerReviewForm} loading={isLoading as boolean}>
          <FormattedMessage id="catalog.reviews.submit" />
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;
