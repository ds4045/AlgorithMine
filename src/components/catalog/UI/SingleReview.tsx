import { FC } from 'react';
import styles from '../catalog.module.css';
import { FormattedMessage } from 'react-intl';
import { Rate } from 'antd';

type SingleReviewProps = {
  name: string;
  score: number;
  date: string;
  text: string;
  image: string;
};

const SingleReview: FC<SingleReviewProps> = ({ name, score, date, text, image }) => {
  return (
    <div className={styles.review}>
      <h5>
        <div className={styles.single_review_user_name_ing_wrapper}>
          <span>{name || <FormattedMessage id="catalog.reviews.anonim" />}</span>
          <img className={styles.single_review_user_img} src={image} alt="" />
        </div>
      </h5>
      <span>
        <FormattedMessage id="catalog.card.modal_review_score" />
        <Rate value={score} disabled />
      </span>
      <p>
        <FormattedMessage id="catalog.card.modal_review_date" />
        {date}
      </p>
      <p>{text}</p>
    </div>
  );
};

export default SingleReview;
