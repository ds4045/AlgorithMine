import React, { FC } from 'react';
import styles from './catalog.module.css';
import { Button, Rate } from 'antd';

type ReviewsProps = {};

const Reviews: FC<ReviewsProps> = () => {
  return (
    <div className={styles.reviews}>
      <div className={styles.review}>
        <h5>Игорь</h5>
        <p>
          Оценка <Rate value={5} disabled />
        </p>
        <p>Дата:1.05.2022</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, reprehenderit vitae
          culpa quia at adipisci perspiciatis enim praesentium quas porro, nulla cum? Aperiam quam
          et magnam, iste eaque consequuntur hic!
        </p>
      </div>
      <div className={styles.review}>
        <h5>Игорь</h5>
        <p>
          Оценка <Rate value={5} disabled />
        </p>
        <p>Дата:1.05.2022</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, reprehenderit vitae
          culpa quia at adipisci perspiciatis enim praesentium quas porro, nulla cum? Aperiam quam
          et magnam, iste eaque consequuntur hic!
        </p>
      </div>

      <Button>Написать отзыв</Button>
    </div>
  );
};

export default Reviews;
