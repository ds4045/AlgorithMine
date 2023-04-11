import React, { FC } from 'react';
import styles from './catalog.module.css';
import { Button, Rate } from 'antd';
import { FormattedMessage } from 'react-intl';

type ReviewsProps = {};

const Reviews: FC<ReviewsProps> = () => {
  return (
    <div className={styles.reviews}>
      <div className={styles.review}>
        <h5>Игорь</h5>
        <span>
          <FormattedMessage id="catalog.card.modal_review_score" /> <Rate value={5} disabled />
        </span>
        <p>
          <FormattedMessage id="catalog.card.modal_review_date" />
          :1.05.2022
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, reprehenderit vitae
          culpa quia at adipisci perspiciatis enim praesentium quas porro, nulla cum? Aperiam quam
          et magnam, iste eaque consequuntur hic!
        </p>
      </div>
      <div className={styles.review}>
        <h5>Игорь</h5>
        <span>
          <FormattedMessage id="catalog.card.modal_review_score" /> <Rate value={5} disabled />
        </span>
        <p>
          <FormattedMessage id="catalog.card.modal_review_date" />
          :1.05.2022
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, reprehenderit vitae
          culpa quia at adipisci perspiciatis enim praesentium quas porro, nulla cum? Aperiam quam
          et magnam, iste eaque consequuntur hic!
        </p>
      </div>
      <Button>
        <FormattedMessage id="catalog.card.modal_add_reviews" />
      </Button>
    </div>
  );
};

export default Reviews;
