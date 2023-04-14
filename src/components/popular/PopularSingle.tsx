import { Card } from 'antd';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { CategoryType } from '../../types/types';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
type PopularSingleProps = {
  title: CategoryType;
  image: string;
  setCurrentCategory: Dispatch<SetStateAction<CategoryType>>;
};
const PopularSingle: FC<PopularSingleProps> = ({ title, image, setCurrentCategory }) => {
  const navigate = useNavigate();
  const buttonHandler = () => {
    setCurrentCategory(title);
    navigate('/catalog');
  };
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
