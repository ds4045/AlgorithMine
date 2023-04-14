import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Card, Popover, Rate, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import { FC, useState } from 'react';
import { Item, ReviewFormType } from '../../../types/types';
import styles from '../personal_cabinet.module.css';
import ReviewForm from '../../catalog/reviews/ReviewForm';
import { reviewHandler } from '../../../firbase/reviewHandler';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useAlert from '../../../hooks/useAlert';
type SingleReviewProps = {
  item: Item | null;
  userImg: string;
  text: string;
  date: string;
  rate: number;
  idReview: string;
};

const SingleReview: FC<SingleReviewProps> = ({ item, userImg, text, date, rate, idReview }) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const me = useAppSelector((state) => state.auth.login);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const [alertSuccess, alertError, contextHolder] = useAlert();
  const [reviewForm, setReviewForm] = useState<ReviewFormType>({
    value: text,
    rate: rate,
  });
  const [isLoading, setIsLoading] = useState(false);
  const description = (
    <>
      <p>{date}</p>
      <p>{text}</p>
      <Rate value={rate} disabled />
    </>
  );
  const handlerReviewForm = () => {
    if (me && item)
      reviewHandler(
        'change',
        me,
        isAuth,
        item.id,
        item.reviews,
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
  const deleteReview = () => {
    if (me && item)
      reviewHandler(
        'delete',
        me,
        isAuth,
        item.id,
        item.reviews,
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
  return (
    item && (
      <>
        {contextHolder}

        <Card
          className={styles.review}
          title={
            <span>
              <Avatar src={item.images[0]} /> {item.title}
              {isLoading && <Spin className={styles.spin} />}
            </span>
          }
          actions={[
            <DeleteOutlined key="delete" onClick={deleteReview} />,
            <Popover
              content={
                <ReviewForm
                  isLoading={isLoading}
                  handlerReviewForm={handlerReviewForm}
                  setReviewForm={setReviewForm}
                  reviewForm={reviewForm}
                />
              }
              trigger="click"
              placement="rightTop"
              open={isOpenPopover}
              onOpenChange={setIsOpenPopover}>
              <EditOutlined key="edit" />
            </Popover>,
          ]}>
          <Meta avatar={<Avatar src={userImg} />} description={description} />
        </Card>
      </>
    )
  );
};

export default SingleReview;
