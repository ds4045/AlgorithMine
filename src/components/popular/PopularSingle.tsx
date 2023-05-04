import { Card } from 'antd';
import React, { FC, useCallback } from 'react';
import { CategoryType } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { setCurrentCategory } from '../../redux/currentCategorySlice';
import { useAppDispatch } from '../../redux/hooks';

const { Meta } = Card;
type PopularSingleProps = {
  title: CategoryType;
  image: string;
};
const PopularSingle: FC<PopularSingleProps> = ({ title, image }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const buttonHandler = useCallback(() => {
    dispatch(setCurrentCategory(title));
    navigate('/catalog');
  }, [dispatch, navigate, title]);
  return (
    <Card
      onClick={buttonHandler}
      hoverable
      style={{ width: 240, margin: 20 }}
      cover={<img alt="" src={image} height={200} />}>
      <Meta title={title} />
    </Card>
  );
};

export default PopularSingle;
